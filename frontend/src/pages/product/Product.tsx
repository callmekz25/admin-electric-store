import type IProduct from "@/interfaces/product/product.interface";
import { DataTable } from "@/components/table/data-table";
import columns from "@/components/product/columns-product";
const Product = () => {
  const productList: IProduct[] = [
    {
      MaSP: "SP001",
      TenSP: "Điện thoại iPhone 15 Pro",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 25,
      Gia: 32990000,
      TenLSP: "Điện thoại",
      TenNCC: "Apple Việt Nam",
    },
    {
      MaSP: "SP002",
      TenSP: "Laptop Dell XPS 13",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 10,
      Gia: 27990000,
      TenLSP: "Laptop",
      TenNCC: "Dell Việt Nam",
    },
    {
      MaSP: "SP003",
      TenSP: "Tai nghe Sony WH-1000XM5",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 40,
      Gia: 7490000,
      TenLSP: "Phụ kiện",
      TenNCC: "Sony Việt Nam",
    },
    {
      MaSP: "SP004",
      TenSP: "Smart TV Samsung 55 inch 4K",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 8,
      Gia: 15990000,
      TenLSP: "Tivi",
      TenNCC: "Samsung Việt Nam",
    },
    {
      MaSP: "SP005",
      TenSP: "Máy giặt LG Inverter 9kg",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 15,
      Gia: 8490000,
      TenLSP: "Điện gia dụng",
      TenNCC: "LG Electronics",
    },
    {
      MaSP: "SP006",
      TenSP: "Máy lạnh Daikin Inverter 1HP",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 12,
      Gia: 9990000,
      TenLSP: "Điện lạnh",
      TenNCC: "Daikin Việt Nam",
    },
    {
      MaSP: "SP007",
      TenSP: "Chuột Logitech MX Master 3S",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 30,
      Gia: 2490000,
      TenLSP: "Phụ kiện",
      TenNCC: "Logitech",
    },
    {
      MaSP: "SP008",
      TenSP: "Loa Bluetooth JBL Flip 6",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 20,
      Gia: 2690000,
      TenLSP: "Âm thanh",
      TenNCC: "JBL",
    },
    {
      MaSP: "SP009",
      TenSP: "Máy lọc không khí Xiaomi Mi Air Purifier 4",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 18,
      Gia: 3490000,
      TenLSP: "Thiết bị thông minh",
      TenNCC: "Xiaomi",
    },
    {
      MaSP: "SP010",
      TenSP: "Bàn phím cơ Keychron K6",
      HinhAnh:
        "https://genk.mediacdn.vn/139269124445442048/2023/6/6/macbook-air-15-inch-6-16860313066961124865501-1686038279968-168603828012719897017.jpg",
      SoLuongTon: 22,
      Gia: 1890000,
      TenLSP: "Phụ kiện",
      TenNCC: "Keychron",
    },
  ];

  return (
    <div className="px-8 py-10">
      Product
      <div className=" ">
        <DataTable columns={columns} data={productList} />
      </div>
    </div>
  );
};

export default Product;
