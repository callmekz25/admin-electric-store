import { DataTable } from "@/components/table/data-table";
import columns from "@/components/product/columns-product";
import { useEffect, useState } from "react";
import UpdateProduct from "@/components/product/update-product";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type IProductRequest from "@/interfaces/product/product-request.interface";
import { useGetProducts } from "@/hooks/product";
import { PlusIcon, SlidersHorizontalIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type IProductFilterRequest from "@/interfaces/product/product-filter-request.interface";
import AddProduct from "@/components/product/add-product";
import DeleteProduct from "@/components/product/delete-product";
const Product = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<IProductRequest | null>(null);
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<IProductFilterRequest>();
  const { control, reset, handleSubmit } = useForm<IProductFilterRequest>();

  const { data, isLoading, error, refetch } = useGetProducts(filterQuery!);
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

  const handleAdvancedFilter = (filter: IProductFilterRequest) => {
    setFilterQuery(filter);
    setAdvancedFilter(false);
    reset();
  };

  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các sản phẩm</h2>
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
            onUpdate: (product) => {
              setSelectedProduct(product);
              setOpenUpdate(true);
            },
            onDelete: (product) => {
              setSelectedProduct(product);
              setOpenDelete(true);
            },
          })}
          isLoading={isLoading}
          data={data ?? []}
        />
      </div>
      <DeleteProduct
        open={openDelete}
        onOpenChange={setOpenDelete}
        selectedProduct={selectedProduct!}
      />
      <AddProduct open={openAdd} onOpenChange={setOpenAdd} />
      <UpdateProduct
        selectedProduct={selectedProduct!}
        open={openUpdate}
        onOpenChange={(value) => {
          setOpenUpdate(value);
          if (!value) setSelectedProduct(null);
        }}
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
              <Label htmlFor="msp" className=" font-normal opacity-70">
                Mã sản phẩm
              </Label>
              <Controller
                name="msp"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="msp" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="ctsp" className=" font-normal opacity-70">
                Mã chi tiết sản phẩm
              </Label>
              <Controller
                name="ctsp"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="ctsp" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="t" className=" font-normal opacity-70">
                Tên sản phẩm
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
              <Label htmlFor="sl" className=" font-normal opacity-70">
                Số lượng tồn kho
              </Label>
              <Controller
                name="sl"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="sl" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="mgg" className=" font-normal opacity-70">
                Mức giảm giá
              </Label>
              <Controller
                name="mgg"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="mgg" className="rounded" />
                )}
              />
            </div>
            <div className="flex flex-col gap-2 px-2 flex-[50%] max-w-[50%]">
              <Label htmlFor="g" className=" font-normal opacity-70">
                Giá
              </Label>
              <Controller
                name="g"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="g" className="rounded" />
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

export default Product;
