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
const columns = (
  onUpdate: (product: IProductView) => void
): ColumnDef<IProductView>[] => [
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
    accessorKey: "MaSP",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã sản phẩm
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm ">{row.original.MaSP}</h3>,
    meta: {
      label: "Mã sản phẩm",
    },
  },
  {
    accessorKey: "HinhAnh",
    header: "Hình ảnh",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.HinhAnh}
          alt={row.original.TenSP}
          className="size-24 object-contain"
        />
      );
    },
    meta: {
      label: "Hình ảnh",
    },
  },
  {
    accessorKey: "TenSP",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên sản phẩm
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm   max-w-[200px] truncate">
        {row.original.TenSP}
      </h3>
    ),
    meta: {
      label: "Tên sản phẩm",
    },
  },
  {
    accessorKey: "TenLSP",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loại sản phẩm
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm ">{row.original.TenLSP}</h3>,
    meta: {
      label: "Tên loại sản phẩm",
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
          Nhà cung cấp
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm ">{row.original.TenNCC}</h3>,
    meta: {
      label: "Nhà cung cấp",
    },
  },
  {
    accessorKey: "SoLuongTon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số lượng
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className="text-sm ">{row.original.SoLuongTon}</h3>,
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      return Number(cellValue) === Number(filterValue);
    },
    meta: {
      label: "Số lượng",
    },
  },
  {
    accessorKey: "Gia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className="text-sm ">{row.original.Gia}</h3>,
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      return Number(cellValue) === Number(filterValue);
    },
    meta: {
      label: "Giá",
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
