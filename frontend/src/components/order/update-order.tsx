import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import type IOrder from "@/interfaces/order/order.interface";
import { useState } from "react";
const UpdateOrder = ({
  selectedOrder,
  open,
  onOpenChange,
}: {
  open: boolean;
  selectedOrder: IOrder;
  onOpenChange: (value: boolean) => void;
}) => {
  const [dateCreated, setDateCreated] = useState<Date | undefined>(undefined);
  const [dateShipping, setDateShipping] = useState<Date | undefined>(undefined);
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
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Mã đơn hàng
                    </Label>
                    <Input
                      id="MaSP"
                      className="rounded"
                      value={selectedOrder.MaHD ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Ngày lập
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className=" rounded cursor-pointer"
                        >
                          {dateCreated ? (
                            dateCreated.toLocaleDateString()
                          ) : (
                            <span className=" font-normal">Chọn ngày</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateCreated}
                          onSelect={setDateCreated}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Ngày giao
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className=" rounded cursor-pointer"
                        >
                          {dateShipping ? (
                            dateShipping.toLocaleDateString()
                          ) : (
                            <span className=" font-normal">Chọn ngày</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateShipping}
                          onSelect={setDateShipping}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Nơi giao
                    </Label>
                    <Input className=" rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Hình thức thanh toán
                    </Label>
                    <Select defaultValue="cod">
                      <SelectTrigger className="w-full rounded">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="cod">Tiền mặt</SelectItem>
                          <SelectItem value="banking">Chuyển khoản</SelectItem>
                          <SelectItem value="ssd">Trả góp</SelectItem>
                          <SelectItem value="hdd">Tín dụng</SelectItem>
                          <SelectItem value="monitor">
                            Tiền mặt (Trả góp)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Trạng thái
                    </Label>
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
