import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/index";
import { lazy, Suspense } from "react";
import Loading from "@/components/ui/loading";
const Home = lazy(() => import("../pages/home/Home"));
const Order = lazy(() => import("../pages/order/Order"));
const Product = lazy(() => import("../pages/product/Product"));
const OrderDetail = lazy(() => import("../pages/order/OrderDetail"));
const User = lazy(() => import("../pages/user/User"));
const ProductDetail = lazy(() => import("../pages/product/ProductDetail"));
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<Loading />}>
            <Order />
          </Suspense>
        ),
      },
      {
        path: "/orders/detail/:orderId",
        element: (
          <Suspense fallback={<Loading />}>
            <OrderDetail />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loading />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
      },
      {
        path: "/products/detail/:productId",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
