import columns from "@/components/order-detail/columns-order-detail";

import { DataTable } from "@/components/table/data-table";

import type IOrderFilterRequest from "@/interfaces/order/order-filter-request.interface";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon, SlidersHorizontalIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useGetOrdersDetail } from "@/hooks/order-detail";
import type IOrderDetail from "@/interfaces/order/order-detail.interface";
import AddOrderDetail from "@/components/order-detail/add-order-detail";
import UpdateOrderDetail from "@/components/order-detail/update-order-detail";

import type IOrderDetailFilterRequest from "@/interfaces/order/order-detail-filter-request";
const OrderDetailList = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrderDetail | null>(null);
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [filterQuery, setFilterQuery] = useState<IOrderDetailFilterRequest>();
  const { control, reset, handleSubmit } = useForm<IOrderDetailFilterRequest>();

  const { data, isLoading, error } = useGetOrdersDetail(filterQuery!);

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

  const handleAdvancedFilter = (filter: IOrderDetailFilterRequest) => {
    setFilterQuery(filter);
    setAdvancedFilter(false);
    reset();
  };
  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các đơn hàng</h2>
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
              // setOpenDelete(true);
            },
          })}
          data={data ?? []}
        />
      </div>
      <AddOrderDetail open={openAdd} onOpenChange={setOpenAdd} />
      <UpdateOrderDetail
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
              <Label htmlFor="sp" className=" font-normal opacity-70">
                Mã sản phẩm
              </Label>
              <Controller
                name="sp"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="sp" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="sl" className=" font-normal opacity-70">
                Số lượng
              </Label>
              <Controller
                name="sl"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="sl" type="number" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="g" className=" font-normal opacity-70">
                Giá bán
              </Label>
              <Controller
                name="g"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="g" type="number" className="rounded" />
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

export default OrderDetailList;
