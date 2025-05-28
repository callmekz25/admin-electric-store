import columns from "@/components/supplier/columns-supplier";
import { DataTable } from "@/components/table/data-table";
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
import type ISupplierFilterRequest from "@/interfaces/supplier/supplier-filter-request.interface";
import { useGetSuppliers } from "@/hooks/supplier";
import type ISupplier from "@/interfaces/supplier/supplier.interface";
import UpdateSupplier from "@/components/supplier/update-supplier";
import AddSupplier from "@/components/supplier/add-supplier";
const Supplier = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(
    null
  );
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<ISupplierFilterRequest>();
  const { control, reset, handleSubmit } = useForm<ISupplierFilterRequest>();
  const [addSupplier, setAddSupplier] = useState(false);
  const { data, isLoading, error } = useGetSuppliers(filterQuery!);
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
  const handleAdvancedFilter = (filter: ISupplierFilterRequest) => {
    setFilterQuery(filter);
    setAdvancedFilter(false);
    reset();
  };
  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các nhà cung cấp</h2>
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
            onClick={() => setAddSupplier(true)}
            className="flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-500 "
          >
            <PlusIcon />
            Thêm mới
          </Button>
        </div>
        <DataTable
          columns={columns((supplier) => {
            setSelectedSupplier(supplier);
            setOpenUpdate(true);
          })}
          isLoading={isLoading}
          data={data ?? []}
        />
      </div>
      <AddSupplier onOpenChange={setAddSupplier} open={addSupplier} />
      <UpdateSupplier
        onOpenChange={setOpenUpdate}
        open={openUpdate}
        selectedSupplier={selectedSupplier!}
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
              <Label htmlFor="mncc" className=" font-normal opacity-70">
                Mã nhà cung cấp
              </Label>
              <Controller
                name="mncc"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="mncc" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="t" className=" font-normal opacity-70">
                Tên nhà cung cấp
              </Label>
              <Controller
                name="t"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="t" className="rounded" />
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
                  <Input {...field} id="t" className="rounded" />
                )}
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

export default Supplier;
