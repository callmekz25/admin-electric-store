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
import { useGetTypesProduct } from "@/hooks/type-product";
import Loading from "../ui/loading";
import type ITypeProduct from "@/interfaces/product/type-product.interface";
import { useGetSuppliers } from "@/hooks/supplier";
import type ISupplier from "@/interfaces/supplier/supplier.interface";
import { useForm, Controller } from "react-hook-form";
import type IProductRequest from "@/interfaces/product/product-request.interface";
import {
  useAddProduct,
  useGetProducts,
  useUpdateProduct,
} from "@/hooks/product";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
const AddProduct = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IProductRequest>({
    defaultValues: {
      MaSP: "",
      TenSP: "",
      MaCTSP: "",
      HinhAnh: "",
      SoLuongTon: 0,
      Gia: 0,
      MucGiamGia: 0,
      ChiTietSanPham: {
        BaoHanh: 0,
        CauHinhChiTiet: "",
        LoaiSanPham: {
          MaLoaiSP: "",
          MotaLSP: "",
          TenLSP: "",
        },
        MaCTSP: "",
        MaLoaiSP: "",
        MaNCC: "",
        MauSP: "",
        Series_SP: "",
      },
    },
  });
  const queryClient = useQueryClient();
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const {
    data: types,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useGetTypesProduct();

  const {
    data: suppliers,
    isLoading: isLoadingSuppliers,
    error: errorSuppliers,
  } = useGetSuppliers();
  const { mutate: addProduct, isPending } = useAddProduct();

  const handleAdd = (data: IProductRequest) => {
    const { LoaiSanPham, NhaCungCap, ...cleanChiTietSanPham } =
      data.ChiTietSanPham;
    const cleanedData: IProductRequest = {
      ...data,
      ChiTietSanPham: {
        ...cleanChiTietSanPham,
        MaCTSP: data.MaCTSP,
      },
    };
    addProduct(cleanedData, {
      onSuccess: () => {
        toast.success("Thêm mới thành công");
        reset();
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => toast.error(error.message),
    });
  };
  const lastProductDetail = useMemo(() => {
    if (!products || products.length === 0) return undefined;
    return products[products.length - 1].ChiTietSanPham.MaCTSP;
  }, [products]);
  if (isLoadingSuppliers || isLoadingTypes || isLoadingProducts) {
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
          className={`fixed top-0 right-0 z-50 h-full w-[700px] overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-in-out
              ${open ? "translate-x-0" : "translate-x-full"} 
            `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold ">Thêm mới sản phẩm</h2>
              <button
                type="button"
                className=" cursor-pointer"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleAdd)}
              className=" grid grid-cols-2 gap-6 mt-10"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="MaSP" className=" font-normal opacity-70">
                    Mã sản phẩm
                  </Label>
                  <Controller
                    name="MaSP"
                    rules={{
                      required: "Mã sản phẩm không được trống",
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="MaSP" className="rounded" />
                    )}
                  />
                  {errors.MaSP && (
                    <span className="text-[13px] text-red-500">
                      {errors.MaSP.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="TenSP" className=" font-normal opacity-70">
                    Tên sản phẩm
                  </Label>
                  <Controller
                    name="TenSP"
                    control={control}
                    rules={{
                      required: "Tên sản phẩm không được trống",
                    }}
                    render={({ field }) => (
                      <Input {...field} id="TenSP" className="rounded" />
                    )}
                  />
                  {errors.TenSP && (
                    <span className="text-[13px] text-red-500">
                      {errors.TenSP.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="HinhAnh" className=" font-normal opacity-70">
                    Hình ảnh
                  </Label>
                  <Controller
                    name="HinhAnh"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="HinhAnh" className="rounded" />
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
                    rules={{
                      required: "Số lượng tồn kho không được trống",
                    }}
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
                  {errors.SoLuongTon && (
                    <span className="text-[13px] text-red-500">
                      {errors.SoLuongTon.message}
                    </span>
                  )}
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
                    rules={{
                      required: "Mức giảm giá không được trống",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="MucGiamGia"
                        type="number"
                        className="rounded"
                      />
                    )}
                  />
                  {errors.MucGiamGia && (
                    <span className="text-[13px] text-red-500">
                      {errors.MucGiamGia.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Gia" className=" font-normal opacity-70">
                    Giá tiền
                  </Label>
                  <Controller
                    name="Gia"
                    control={control}
                    rules={{
                      required: "Giá tiền không được trống",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="Gia"
                        className="rounded"
                        type="number"
                      />
                    )}
                  />
                  {errors.Gia && (
                    <span className="text-[13px] text-red-500">
                      {errors.Gia.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="MauSP" className=" font-normal opacity-70">
                    Màu sắc
                  </Label>
                  <Controller
                    rules={{
                      required: "Màu sắc không được trống",
                    }}
                    name="ChiTietSanPham.MauSP"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="MauSP" className="rounded" />
                    )}
                  />
                  {errors.ChiTietSanPham?.MauSP && (
                    <span className="text-[13px] text-red-500">
                      {errors.ChiTietSanPham?.MauSP.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ctsp" className=" font-normal opacity-70">
                    Mã chi tiết sản phẩm
                  </Label>
                  <Controller
                    name="MaCTSP"
                    rules={{
                      required: "Mã chi tiết sản phẩm không được trống",
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="ctsp" className="rounded" />
                    )}
                  />
                  <span className="text-[13px]">
                    Mã chi tiết sản phẩm cuối: {""}
                    {lastProductDetail}
                  </span>
                  {errors.MaCTSP && (
                    <span className="text-[13px] text-red-500">
                      {errors.MaCTSP.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="Series_SP"
                    className=" font-normal opacity-70"
                  >
                    Series
                  </Label>
                  <Controller
                    name="ChiTietSanPham.Series_SP"
                    rules={{
                      required: "Series không được trống",
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="Series_SP" className="rounded" />
                    )}
                  />
                  {errors.ChiTietSanPham?.Series_SP && (
                    <span className="text-[13px] text-red-500">
                      {errors.ChiTietSanPham?.Series_SP.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="BaoHanh" className=" font-normal opacity-70">
                    Số năm bảo hành
                  </Label>
                  <Controller
                    rules={{
                      required: "Số năm bảo hành không được trống",
                    }}
                    name="ChiTietSanPham.BaoHanh"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="BaoHanh"
                        type="number"
                        className="rounded"
                      />
                    )}
                  />
                  {errors.ChiTietSanPham?.BaoHanh && (
                    <span className="text-[13px] text-red-500">
                      {errors.ChiTietSanPham?.BaoHanh.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lsp" className=" font-normal opacity-70">
                    Loại sản phẩm
                  </Label>
                  <Controller
                    rules={{
                      required: "Loại sản phẩm không được trống",
                    }}
                    name="ChiTietSanPham.MaLoaiSP"
                    control={control}
                    render={({ field }) => (
                      <Select
                        key={field.value}
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
                                  <SelectItem
                                    key={type.MaLoaiSP}
                                    value={type.MaLoaiSP}
                                  >
                                    {type.TenLSP}
                                  </SelectItem>
                                );
                              })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.ChiTietSanPham?.MaLoaiSP && (
                    <span className="text-[13px] text-red-500">
                      {errors.ChiTietSanPham?.MaLoaiSP.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="chct" className=" font-normal opacity-70">
                    Cấu hình chi tiết
                  </Label>
                  <Controller
                    rules={{
                      required: "Cấu hình chi tiết không được trống",
                    }}
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
                  {errors.ChiTietSanPham?.CauHinhChiTiet && (
                    <span className="text-[13px] text-red-500">
                      {errors.ChiTietSanPham?.CauHinhChiTiet.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ncc" className=" font-normal opacity-70">
                    Nhà cung cấp
                  </Label>
                  <Controller
                    name="ChiTietSanPham.MaNCC"
                    rules={{
                      required: "Nhà cung cấp không được trống",
                    }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        key={field.value}
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
                                  <SelectItem key={sup.MaNCC} value={sup.MaNCC}>
                                    {sup.TenNCC}
                                  </SelectItem>
                                );
                              })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.ChiTietSanPham?.MaNCC && (
                    <span className="text-[13px] text-red-500">
                      {errors.ChiTietSanPham?.MaNCC.message}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-4">
                  <Button
                    onClick={() => onOpenChange(false)}
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    className=" cursor-pointer "
                  >
                    Huỷ
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    className="bg-blue-500 hover:bg-blue-500 cursor-pointer "
                  >
                    Thêm
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default AddProduct;
