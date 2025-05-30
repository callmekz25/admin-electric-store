import columns from "@/components/rate/columns-rate";
import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
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
import { CalendarIcon, PlusIcon, SlidersHorizontalIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useGetRates } from "@/hooks/rate";
import type IRate from "@/interfaces/rate/rate.interface";
import type IRateFilterRequest from "@/interfaces/rate/rate-filter-request";
import { useGetUsers } from "@/hooks/user";
import { useGetProducts } from "@/hooks/product";
import Loading from "@/components/ui/loading";
import type IUser from "@/interfaces/user/user.interface";
import type IProduct from "@/interfaces/product/product.interface";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import AddRate from "@/components/rate/add-rate";
const Rate = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedRate, setSelectedRater] = useState<IRate | null>(null);
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<IRateFilterRequest>();
  const { control, reset, handleSubmit } = useForm<IRateFilterRequest>();
  const [openDelete, setOpenDelete] = useState(false);
  const { data, isLoading, error } = useGetRates(filterQuery!);
  const { data: users, isLoading: isLoadingUser } = useGetUsers();
  const { data: products, isLoading: isLoadingProduct } = useGetProducts();
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
  const handleAdvancedFilter = (filter: IRateFilterRequest) => {
    const request: IRateFilterRequest = {
      ...filter,
      ndg: filter.ndg ? format(filter.ndg, "yyyy-MM-dd") : "",
    };
    setFilterQuery(request);
    setAdvancedFilter(false);
    reset();
  };
  if (isLoadingProduct || isLoadingUser) {
    return <Loading />;
  }
  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các tài khoản</h2>
      <div className="mt-10">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setAdvancedFilter(true)}
            variant={"outline"}
            className="flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontalIcon />
            Lọc nâng cao
          </Button>
          <Button
            onClick={() => setOpenAdd(true)}
            className="flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-500 "
          >
            <PlusIcon />
            Thêm mới
          </Button>
        </div>
        <DataTable
          columns={columns({
            onUpdate: (rate) => {
              setSelectedRater(rate);
              setOpenUpdate(true);
            },
            onDelete: (rate) => {
              setSelectedRater(rate);
              setOpenDelete(true);
            },
          })}
          isLoading={isLoading}
          data={data ?? []}
        />
      </div>
      <AddRate open={openAdd} onOpenChange={setOpenAdd} />
      {/* <DeleteUser
        open={openDelete}
        onOpenChange={setOpenDelete}
        selectedUser={selectedUser!}
      />
      
      <AddUser open={openAdd} onOpenChange={setOpenAdd} />
      <UpdateUser
        onOpenChange={setOpenUpdate}
        open={openUpdate}
        selectedUser={selectedUser!}
      /> */}
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
              <Label htmlFor="dg" className=" font-normal opacity-70">
                Mã đánh giá
              </Label>
              <Controller
                name="dg"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="dg" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="tk" className=" font-normal opacity-70">
                Mã tài khoản
              </Label>
              <Controller
                name="tk"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full rounded">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        {users &&
                          users?.length > 0 &&
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
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="sp" className=" font-normal opacity-70">
                Mã sản phẩm
              </Label>
              <Controller
                name="sp"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full rounded">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        {products &&
                          products?.length > 0 &&
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
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="ndg" className=" font-normal opacity-70">
                Ngày đánh giá
              </Label>
              <Controller
                name="ndg"
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
              <Label htmlFor="s" className=" font-normal opacity-70">
                Số sao
              </Label>
              <Controller
                name="s"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="s" type="number" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="bl" className=" font-normal opacity-70">
                Bình luận
              </Label>
              <Controller
                name="bl"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} id="bl" className=" rounded" />
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

export default Rate;
