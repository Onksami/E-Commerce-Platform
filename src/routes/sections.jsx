import { lazy, Suspense, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AuthLayout from 'src/layouts/auth';
import DashboardLayout from 'src/layouts/dashboard';
import { AuthContext } from 'src/context/AuthContext';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Register = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const NewProductsPage = lazy(() => import('src/pages/new-products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


// ----------------------------------------------------------------------

export default function Router() {
  const { session } = useContext(AuthContext);
  const routes = useRoutes([

    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'newproducts', element: <NewProductsPage /> },
        { path: 'blog', element: <BlogPage /> },

      ],
    },
    {
      element: (
        <AuthLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AuthLayout>
      ),
      children: [
        {
          path: 'login',
          element: session ? <Navigate to="/products" /> : <LoginPage />,
        },
        {
          path: 'register',
          element: session ? <Navigate to="/products" /> : <Register />,
        },


      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
