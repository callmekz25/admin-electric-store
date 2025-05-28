import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { db } from "../models";
import { ChiTietSanPham } from "../models/ChiTietSanPham";

const router = Router();

/**
 * @openapi
 * /nha-cung-cap:
 *   get:
 *     summary: Lấy danh sách tất cả nhà cung cấp
 *     tags:
 *       - NhaCungCap
 *     parameters:
 *       - in: query
 *         name: t
 *         schema:
 *           type: string
 *       - in: query
 *         name: dc
 *         schema:
 *           type: string
 *       - in: query
 *         name: sdt
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các nhà cung cấp
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NhaCungCap'
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
  const { t, dc, sdt } = _req.query;

  try {
    let list = await db.NhaCungCap.findAll({
      include: [
        {
          model: ChiTietSanPham,
          as: "DanhSachSanPham",
        },
      ],
    });

    if (t != undefined)
      list = list.filter((ncc) =>
        ncc.TenNCC.toLowerCase().includes(t.toString().toLowerCase().trim())
      );

    if (dc != undefined)
      list = list.filter((ncc) =>
        ncc.DiaChiNCC?.toLowerCase().includes(
          dc.toString().toLowerCase().trim()
        )
      );

    if (sdt != undefined)
      list = list.filter((ncc) =>
        ncc.SDT_NCC?.toLowerCase().includes(sdt.toString().toLowerCase().trim())
      );

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /nha-cung-cap/{maNCC}:
 *   get:
 *     summary: Lấy thông tin nhà cung cấp theo maNCC
 *     tags:
 *       - NhaCungCap
 *     parameters:
 *       - in: path
 *         name: maNCC
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã nhà cung cấp cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin nhà cung cấp
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NhaCungCap'
 *       '404':
 *         description: Không tìm thấy nhà cung cấp
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
router.get("/:maNCC", async (req, res, next) => {
  const { maNCC } = req.params;
  try {
    const item = await db.NhaCungCap.findByPk(maNCC);
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
 * /nha-cung-cap:
 *   post:
 *     summary: Tạo nhà cung cấp mới
 *     tags:
 *       - NhaCungCap
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NhaCungCap'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NhaCungCap'
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
    const ncc = await db.NhaCungCap.create(req.body);
    res.status(201).json(ncc);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /nha-cung-cap/{maNCC}:
 *   put:
 *     summary: Cập nhật thông tin nhà cung cấp
 *     tags:
 *       - NhaCungCap
 *     parameters:
 *       - in: path
 *         name: maNCC
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã nhà cung cấp cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho nhà cung cấp
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NhaCungCap'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NhaCungCap'
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
 *         description: Không tìm thấy nhà cung cấp
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
router.put("/:maNCC", async (req, res, next) => {
  try {
    const { maNCC } = req.params;
    const NhaCungCap = req.body;
    let item = await db.NhaCungCap.findByPk(maNCC);

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(NhaCungCap);
      res.status(200);
      res.send({ description: "Cập nhật thành công" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /nha-cung-cap/{maNCC}:
 *   delete:
 *     summary: Xoá nhà cung cấp theo maNCC
 *     tags:
 *       - NhaCungCap
 *     parameters:
 *       - in: path
 *         name: maNCC
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã nhà cung cấp cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy nhà cung cấp
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
router.delete("/:maNCC", async (req, res, next) => {
  try {
    const { maNCC } = req.params;
    const deletedCount = await db.NhaCungCap.destroy({
      where: {
        MaNCC: maNCC,
      },
    });

    if (deletedCount == 0) {
      res.send({ description: "Không tìm thấy nhà cung cấp" });
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
