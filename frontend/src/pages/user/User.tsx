import columns from "@/components/user/columns-user";
import UpdateOrder from "@/components/order/update-order";
import { DataTable } from "@/components/table/data-table";
import Loading from "@/components/ui/loading";
import { useGetUsers } from "@/hooks/user";
import { useEffect, useState } from "react";
import type IUserView from "@/interfaces/user/user-view.interface";
import UpdateUser from "@/components/user/update-user";
const User = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserView | null>(null);
  const { data, isLoading, error } = useGetUsers();
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
      <h2 className="text-2xl font-semibold">Danh sách các tài khoản</h2>
      <div className="mt-10">
        <DataTable
          columns={columns((order) => {
            setSelectedUser(order);
            setOpenUpdate(true);
          })}
          data={data}
        />
      </div>
      <UpdateUser
        onOpenChange={setOpenUpdate}
        open={openUpdate}
        selectedUser={selectedUser!}
      />
    </div>
  );
};

export default User;
