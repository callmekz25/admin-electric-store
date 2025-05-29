import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type IProductRequest from "@/interfaces/product/product-request.interface";
const columns = ({
  onUpdate,
  onDelete,
}: {
  onUpdate: (product: IProductRequest) => void;
  onDelete: (product: IProductRequest) => void;
}): ColumnDef<IProductRequest>[] => [
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
          src={
            row.original.HinhAnh !== ""
              ? row.original.HinhAnh
              : "https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
          }
          alt={row.original.TenSP}
          className="size-20 object-contain"
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
    accessorFn: (row) => row.ChiTietSanPham.LoaiSanPham.TenLSP || "",
    id: "LoaiSP",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Loại sản phẩm
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <h3 className="text-sm">{getValue<string>()}</h3>,
    meta: {
      label: "Loại sản phẩm",
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
    accessorKey: "MucGiamGia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mức giảm giá
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="text-sm ">{row.original.MucGiamGia ?? "N/A"}</h3>
    ),
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      return Number(cellValue) === Number(filterValue);
    },
    meta: {
      label: "Mức giảm giá",
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
    cell: ({ row }) => (
      <h3 className="text-sm ">{row.original.Gia.toLocaleString()}</h3>
    ),
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
            <Link
              to={`/products/${row.original.MaSP}`}
              className=" flex items-center  w-full gap-1 cursor-pointer"
            >
              Chi tiết
            </Link>
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
