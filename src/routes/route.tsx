import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Problems, { columnLoader, columnsAction } from "../pages/Problems";
import Categories, { categoriesAction, categoryLoader } from "../pages/Categories";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'problems',
                action: columnsAction,
                loader: columnLoader,
                element: <ProtectedRoute>
                            <Problems />
                        </ProtectedRoute>
            },
            {
                path: 'categories',
                action: categoriesAction,
                loader: categoryLoader,
                element: <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>,
            },
            {
                path: 'auth',
                element: <Auth />
            }
        ]
    }
])