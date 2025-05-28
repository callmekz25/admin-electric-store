import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type IProductView from "@/interfaces/product/product-view.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type ISupplier from "@/interfaces/supplier/supplier.interface";
const columns = (
  onUpdate: (supplier: ISupplier) => void
): ColumnDef<ISupplier>[] => [
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
    accessorKey: "MaNCC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã nhà cung cấp
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm  py-8">{row.original.MaNCC}</h3>,
    meta: {
      label: "Mã nhà cung cấp",
    },
  },
  {
    accessorKey: "TenNCC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên nhà cung cấp
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm   max-w-[200px] truncate">
        {row.original.TenNCC}
      </h3>
    ),
    meta: {
      label: "Tên nhà cung cấp",
    },
  },
  {
    accessorKey: "DiaChiNCC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa chỉ
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm   max-w-[200px] truncate">
        {row.original.DiaChiNCC}
      </h3>
    ),
    meta: {
      label: "Địa chỉ",
    },
  },
  {
    accessorKey: "SDT_NCC",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số điện thoại
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm ">{row.original.SDT_NCC}</h3>,
    meta: {
      label: "Số điện thoại",
    },
  },

  {
    accessorFn: (row) => row.DanhSachSanPham.length,
    id: "SoLuong",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Số lượng cung cấp
        <ArrowUpDown className=" h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <h3 className="text-sm ">{getValue<number>()}</h3>,
    meta: {
      label: "Số lượng cung cấp",
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
            <Link className=" flex items-center  w-full gap-1 cursor-pointer">
              Chi tiết
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="text-red-500 w-full flex  items-center justify-start cursor-pointer">
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
