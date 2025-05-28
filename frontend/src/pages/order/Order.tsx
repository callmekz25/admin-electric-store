import columns from "@/components/order/columns-order";
import UpdateOrder from "@/components/order/update-order";
import { DataTable } from "@/components/table/data-table";
import Loading from "@/components/ui/loading";
import type IOrderView from "@/interfaces/order/order-view.interface";
import { useEffect, useState } from "react";
const Order = () => {
  const orders: IOrderView[] = [
    {
      MaHD: "HD001",
      NgayLap: "2025-05-25T10:30:00",
      NoiGiao: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
      HinhThucThanhToan: true,
      HoTenTK: "Nguyễn Văn A",
      Email: "a.nguyen@example.com",
      SDT: "0901234567",
      TotalAmount: 3,
      TotalPrice: 1250000,
      Status: "Chờ xác nhận",
    },
    {
      MaHD: "HD002",
      NgayLap: "2025-05-24T14:45:00",
      NoiGiao: "45 Lê Lợi, Q.1, TP.HCM",
      HinhThucThanhToan: false,
      HoTenTK: "Trần Thị B",
      Email: "b.tran@example.com",
      SDT: "0912345678",
      TotalAmount: 2,
      TotalPrice: 850000,
      Status: "Đang giao",
    },
    {
      MaHD: "HD003",
      NgayLap: "2025-05-23T09:15:00",
      NoiGiao: "78 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
      HinhThucThanhToan: true,
      HoTenTK: "Lê Văn C",
      Email: "c.le@example.com",
      SDT: "0933456789",
      TotalAmount: 5,
      TotalPrice: 2320000,
      Status: "Đã giao",
    },
    {
      MaHD: "HD004",
      NgayLap: "2025-05-22T19:00:00",
      NoiGiao: "12 Trần Hưng Đạo, Q.10, TP.HCM",
      HinhThucThanhToan: false,
      HoTenTK: "Phạm Thị D",
      Email: "d.pham@example.com",
      SDT: "0922334455",
      TotalAmount: 1,
      TotalPrice: 340000,
      Status: "Hủy",
    },
    {
      MaHD: "HD005",
      NgayLap: "2025-05-21T08:00:00",
      NoiGiao: "88 Phan Xích Long, Q.Phú Nhuận, TP.HCM",
      HinhThucThanhToan: true,
      HoTenTK: "Đỗ Minh E",
      Email: "e.do@example.com",
      SDT: "0967888999",
      TotalAmount: 4,
      TotalPrice: 1640000,
      Status: "Chờ xác nhận",
    },
  ];
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrderView | null>(null);
  useEffect(() => {
    if (openUpdate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openUpdate]);

  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các đơn hàng</h2>
      <div className="mt-10">
        <DataTable
          columns={columns((order) => {
            setSelectedOrder(order);
            setOpenUpdate(true);
          })}
          data={orders}
        />
      </div>
      <UpdateOrder
        open={openUpdate}
        onOpenChange={(value) => {
          setOpenUpdate(value);
          if (!value) setSelectedOrder(null);
        }}
        selectedOrder={selectedOrder!}
      />
    </div>
  );
};

export default Order;
