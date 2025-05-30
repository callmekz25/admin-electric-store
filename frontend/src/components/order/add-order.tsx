import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { CalendarIcon, XIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type IOrderView from "@/interfaces/order/order-view.interface";
import { useGetUsers } from "@/hooks/user";
import Loading from "../ui/loading";
import type IUser from "@/interfaces/user/user.interface";
import { format } from "date-fns";
import { useAddOrder } from "@/hooks/order";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const AddOrder = ({
  open,
  onOpenChange,
}: {
  open: boolean;

  onOpenChange: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useGetUsers();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderView>({
    defaultValues: {
      MaHD: "",
      NgayLap: "",
      MaTK: "",
      NgayGiao: "",
      NoiGiao: "",
      HinhThucThanhToan: "",
      TtVanChuyen: {
        MaVC: 0,
        TenDonViVC: "",
        NgayGiaoDuKien: "",
        NgayGiaoThucTe: "",
        Status: "",
      },
    },
  });
  const { mutate: addOrder, isPending } = useAddOrder();
  const handleAddOrder = (data: IOrderView) => {
    const request: IOrderView = {
      ...data,
      MaVC: data.TtVanChuyen.MaVC,
      NgayGiao: format(data.NgayGiao!, "yyyy-MM-dd"),
      NgayLap: format(data.NgayLap!, "yyyy-MM-dd"),
      TtVanChuyen: {
        ...data.TtVanChuyen,
        NgayGiaoDuKien: format(data.TtVanChuyen.NgayGiaoDuKien!, "yyyy-MM-dd"),
        NgayGiaoThucTe: format(data.TtVanChuyen.NgayGiaoThucTe!, "yyyy-MM-dd"),
      },
    };
    addOrder(request, {
      onSuccess: () => {
        toast.success("Thêm mới thành công");
        reset();
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
      onError: (error) => toast.error(error.message),
    });
    console.log(request);
  };

  if (isLoading) {
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
              <h2 className="text-xl font-bold ">Thêm hoá đơn</h2>
              <button
                className=" cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(handleAddOrder)}
              className=" grid grid-cols-2 gap-6 mt-10"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="MaHD" className=" font-normal opacity-70">
                    Mã đơn hàng
                  </Label>
                  <Controller
                    name="MaHD"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="MaHD" className="rounded" />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="MaSP" className=" font-normal opacity-70">
                    Mã tài khoản
                  </Label>
                  <Controller
                    name="MaTK"
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
                            {users &&
                              users.length > 0 &&
                              users.map((user: IUser) => {
                                return (
                                  <SelectItem key={user.MaTK} value={user.MaTK}>
                                    {user.MaTK}
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
                  <Label htmlFor="nl" className=" font-normal opacity-70">
                    Ngày lập
                  </Label>
                  <Controller
                    name="NgayLap"
                    control={control}
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ng" className=" font-normal opacity-70">
                    Ngày giao
                  </Label>
                  <Controller
                    name="NgayGiao"
                    control={control}
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="NoiGiao" className=" font-normal opacity-70">
                    Nơi giao
                  </Label>
                  <Controller
                    name="NoiGiao"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="NoiGiao" className="rounded" />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="MaSP" className=" font-normal opacity-70">
                    Hình thức thanh toán
                  </Label>
                  <Controller
                    name="HinhThucThanhToan"
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
                            <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                            <SelectItem value="Chuyển khoản">
                              Chuyển khoản
                            </SelectItem>
                            <SelectItem value="Trả góp">Trả góp</SelectItem>
                            <SelectItem value="Tín dụng">Tín dụng</SelectItem>
                            <SelectItem value="Tiền mặt (Trả góp)">
                              Tiền mặt (Trả góp)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {/* <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="TtVanChuyen.MaVC"
                    className=" font-normal opacity-70"
                  >
                    Mã vận chuyển
                  </Label>
                  <Controller
                    name="TtVanChuyen.MaVC"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="TtVanChuyen.MaVC"
                        className="rounded"
                      />
                    )}
                  />
                </div> */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="dvvc" className=" font-normal opacity-70">
                    Đơn vị vận chuyển
                  </Label>
                  <Controller
                    name="TtVanChuyen.TenDonViVC"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="dvvc" className=" rounded" />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="status" className=" font-normal opacity-70">
                    Trạng thái
                  </Label>
                  <Controller
                    name="TtVanChuyen.Status"
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
                            <SelectItem value="Đã xác nhận">
                              Đã xác nhận
                            </SelectItem>
                            <SelectItem value="Đang giao">Đang giao</SelectItem>
                            <SelectItem value="Đã giao">Đã giao</SelectItem>
                            <SelectItem value="Giao thất bại">
                              Giao thất bại
                            </SelectItem>
                            <SelectItem value="Đã huỷ">Đã huỷ</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ngdk" className=" font-normal opacity-70">
                    Ngày giao dự kiến
                  </Label>
                  <Controller
                    name="TtVanChuyen.NgayGiaoDuKien"
                    control={control}
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ngtt" className=" font-normal opacity-70">
                    Ngày giao thực tế
                  </Label>
                  <Controller
                    name="TtVanChuyen.NgayGiaoThucTe"
                    control={control}
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
                          <PopoverContent className="w-auto p-0" align="start">
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

export default AddOrder;
