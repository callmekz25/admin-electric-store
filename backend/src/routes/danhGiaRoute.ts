import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { db } from "../models";

const router = Router();

// tạo 
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tk = await db.DanhGia.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

// lấy tất cả
router.get("/", async (_req, res, next) => {
  try {
    const list = await db.DanhGia.findAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

const getDanhGiaById: RequestHandler<{ MaDG: string }> = async (
  req,
  res,
  next
) => {
  const { MaDG } = req.params;
  try {
    const item = await db.DanhGia.findByPk(MaDG);
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
router.get("/:MaDG", getDanhGiaById);

export default router;
