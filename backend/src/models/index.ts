import { sequelize } from "../config/db.config";
import { TaiKhoan } from "./TaiKhoan";
import { LoaiSanPham } from "./LoaiSanPham";
import { NhaCungCap } from "./NhaCungCap";
import { ChiTietSanPham } from "./ChiTietSanPham";
import { SanPham } from "./SanPham";
import { HoaDon } from "./HoaDon";
import { ChiTietHoaDon } from "./ChiTietHoaDon";
import { DanhGia } from "./DanhGia";
import { TtVanChuyen } from "./TtVanChuyen";

export const db = {
  sequelize,
  TaiKhoan,
  LoaiSanPham,
  NhaCungCap,
  ChiTietSanPham,
  SanPham,
  HoaDon,
  ChiTietHoaDon,
  DanhGia,
  TtVanChuyen,
};

// export const initDb = async () => {
//   await sequelize.sync({ alter: false });
// };
