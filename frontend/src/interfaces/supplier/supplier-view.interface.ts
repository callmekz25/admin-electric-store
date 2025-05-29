import type IProduct from "../product/product.interface";

interface ISupplierView {
  MaNCC: string;
  TenNCC: string;
  DiaChiNCC?: string;
  SDT_NCC?: string;
  DanhSachSanPham: IProduct[];
}
export default ISupplierView;
