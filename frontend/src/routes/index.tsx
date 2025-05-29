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
const Supplier = lazy(() => import("../pages/supplier/Supplier"));
const OrderDetailList = lazy(
  () => import("../pages/order-detail/OrderDetailList")
);
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
        path: "/orders/:orderId",
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
        path: "/suppliers",
        element: (
          <Suspense fallback={<Loading />}>
            <Supplier />
          </Suspense>
        ),
      },
      {
        path: "/order-detail",
        element: (
          <Suspense fallback={<Loading />}>
            <OrderDetailList />
          </Suspense>
        ),
      },
      {
        path: "/products/:productId",
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
