import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import FAQ from '../pages/FAQ';
import Privacy from '../pages/Privacy';
import NotFound from '../pages/NotFound';

/**
 * Route table, shared by the browser (src/main.tsx) and the prerenderer
 * (src/entry-server.tsx). It must stay free of browser-only side effects so it
 * can be imported in Node. Create the router from it at the call site.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/contact', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export const createRouter = () => createBrowserRouter(routes);
