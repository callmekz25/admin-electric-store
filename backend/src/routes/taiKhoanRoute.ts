import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";
import { DanhGia } from "../models/DanhGia";
import { HoaDon } from "../models/HoaDon";
import { ChiTietHoaDon } from "../models/ChiTietHoaDon";

const router = Router();

/**
 * @openapi
 * /tai-khoan:
 *   get:
 *     summary: Lấy danh sách tất cả tài khoản
 *     tags:
 *       - TaiKhoan
 *     parameters:
 *       - in: query
 *         name: mtk
 *         schema:
 *           type: string
 *       - in: query
 *         name: ht
 *         schema:
 *           type: string
 *       - in: query
 *         name: gt
 *         schema:
 *           type: string
 *       - in: query
 *         name: ns
 *         schema:
 *           type: string
 *       - in: query
 *         name: e
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
 *         description: Trả về mảng các tài khoản
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaiKhoan'
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
  const { mtk, ht, gt, ns, e, dc, sdt } = _req.query;

  try {
    let list = await db.TaiKhoan.findAll({
      include: [
        {
          model: DanhGia,
        },
        {
          model: HoaDon,
          as: "DanhSachHoaDon",
          include: [
            {
              model: ChiTietHoaDon,
              as: "DanhSachSanPham",
            },
          ],
        },
      ],
    });

    if (mtk != undefined)
      list = list.filter((tk) =>
        tk.MaTK.toLowerCase().includes(mtk.toString().toLowerCase().trim())
      );

    if (ht != undefined)
      list = list.filter((tk) =>
        tk.HoTenTK.toLowerCase().includes(ht.toString().toLowerCase().trim())
      );

    if (gt != undefined)
      list = list.filter((tk) =>
        tk.GioiTinh.toLowerCase().includes(gt.toString().toLowerCase().trim())
      );

    if (ns != undefined)
      list = list.filter((tk) =>
        new Date(tk.NgaySinh)
          .toISOString()
          .toLowerCase()
          .includes(ns.toString().toLowerCase().trim())
      );

    if (e != undefined)
      list = list.filter((tk) =>
        tk.Email.toLowerCase().includes(e.toString().toLowerCase().trim())
      );

    if (dc != undefined)
      list = list.filter((tk) =>
        tk.DiaChi.toLowerCase().includes(dc.toString().toLowerCase().trim())
      );

    if (sdt != undefined)
      list = list.filter((tk) =>
        tk.SDT?.toLowerCase().includes(sdt.toString().toLowerCase().trim())
      );

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /tai-khoan/{maTK}:
 *   get:
 *     summary: Lấy thông tin tài khoản theo maTK
 *     tags:
 *       - TaiKhoan
 *     parameters:
 *       - in: path
 *         name: maTK
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã tài khoản cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin tài khoản
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaiKhoan'
 *       '404':
 *         description: Không tìm thấy tài khoản
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
router.get("/:maTK", async (req, res, next) => {
  const { maTK } = req.params;
  try {
    const item = await db.TaiKhoan.findByPk(maTK, {
      include: [
        {
          model: DanhGia,
        },
        {
          model: HoaDon,
          as: "DanhSachHoaDon",
          include: [
            {
              model: ChiTietHoaDon,
              as: "DanhSachSanPham",
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
 * /tai-khoan:
 *   post:
 *     summary: Tạo tài khoản mới
 *     tags:
 *       - TaiKhoan
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaiKhoan'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaiKhoan'
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
    const tk = await db.TaiKhoan.create(req.body);
    res.status(201).json(tk);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /tai-khoan/{maTK}:
 *   put:
 *     summary: Cập nhật thông tin tài khoản
 *     tags:
 *       - TaiKhoan
 *     parameters:
 *       - in: path
 *         name: maTK
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã tài khoản cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho tài khoản
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaiKhoan'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaiKhoan'
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
 *         description: Không tìm thấy tài khoản
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
router.put("/:maTK", async (req, res, next) => {
  try {
    const { maTK } = req.params;
    const taiKhoan = req.body;
    let item = await db.TaiKhoan.findByPk(maTK);

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(taiKhoan);
      //res.status(200);
      res.status(200).json(item);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /tai-khoan/{maTK}:
 *   delete:
 *     summary: Xoá tài khoản theo maTK
 *     tags:
 *       - TaiKhoan
 *     parameters:
 *       - in: path
 *         name: maTK
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã tài khoản cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy tài khoản
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
router.delete("/:maTK", async (req, res, next) => {
  try {
    const { maTK } = req.params;
    const deletedCount = await db.TaiKhoan.destroy({
      where: {
        MaTK: maTK,
      },
    });

    if (deletedCount == 0) {
      res.status(404).send({ description: "Không tìm thấy tài khoản" });
    } else {
      res
        .status(204)
        .send({ description: "Xóa thành công, không trả về nội dung" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
