import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/index";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/home/Home"));
const Order = lazy(() => import("../pages/order/Order"));
const Product = lazy(() => import("../pages/product/Product"));
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Order />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Product />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
