import { RouterProvider } from 'react-router-dom';
import { createRouter } from './router';

// Created once at module load in the browser. Never import this file from the
// server entry: createBrowserRouter needs `window`.
const router = createRouter();

function App() {
  return <RouterProvider router={router} />
}

export default App
