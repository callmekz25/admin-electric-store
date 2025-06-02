import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { TaiKhoan } from "./TaiKhoan";
import { ChiTietHoaDon } from "./ChiTietHoaDon";
import { TtVanChuyen } from "./TtVanChuyen";

export interface HoaDonAttrs {
  MaHD: string;
  MaTK: string;
  NgayLap?: Date;
  NgayGiao?: Date;
  NoiGiao?: string;
  HinhThucThanhToan?: string;
  TtVanChuyen?: TtVanChuyen;
}

export class HoaDon
  extends Model<HoaDonAttrs, Optional<HoaDonAttrs, "MaHD">>
  implements HoaDonAttrs
{
  public MaHD!: string;
  public MaTK!: string;
  public NgayLap?: Date;
  public NgayGiao?: Date;
  public NoiGiao?: string;
  public HinhThucThanhToan?: string;
  public TtVanChuyen?: TtVanChuyen;
}

HoaDon.init(
  {
    MaHD: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    MaTK: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: "TAIKHOAN",
        key: "MaTK",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    NgayLap: { type: DataTypes.DATEONLY, allowNull: true },
    NgayGiao: { type: DataTypes.DATEONLY, allowNull: true },
    NoiGiao: { type: DataTypes.STRING(100), allowNull: true },
    HinhThucThanhToan: { type: DataTypes.STRING(20), allowNull: true },
  },
  {
    sequelize,
    tableName: "HOADON",
    freezeTableName: true,
    timestamps: false,
  }
);

HoaDon.hasMany(ChiTietHoaDon, {
  foreignKey: "MaHD",
  sourceKey: "MaHD",
  as: "DanhSachSanPham",
});

ChiTietHoaDon.belongsTo(HoaDon, {
  foreignKey: "MaHD",
  targetKey: "MaHD",
});

TtVanChuyen.belongsTo(HoaDon, { foreignKey: "MaHD", targetKey: "MaHD" });
HoaDon.hasOne(TtVanChuyen, { foreignKey: "MaHD", sourceKey: "MaHD" });
