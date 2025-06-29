import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type IOrderDetail from "@/interfaces/order/order-detail.interface";
import { useGetOrders } from "@/hooks/order";
import type IOrder from "@/interfaces/order/order.interface";
import Loading from "../ui/loading";
import type IProduct from "@/interfaces/product/product.interface";
import { useGetProducts } from "@/hooks/product";
import { useAddOrderDetail, useUpdateOrderDetail } from "@/hooks/order-detail";
import { useEffect } from "react";
const UpdateOrderDetail = ({
  open,
  selectedOrder,
  onOpenChange,
}: {
  open: boolean;
  selectedOrder: IOrderDetail;
  onOpenChange: (value: boolean) => void;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IOrderDetail>({
    defaultValues: {
      MaHD: "",
      MaSP: "",
      SoLuong: 0,
      GiaBan: 0,
    },
  });
  useEffect(() => {
    if (selectedOrder) {
      reset({
        MaHD: selectedOrder.MaHD ?? "",
        MaSP: selectedOrder.MaSP ?? "",
        SoLuong: selectedOrder.SoLuong ?? 0,
      });
    }
  }, [reset, selectedOrder]);
  const queryClient = useQueryClient();
  const { mutate: updateOT, isPending } = useUpdateOrderDetail();
  const { data: orders, isLoading: isLoadingOrder } = useGetOrders();
  const { data: products, isLoading: isLoadingProduct } = useGetProducts();
  const handleUpdateOT = (data: IOrderDetail) => {
    const product: IProduct = products.find(
      (p: IProduct) => p.MaSP === data.MaSP
    );
    const request = { ...data, GiaBan: product.Gia * data.SoLuong! };

    updateOT(request, {
      onSuccess: (data) => {
        toast.success("Cập nhật thành công");
        reset(data);
        queryClient.invalidateQueries({ queryKey: ["orders-detail"] });
      },
      onError: (error) => toast.error(error.message),
    });
  };
  if (isLoadingOrder || isLoadingProduct) {
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
              <h2 className="text-xl font-bold ">Cập nhật chi tiết hoá đơn</h2>
              <button
                className=" cursor-pointer"
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  reset();
                }}
                disabled={isPending}
              >
                <XIcon className="size-5" />
              </button>
            </div>
            {selectedOrder ? (
              <form
                onSubmit={handleSubmit(handleUpdateOT)}
                className=" grid grid-cols-2 gap-6 mt-10"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lsp" className=" font-normal opacity-70">
                      Mã hoá đơn
                    </Label>
                    <Controller
                      rules={{
                        required: "Mã hoá đơn không được trống",
                      }}
                      name="MaHD"
                      control={control}
                      render={({ field }) => (
                        <Select
                          key={field.value}
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled
                        >
                          <SelectTrigger className="w-full rounded">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              {orders &&
                                orders.length > 0 &&
                                orders.map((order: IOrder) => {
                                  return (
                                    <SelectItem
                                      key={order.MaHD}
                                      value={order.MaHD}
                                    >
                                      {order.MaHD}
                                    </SelectItem>
                                  );
                                })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.MaHD && (
                      <span className="text-[13px] text-red-500">
                        {errors.MaHD.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lsp" className=" font-normal opacity-70">
                      Mã sản phẩm
                    </Label>
                    <Controller
                      rules={{
                        required: "Mã sản phấm không được trống",
                      }}
                      name="MaSP"
                      control={control}
                      render={({ field }) => (
                        <Select
                          key={field.value}
                          value={field.value}
                          disabled
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full rounded">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              {products &&
                                products.length > 0 &&
                                products.map((product: IProduct) => {
                                  return (
                                    <SelectItem
                                      key={product.MaSP}
                                      value={product.MaSP}
                                    >
                                      {product.MaSP}
                                    </SelectItem>
                                  );
                                })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.MaHD && (
                      <span className="text-[13px] text-red-500">
                        {errors.MaHD.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="sl" className=" font-normal opacity-70">
                      Số lượng
                    </Label>

                    <Controller
                      name="SoLuong"
                      rules={{
                        required: "Số lượng không được trống",
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="sl"
                          className="rounded"
                          type="number"
                        />
                      )}
                    />
                    {errors.SoLuong && (
                      <span className="text-[13px] text-red-500">
                        {errors.SoLuong.message}
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
                      Cập nhật
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default UpdateOrderDetail;
