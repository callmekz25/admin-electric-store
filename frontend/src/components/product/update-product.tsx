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
const UpdateProduct = ({
  selectedProduct,
  open,
  onOpenChange,
}: {
  open: boolean;
  selectedProduct: IProductView;
  onOpenChange: (value: boolean) => void;
}) => {
  const colors = [
    {
      label: "Đỏ",
      color: "red",
    },
    {
      label: "Xanh da trời",
      color: "blue",
    },
    {
      label: "Đen",
      color: "black",
    },
    {
      label: "Xám",
      color: "gray",
    },
    {
      label: "Vàng",
      color: "yellow",
    },
  ];

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
                    <Input
                      id="MaSP"
                      className="rounded"
                      value={selectedProduct.MaSP ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Tên sản phẩm
                    </Label>
                    <Input id="MaSP" className="rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Loại sản phẩm
                    </Label>
                    <Select defaultValue="ram">
                      <SelectTrigger className="w-full rounded">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="ram">RAM</SelectItem>
                          <SelectItem value="cpu">CPU</SelectItem>
                          <SelectItem value="ssd">SSD</SelectItem>
                          <SelectItem value="hdd">HDD</SelectItem>
                          <SelectItem value="monitor">MONITOR</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Cấu hình chi tiết
                    </Label>
                    <Textarea
                      className=" rounded "
                      placeholder="Nhập cấu hình sản phẩm."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Nhà cung cấp
                    </Label>
                    <Select defaultValue="ram">
                      <SelectTrigger className="w-full rounded">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="ram">RAM</SelectItem>
                          <SelectItem value="cpu">CPU</SelectItem>
                          <SelectItem value="ssd">SSD</SelectItem>
                          <SelectItem value="hdd">HDD</SelectItem>
                          <SelectItem value="monitor">MONITOR</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Màu sắc
                    </Label>
                    <Select defaultValue="ram">
                      <SelectTrigger className="w-full rounded">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          {colors.map((color) => {
                            return (
                              <SelectItem
                                key={color.color}
                                value={color.color}
                                className="flex items-center gap-3"
                              >
                                {color.label}
                                <button
                                  className="size-3 rounded-full"
                                  style={{ backgroundColor: `${color.color}` }}
                                ></button>
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Series
                    </Label>
                    <Input className="rounded" id="MaSP" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Số năm bảo hành
                    </Label>
                    <Input type="number" className="rounded" id="MaSP" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Số lượng tồn kho
                    </Label>
                    <Input type="number" className="rounded" id="MaSP" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Mức giảm giá
                    </Label>
                    <Input id="MaSP" className="rounded" type="number" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaSP" className=" font-normal opacity-70">
                      Giá tiền
                    </Label>
                    <Input id="MaSP" className="rounded" type="number" />
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
