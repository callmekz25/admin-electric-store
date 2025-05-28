import type IOrderDetail from "../order/order-detail.interface";
import type IRate from "../rate/rate.interface";
import type IUser from "./user.interface";

interface IUserView extends IUser {
  DanhGia: IRate[];
  DanhSachHoaDon: IOrderDetail[];
}

export default IUserView;
