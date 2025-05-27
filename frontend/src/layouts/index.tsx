import { BoxIcon, HomeIcon } from "lucide-react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <div className="flex-[0_0_20%] min-h-screen border-r border-gray-300 px-4 py-10 font-medium">
        <h3 className="text-2xl text-center">Admin</h3>
        <ul className="flex flex-col mt-8 gap-4 px-4">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 bg-blue-500 text-white rounded-lg px-4 py-2.5"
            >
              <HomeIcon className="size-5" />
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="flex items-center gap-3  rounded-lg px-4 py-2.5"
            >
              <BoxIcon className="size-5" />
              Đơn hàng
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="flex items-center gap-3  rounded-lg px-4 py-2.5"
            >
              <BoxIcon className="size-5" />
              Sản phẩm
            </Link>
          </li>
        </ul>
      </div>
      <main className="flex-[0_0_80%] max-w-[80%] bg-[#f7f7f7]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
