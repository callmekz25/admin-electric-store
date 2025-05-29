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
import { useAddUser } from "@/hooks/user";
const AddUser = ({
  open,
  onOpenChange,
}: {
  open: boolean;

  onOpenChange: (value: boolean) => void;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({
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
  const queryClient = useQueryClient();
  const { mutate: addUser, isPending } = useAddUser();
  const handleAddUser = (data: IUser) => {
    addUser(data, {
      onSuccess: () => {
        toast.success("Thêm mới thành công");
        reset();
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error) => toast.error(error.message),
    });
  };
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
              <h2 className="text-xl font-bold ">Thêm mới tài khoản</h2>
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
            <form
              onSubmit={handleSubmit(handleAddUser)}
              className=" grid grid-cols-2 gap-6 mt-10"
            >
              <div className="flex flex-col gap-6">
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
                      <Input {...field} id="MaTK" className="rounded" />
                    )}
                  />
                  {errors.MaTK && (
                    <span className="text-[13px] text-red-500">
                      {errors.MaTK.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nl" className=" font-normal opacity-70">
                    Ngày sinh
                  </Label>
                  <Controller
                    name="NgaySinh"
                    control={control}
                    rules={{
                      required: "Ngày sinh không được trống",
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
                  {errors.NgaySinh && (
                    <span className="text-[13px] text-red-500">
                      {errors.NgaySinh.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="HoTenTK" className=" font-normal opacity-70">
                    Họ tên tài khoản
                  </Label>

                  <Controller
                    name="HoTenTK"
                    rules={{
                      required: "Tên không được trống",
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="HoTenTK" className="rounded" />
                    )}
                  />
                  {errors.HoTenTK && (
                    <span className="text-[13px] text-red-500">
                      {errors.HoTenTK.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="GioiTinh" className=" font-normal opacity-70">
                    Giới tính
                  </Label>

                  <Controller
                    name="GioiTinh"
                    control={control}
                    rules={{
                      required: "Giới tính không được trống",
                    }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        key={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full rounded">
                          <SelectValue placeholder="Chọn giới tính" />
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
                  {errors.GioiTinh && (
                    <span className="text-[13px] text-red-500">
                      {errors.GioiTinh.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Email" className=" font-normal opacity-70">
                    Email
                  </Label>

                  <Controller
                    name="Email"
                    control={control}
                    rules={{
                      required: "Email không được trống",
                    }}
                    render={({ field }) => (
                      <Input {...field} id="Email" className="rounded" />
                    )}
                  />
                  {errors.Email && (
                    <span className="text-[13px] text-red-500">
                      {errors.Email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="SDT" className=" font-normal opacity-70">
                    Số điện thoại
                  </Label>
                  <Controller
                    name="SDT"
                    rules={{
                      required: "SDT không được trống",
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="SDT" className="rounded" />
                    )}
                  />
                  {errors.SDT && (
                    <span className="text-[13px] text-red-500">
                      {errors.SDT.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="DiaChi" className=" font-normal opacity-70">
                    Địa chỉ
                  </Label>
                  <Controller
                    rules={{
                      required: "Địa chỉ không được trống",
                    }}
                    name="DiaChi"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="DiaChi" className="rounded" />
                    )}
                  />
                  {errors.DiaChi && (
                    <span className="text-[13px] text-red-500">
                      {errors.DiaChi.message}
                    </span>
                  )}
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
                    rules={{
                      required: "Tên đăng nhập không được trống",
                    }}
                    render={({ field }) => (
                      <Input {...field} id="TenDangNhap" className="rounded" />
                    )}
                  />
                  {errors.TenDangNhap && (
                    <span className="text-[13px] text-red-500">
                      {errors.TenDangNhap.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="MatKhau" className=" font-normal opacity-70">
                    Mật khẩu
                  </Label>
                  <Controller
                    name="MatKhau"
                    control={control}
                    rules={{
                      required: "Mật khẩu không được trống",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="MatKhau"
                        className="rounded"
                        type="password"
                      />
                    )}
                  />
                  {errors.MatKhau && (
                    <span className="text-[13px] text-red-500">
                      {errors.MatKhau.message}
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

export default AddUser;
