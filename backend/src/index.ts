import express from "express";
import { db } from "./models";
import routes from "./routes";

const app = express();
app.use(express.json());

// simple health-check
app.get("/", (_req: any, res: any) => res.send("OKE"));

// mount API router under /api
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
// db.sequelize.sync({ alter: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
