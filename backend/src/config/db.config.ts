import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  development: {
    username: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "YourStrong!Passw0rd",
    database: process.env.DB_DATABASE || "mydb",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 1433,
    dialect: "mssql" as Dialect,
    dialectOptions: {
      options: {
        encrypt: true,
        enableArithAbort: true,
      },
    },
  },
};

const env = process.env.NODE_ENV || "development";

export const sequelize = new Sequelize(
  dbConfig["development"].database,
  dbConfig["development"].username,
  dbConfig["development"].password,
  dbConfig["development"]
);
