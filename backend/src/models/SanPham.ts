import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { ChiTietSanPham } from "./ChiTietSanPham";
import { DanhGia } from "./DanhGia";

interface SanPhamAttrs {
  MaSP: string;
  TenSP: string;
  MaCTSP: string;
  HinhAnh?: string;
  SoLuongTon?: number;
  MucGiamGia?: string;
  Gia?: number;
}

export class SanPham
  extends Model<SanPhamAttrs, Optional<SanPhamAttrs, "MaSP">>
  implements SanPhamAttrs
{
  public MaSP!: string;
  public TenSP!: string;
  public MaCTSP!: string;
  public HinhAnh?: string;
  public SoLuongTon?: number;
  public MucGiamGia?: string;
  public Gia?: number;
}

SanPham.init(
  {
    MaSP: { type: DataTypes.STRING(10), primaryKey: true, allowNull: false },
    TenSP: { type: DataTypes.STRING(100), allowNull: false },
    MaCTSP: {
      type: DataTypes.STRING(10),
      allowNull: false,
      // references: {
      //   model: "CHITIETSANPHAM",
      //   key: "MaCTSP",
      // },
      //onUpdate: "CASCADE",
      // onDelete: "NO ACTION",
    },
    HinhAnh: { type: DataTypes.STRING(200), allowNull: true },
    SoLuongTon: { type: DataTypes.INTEGER, allowNull: true },
    MucGiamGia: { type: DataTypes.STRING(10), allowNull: true },
    Gia: { type: DataTypes.DECIMAL, allowNull: true },
  },
  {
    sequelize,
    tableName: "SANPHAM",
    freezeTableName: true,
    timestamps: false,
  }
);

SanPham.belongsTo(ChiTietSanPham, { foreignKey: "MaCTSP" });
DanhGia.belongsTo(SanPham, { foreignKey: "MaSP" });
SanPham.hasMany(DanhGia, {
  foreignKey: "MaSP",
  sourceKey: "MaSP",
  as: "DanhSachDanhGia",
});
