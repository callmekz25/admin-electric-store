import type { OAS3Definition, OAS3Options } from "swagger-jsdoc";

import taiKhoanSchema from "../schemas/TaiKhoan.json";
const taiKhoan = taiKhoanSchema.definitions.TaiKhoanAttrs;
const definition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "My TypeScript API",
    version: "1.0.0",
    description: "Generated with swagger-jsdoc and TypeScript",
  },
  components: { schemas: { TaiKhoan: taiKhoan } },

  // servers: [{ url: `${process.env.HOST}:${process.env.PORT}` }],
  servers: [{ url: `/api/` }],
};

const options: OAS3Options = {
  definition,
  apis: ["./src/routes/*.ts"], // <- point to your route files
};

export default options;
