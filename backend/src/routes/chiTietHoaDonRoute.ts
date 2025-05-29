import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";
import { DanhGia } from "../models/DanhGia";
import { HoaDon } from "../models/HoaDon";
import { ChiTietHoaDon } from "../models/ChiTietHoaDon";
import { SanPham } from "../models/SanPham";
import { ChiTietSanPham } from "../models/ChiTietSanPham";

const router = Router();

/**
 * @openapi
 * /chi-tiet-hoa-don:
 *   get:
 *     summary: Lấy danh sách tất cả chi tiết hóa đơn
 *     tags:
 *       - ChiTietHoaDon
 *     parameters:
 *       - in: query
 *         name: sp
 *         schema:
 *           type: string
 *       - in: query
 *         name: sl
 *         schema:
 *           type: number
 *       - in: query
 *         name: g
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Trả về mảng các chi tiết hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChiTietHoaDon'
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
  const { sp, sl, g } = _req.query;

  try {
    let list = await db.ChiTietHoaDon.findAll({
      include: [
        {
          model: SanPham,
          include: [
            {
              model: ChiTietSanPham,
            },
          ],
        },
      ],
    });

    if (sp != undefined)
      list = list.filter((tk) =>
        tk.MaSP.toLowerCase().includes(sp.toString().toLowerCase().trim())
      );

    if (sl != undefined) list = list.filter((tk) => tk.SoLuong == Number(sl));

    if (g != undefined) list = list.filter((tk) => tk.GiaBan == Number(g));

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /chi-tiet-hoa-don/{maHD}:
 *   get:
 *     summary: Lấy thông tin chi tiết hóa đơn theo maHD
 *     tags:
 *       - ChiTietHoaDon
 *     parameters:
 *       - in: path
 *         name: maHD
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã chi tiết hóa đơn cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin chi tiết hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiTietHoaDon'
 *       '404':
 *         description: Không tìm thấy chi tiết hóa đơn
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
router.get("/:maHD", async (req, res, next) => {
  const { maHD } = req.params;
  try {
    const item = await db.ChiTietHoaDon.findByPk(maHD, {
      include: [
        {
          model: SanPham,
          include: [
            {
              model: ChiTietSanPham,
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
 * /chi-tiet-hoa-don:
 *   post:
 *     summary: Tạo chi tiết hóa đơn mới
 *     tags:
 *       - ChiTietHoaDon
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChiTietHoaDon'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiTietHoaDon'
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
    const tk = await db.ChiTietHoaDon.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /chi-tiet-hoa-don/{maHD}:
 *   put:
 *     summary: Cập nhật thông tin chi tiết hóa đơn
 *     tags:
 *       - ChiTietHoaDon
 *     parameters:
 *       - in: path
 *         name: maHD
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã chi tiết hóa đơn cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho chi tiết hóa đơn
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChiTietHoaDon'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiTietHoaDon'
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
 *         description: Không tìm thấy chi tiết hóa đơn
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
router.put("/:maHD", async (req, res, next) => {
  try {
    const { maHD } = req.params;
    const ChiTietHoaDon = req.body;
    let item = await db.ChiTietHoaDon.findByPk(maHD);

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(ChiTietHoaDon);
      //res.status(200);
      res.status(200).json(item);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /chi-tiet-hoa-don/{maHD}:
 *   delete:
 *     summary: Xoá chi tiết hóa đơn theo maHD
 *     tags:
 *       - ChiTietHoaDon
 *     parameters:
 *       - in: path
 *         name: maHD
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã chi tiết hóa đơn cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy chi tiết hóa đơn
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
router.delete("/:maHD", async (req, res, next) => {
  try {
    const { maHD } = req.params;
    const deletedCount = await db.ChiTietHoaDon.destroy({
      where: {
        MaHD: maHD,
      },
    });

    if (deletedCount == 0) {
      res.status(404).send({ description: "Không tìm thấy chi tiết hóa đơn" });
    } else {
      res
        .status(204)
        .send({ description: "Xóa thành công, không trả về nội dung" });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
