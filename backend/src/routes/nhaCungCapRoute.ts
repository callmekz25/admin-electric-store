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
    const tk = await db.NhaCungCap.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

// lấy tất cả
router.get("/", async (_req, res, next) => {
  try {
    const list = await db.NhaCungCap.findAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

const getNhaCungCapById: RequestHandler<{ MaNCC: string }> = async (
  req,
  res,
  next
) => {
  const { MaNCC } = req.params;
  try {
    const item = await db.NhaCungCap.findByPk(MaNCC);
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
router.get("/:MaNCC", getNhaCungCapById);

export default router;
