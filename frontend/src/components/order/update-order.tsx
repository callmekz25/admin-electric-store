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
import { useEffect } from "react";
import type IOrderView from "@/interfaces/order/order-view.interface";
const UpdateOrder = ({
  selectedOrder,
  open,
  onOpenChange,
}: {
  open: boolean;
  selectedOrder: IOrderView;
  onOpenChange: (value: boolean) => void;
}) => {
  const { control, reset } = useForm<IOrderView>({
    defaultValues: {
      MaHD: "",
      NgayLap: "",
      NgayGiao: "",
      NoiGiao: "",
      HinhThucThanhToan: "",
      TtVanChuyen: {},
    },
  });
  useEffect(() => {
    if (selectedOrder) {
      reset({
        MaHD: selectedOrder.MaHD ?? "",
        NgayLap: selectedOrder.NgayLap ?? "",
        NgayGiao: selectedOrder.NgayGiao ?? "",
        NoiGiao: selectedOrder.NoiGiao ?? "",
        HinhThucThanhToan: selectedOrder.HinhThucThanhToan ?? "",
        TtVanChuyen: selectedOrder.TtVanChuyen ?? {},
      });
    }
  }, [selectedOrder, reset]);

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
                Cập nhật thông tin đơn hàng
              </h2>
              <button
                className=" cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>
            {selectedOrder ? (
              <div className=" grid grid-cols-2 gap-6 mt-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaHD" className=" font-normal opacity-70">
                      Mã đơn hàng
                    </Label>
                    <Controller
                      name="MaHD"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          readOnly
                          id="MaHD"
                          className="rounded"
                        />
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
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="NoiGiao"
                      className=" font-normal opacity-70"
                    >
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
                        <Select defaultValue="cod">
                          <SelectTrigger className="w-full rounded">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              <SelectItem value="cod">Đã xác nhận</SelectItem>
                              <SelectItem value="banking">Đang giao</SelectItem>
                              <SelectItem value="ssd">Đã giao</SelectItem>
                              <SelectItem value="hdd">Giao thất bại</SelectItem>
                              <SelectItem value="cancel">Đã huỷ</SelectItem>
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

export default UpdateOrder;
