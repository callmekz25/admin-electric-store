import type IProduct from "../product/product.interface";

interface ISupplier {
  MaNCC: string;
  TenNCC: string;
  DiaChiNCC?: string;
  SDT_NCC?: string;
  DanhSachSanPham: IProduct[];
}
export default ISupplier;
