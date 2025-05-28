import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { ChiTietSanPham } from "./ChiTietSanPham";

export interface NhaCungCapAttrs {
  MaNCC: string;
  TenNCC: string;
  DiaChiNCC?: string;
  SDT_NCC?: string;
}
export class NhaCungCap
  extends Model<NhaCungCapAttrs, Optional<NhaCungCapAttrs, "MaNCC">>
  implements NhaCungCapAttrs
{
  public MaNCC!: string;
  public TenNCC!: string;
  public DiaChiNCC?: string;
  public SDT_NCC?: string;
}
NhaCungCap.init(
  {
    MaNCC: { type: DataTypes.STRING(10), primaryKey: true, allowNull: false },
    TenNCC: { type: DataTypes.STRING(20), allowNull: false },
    DiaChiNCC: { type: DataTypes.STRING(100), allowNull: true },
    SDT_NCC: { type: DataTypes.STRING(20), allowNull: true },
  },
  {
    sequelize,
    tableName: "NHACUNGCAP",
    freezeTableName: true,
    timestamps: false,
  }
);
