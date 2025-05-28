import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import type ISupplier from "@/interfaces/supplier/supplier.interface";
const UpdateSupplier = ({
  selectedSupplier,
  open,
  onOpenChange,
}: {
  open: boolean;
  selectedSupplier: ISupplier;
  onOpenChange: (value: boolean) => void;
}) => {
  const { control, reset } = useForm<ISupplier>();

  useEffect(() => {
    if (selectedSupplier) {
      reset({
        MaNCC: selectedSupplier.MaNCC ?? "",
        TenNCC: selectedSupplier.TenNCC ?? "",
        DiaChiNCC: selectedSupplier.DiaChiNCC ?? "",
        SDT_NCC: selectedSupplier.SDT_NCC ?? "",
      });
    }
  }, [selectedSupplier, reset]);

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
                Cập nhật thông tin nhà cung cấp
              </h2>
              <button
                className=" cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>
            {selectedSupplier ? (
              <div className=" grid grid-cols-2 gap-6 mt-10">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="mncc" className=" font-normal opacity-70">
                    Mã nhà cung cấp
                  </Label>
                  <Controller
                    name="MaNCC"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        readOnly
                        id="mncc"
                        className="rounded"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ht" className=" font-normal opacity-70">
                    Tên nhà cung cấp
                  </Label>

                  <Controller
                    name="TenNCC"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="ht" className="rounded" />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="SDT_NCC" className=" font-normal opacity-70">
                    Số điện thoại
                  </Label>

                  <Controller
                    name="SDT_NCC"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="SDT_NCC" className="rounded" />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="DiaChiNCC"
                    className=" font-normal opacity-70"
                  >
                    Địa chỉ
                  </Label>

                  <Controller
                    name="DiaChiNCC"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="DiaChiNCC" className="rounded" />
                    )}
                  />
                </div>
                <div className="flex items-center justify-end gap-4 col-span-2">
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
            ) : (
              <p>Đang tải...</p>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default UpdateSupplier;
