import type IProduct from "../product/product.interface";

interface IOrderDetail {
  MaHD: string;
  MaSP: string;
  SoLuong?: number;
  GiaBan?: number;
  SanPham: IProduct;
}
export default IOrderDetail;
