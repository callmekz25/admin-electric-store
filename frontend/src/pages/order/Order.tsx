import type IOrder from "@/interfaces/order/order.interface";
import columns from "@/components/order/columns-order";
import { DataTable } from "@/components/table/data-table";
const Order = () => {
  const orders: IOrder[] = [
    {
      MaHD: "HD001",
      NgayLap: "2025-05-25T10:30:00",
      NoiGiao: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
      HinhThucThanhToan: true, // true = Chuyển khoản
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
      HinhThucThanhToan: false, // false = COD
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
  return (
    <div className="px-8 py-10">
      Orders
      <div className=" ">
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default Order;
