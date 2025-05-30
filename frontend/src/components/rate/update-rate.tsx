import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CalendarIcon, XIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { useQueryClient } from "@tanstack/react-query";
import type IUser from "@/interfaces/user/user.interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import type IRate from "@/interfaces/rate/rate.interface";
import { useUpdateRate } from "@/hooks/rate";
import { useGetUsers } from "@/hooks/user";
import { useGetProducts } from "@/hooks/product";
import type IProduct from "@/interfaces/product/product.interface";
import { Textarea } from "../ui/textarea";
import Loading from "../ui/loading";
import { useEffect } from "react";
const UpdateRate = ({
  open,
  selectedRate,
  onOpenChange,
}: {
  open: boolean;
  selectedRate: IRate;
  onOpenChange: (value: boolean) => void;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRate>({
    defaultValues: {
      MaDG: 0,
      MaSP: "",
      MaTK: "",
      SoSao: 0,
      BinhLuan: "",
      NgayDanhGia: "",
    },
  });
  useEffect(() => {
    if (selectedRate) {
      reset({
        MaDG: selectedRate.MaDG ?? 0,
        MaSP: selectedRate.MaSP ?? "",
        MaTK: selectedRate.MaTK ?? "",
        SoSao: selectedRate.SoSao ?? 0,
        BinhLuan: selectedRate.BinhLuan ?? "",
        NgayDanhGia: selectedRate.NgayDanhGia ?? "",
      });
    }
  }, [selectedRate, reset]);
  const queryClient = useQueryClient();
  const { mutate: updateRate, isPending } = useUpdateRate();
  const handleAddRate = (data: IRate) => {
    const request: IRate = {
      ...data,
      NgayDanhGia: data.NgayDanhGia
        ? format(data.NgayDanhGia, "yyyy-MM-dd")
        : "",
    };
    updateRate(request, {
      onSuccess: (data) => {
        toast.success("Cập nhật mới thành công");
        reset(data);
        queryClient.invalidateQueries({ queryKey: ["rates"] });
      },
      onError: (error) => toast.error(error.message),
    });
  };
  const { data: users, isLoading: ilu } = useGetUsers();
  const { data: products, isLoading: ilp } = useGetProducts();
  if (ilp || ilu) {
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
              <h2 className="text-xl font-bold ">Cập nhật đánh giá</h2>
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
            {selectedRate ? (
              <form
                onSubmit={handleSubmit(handleAddRate)}
                className=" grid grid-cols-2 gap-6 mt-10"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaDG" className=" font-normal opacity-70">
                      Mã đánh giá
                    </Label>
                    <Controller
                      name="MaDG"
                      rules={{
                        required: "Mã đánh giá không được trống",
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="MaDG"
                          disabled
                          className="rounded"
                        />
                      )}
                    />
                    {errors.MaDG && (
                      <span className="text-[13px] text-red-500">
                        {errors.MaDG.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaTK" className=" font-normal opacity-70">
                      Mã tài khoản
                    </Label>
                    <Controller
                      name="MaTK"
                      rules={{
                        required: "Mã tài khoản không được trống",
                      }}
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          key={field.value}
                          disabled
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full rounded">
                            <SelectValue placeholder="Chọn mã" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              {users &&
                                users?.length > 0 &&
                                users.map((user: IUser) => {
                                  return (
                                    <SelectItem
                                      value={user.MaTK}
                                      key={user.MaTK}
                                    >
                                      {user.MaTK}
                                    </SelectItem>
                                  );
                                })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.MaTK && (
                      <span className="text-[13px] text-red-500">
                        {errors.MaTK.message}
                      </span>
                    )}
                  </div>
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
                        <Select
                          value={field.value}
                          key={field.value}
                          disabled
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full rounded">
                            <SelectValue placeholder="Chọn mã" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              {products &&
                                products?.length > 0 &&
                                products.map((product: IProduct) => {
                                  return (
                                    <SelectItem
                                      value={product.MaSP}
                                      key={product.MaSP}
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
                    {errors.MaSP && (
                      <span className="text-[13px] text-red-500">
                        {errors.MaSP.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="NgayDanhGia"
                      className=" font-normal opacity-70"
                    >
                      Ngày đánh giá
                    </Label>
                    <Controller
                      name="NgayDanhGia"
                      control={control}
                      rules={{
                        required: "Ngày đánh giá không được trống",
                      }}
                      render={({ field }) => {
                        const date =
                          field.value instanceof Date
                            ? field.value
                            : field.value
                            ? new Date(field.value)
                            : null;

                        return (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="rounded cursor-pointer"
                              >
                                {date ? (
                                  date.toLocaleDateString("vi-VN")
                                ) : (
                                  <span className="font-normal text-muted-foreground">
                                    Chọn ngày
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date!}
                                onSelect={(selectedDate) => {
                                  field.onChange(selectedDate ?? undefined);
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        );
                      }}
                    />
                    {errors.NgayDanhGia && (
                      <span className="text-[13px] text-red-500">
                        {errors.NgayDanhGia.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="SoSao" className=" font-normal opacity-70">
                      Số sao
                    </Label>

                    <Controller
                      name="SoSao"
                      rules={{
                        required: "Số sao không được trống",
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="SoSao"
                          type="number"
                          className="rounded"
                        />
                      )}
                    />
                    {errors.SoSao && (
                      <span className="text-[13px] text-red-500">
                        {errors.SoSao.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="BinhLuan"
                      className=" font-normal opacity-70"
                    >
                      Bình luận
                    </Label>

                    <Controller
                      name="BinhLuan"
                      control={control}
                      rules={{
                        required: "Bình luận không được trống",
                      }}
                      render={({ field }) => (
                        <Textarea className=" rounded" {...field} />
                      )}
                    />
                    {errors.BinhLuan && (
                      <span className="text-[13px] text-red-500">
                        {errors.BinhLuan.message}
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
              <span>Đang tải...</span>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default UpdateRate;
