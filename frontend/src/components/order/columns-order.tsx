import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type IOrderView from "@/interfaces/order/order-view.interface";
import type IOrderDetail from "@/interfaces/order/order-detail.interface";
const columns = ({
  onUpdate,
  onDelete,
}: {
  onUpdate: (order: IOrderView) => void;
  onDelete: (order: IOrderView) => void;
}): ColumnDef<IOrderView>[] => [
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
    accessorKey: "MaHD",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã đơn
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm py-8 ">{row.original.MaHD}</h3>,
    meta: {
      label: "Mã đơn hàng",
    },
  },

  {
    accessorFn: (row) => row.TaiKhoan?.HoTenTK || "",
    id: "HoTenTK",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên khách hàng
        <ArrowUpDown className=" h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <h3 className="text-sm max-w-[200px] truncate">{getValue<string>()}</h3>
    ),
    meta: {
      label: "Tên khách hàng",
    },
  },

  {
    accessorFn: (row) => row.TaiKhoan?.Email || "",
    id: "Email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className=" h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <h3 className="text-sm">{getValue<string>()}</h3>,
    meta: {
      label: "Email",
    },
  },

  {
    accessorFn: (row) => row.TaiKhoan?.SDT || "",
    id: "SDT",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Số điện thoại
        <ArrowUpDown className=" h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <h3 className="text-sm">{getValue<string>()}</h3>,
    meta: {
      label: "Số điện thoại",
    },
  },

  {
    accessorKey: "NgayLap",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày lập
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className="text-sm ">{row.original.NgayLap}</h3>,
    meta: {
      label: "Ngày lập",
    },
  },
  {
    accessorKey: "NgayGiao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày giao
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className="text-sm ">{row.original.NgayGiao}</h3>,
    meta: {
      label: "Ngày giao",
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
        Số lượng
        <ArrowUpDown className=" h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <h3 className="text-sm ">{getValue<number>()}</h3>,
    meta: {
      label: "Số lượng sản phẩm",
    },
  },

  {
    accessorFn: (row) =>
      row.DanhSachSanPham.reduce(
        (sum: number, item: IOrderDetail) =>
          sum + item.SoLuong! * item.SanPham.Gia,
        0
      ),
    id: "TongTien",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tổng tiền
        <ArrowUpDown className=" h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <h3 className="text-sm ">{getValue<number>().toLocaleString("vi-VN")}</h3>
    ),
    meta: {
      label: "Tổng tiền",
    },
  },

  {
    accessorKey: "HinhThucThanhToan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình thức thanh toán
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="text-sm ">{row.original.HinhThucThanhToan}</h3>
    ),
    meta: {
      label: "Hình thức thanh toán",
    },
  },
  {
    accessorFn: (row) => row.TtVanChuyen?.Status || "",
    id: "Status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trạng thái
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <h3 className="text-sm">{getValue<string>()}</h3>,
    meta: {
      label: "Trạng thái",
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
              to={`/orders/${row.original.MaHD}`}
              state={{
                order: row.original,
              }}
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
