// Prerender step. Runs after `vite build` and `vite build --ssr`:
//   dist/index.html            client template (hashed asset tags), written by vite build
//   dist-ssr/entry-server.js   server bundle exporting render(path)
// Writes one HTML file per public page plus 404.html into dist/, then deletes dist-ssr.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const distSsr = path.join(root, 'dist-ssr')

// To prerender a new page: add its path here (and add the route in src/router/index.tsx,
// its Helmet meta in src/seo/meta.ts, and a <url> in public/sitemap.xml).
const PAGES = ['/', '/about', '/services', '/faq', '/privacy']
// Rendered via the router's catch-all route; served by Vercel for unknown URLs.
const NOT_FOUND_PATH = '/__not-found__'

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const ROOT_MARKER = '<div id="root"></div>'
if (!template.includes(ROOT_MARKER)) throw new Error(`dist/index.html has no ${ROOT_MARKER}`)
if (!template.includes('</head>')) throw new Error('dist/index.html has no </head>')

const { render } = await import(pathToFileURL(path.join(distSsr, 'entry-server.js')).href)

function assemble({ html, head }) {
  return template
    .replace('</head>', () => `    ${head}\n  </head>`)
    .replace(ROOT_MARKER, () => `<div id="root">${html}</div>`)
}

function fail(label, msg) {
  throw new Error(`Prerender check failed for ${label}: ${msg}`)
}

function check(label, out, { expectCanonical }) {
  const count = (re) => (out.match(re) ?? []).length
  if (count(/<title[ >]/g) !== 1) fail(label, `expected exactly 1 <title>, found ${count(/<title[ >]/g)}`)
  if (count(/<h1[ >]/g) < 1) fail(label, 'no <h1>')
  if (count(/<meta[^>]*name="description"/g) !== 1) fail(label, 'expected exactly 1 meta description')
  const canon = count(/<link[^>]*rel="canonical"/g)
  if (expectCanonical && canon !== 1) fail(label, `expected exactly 1 canonical, found ${canon}`)
  if (!expectCanonical && canon !== 0) fail(label, 'unexpected canonical on 404 page')
}

const outFile = (pagePath) =>
  pagePath === '/' ? path.join(dist, 'index.html') : path.join(dist, pagePath, 'index.html')

const written = []
for (const p of PAGES) {
  const result = await render(p)
  if (result.status !== 200) fail(p, `status ${result.status}`)
  const out = assemble(result)
  check(p, out, { expectCanonical: true })
  const file = outFile(p)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, out)
  written.push(path.relative(root, file))
}

const nf = await render(NOT_FOUND_PATH)
const nfOut = assemble(nf)
check('404', nfOut, { expectCanonical: false })
await writeFile(path.join(dist, '404.html'), nfOut)
written.push('dist/404.html')

// Keep the sitemap in step with the prerender list.
const sitemap = await readFile(path.join(root, 'public', 'sitemap.xml'), 'utf8')
for (const p of PAGES) {
  const loc = `https://www.mymilestonepediatrics.com${p}`
  if (!sitemap.includes(`<loc>${loc}</loc>`)) fail('sitemap', `public/sitemap.xml is missing ${loc}`)
}

await rm(distSsr, { recursive: true, force: true })
console.log(`Prerendered ${written.length} files:\n  ${written.join('\n  ')}`)
