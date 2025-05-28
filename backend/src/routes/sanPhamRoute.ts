import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";
import { DanhGia } from "../models/DanhGia";
import { HoaDon } from "../models/HoaDon";
import { ChiTietHoaDon } from "../models/ChiTietHoaDon";
import { ChiTietSanPham } from "../models/ChiTietSanPham";
import { NhaCungCap } from "../models/NhaCungCap";
import { LoaiSanPham } from "../models/LoaiSanPham";

const router = Router();

/**
 * @openapi
 * /san-pham:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags:
 *       - SanPham
 *     parameters:
 *       - in: query
 *         name: t
 *         schema:
 *           type: string
 *       - in: query
 *         name: ctsp
 *         schema:
 *           type: string
 *       - in: query
 *         name: h
 *         schema:
 *           type: string
 *       - in: query
 *         name: sl
 *         schema:
 *           type: number
 *       - in: query
 *         name: mgg
 *         schema:
 *           type: string
 *       - in: query
 *         name: g
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Trả về mảng các sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SanPham'
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/", async (_req, res, next) => {
  const { t, ctsp, h, sl, mgg, g } = _req.query;

  try {
    let list = await db.SanPham.findAll({
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
    });

    if (t != undefined)
      list = list.filter((sp) =>
        sp.TenSP.toLowerCase().includes(t.toString().toLowerCase().trim())
      );

    if (ctsp != undefined)
      list = list.filter((sp) =>
        sp.MaCTSP.toLowerCase().includes(ctsp.toString().toLowerCase().trim())
      );

    if (h != undefined)
      list = list.filter((sp) =>
        sp.MaCTSP.toLowerCase().includes(sp.toString().toLowerCase().trim())
      );

    if (sl != undefined)
      list = list.filter((sp) => sp.SoLuongTon == Number(sl));

    if (mgg != undefined)
      list = list.filter((sp) =>
        sp.MucGiamGia?.toLowerCase().includes(
          mgg.toString().toLowerCase().trim()
        )
      );

    if (g != undefined) list = list.filter((sp) => sp.Gia == Number(sl));

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /san-pham/{maSP}:
 *   get:
 *     summary: Lấy thông tin sản phẩm theo maSP
 *     tags:
 *       - SanPham
 *     parameters:
 *       - in: path
 *         name: maSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã sản phẩm cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       '404':
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/:maSP", async (req, res, next) => {
  const { maSP } = req.params;
  try {
    const item = await db.SanPham.findByPk(maSP, {
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
    });
    if (!item) {
      res.sendStatus(404);
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /san-pham:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags:
 *       - SanPham
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SanPham'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       '400':
 *         description: Bad request — validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sp = await db.SanPham.create(req.body);
    res.status(201).json(sp);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /san-pham/{maSP}:
 *   put:
 *     summary: Cập nhật thông tin sản phẩm
 *     tags:
 *       - SanPham
 *     parameters:
 *       - in: path
 *         name: maSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã sản phẩm cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho sản phẩm
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SanPham'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/:maSP", async (req, res, next) => {
  try {
    const { maSP } = req.params;
    const SanPham = req.body;
    let item = await db.SanPham.findByPk(maSP);

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(SanPham);
      res.status(200);
      res.send({ description: "Cập nhật thành công" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /san-pham/{maSP}:
 *   delete:
 *     summary: Xoá sản phẩm theo maSP
 *     tags:
 *       - SanPham
 *     parameters:
 *       - in: path
 *         name: maSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã sản phẩm cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/:maSP", async (req, res, next) => {
  try {
    const { maSP } = req.params;
    const deletedCount = await db.SanPham.destroy({
      where: {
        MaSP: maSP,
      },
    });

    if (deletedCount == 0) {
      res.send({ description: "Không tìm thấy sản phẩm" });
      res.sendStatus(404);
    } else {
      res.send({ description: "Xóa thành công, không trả về nội dung" });
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
