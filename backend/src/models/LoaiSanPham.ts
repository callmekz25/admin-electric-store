import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";

export interface LoaiSanPhamAttrs {
  MaLoaiSP: string;
  TenLSP: string;
  MotaLSP: string;
}
export class LoaiSanPham
  extends Model<LoaiSanPhamAttrs, Optional<LoaiSanPhamAttrs, "MaLoaiSP">>
  implements LoaiSanPhamAttrs
{
  public MaLoaiSP!: string;
  public TenLSP!: string;
  public MotaLSP!: string;
}
LoaiSanPham.init(
  {
    MaLoaiSP: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    TenLSP: { type: DataTypes.STRING(100), allowNull: false },
    MotaLSP: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: "LOAISANPHAM",
    freezeTableName: true,
    timestamps: false,
  }
);
