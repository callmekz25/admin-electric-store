import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type IRate from "@/interfaces/rate/rate.interface";
const columns = ({
  onUpdate,
  onDelete,
}: {
  onUpdate: (rate: IRate) => void;
  onDelete: (rate: IRate) => void;
}): ColumnDef<IRate>[] => [
  // Row selection
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Column key
  {
    accessorKey: "MaTK",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã tài khoản
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm  py-8">{row.original.MaTK}</h3>,
    meta: {
      label: "Mã tài khoản",
    },
  },
  {
    accessorKey: "MaDG",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã đánh giá
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm  ">{row.original.MaDG}</h3>,
    meta: {
      label: "Mã đánh giá",
    },
  },
  {
    accessorKey: "MaSP",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã sản phẩm
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm  ">{row.original.MaSP}</h3>,
    meta: {
      label: "Mã sản phẩm",
    },
  },
  {
    accessorKey: "NgayDanhGia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày đánh giá
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm ">
        {row.original.NgayDanhGia ? row.original.NgayDanhGia : "N/A"}
      </h3>
    ),
    meta: {
      label: "Ngày đánh giá",
    },
  },
  {
    accessorKey: "SoSao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số sao
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm ">{row.original.SoSao}</h3>,
    meta: {
      label: "Số sao",
    },
  },
  {
    accessorKey: "BinhLuan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bình luận
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm max-w-[200px]  truncate">
        {row.original.BinhLuan ?? "N/A"}
      </h3>
    ),
    meta: {
      label: "Bình luận",
    },
  },

  {
    accessorKey: "handle",
    header: "Thao tác",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className=" cursor-pointer">
            <Ellipsis className="size-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button
              className=" cursor-pointer w-full flex  items-center justify-start "
              onClick={() => onUpdate(row.original)}
            >
              Cập nhật
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => onDelete(row.original)}
              className="text-red-500 w-full flex  items-center justify-start cursor-pointer"
            >
              Xoá
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    meta: {
      label: "Thao tác",
    },
  },
];
export default columns;
