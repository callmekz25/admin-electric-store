import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import type IOrder from "@/interfaces/order/order.interface";
const columns: ColumnDef<IOrder>[] = [
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
    cell: ({ row }) => <h3 className=" text-sm py-5 ">{row.original.MaHD}</h3>,
    meta: {
      label: "Mã đơn hàng",
    },
  },

  {
    accessorKey: "HoTenTK",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên khách hàng
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className=" text-sm   max-w-[200px] truncate">
        {row.original.HoTenTK}
      </h3>
    ),
    meta: {
      label: "Tên khách hàng",
    },
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className=" text-sm ">{row.original.Email}</h3>,
    meta: {
      label: "Email",
    },
  },
  {
    accessorKey: "SDT",
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
    cell: ({ row }) => <h3 className=" text-sm ">{row.original.SDT}</h3>,
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
          Ngày đặt
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className="text-sm ">{row.original.NgayLap}</h3>,
    meta: {
      label: "Ngày đặt",
    },
  },
  {
    accessorKey: "TotalAmount",
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
    cell: ({ row }) => <h3 className="text-sm ">{row.original.TotalAmount}</h3>,
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      return Number(cellValue) === Number(filterValue);
    },
    meta: {
      label: "Số lượng sản phẩm",
    },
  },
  {
    accessorKey: "TotalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tổng tiền
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className="text-sm ">{row.original.TotalPrice}</h3>,
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      return Number(cellValue) === Number(filterValue);
    },
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
          Phương thức thanh toán
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="text-sm ">
        {row.original.HinhThucThanhToan ? "COD" : "PAY"}
      </h3>
    ),
    meta: {
      label: "Phương thưc thanh toán",
    },
  },
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h3 className="text-sm ">{row.original.Status}</h3>,
    meta: {
      label: "Trạng thái",
    },
  },
  {
    accessorKey: "handle",
    header: "Thao tác",
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-2">
        <Link>
          <Edit className="size-5" />
        </Link>
        <button>
          <Ellipsis className="size-5" />
        </button>
      </div>
    ),
    meta: {
      label: "Thao tác",
    },
  },
];
export default columns;
