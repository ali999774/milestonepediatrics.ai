import React from 'react'
import { renderToString } from 'react-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routes } from './router'
import { SEO_CONFIG } from './seo/meta'

export interface RenderResult {
  /** Markup for the inside of <div id="root"> */
  html: string
  /** Serialized Helmet tags for the page <head> */
  head: string
  /** HTTP status the router resolved for this path */
  status: number
}

const handler = createStaticHandler(routes)

/**
 * Render one path to static HTML. Called by scripts/prerender.mjs.
 * Throws if the path would redirect, since redirects live in vercel.json.
 */
export async function render(path: string): Promise<RenderResult> {
  const context = await handler.query(new Request(`${SEO_CONFIG.baseUrl}${path}`))
  if (context instanceof Response) {
    throw new Error(`Prerender of ${path} returned a redirect/response (${context.status}); not renderable`)
  }

  const router = createStaticRouter(handler.dataRoutes, context)
  const helmetContext: { helmet?: HelmetServerState | null } = {}

  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        {/* hydrate={false}: the app has no loaders/actions, so there is no state to ship. */}
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </HelmetProvider>
    </React.StrictMode>,
  )

  const h = helmetContext.helmet
  const head = h
    ? [h.title, h.priority, h.base, h.meta, h.link, h.script, h.noscript, h.style]
        .map((tag) => tag.toString())
        // Plain <title>: the client sets document.title, so the data-rh marker isn't needed.
        // (meta/link/script keep data-rh so Helmet replaces them on hydration instead of duplicating.)
        .map((tag) => tag.replace('<title data-rh="true">', '<title>'))
        .filter(Boolean)
        .join('\n    ')
    : ''

  return { html, head, status: context.statusCode }
}
