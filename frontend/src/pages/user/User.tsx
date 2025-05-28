import columns from "@/components/user/columns-user";
import { DataTable } from "@/components/table/data-table";
import { useGetUsers } from "@/hooks/user";
import { useEffect, useState } from "react";
import type IUserView from "@/interfaces/user/user-view.interface";
import UpdateUser from "@/components/user/update-user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarIcon, SlidersHorizontalIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type IUserFilterRequest from "@/interfaces/user/user-filter-request";
const User = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserView | null>(null);
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<IUserFilterRequest>();
  const { control, reset, handleSubmit } = useForm<IUserFilterRequest>();

  const { data, isLoading, error } = useGetUsers(filterQuery!);
  useEffect(() => {
    if (openUpdate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openUpdate]);
  const handleAdvancedFilter = (filter: IUserFilterRequest) => {
    setFilterQuery(filter);
    setAdvancedFilter(false);
    reset();
  };
  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các tài khoản</h2>
      <div className="mt-10">
        <Button
          onClick={() => setAdvancedFilter(true)}
          variant={"outline"}
          className="flex items-center gap-2 cursor-pointer"
        >
          <SlidersHorizontalIcon />
          Lọc nâng cao
        </Button>
        <DataTable
          columns={columns((order) => {
            setSelectedUser(order);
            setOpenUpdate(true);
          })}
          isLoading={isLoading}
          data={data ?? []}
        />
      </div>
      <UpdateUser
        onOpenChange={setOpenUpdate}
        open={openUpdate}
        selectedUser={selectedUser!}
      />
      <Dialog open={advancedFilter} onOpenChange={setAdvancedFilter}>
        <DialogContent className="min-w-[700px] pb-8 pt-6 px-6">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Lọc nâng cao
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleAdvancedFilter)}
            className="flex items-center  gap-y-8 flex-wrap  mt-4"
          >
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="ht" className=" font-normal opacity-70">
                Họ tên
              </Label>
              <Controller
                name="ht"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="ht" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="gt" className=" font-normal opacity-70">
                Giới tính
              </Label>
              <Controller
                name="gt"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="e" className=" font-normal opacity-70">
                Email
              </Label>
              <Controller
                name="e"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="e" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="ns" className=" font-normal opacity-70">
                Ngày sinh
              </Label>
              <Controller
                name="ns"
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
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="dc" className=" font-normal opacity-70">
                Địa chỉ
              </Label>
              <Controller
                name="dc"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="dc" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="sdt" className=" font-normal opacity-70">
                Số điện thoại
              </Label>
              <Controller
                name="sdt"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="sdt" className="rounded" />
                )}
              />
            </div>

            <div className="flex items-center mt-4 flex-1 justify-end gap-4">
              <Button
                type="button"
                className="cursor-pointer "
                variant={"outline"}
              >
                Huỷ
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-500 cursor-pointer"
              >
                Tìm kiếm
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default User;
