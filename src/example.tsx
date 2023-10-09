import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, NavLink } from 'react-router-dom';
import DarkExample from './Examples/dark';
import LightExample from './Examples/light';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ul style={{ padding: 24 }}>
        <li>
          -{' '}
          <NavLink to="/dark" className="text-blue-400 underline">
            Check Dark Example
          </NavLink>
        </li>
        <li>
          -{' '}
          <NavLink to="/light" className="text-blue-400 underline">
            Check Light Example
          </NavLink>
        </li>
      </ul>
    ),
  },
  {
    path: '/dark',
    element: <DarkExample />,
  },
  {
    path: '/light',
    element: <LightExample />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
