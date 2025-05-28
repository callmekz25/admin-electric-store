import {
  type ColumnDef,
  flexRender,
  type ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import Loading from "../ui/loading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const defaultVisibility = useMemo(() => {
    const visibility: VisibilityState = {};
    columns.forEach((col) => {
      const key =
        typeof col.accessorKey === "string" ? col.accessorKey : col.id;
      if (key) {
        visibility[key] = !["Email", "HinhThucThanhToan"].includes(key);
      }
    });

    return visibility;
  }, [columns]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultVisibility);

  const [rowSelection, setRowSelection] = useState({});
  const searchableColumns = columns.filter(
    (col) =>
      typeof col.accessorKey === "string" &&
      col.accessorKey !== "handle" &&
      col.accessorKey !== "HinhAnh"
  );
  const [filterKey, setFilterKey] = useState<string>(
    searchableColumns.length > 0
      ? (searchableColumns[0].accessorKey as string)
      : ""
  );
  const activeFilterColumn = searchableColumns.find(
    (col) => col.accessorKey === filterKey
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="">
      <div className="flex items-center py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Select value={filterKey} onValueChange={setFilterKey}>
              <SelectTrigger className=" bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {searchableColumns.map((col) => {
                  return (
                    <SelectItem
                      key={col.accessorKey as string}
                      value={col.accessorKey as string}
                    >
                      {col.meta?.label ?? col.accessorKey}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Input
              placeholder={`Tìm theo ${activeFilterColumn.meta.label.toLowerCase()}...`}
              value={
                (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn(filterKey)?.setFilterValue(e.target.value)
              }
              className=" bg-white "
            />
          </div>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} của{" "}
            {table.getFilteredRowModel().rows.length} được chọn.
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto cursor-pointer">
              <Eye className="size-5" />
              Hiển thị
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.meta?.label ?? column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không tìm thấy dữ liệu phù hợp
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isLoading && <Loading />}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
