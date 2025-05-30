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
import type IRate from "@/interfaces/rate/rate.interface";
import { useDeleteRate } from "@/hooks/rate";

const DeleteRate = ({
  selectedRate,
  open,
  onOpenChange,
}: {
  selectedRate: IRate;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteRate, isPending } = useDeleteRate();
  const handleDelete = () => {
    const request = {
      id: selectedRate.MaDG,
    };
    deleteRate(request, {
      onSuccess: () => {
        toast.success("Xoá thành công");
        queryClient.invalidateQueries({ queryKey: ["rates"] });
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
            Xoá thông tin của đánh giá?
          </DialogTitle>
          <DialogDescription className="text-md">
            Lưu ý không thể hoàn tác thao tác
          </DialogDescription>
          <div className="text-sm flex flex-col gap-1">
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

export default DeleteRate;
