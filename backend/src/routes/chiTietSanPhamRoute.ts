import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";

const router = Router();

/**
 * @openapi
 * /ct-san-pham:
 *   get:
 *     summary: Lấy danh sách tất cả chi tiết sản phẩm
 *     tags:
 *       - ChiTietSanPham
 *     parameters:
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
  const { t, mt } = _req.query;

  try {
    let list = await db.ChiTietSanPham.findAll();

    if (t != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.TenLSP.toLowerCase().includes(
          t.toString().toLowerCase().trim()
        )
      );

    if (mt != undefined)
      list = list.filter((ctSanPham) =>
        ctSanPham.MotaLSP.toLowerCase().includes(
          mt.toString().toLowerCase().trim()
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
    const item = await db.ChiTietSanPham.findByPk(maCTSP);
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
      res.status(200);
      res.send({ description: "Cập nhật thành công" });
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
      res.send({ description: "Không tìm thấy chi tiết sản phẩm" });
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
