import {
  BoxesIcon,
  BoxIcon,
  HomeIcon,
  TruckIcon,
  UsersRoundIcon,
} from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  return (
    <div className="flex">
      <div className="flex-[0_0_18%] max-w-[18%] h-screen sticky top-0 border-r border-gray-300 px-4 py-10 font-medium">
        <h3 className="text-2xl text-center">Admin</h3>
        <ul className="flex flex-col mt-8 gap-6 px-4">
          <li>
            <Link
              to="/"
              className={`flex transition-all duration-300  items-center gap-3 rounded-md px-4 py-2.5 ${
                pathname === "/"
                  ? "bg-blue-500 text-white "
                  : "hover:bg-gray-200"
              }`}
            >
              <HomeIcon className="size-5" />
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={`flex transition-all duration-300  items-center gap-3 rounded-md px-4 py-2.5 ${
                pathname.startsWith("/orders")
                  ? "bg-blue-500 text-white "
                  : "hover:bg-gray-200"
              }`}
            >
              <BoxIcon className="size-5" />
              Hoá đơn
            </Link>
          </li>
          <li>
            <Link
              to="/order-detail"
              className={`flex transition-all duration-300  items-center gap-3 rounded-md px-4 py-2.5 ${
                pathname.startsWith("/order-detail")
                  ? "bg-blue-500 text-white "
                  : "hover:bg-gray-200"
              }`}
            >
              <BoxesIcon className="size-5" />
              Chi tiết hoá đơn
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`flex transition-all duration-300  items-center gap-3 rounded-md px-4 py-2.5 ${
                pathname.startsWith("/products")
                  ? "bg-blue-500 text-white "
                  : "hover:bg-gray-200"
              }`}
            >
              <BoxIcon className="size-5" />
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`flex transition-all duration-300  items-center gap-3 rounded-md px-4 py-2.5 ${
                pathname.startsWith("/users")
                  ? "bg-blue-500 text-white "
                  : "hover:bg-gray-200"
              }`}
            >
              <UsersRoundIcon className="size-5" />
              Khách hàng
            </Link>
          </li>

          <li>
            <Link
              to="/suppliers"
              className={`flex transition-all duration-300  items-center gap-3 rounded-md px-4 py-2.5 ${
                pathname.startsWith("/suppliers")
                  ? "bg-blue-500 text-white "
                  : "hover:bg-gray-200"
              }`}
            >
              <TruckIcon className="size-5" />
              Nhà cung cấp
            </Link>
          </li>
        </ul>
      </div>
      <main className="flex-[0_0_82%] max-w-[82%] bg-[#f7f7f7]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
