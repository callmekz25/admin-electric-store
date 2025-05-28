import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { db } from "../models";
import { DanhGia } from "../models/DanhGia";
import { LoaiSanPham } from "../models/LoaiSanPham";
import { ChiTietSanPham } from "../models/ChiTietSanPham";
import { NhaCungCap } from "../models/NhaCungCap";

const router = Router();

// tạo
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tk = await db.SanPham.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

// lấy tất cả
router.get("/", async (_req, res, next) => {
  try {
    const list = await db.SanPham.findAll({
      include: [
        {
          model: DanhGia,
          as: "DanhSachDanhGia",
        },
        {
          model: ChiTietSanPham,
          include: [
            {
              model: LoaiSanPham,
            },
            {
              model: NhaCungCap,
            },
          ],
        },
      ],
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

const getSanPhamById: RequestHandler<{ MaSP: string }> = async (
  req,
  res,
  next
) => {
  const { MaSP } = req.params;
  try {
    const item = await db.SanPham.findByPk(MaSP);
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
router.get("/:MaSP", getSanPhamById);

export default router;
