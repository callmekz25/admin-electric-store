import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";

const router = Router();

/**
 * @openapi
 * /danh-gia:
 *   get:
 *     summary: Lấy danh sách tất cả đánh giá
 *     tags:
 *       - DanhGia
 *     parameters:
 *       - in: query
 *         name: sp
 *         schema:
 *           type: string
 *       - in: query
 *         name: tk
 *         schema:
 *           type: string
 *       - in: query
 *         name: s
 *         schema:
 *           type: number
 *       - in: query
 *         name: bl
 *         schema:
 *           type: string
 *       - in: query
 *         name: ndg
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DanhGia'
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
  const { sp, tk, s, bl, ndg } = _req.query;

  try {
    let list = await db.DanhGia.findAll();

    if (sp != undefined)
      list = list.filter((danhGia) =>
        danhGia.MaSP.toLowerCase().includes(sp.toString().toLowerCase().trim())
      );

    if (tk != undefined)
      list = list.filter((danhGia) =>
        danhGia.MaTK.toLowerCase().includes(tk.toString().toLowerCase().trim())
      );

    if (s != undefined)
      list = list.filter((danhGia) => danhGia.SoSao == Number(s));

    if (bl != undefined)
      list = list.filter((danhGia) =>
        danhGia.BinhLuan?.toLowerCase().includes(
          bl.toString().toLowerCase().trim()
        )
      );

    if (ndg != undefined)
      list = list.filter((danhGia) =>
        new Date(danhGia.NgayDanhGia ?? "")
          .toISOString()
          .toLowerCase()
          .includes(ndg.toString().toLowerCase().trim())
      );

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /danh-gia/{maDG}:
 *   get:
 *     summary: Lấy thông tin đánh giá theo maDG
 *     tags:
 *       - DanhGia
 *     parameters:
 *       - in: path
 *         name: maDG
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã đánh giá cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DanhGia'
 *       '404':
 *         description: Không tìm thấy đánh giá
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
router.get("/:maDG", async (req, res, next) => {
  const { maDG } = req.params;
  try {
    const item = await db.DanhGia.findByPk(maDG);
    if (!item) {
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /danh-gia:
 *   post:
 *     summary: Tạo đánh giá mới
 *     tags:
 *       - DanhGia
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DanhGia'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DanhGia'
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
    const danhGia = await db.DanhGia.create(req.body);
    res.status(201).json(danhGia);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/**
 * @openapi
 * /danh-gia/{maDG}:
 *   put:
 *     summary: Cập nhật thông tin đánh giá
 *     tags:
 *       - DanhGia
 *     parameters:
 *       - in: path
 *         name: maDG
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã đánh giá cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho đánh giá
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DanhGia'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DanhGia'
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
 *         description: Không tìm thấy đánh giá
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
router.put("/:maDG", async (req, res, next) => {
  try {
    const { maDG } = req.params;
    const danhGia = req.body;
    let item = await db.DanhGia.findByPk(maDG);

    if (!item) {
    } else {
      await item.update(danhGia);
      //res.status(200);
      res.status(200).send({ description: "Cập nhật thành công" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /danh-gia/{maDG}:
 *   delete:
 *     summary: Xoá đánh giá theo maDG
 *     tags:
 *       - DanhGia
 *     parameters:
 *       - in: path
 *         name: maDG
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã đánh giá cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy đánh giá
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
router.delete("/:maDG", async (req, res, next) => {
  try {
    const { maDG } = req.params;
    const deletedCount = await db.DanhGia.destroy({
      where: {
        MaDG: maDG,
      },
    });

    if (deletedCount == 0) {
      res.status(404).send({ description: "Không tìm thấy đánh giá" });
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
