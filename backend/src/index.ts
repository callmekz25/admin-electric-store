import express from "express";
import { db } from "./models";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger/swaggerOptions";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocument from "./swagger/swagger.json";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple health-check
app.get("/", (_req: any, res: any) => res.send("OKE"));

// mount API router under /api
app.use("/api", routes);

// generate OpenAPI spec
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
// db.sequelize.sync({ alter: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
