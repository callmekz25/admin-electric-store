import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { NhaCungCap } from "./NhaCungCap";
import { LoaiSanPham } from "./LoaiSanPham";

interface ChiTietSanPhamAttrs {
  MaCTSP: string;
  MaNCC: string;
  MaLoaiSP: string;
  CauHinhChiTiet?: string;
  Series_SP?: string;
  BaoHanh?: number;
  MauSP?: string;
}

export class ChiTietSanPham
  extends Model<ChiTietSanPhamAttrs, Optional<ChiTietSanPhamAttrs, "MaCTSP">>
  implements ChiTietSanPhamAttrs
{
  public MaCTSP!: string;
  public MaNCC!: string;
  public MaLoaiSP!: string;
  public CauHinhChiTiet?: string;
  public Series_SP?: string;
  public BaoHanh?: number;
  public MauSP?: string;
}

ChiTietSanPham.init(
  {
    MaCTSP: { type: DataTypes.STRING(10), primaryKey: true, allowNull: false },
    MaNCC: {
      type: DataTypes.STRING(10),
      allowNull: false,
      // references: {
      //   model: "NHACUNGCAP",
      //   key: "MaNCC",
      // },
      //onUpdate: "CASCADE",
      // onDelete: "NO ACTION",
    },
    MaLoaiSP: {
      type: DataTypes.STRING(10),
      allowNull: false,
      // references: {
      //   model: "LOAISANPHAM",
      //   key: "MaLoaiSP",
      // },
      //onUpdate: "CASCADE",
      // onDelete: "NO ACTION",
    },
    CauHinhChiTiet: { type: DataTypes.STRING(200), allowNull: true },
    Series_SP: { type: DataTypes.STRING(20), allowNull: true },
    BaoHanh: { type: DataTypes.INTEGER, allowNull: true },
    MauSP: { type: DataTypes.STRING(10), allowNull: true },
  },
  {
    sequelize,
    tableName: "CHITIETSANPHAM",
    freezeTableName: true,
    timestamps: false,
  }
);

ChiTietSanPham.belongsTo(NhaCungCap, { foreignKey: "MaNCC", as: "ncc" });
ChiTietSanPham.belongsTo(LoaiSanPham, { foreignKey: "MaLoaiSP", as: "loai" });
