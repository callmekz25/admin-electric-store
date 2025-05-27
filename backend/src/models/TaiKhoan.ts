import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { DanhGia } from "./DanhGia";

interface TaiKhoanAttrs {
  MaTK: string;
  HoTenTK: string;
  TenDangNhap: string;
  MatKhau: string;
  GioiTinh: string;
  NgaySinh: Date;
  Email: string;
  DiaChi: string;
  SDT?: string;
}
export class TaiKhoan
  extends Model<TaiKhoanAttrs, Optional<TaiKhoanAttrs, "MaTK">>
  implements TaiKhoanAttrs
{
  public MaTK!: string;
  public HoTenTK!: string;
  public TenDangNhap!: string;
  public MatKhau!: string;
  public GioiTinh!: string;
  public NgaySinh!: Date;
  public Email!: string;
  public DiaChi!: string;
  public SDT?: string;
}
TaiKhoan.init(
  {
    MaTK: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    HoTenTK: { type: DataTypes.STRING(30), allowNull: false },
    TenDangNhap: { type: DataTypes.STRING(50), allowNull: false },
    MatKhau: { type: DataTypes.STRING(50), allowNull: false },
    GioiTinh: { type: DataTypes.STRING(5), allowNull: false },
    NgaySinh: { type: DataTypes.DATEONLY, allowNull: false },
    Email: { type: DataTypes.STRING(50), allowNull: false },
    DiaChi: { type: DataTypes.STRING(100), allowNull: false },
    SDT: { type: DataTypes.STRING(20), allowNull: true },
  },
  {
    sequelize,
    tableName: "TAIKHOAN",
    freezeTableName: true,
    timestamps: false,
  }
);

TaiKhoan.hasMany(DanhGia, { foreignKey: "MaTK", sourceKey: "MaTK" });
DanhGia.belongsTo(TaiKhoan, { foreignKey: "MaTK", targetKey: "MaTK" });
