import { DataTable } from "@/components/table/data-table";
import columns from "@/components/product/columns-product";
import { useEffect, useState } from "react";
import UpdateProduct from "@/components/product/update-product";
import { Button } from "@/components/ui/button";
import type IProductView from "@/interfaces/product/product-view.interface";
import { useGetProducts } from "@/hooks/product";
import Loading from "@/components/ui/loading";
const Product = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProductView | null>(
    null
  );
  const { data, isLoading } = useGetProducts();
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
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold">Danh sách các sản phẩm</h2>
      <div className="mt-10">
        <DataTable
          columns={columns((product) => {
            setSelectedProduct(product);
            setOpenUpdate(true);
          })}
          data={data}
        />
      </div>
      <UpdateProduct
        selectedProduct={selectedProduct!}
        open={openUpdate}
        onOpenChange={(value) => {
          setOpenUpdate(value);
          if (!value) setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default Product;
