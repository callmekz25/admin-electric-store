import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type IProductRequest from "@/interfaces/product/product-request.interface";
import { useDeleteProduct } from "@/hooks/product";
const DeleteProduct = ({
  selectedProduct,
  open,
  onOpenChange,
}: {
  selectedProduct: IProductRequest;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const handleDelete = () => {
    const request = {
      id: selectedProduct.MaSP,
    };
    deleteProduct(request, {
      onSuccess: () => {
        toast.success("Xoá thành công");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        onOpenChange(false);
      },
      onError: (error) => toast.error(error.message),
    });
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            Xoá thông tin của nhà cung cấp?
          </DialogTitle>
          <DialogDescription className="text-md">
            Lưu ý không thể hoàn tác thao tác
          </DialogDescription>
          <div className="text-sm flex flex-col gap-1">
            {selectedProduct ? (
              <>
                <p>Mã sản phẩm: {selectedProduct.MaSP ?? "N/A"}</p>
              </>
            ) : (
              ""
            )}
            <div className="flex mt-4 items-center justify-end gap-3">
              <Button
                disabled={isPending}
                className="cursor-pointer"
                onClick={() => {
                  onOpenChange(false);
                }}
                variant={"outline"}
              >
                Huỷ
              </Button>
              <Button
                isLoading={isPending}
                disabled={isPending}
                onClick={() => handleDelete()}
                className="bg-red-500 hover:bg-red-500 cursor-pointer"
              >
                Xoá
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
