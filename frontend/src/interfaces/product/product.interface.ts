import type IRate from "../rate/rate.interface";
import type IProductDetail from "./product-detail.interface";

interface IProduct {
  MaSP: string;
  TenSP: string;
  MaCTSP: string;
  HinhAnh: string;
  SoLuongTon: number;
  Gia: number;
  MucGiamGia: number;
  DanhSachDanhGia: IRate[];
  ChiTietSanPham: IProductDetail;
}
export default IProduct;
