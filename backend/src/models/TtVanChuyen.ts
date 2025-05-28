import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { HoaDon } from "./HoaDon";

interface TtVanChuyenAttrs {
  MaVC?: number;
  MaHD: string;
  TenDonViVC: string;
  Status: string;
  Description?: string;
  NgayGiaoDuKien?: Date;
  NgayGiaoThucTe?: Date;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

export class TtVanChuyen
  extends Model<TtVanChuyenAttrs, Optional<TtVanChuyenAttrs, "MaVC">>
  implements TtVanChuyenAttrs
{
  public MaVC!: number;
  public MaHD!: string;
  public TenDonViVC!: string;
  public Status!: string;
  public Description?: string;
  public NgayGiaoDuKien?: Date;
  public NgayGiaoThucTe?: Date;
  public CreatedAt?: Date;
  public UpdatedAt?: Date;
}

TtVanChuyen.init(
  {
    MaVC: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    MaHD: {
      type: DataTypes.STRING(10),
      allowNull: false,
      // references: {
      //   model: "HOADON",
      //   key: "MaHD",
      // },
      //onUpdate: "CASCADE",
      // onDelete: "NO ACTION",
    },
    TenDonViVC: { type: DataTypes.STRING(255), allowNull: false },
    Status: { type: DataTypes.STRING(50), allowNull: false },
    Description: { type: DataTypes.STRING(255), allowNull: true },
    NgayGiaoDuKien: { type: DataTypes.DATEONLY, allowNull: true },
    NgayGiaoThucTe: { type: DataTypes.DATEONLY, allowNull: true },
    CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    UpdatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "TTVANCHUYEN",
    freezeTableName: true,
    timestamps: false,
  }
);