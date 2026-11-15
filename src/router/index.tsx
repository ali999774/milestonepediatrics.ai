import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import FAQ from '../pages/FAQ';
import Privacy from '../pages/Privacy';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
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
]);
