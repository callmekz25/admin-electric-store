import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import type ISupplier from "@/interfaces/supplier/supplier.interface";
import { useDeleteSupplier } from "@/hooks/supplier";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
const DeleteSupplier = ({
  selectedSupplier,
  open,
  onOpenChange,
}: {
  selectedSupplier: ISupplier;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteSupplier, isPending } = useDeleteSupplier();
  const handleDelete = () => {
    const request = {
      id: selectedSupplier.MaNCC,
    };
    deleteSupplier(request, {
      onSuccess: () => {
        toast.success("Xoá thành công");
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
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
            {selectedSupplier ? (
              <>
                <p>Mã nhà cung cấp: {selectedSupplier.MaNCC ?? "N/A"}</p>
                <p>Tên nhà cung cấp: {selectedSupplier.TenNCC ?? "N/A"}</p>
                <p>Số điện thoại: {selectedSupplier.SDT_NCC ?? "N/A"}</p>
                <p>Địa chỉ: {selectedSupplier.DiaChiNCC ?? "N/A"}</p>
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

export default DeleteSupplier;
