import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import type IProductView from "@/interfaces/product/product-view.interface";
import { useGetTypesProduct } from "@/hooks/type-product";
import Loading from "../ui/loading";
import type ITypeProduct from "@/interfaces/product/type-product.interface";
import { useGetSuppliers } from "@/hooks/supplier";
import type ISupplier from "@/interfaces/supplier/supplier.interface";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
const UpdateProduct = ({
  selectedProduct,
  open,
  onOpenChange,
}: {
  open: boolean;
  selectedProduct: IProductView;
  onOpenChange: (value: boolean) => void;
}) => {
  const { control, reset } = useForm<IProductView>();

  const {
    data: types,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useGetTypesProduct();

  useEffect(() => {
    if (selectedProduct) {
      reset({
        MaSP: selectedProduct.MaSP ?? "",
        TenSP: selectedProduct.TenSP ?? "",
        HinhAnh: selectedProduct.HinhAnh ?? "",
        SoLuongTon: selectedProduct.SoLuongTon ?? "",
        MucGiamGia: selectedProduct.MucGiamGia ?? "",
        Gia: selectedProduct.Gia ?? "",
        ChiTietSanPham: selectedProduct.ChiTietSanPham ?? "",
      });
    }
  }, [selectedProduct, reset]);
  const {
    data: suppliers,
    isLoading: isLoadingSuppliers,
    error: errorSuppliers,
  } = useGetSuppliers();
  if (isLoadingSuppliers || isLoadingTypes) {
    return <Loading />;
  }

  return (
    <div className="">
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            open
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }`}
        />

        {/* Drawer content */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-[700px] bg-white shadow-lg transition-transform duration-300 ease-in-out
              ${open ? "translate-x-0" : "translate-x-full"} 
            `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold ">
                Cập nhật thông tin sản phẩm
              </h2>
              <button
                className=" cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {selectedProduct ? (
              <div className=" grid grid-cols-2 gap-6 mt-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Mã sản phẩm
                    </Label>
                    <Controller
                      name="MaSP"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          readOnly
                          id="MaSP"
                          className="rounded"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="TenSP" className=" font-normal opacity-70">
                      Tên sản phẩm
                    </Label>
                    <Controller
                      name="TenSP"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="TenSP" className="rounded" />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lsp" className=" font-normal opacity-70">
                      Loại sản phẩm
                    </Label>
                    <Controller
                      name="ChiTietSanPham.MaLoaiSP"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full rounded">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              {types &&
                                types.length > 0 &&
                                types.map((type: ITypeProduct) => {
                                  return (
                                    <SelectItem value={type.MaLoaiSP}>
                                      {type.TenLSP}
                                    </SelectItem>
                                  );
                                })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="chct" className=" font-normal opacity-70">
                      Cấu hình chi tiết
                    </Label>
                    <Controller
                      name="ChiTietSanPham.CauHinhChiTiet"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          className=" rounded "
                          placeholder="Nhập cấu hình sản phẩm."
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="ncc" className=" font-normal opacity-70">
                      Nhà cung cấp
                    </Label>
                    <Controller
                      name="ChiTietSanPham.NhaCungCap.MaNCC"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full rounded">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              {suppliers &&
                                suppliers.length > 0 &&
                                suppliers.map((sup: ISupplier) => {
                                  return (
                                    <SelectItem value={sup.MaNCC}>
                                      {sup.TenNCC}
                                    </SelectItem>
                                  );
                                })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MauSP" className=" font-normal opacity-70">
                      Màu sắc
                    </Label>
                    <Controller
                      name="ChiTietSanPham.MauSP"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="MauSP" className="rounded" />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="Series_SP"
                      className=" font-normal opacity-70"
                    >
                      Series
                    </Label>
                    <Controller
                      name="ChiTietSanPham.Series_SP"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="Series_SP" className="rounded" />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="BaoHanh"
                      className=" font-normal opacity-70"
                    >
                      Số năm bảo hành
                    </Label>
                    <Controller
                      name="ChiTietSanPham.BaoHanh"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="BaoHanh" className="rounded" />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="SoLuongTon"
                      className=" font-normal opacity-70"
                    >
                      Số lượng tồn kho
                    </Label>
                    <Controller
                      name="SoLuongTon"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="SoLuongTon"
                          className="rounded"
                          type="number"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="MucGiamGia"
                      className=" font-normal opacity-70"
                    >
                      Mức giảm giá
                    </Label>
                    <Controller
                      name="MucGiamGia"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="MucGiamGia"
                          type="number"
                          className="rounded"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="Gia" className=" font-normal opacity-70">
                      Giá tiền
                    </Label>
                    <Controller
                      name="Gia"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="Gia"
                          className="rounded"
                          type="number"
                        />
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      onClick={() => onOpenChange(false)}
                      variant="outline"
                      className=" cursor-pointer "
                    >
                      Huỷ
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-500 cursor-pointer ">
                      Cập nhật
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <p>Đang tải...</p>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default UpdateProduct;
