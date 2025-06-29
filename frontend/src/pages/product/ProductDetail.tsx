import Loading from "@/components/ui/loading";
import { useGetProductById } from "@/hooks/product";
import type IProductView from "@/interfaces/product/product-view.interface";
import type IRate from "@/interfaces/rate/rate.interface";
import DisplayStarRating from "@/utils/displayStar";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductById(productId!);
  const product = data as IProductView;
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/products");
    }
  };
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
            Thông tin chi tiết của sản phẩm
          </h2>
        </div>
        <div className=" flex mt-10 ">
          <div className=" flex-[60%] mx-2 bg-white px-6 py-4 rounded">
            {/* Thông tin của sản phẩm */}
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Thông tin của sản phẩm
            </h4>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex  gap-2 items-center text-sm justify-between ">
                <span className=" font-normal opacity-70 ">Mã sản phẩm</span>
                <span className="font-semibold text-[16px]">
                  {product.MaSP}
                </span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Hình ảnh</span>
                <img
                  src={
                    product.HinhAnh !== ""
                      ? product.HinhAnh
                      : "https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
                  }
                  alt={product.TenSP}
                  className="size-20 object-contain"
                />
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Tên sản phẩm</span>
                <span>{product.TenSP ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Loại sản phẩm</span>
                <span>
                  {product.ChiTietSanPham.LoaiSanPham.TenLSP ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Mô tả loại sản phẩm
                </span>
                <span>
                  {product.ChiTietSanPham.LoaiSanPham.MotaLSP ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Series</span>
                <span>{product.ChiTietSanPham.Series_SP ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Số năm bảo hành
                </span>
                <span>{product.ChiTietSanPham.BaoHanh ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Màu sắc</span>
                <span>{product.ChiTietSanPham.MauSP ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Cấu hình chi tiết
                </span>
                <span>{product.ChiTietSanPham.CauHinhChiTiet ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Số lượng tồn kho
                </span>
                <span>{product.SoLuongTon ?? "N/A"}</span>
              </div>
              <div className="flex items-center  text-sm justify-between">
                <span className=" font-normal opacity-70 ">Mức giảm giá</span>
                <span className="">{product.MucGiamGia ?? "N/A"}</span>
              </div>
              <div className="flex items-center  text-sm justify-between">
                <span className=" font-normal opacity-70 ">Giá</span>
                <span className=" font-semibold text-[16px]">
                  {product.Gia ? product.Gia.toLocaleString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
          {/* Thông tin nhà cung cấp */}
          <div className="mx-2 bg-whitep px-6 py-4 h-fit sticky top-5 bg-white rounded flex-[40%] max-w-[40%]">
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Thông tin của nhà cung cấp
            </h4>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70  ">
                  Mã nhà cung cấp
                </span>
                <span className="text-[16px] font-semibold">
                  {product.ChiTietSanPham.NhaCungCap.MaNCC ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">
                  Tên nhà cung cấp
                </span>
                <span>{product.ChiTietSanPham.NhaCungCap.TenNCC ?? "N/A"}</span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Địa chỉ</span>
                <span>
                  {product.ChiTietSanPham.NhaCungCap.DiaChiNCC ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center text-sm  justify-between">
                <span className=" font-normal opacity-70 ">Số điện thoại</span>
                <span>
                  {product.ChiTietSanPham.NhaCungCap.SDT_NCC ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-4">
          {/* Thông tin các sản phẩm */}
          <div className="mx-2 bg-white px-6 py-4 rounded  flex-[60%] max-w-[60%]">
            <h4 className=" font-semibold text-lg pb-4 border-b border-gray-200">
              Danh sách các đánh giá
            </h4>
            <div className="flex flex-col gap-6 mt-4">
              {product.DanhSachDanhGia?.length > 0 ? (
                product.DanhSachDanhGia.map((rate: IRate) => {
                  return (
                    <div key={rate.MaDG} className="flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <DisplayStarRating rating={rate.SoSao} />
                        <span className="text-sm opacity-70">
                          {rate.NgayDanhGia}
                        </span>
                      </div>
                      <p className="text-[15px] mt-2">{rate.BinhLuan}</p>
                    </div>
                  );
                })
              ) : (
                <span>Chưa có đánh giá</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
