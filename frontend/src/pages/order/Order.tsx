import columns from "@/components/order/columns-order";
import UpdateOrder from "@/components/order/update-order";
import { DataTable } from "@/components/table/data-table";
import { useGetOrders } from "@/hooks/order";
import type IOrderFilterRequest from "@/interfaces/order/order-filter-request.interface";
import type IOrderView from "@/interfaces/order/order-view.interface";
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
import AddOrder from "@/components/order/add-order";
import DeleteOrder from "@/components/order/delete-order";
const Order = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrderView | null>(null);
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<IOrderFilterRequest>();
  const { control, reset, handleSubmit } = useForm<IOrderFilterRequest>();

  const { data, isLoading, error } = useGetOrders(filterQuery!);

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

  const handleAdvancedFilter = (filter: IOrderFilterRequest) => {
    setFilterQuery(filter);
    setAdvancedFilter(false);
    reset();
  };
  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các hoá đơn</h2>
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
        {error && <span>{error.message}</span>}
        <DataTable
          isLoading={isLoading}
          columns={columns({
            onUpdate: (order) => {
              setSelectedOrder(order);
              setOpenUpdate(true);
            },
            onDelete: (order) => {
              setSelectedOrder(order);
              setOpenDelete(true);
            },
          })}
          data={data ?? []}
        />
      </div>
      <AddOrder open={openAdd} onOpenChange={setOpenAdd} />
      <DeleteOrder
        open={openDelete}
        onOpenChange={setOpenDelete}
        selectedOrder={selectedOrder!}
      />
      <UpdateOrder
        open={openUpdate}
        onOpenChange={(value) => {
          setOpenUpdate(value);
          if (!value) setSelectedOrder(null);
        }}
        selectedOrder={selectedOrder!}
      />
      <Dialog open={advancedFilter} onOpenChange={setAdvancedFilter}>
        <DialogContent className="min-w-[650px] pb-8 pt-6 px-6">
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
              <Label htmlFor="hd" className=" font-normal opacity-70">
                Mã hoá đơn
              </Label>
              <Controller
                name="hd"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="hd" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="httt" className=" font-normal opacity-70">
                Hình thức thanh toán
              </Label>
              <Controller
                name="httt"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
            <div className="flex flex-col gap-2 px-2 flex-[100%] max-w-[100%]">
              <Label htmlFor="noig" className=" font-normal opacity-70">
                Nơi giao
              </Label>
              <Controller
                name="noig"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="noig" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="nl" className=" font-normal opacity-70">
                Ngày lập
              </Label>
              <Controller
                name="nl"
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
              <Label htmlFor="ngayg" className=" font-normal opacity-70">
                Ngày giao
              </Label>
              <Controller
                name="ngayg"
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

export default Order;
