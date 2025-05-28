import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";
import { HoaDon } from "./HoaDon";
import { SanPham } from "./SanPham";

export interface ChiTietHoaDonAttrs {
  MaHD: string;
  MaSP: string;
  SoLuong?: number;
  GiaBan?: number;
}

export class ChiTietHoaDon extends Model {
  public MaHD!: string;
  public MaSP!: string;
  public SoLuong?: number;
  public GiaBan?: number;
}

ChiTietHoaDon.init(
  {
    MaHD: { type: DataTypes.STRING(10), primaryKey: true, allowNull: false },
    MaSP: { type: DataTypes.STRING(10), primaryKey: true, allowNull: false },
    SoLuong: { type: DataTypes.INTEGER, allowNull: true },
    GiaBan: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    tableName: "CHITIET_HOADON",
    freezeTableName: true,
    timestamps: false,
  }
);

// ChiTietHoaDon.belongsTo(HoaDon, { foreignKey: "MaHD" });
ChiTietHoaDon.belongsTo(SanPham, { foreignKey: "MaSP" });
