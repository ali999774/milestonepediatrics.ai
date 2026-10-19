import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
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
      { path: '/about', element: <Navigate to="/" replace /> },
      { path: '/services', element: <Navigate to="/" replace /> },
      { path: '/faq', element: <Navigate to="/" replace /> },
      { path: '/contact', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
