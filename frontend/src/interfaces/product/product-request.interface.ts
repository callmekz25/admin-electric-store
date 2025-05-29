import type IProductDetail from "./product-detail.interface";

interface IProductRequest {
  MaSP: string;
  TenSP: string;
  MaCTSP: string;
  HinhAnh: string;
  SoLuongTon: number;
  Gia: number;
  MucGiamGia: number;
  ChiTietSanPham: IProductDetail;
}
export default IProductRequest;
