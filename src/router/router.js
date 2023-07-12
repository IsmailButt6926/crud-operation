import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import View from "../pages/View";
import Edit from "../pages/Edit";
import NewPage from "../pages/NewPage";
const routes = [
  { path: "/", element: <Home /> },
  { path: "/view/:id", element: <View /> },
  { path: "/edit/:id", element: <Edit /> },
  { path: "/Newpage", element: <NewPage /> },

];

const router = createBrowserRouter([
  {
    children: routes,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
