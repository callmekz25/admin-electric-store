import type IOrder from "@/interfaces/order/order.interface";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const UpdateOrder = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/orders");
    }
  };

  return (
    <div className="">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <button onClick={() => handleBack()} className=" cursor-pointer">
            <ArrowLeftIcon className="size-6" />
          </button>
          <h2 className="text-xl font-bold ">
            Thông tin chi tiết của đơn hàng
          </h2>
        </div>
        <div className=" flex mt-10 ">
          <div className=" flex-[60%] mx-2 bg-white px-6 py-4 rounded">
            {/* Thông tin của đơn hàng */}
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Thông tin của đơn hàng
            </h4>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex  gap-2 items-center text-sm justify-between ">
                <span className=" font-normal opacity-70 ">Mã đơn hàng</span>
                <span className="font-semibold text-[16px]">HD001</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Ngày lập</span>
                <span>05/05/2025</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Ngày giao</span>
                <span>05/05/2025</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Nơi giao</span>
                <span>25A Lê Hồng Phong, Nha Trang, Khánh Hoà</span>
              </div>
              <div className="flex items-center  text-sm justify-between">
                <span className=" font-normal opacity-70 ">
                  Hình thức thanh toán
                </span>
                <span className="">Tiền mặt</span>
              </div>
              <div className="flex items-center  text-sm justify-between">
                <span className=" font-normal opacity-70 ">
                  Tổng số tiền thanh toán
                </span>
                <span className="">1000000đ</span>
              </div>
            </div>
          </div>
          {/* Thông tin vận chuyển */}
          <div className="mx-2 bg-whitep px-6 py-4 bg-white rounded flex-[40%] max-w-[40%]">
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Thông tin của khách hàng
            </h4>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Họ tên</span>
                <span>Nguyễn Hồng Khánh Vinh</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Ngày sinh</span>
                <span>05/05/2025</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Giới tính</span>
                <span>Nam</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Email</span>
                <span>kz@gmail.com</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Số điện thoại</span>
                <span>0123456789</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Địa chỉ</span>
                <span>250A Lê Hồng Phong, Nha Trang, Khánh Hoà</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-4">
          {/* Thông tin các sản phẩm */}
          <div className="mx-2 bg-white px-6 py-4 rounded  flex-[60%] max-w-[60%]">
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Thông tin các sản phẩm
            </h4>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex gap-3 items-start">
                <div className="bg-gray-200 p-2 rounded-md flex items-center justify-center">
                  <img
                    src="https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg"
                    alt=""
                    className="size-18 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className=" font-medium text-[15px]">
                    Macbook Air 8GB 512GB
                  </span>
                  <div className="flex items-center gap-2 text-sm opacity-70">
                    <span className="">Loại: Laptop</span>
                    <span>Số lượng: 2</span>
                  </div>
                  <span className="text-[15px] font-semibold">
                    Giá: 123000đ
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-gray-200 p-2 rounded-md flex items-center justify-center">
                  <img
                    src="https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg"
                    alt=""
                    className="size-18 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className=" font-medium text-[15px]">
                    Macbook Air 8GB 512GB
                  </span>
                  <div className="flex items-center gap-2 text-sm opacity-70">
                    <span className="">Loại: Laptop</span>
                    <span>Số lượng: 2</span>
                  </div>
                  <span className="text-[15px] font-semibold">
                    Giá: 123000đ
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Thông tin vận chuyển */}
          <div className="mx-2 bg-white px-6 py-4 rounded flex-[40%] max-w-[40%]">
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Thông tin vận chuyển
            </h4>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Đơn vị vận chuyển
                </span>
                <span>Viettel Post</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Ngày giao dự kiến
                </span>
                <span>05/05/2025</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Trạng thái</span>
                <span>Đang giao</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Ngày giao hoàn thành
                </span>
                <span>10/05/2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
