import columns from "@/components/statistics/columns-statistics";
import columns1 from "@/components/statistics/columns-statistics-quarter";

import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon, SlidersHorizontalIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import type ISupplierFilterRequest from "@/interfaces/supplier/supplier-filter-request.interface";
import { useGetSuppliers } from "@/hooks/supplier";
import type ISupplierView from "@/interfaces/supplier/supplier-view.interface";
import UpdateSupplier from "@/components/supplier/update-supplier";
import AddSupplier from "@/components/supplier/add-supplier";
import DeleteSupplier from "@/components/supplier/delete-supplier";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import httpRequest from "@/config/axios.config";
import type IStatisticsView from "@/interfaces/statistics/statistics-view.interface";
import type IStatisticsQuarterView from "@/interfaces/statistics/statistics-quarter-view.interface";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";

const Home = () => {
  const [myYear, setMyYear] = useState<number>(2022);
  const [myYear1, setMyYear1] = useState<number>(2022);

  const queryClient = useQueryClient();

  const myHook = (myYear: number) => {
    return useQuery({
      queryKey: ["statistics"],
      queryFn: () => myFunction(myYear),
    });
  };

  const {
    data: statistics,
    isLoading: isSLoading,
    error: myErr,
  } = myHook(myYear);

  const myFunction = async (myYear: number) => {
    const data = await httpRequest.get("/hoa-don/thong-ke-thang", {
      params: {
        year: myYear,
      },
    });
    return data.data as IStatisticsView[];
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["statistics"] });
  }, [myYear]);

  const myHook1 = (myYear: number) => {
    return useQuery({
      queryKey: ["statistics1"],
      queryFn: () => myFunction1(myYear),
    });
  };

  const {
    data: statistics1,
    isLoading: isSLoading1,
    error: myErr1,
  } = myHook1(myYear1);

  const myFunction1 = async (myYear: number) => {
    const data = await httpRequest.get("/hoa-don/thong-ke-quy", {
      params: {
        year: myYear,
      },
    });
    return data.data as IStatisticsQuarterView[];
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["statistics1"] });
  }, [myYear1]);

  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">THỐNG KÊ</h2>

      <div className="mt-10">
        <div className="flex items-center gap-3">
          <Select
            value={myYear.toString()}
            onValueChange={(value) => setMyYear(Number(value))}
          >
            <SelectTrigger className="rounded border px-4 py-2 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectItem value="2015">2015</SelectItem>
                <SelectItem value="2016">2016</SelectItem>
                <SelectItem value="2017">2017</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {myErr && <p>Lỗi xảy ra</p>}
        <DataTable
          columns={columns()}
          isLoading={isSLoading}
          data={statistics ?? []}
        />
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-3">
          <Select
            value={myYear1.toString()}
            onValueChange={(value) => setMyYear1(Number(value))}
          >
            <SelectTrigger className="rounded border px-4 py-2 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectItem value="2015">2015</SelectItem>
                <SelectItem value="2016">2016</SelectItem>
                <SelectItem value="2017">2017</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {myErr && <p>Lỗi xảy ra</p>}
        <DataTable
          columns={columns1()}
          isLoading={isSLoading1}
          data={statistics1 ?? []}
        />
      </div>
    </div>
  );
};

export default Home;
