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
import type IOrderView from "@/interfaces/order/order-view.interface";
import { useDeleteOrder } from "@/hooks/order";
const DeleteOrder = ({
  selectedOrder,
  open,
  onOpenChange,
}: {
  selectedOrder: IOrderView;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteOrder, isPending } = useDeleteOrder();
  const handleDelete = () => {
    const request = {
      id: selectedOrder.MaHD,
    };
    deleteOrder(request, {
      onSuccess: () => {
        toast.success("Xoá thành công");
        queryClient.invalidateQueries({ queryKey: ["orders"] });
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
            Xoá thông tin của hoá đơn?
          </DialogTitle>
          <DialogDescription className="text-md">
            Lưu ý không thể hoàn tác thao tác
          </DialogDescription>
          <div className="text-sm flex flex-col gap-1">
            {selectedOrder ? (
              <>
                <p>Mã hoá đơn: {selectedOrder.MaHD ?? "N/A"}</p>
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

export default DeleteOrder;
