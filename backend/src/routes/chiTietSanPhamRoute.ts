import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";
import { NhaCungCap } from "../models/NhaCungCap";
import { LoaiSanPham } from "../models/LoaiSanPham";

const router = Router();

/**
 * @openapi
 * /chi-tiet-san-pham:
 *   get:
 *     summary: Lấy danh sách tất cả chi tiết sản phẩm
 *     tags:
 *       - ChiTietSanPham
 *     parameters:
 *       - in: query
 *         name: ctsp
 *         schema:
 *           type: string
 *       - in: query
 *         name: ncc
 *         schema:
 *           type: string
 *       - in: query
 *         name: lsp
 *         schema:
 *           type: string
 *       - in: query
 *         name: chct
 *         schema:
 *           type: string
 *       - in: query
 *         name: s
 *         schema:
 *           type: string
 *       - in: query
 *         name: bh
 *         schema:
 *           type: number
 *       - in: query
 *         name: m
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các chi tiết sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChiTietSanPham'
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
  const { ctsp, ncc, lsp, chct, s, bh, m } = _req.query;

  try {
    let list = await db.ChiTietSanPham.findAll({
      include: [
        {
          model: NhaCungCap,
        },
        {
          model: LoaiSanPham,
        },
      ],
    });

    if (ctsp != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.MaCTSP.toLowerCase().includes(
          ctsp.toString().toLowerCase().trim()
        )
      );

    if (ncc != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.MaNCC.toLowerCase().includes(
          ncc.toString().toLowerCase().trim()
        )
      );

    if (lsp != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.MaLoaiSP.toLowerCase().includes(
          lsp.toString().toLowerCase().trim()
        )
      );

    if (chct != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.CauHinhChiTiet?.toLowerCase().includes(
          chct.toString().toLowerCase().trim()
        )
      );

    if (s != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.Series_SP?.toLowerCase().includes(
          s.toString().toLowerCase().trim()
        )
      );

    if (bh != undefined)
      list = list.filter((ctSanPham) => ctSanPham.BaoHanh == Number(bh));

    if (m != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.MauSP?.toLowerCase().includes(
          m.toString().toLowerCase().trim()
        )
      );

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /chi-tiet-san-pham/{maCTSP}:
 *   get:
 *     summary: Lấy thông tin chi tiết sản phẩm theo maCTSP
 *     tags:
 *       - ChiTietSanPham
 *     parameters:
 *       - in: path
 *         name: maCTSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã chi tiết sản phẩm cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin chi tiết sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiTietSanPham'
 *       '404':
 *         description: Không tìm thấy chi tiết sản phẩm
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
router.get("/:maCTSP", async (req, res, next) => {
  const { maCTSP } = req.params;
  try {
    const item = await db.ChiTietSanPham.findByPk(maCTSP, {
      include: [
        {
          model: NhaCungCap,
        },
        {
          model: LoaiSanPham,
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
 * /chi-tiet-san-pham:
 *   post:
 *     summary: Tạo chi tiết sản phẩm mới
 *     tags:
 *       - ChiTietSanPham
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChiTietSanPham'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiTietSanPham'
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
    const ctSanPham = await db.ChiTietSanPham.create(req.body);
    res.status(201).json(ctSanPham);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /chi-tiet-san-pham/{maCTSP}:
 *   put:
 *     summary: Cập nhật thông tin chi tiết sản phẩm
 *     tags:
 *       - ChiTietSanPham
 *     parameters:
 *       - in: path
 *         name: maCTSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã chi tiết sản phẩm cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho chi tiết sản phẩm
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChiTietSanPham'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiTietSanPham'
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
 *         description: Không tìm thấy chi tiết sản phẩm
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
router.put("/:maCTSP", async (req, res, next) => {
  try {
    const { maCTSP } = req.params;
    const ctSanPham = req.body;
    let item = await db.ChiTietSanPham.findByPk(maCTSP);

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(ctSanPham);
      //res.status(200);
      res.status(200).json(item);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /chi-tiet-san-pham/{maCTSP}:
 *   delete:
 *     summary: Xoá chi tiết sản phẩm theo maCTSP
 *     tags:
 *       - ChiTietSanPham
 *     parameters:
 *       - in: path
 *         name: maCTSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã chi tiết sản phẩm cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy chi tiết sản phẩm
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
router.delete("/:maCTSP", async (req, res, next) => {
  try {
    const { maCTSP } = req.params;
    const deletedCount = await db.ChiTietSanPham.destroy({
      where: {
        MaCTSP: maCTSP,
      },
    });

    if (deletedCount == 0) {
      res.status(404).send({ description: "Không tìm thấy chi tiết sản phẩm" });
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
