import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ListPage from "./pages/list-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPage />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>);
}

export default App;
