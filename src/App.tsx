import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./pages/ForbiddenPage/ForbiddenPage";
import { RecipePage } from "./pages/RecipePage";
import { AddRecipePageLazy } from "./pages/AddRecipePage";
import { EditRecipePageLazy } from "./pages/EditRecipePage";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "recipe/:id",
        element: <RecipePage />,
      },
      {
        path: "forbidden",
        element: <ForbiddenPage />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "addrecipe",
            element: <AddRecipePageLazy />,
          },
          {
            path: "editrecipe/:id",
            element: <EditRecipePageLazy />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
