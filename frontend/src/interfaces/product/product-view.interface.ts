import type ISupplier from "../supplier/supplier.interface";
import type IProductDetail from "./product-detail.interface";
import type IProduct from "./product.interface";
import type ITypeProduct from "./type-product.interface";

interface IProductView
  extends IProduct,
    IProductDetail,
    ISupplier,
    ITypeProduct {}
export default IProductView;
