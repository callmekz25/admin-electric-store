import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";

const router = Router();

/**
 * @openapi
 * /loai-san-pham:
 *   get:
 *     summary: Lấy danh sách tất cả loại sản phẩm
 *     tags:
 *       - LoaiSanPham
 *     parameters:
 *       - in: query
 *         name: lsp
 *         schema:
 *           type: string
 *       - in: query
 *         name: t
 *         schema:
 *           type: string
 *       - in: query
 *         name: mt
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các loại sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoaiSanPham'
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
  const { lsp, t, mt } = _req.query;

  try {
    let list = await db.LoaiSanPham.findAll();

    if (lsp != undefined)
      list = list.filter((loaiSP) =>
        loaiSP.TenLSP.toLowerCase().includes(
          lsp.toString().toLowerCase().trim()
        )
      );

    if (t != undefined)
      list = list.filter((loaiSP) =>
        loaiSP.TenLSP.toLowerCase().includes(t.toString().toLowerCase().trim())
      );

    if (mt != undefined)
      list = list.filter((loaiSP) =>
        loaiSP.MotaLSP.toLowerCase().includes(
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
 * /loai-san-pham/{maLoaiSP}:
 *   get:
 *     summary: Lấy thông tin loại sản phẩm theo maLoaiSP
 *     tags:
 *       - LoaiSanPham
 *     parameters:
 *       - in: path
 *         name: maLoaiSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã loại sản phẩm cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin loại sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoaiSanPham'
 *       '404':
 *         description: Không tìm thấy loại sản phẩm
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
router.get("/:maLoaiSP", async (req, res, next) => {
  const { maLoaiSP } = req.params;
  try {
    const item = await db.LoaiSanPham.findByPk(maLoaiSP);
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
 * /loai-san-pham:
 *   post:
 *     summary: Tạo loại sản phẩm mới
 *     tags:
 *       - LoaiSanPham
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoaiSanPham'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoaiSanPham'
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
    const loaiSP = await db.LoaiSanPham.create(req.body);
    res.status(201).json(loaiSP);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /loai-san-pham/{maLoaiSP}:
 *   put:
 *     summary: Cập nhật thông tin loại sản phẩm
 *     tags:
 *       - LoaiSanPham
 *     parameters:
 *       - in: path
 *         name: maLoaiSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã loại sản phẩm cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho loại sản phẩm
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoaiSanPham'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoaiSanPham'
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
 *         description: Không tìm thấy loại sản phẩm
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
router.put("/:maLoaiSP", async (req, res, next) => {
  try {
    const { maLoaiSP } = req.params;
    const loaiSP = req.body;
    let item = await db.LoaiSanPham.findByPk(maLoaiSP);

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(loaiSP);
      //res.status(200);
      res.status(200).json(item);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /loai-san-pham/{maLoaiSP}:
 *   delete:
 *     summary: Xoá loại sản phẩm theo maLoaiSP
 *     tags:
 *       - LoaiSanPham
 *     parameters:
 *       - in: path
 *         name: maLoaiSP
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã loại sản phẩm cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy loại sản phẩm
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
router.delete("/:maLoaiSP", async (req, res, next) => {
  try {
    const { maLoaiSP } = req.params;
    const deletedCount = await db.LoaiSanPham.destroy({
      where: {
        MaLoaiSP: maLoaiSP,
      },
    });

    if (deletedCount == 0) {
      res.status(404).send({ description: "Không tìm thấy loại sản phẩm" });
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
