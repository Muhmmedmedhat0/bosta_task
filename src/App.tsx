import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// layout and pages

import RootLayout from './layout/root-layout';
import Dashboard from './pages/dashboard';
import ErrorPage from './pages/404';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="/*" element={<ErrorPage />} />
    </Route>,
  ),
);

function App() {
  const direction = useSelector((state: RootState) => state.language.direction);

  return (
    <div className={`App ${direction}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
