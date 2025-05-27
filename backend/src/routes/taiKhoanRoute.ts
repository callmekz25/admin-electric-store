import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { db } from "../models";
import { DanhGia } from "../models/DanhGia";

const router = Router();

// tạo tài khoản
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tk = await db.TaiKhoan.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

// lấy tất cả
router.get("/", async (_req, res, next) => {
  try {
    const list = await db.TaiKhoan.findAll({
      include: [
        {
          model: DanhGia,
        },
      ],
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

const getTaiKhoanById: RequestHandler<{ MaTK: string }> = async (
  req,
  res,
  next
) => {
  const { MaTK } = req.params;
  try {
    const item = await db.TaiKhoan.findByPk(MaTK);
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
router.get("/:MaTK", getTaiKhoanById);

export default router;
