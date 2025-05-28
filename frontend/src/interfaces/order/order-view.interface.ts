import type IShip from "../ship/ship.interface";
import type IUser from "../user/user.interface";
import type IOrderDetail from "./order-detail.interface";
import type IOrder from "./order.interface";

interface IOrderView extends IOrder {
  DanhSachSanPham: IOrderDetail[];
  TaiKhoan: IUser;
  TtVanChuyen: IShip;
}
export default IOrderView;
