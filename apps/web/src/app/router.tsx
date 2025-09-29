import { createBrowserRouter } from 'react-router-dom';
import { LazyHomePage } from '../pages/home/home-page.async';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyHomePage />,
  },
]);
