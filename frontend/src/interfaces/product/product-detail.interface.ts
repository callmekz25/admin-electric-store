import type ISupplier from "../supplier/supplier.interface";
import type ITypeProduct from "./type-product.interface";

interface IProductDetail {
  MaCTSP: string;
  MaNCC: string;
  MaLoaiSP: string;
  CauHinhChiTiet?: string;
  Series_SP?: string;
  BaoHanh?: number;
  MauSP?: string;
  NhaCungCap: ISupplier;
  LoaiSanPham: ITypeProduct;
}
export default IProductDetail;
