import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { SanPham } from "./SanPham";
import { TaiKhoan } from "./TaiKhoan";

interface DanhGiaAttrs {
  MaDG: number;
  MaSP: string;
  MaTK: string;
  SoSao: number;
  BinhLuan?: string;
  NgayDanhGia?: Date;
}
export class DanhGia
  extends Model<DanhGiaAttrs, Optional<DanhGiaAttrs, "MaDG">>
  implements DanhGiaAttrs
{
  public MaDG!: number;
  public MaSP!: string;
  public MaTK!: string;
  public SoSao!: number;
  public BinhLuan?: string;
  public NgayDanhGia?: Date;
}
DanhGia.init(
  {
    MaDG: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    MaSP: { type: DataTypes.STRING(10), allowNull: false },
    MaTK: { type: DataTypes.STRING(10), allowNull: false },
    SoSao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    BinhLuan: { type: DataTypes.STRING(500), allowNull: true },
    NgayDanhGia: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "DANHGIA",
    freezeTableName: true,
    timestamps: false,
  }
);

DanhGia.belongsTo(SanPham, { foreignKey: "MaSP" });
