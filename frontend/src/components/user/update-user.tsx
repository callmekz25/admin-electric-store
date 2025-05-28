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
import type IUserView from "@/interfaces/user/user-view.interface";
import { useForm, Controller } from "react-hook-form";
import type IUser from "@/interfaces/user/user.interface";
import { useEffect } from "react";
const UpdateUser = ({
  selectedUser,
  open,
  onOpenChange,
}: {
  open: boolean;
  selectedUser: IUserView;
  onOpenChange: (value: boolean) => void;
}) => {
  const { control, reset } = useForm<IUser>({
    defaultValues: {
      MaTK: "",
      HoTenTK: "",
      TenDangNhap: "",
      MatKhau: "",
      GioiTinh: "",
      NgaySinh: "",
      Email: "",
      DiaChi: "",
      SDT: "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset({
        MaTK: selectedUser.MaTK ?? "",
        HoTenTK: selectedUser.HoTenTK ?? "",
        TenDangNhap: selectedUser.TenDangNhap ?? "",
        MatKhau: selectedUser.MatKhau ?? "",
        GioiTinh: selectedUser.GioiTinh ?? "",
        NgaySinh: selectedUser.NgaySinh ?? "",
        Email: selectedUser.Email ?? "",
        DiaChi: selectedUser.DiaChi ?? "",
        SDT: selectedUser.SDT ?? "",
      });
    }
  }, [selectedUser, reset]);

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
                Cập nhật thông tin sản tài khoản
              </h2>
              <button
                className=" cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>
            {selectedUser ? (
              <div className=" grid grid-cols-2 gap-6 mt-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="MaTK" className=" font-normal opacity-70">
                      Mã tài khoản
                    </Label>
                    <Controller
                      name="MaTK"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          readOnly
                          id="MaTK"
                          className="rounded"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="HoTenTK"
                      className=" font-normal opacity-70"
                    >
                      Họ tên tài khoản
                    </Label>

                    <Controller
                      name="HoTenTK"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="HoTenTK" className="rounded" />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="GioiTinh"
                      className=" font-normal opacity-70"
                    >
                      Giới tính
                    </Label>

                    <Controller
                      name="GioiTinh"
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
                              <SelectItem value="Nam">Nam</SelectItem>
                              <SelectItem value="Nữ">Nữ</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="Email" className=" font-normal opacity-70">
                      Email
                    </Label>

                    <Controller
                      name="Email"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="Email" className="rounded" />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="SDT" className=" font-normal opacity-70">
                      Số điện thoại
                    </Label>

                    <Controller
                      name="SDT"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="SDT" className="rounded" />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="DiaChi" className=" font-normal opacity-70">
                      Địa chỉ
                    </Label>
                    <Controller
                      name="DiaChi"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="DiaChi" className="rounded" />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="TenDangNhap"
                      className=" font-normal opacity-70"
                    >
                      Tên đăng nhập
                    </Label>
                    <Controller
                      name="TenDangNhap"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="TenDangNhap"
                          className="rounded"
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="MatKhau"
                      className=" font-normal opacity-70"
                    >
                      Mật khẩu
                    </Label>
                    <Controller
                      name="MatKhau"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="MatKhau"
                          className="rounded"
                          type="password"
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

export default UpdateUser;
