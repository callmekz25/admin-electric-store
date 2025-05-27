import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { db } from "../models";
import { HoaDon } from "../models/HoaDon";

const router = Router();

// tạo
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tk = await db.TtVanChuyen.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

// lấy tất cả
router.get("/", async (_req, res, next) => {
  try {
    const list = await db.TtVanChuyen.findAll({
      include: [
        {
          model: HoaDon,
          as: "hoaDon", // optional nếu bạn đặt alias
        },
      ],
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

const getTtVanChuyenById: RequestHandler<{ MaVC: string }> = async (
  req,
  res,
  next
) => {
  const { MaVC } = req.params;
  try {
    const item = await db.TtVanChuyen.findByPk(MaVC);
    if (!item) {
      res.sendStatus(404);
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// lấy theo Khóa chính
router.get("/:MaVC", getTtVanChuyenById);

export default router;
