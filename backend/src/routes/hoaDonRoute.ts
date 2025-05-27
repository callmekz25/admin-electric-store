import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { db } from "../models";
import { ChiTietHoaDon } from "../models/ChiTietHoaDon";
import { SanPham } from "../models/SanPham";
import { ChiTietSanPham } from "../models/ChiTietSanPham";
import { TaiKhoan } from "../models/TaiKhoan";
import { NhaCungCap } from "../models/NhaCungCap";
import { LoaiSanPham } from "../models/LoaiSanPham";
import { TtVanChuyen } from "../models/TtVanChuyen";

const router = Router();

// tạo
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tk = await db.HoaDon.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

// lấy tất cả
router.get("/", async (_req, res, next) => {
  try {
    const list = await db.HoaDon.findAll({
      include: [
        {
          model: ChiTietHoaDon,
          as: "DanhSachSanPham",
          include: [
            {
              model: SanPham,
              include: [
                {
                  model: ChiTietSanPham,
                  include: [
                    {
                      model: NhaCungCap,
                    },
                    {
                      model: LoaiSanPham,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: TaiKhoan,
        },
        {
          model: TtVanChuyen,
        },
      ],
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

const getHoaDonById: RequestHandler<{ MaHD: string }> = async (
  req,
  res,
  next
) => {
  const { MaHD } = req.params;
  try {
    const item = await db.HoaDon.findByPk(MaHD);
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
router.get("/:MaHD", getHoaDonById);

export default router;
