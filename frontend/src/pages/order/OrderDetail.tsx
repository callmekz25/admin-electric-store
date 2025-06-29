import Loading from "@/components/ui/loading";
import { useGetOrderById } from "@/hooks/order";
import type IOrderDetail from "@/interfaces/order/order-detail.interface";
import type IOrderView from "@/interfaces/order/order-view.interface";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
const OrderDetail = () => {
  const { orderId } = useParams();
  const { data, isLoading, error } = useGetOrderById(orderId!);
  const order = data as IOrderView;
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/orders");
    }
  };
  const total =
    order &&
    order.DanhSachSanPham &&
    order.DanhSachSanPham.reduce(
      (sum: number, item: IOrderDetail) =>
        sum + item.SoLuong! * item.SanPham.Gia,
      0
    );
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>Lỗi!</p>;
  }

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
                <span className="font-semibold text-[16px]">{order.MaHD}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Ngày lập</span>
                <span>{order.NgayLap}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Ngày giao</span>
                <span>{order.NgayGiao}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Nơi giao</span>
                <span>{order.NoiGiao}</span>
              </div>
              <div className="flex items-center  text-sm justify-between">
                <span className=" font-normal opacity-70 ">
                  Hình thức thanh toán
                </span>
                <span className="">{order.HinhThucThanhToan}</span>
              </div>
              <div className="flex items-center  text-sm justify-between">
                <span className=" font-normal opacity-70 ">
                  Tổng số tiền thanh toán
                </span>
                <span className=" font-semibold text-[16px]">
                  {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mx-2 bg-whitep px-6 py-4 bg-white rounded flex-[40%] max-w-[40%]">
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Thông tin của khách hàng
            </h4>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Họ tên</span>
                <span>{order.TaiKhoan.HoTenTK}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Ngày sinh</span>
                <span>{order.TaiKhoan.NgaySinh}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Giới tính</span>
                <span>{order.TaiKhoan.GioiTinh}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Email</span>
                <span>{order.TaiKhoan.Email}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Số điện thoại</span>
                <span>{order.TaiKhoan.SDT}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Địa chỉ</span>
                <span>{order.TaiKhoan.DiaChi}</span>
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
              {order?.DanhSachSanPham?.length > 0 ? (
                order.DanhSachSanPham.map((product: IOrderDetail) => {
                  return (
                    <div
                      key={product.SanPham.MaSP}
                      className="flex gap-3 items-start"
                    >
                      <div className="bg-gray-200 p-2 rounded-md flex items-center justify-center">
                        <img
                          src={
                            product.SanPham.HinhAnh !== ""
                              ? product.SanPham.HinhAnh
                              : "https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
                          }
                          alt={product.SanPham.TenSP}
                          className="size-18 object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className=" font-medium text-[15px]">
                          {product.SanPham.TenSP}
                        </span>
                        <div className="flex items-center gap-2 text-[13px] opacity-70">
                          <span className="">
                            Loại:{" "}
                            {product.SanPham.ChiTietSanPham.LoaiSanPham.TenLSP}
                          </span>
                          <span>
                            Màu: {product.SanPham.ChiTietSanPham.MauSP}
                          </span>
                        </div>
                        <span className="text-[13px] opacity-70">
                          Số lượng: {product.SoLuong}
                        </span>
                        <span className="text-[15px] font-semibold">
                          {product.SanPham.Gia.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>Chưa có sản phẩm nào</span>
              )}
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
                <span>{order?.TtVanChuyen?.TenDonViVC ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Ngày giao dự kiến
                </span>
                <span>{order?.TtVanChuyen?.NgayGiaoDuKien ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Trạng thái</span>
                <span>{order?.TtVanChuyen?.Status ?? "Đang giao"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Ngày giao hoàn thành
                </span>
                <span>{order?.TtVanChuyen?.NgayGiaoThucTe ?? "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
