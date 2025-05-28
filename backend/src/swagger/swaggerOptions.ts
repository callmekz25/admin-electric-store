import type { OAS3Definition, OAS3Options } from "swagger-jsdoc";

import taiKhoanSchema from "../schemas/TaiKhoan.json";
import nhaCungCapSchema from "../schemas/NhaCungCap.json";
import loaiSanPhamSchema from "../schemas/LoaiSanPham.json";
import chiTietSanPhamSchema from "../schemas/ChiTietSanPham.json";
import { ChiTietSanPham } from "../models/ChiTietSanPham";

const taiKhoan = taiKhoanSchema.definitions.TaiKhoanAttrs;
const nhaCungCap = nhaCungCapSchema.definitions.NhaCungCapAttrs;
const loaiSanPham = loaiSanPhamSchema.definitions.LoaiSanPhamAttrs;
const chiTietSanPham = chiTietSanPhamSchema.definitions.ChiTietSanPhamAttrs;

const definition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "My TypeScript API",
    version: "1.0.0",
    description: "Generated with swagger-jsdoc and TypeScript",
  },
  components: {
    schemas: {
      TaiKhoan: taiKhoan,
      NhaCungCap: nhaCungCap,
      LoaiSanPham: loaiSanPham,
      ChiTietSanPham: chiTietSanPham,
    },
  },

  // servers: [{ url: `${process.env.HOST}:${process.env.PORT}` }],
  servers: [{ url: `/api/` }],
};

const options: OAS3Options = {
  definition,
  apis: ["./src/routes/*.ts"], // <- point to your route files
};

export default options;
