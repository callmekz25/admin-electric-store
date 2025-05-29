import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";
import { DanhGia } from "../models/DanhGia";
import { HoaDon } from "../models/HoaDon";
import { ChiTietHoaDon } from "../models/ChiTietHoaDon";

const router = Router();

/**
 * @openapi
 * /tt-van-chuyen:
 *   get:
 *     summary: Lấy danh sách tất cả thông tin vận chuyển
 *     tags:
 *       - TtVanChuyen
 *     parameters:
 *       - in: query
 *         name: vc
 *         schema:
 *           type: number
 *       - in: query
 *         name: hd
 *         schema:
 *           type: string
 *       - in: query
 *         name: dv
 *         schema:
 *           type: string
 *       - in: query
 *         name: stt
 *         schema:
 *           type: string
 *       - in: query
 *         name: des
 *         schema:
 *           type: string
 *       - in: query
 *         name: dk
 *         schema:
 *           type: string
 *       - in: query
 *         name: tt
 *         schema:
 *           type: string
 *       - in: query
 *         name: cre
 *         schema:
 *           type: string
 *       - in: query
 *         name: upd
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các thông tin vận chuyển
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TtVanChuyen'
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
  const { vc, hd, dv, stt, des, dk, tt, cre, upd } = _req.query;

  try {
    let list = await db.TtVanChuyen.findAll();

    if (vc != undefined) list = list.filter((ttvc) => ttvc.MaVC == Number(vc));

    if (hd != undefined)
      list = list.filter((ttvc) =>
        ttvc.MaHD.toLowerCase().includes(hd.toString().toLowerCase().trim())
      );

    if (dv != undefined)
      list = list.filter((ttvc) =>
        ttvc.TenDonViVC.toLowerCase().includes(
          dv.toString().toLowerCase().trim()
        )
      );

    if (stt != undefined)
      list = list.filter((ttvc) =>
        ttvc.Status.toLowerCase().includes(stt.toString().toLowerCase().trim())
      );

    if (des != undefined)
      list = list.filter((ttvc) =>
        ttvc.Description?.toLowerCase().includes(
          des.toString().toLowerCase().trim()
        )
      );

    if (dk != undefined)
      list = list.filter((ttvc) =>
        new Date(ttvc.NgayGiaoDuKien ?? "")
          .toISOString()
          .toLowerCase()
          .includes(dk.toString().toLowerCase().trim())
      );

    if (tt != undefined)
      list = list.filter((ttvc) =>
        new Date(ttvc.NgayGiaoThucTe ?? "")
          .toISOString()
          .toLowerCase()
          .includes(tt.toString().toLowerCase().trim())
      );

    if (cre != undefined)
      list = list.filter((ttvc) =>
        new Date(ttvc.CreatedAt ?? "")
          .toISOString()
          .toLowerCase()
          .includes(cre.toString().toLowerCase().trim())
      );

    if (upd != undefined)
      list = list.filter((ttvc) =>
        new Date(ttvc.UpdatedAt ?? "")
          .toISOString()
          .toLowerCase()
          .includes(upd.toString().toLowerCase().trim())
      );

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /tt-van-chuyen/{maVC}:
 *   get:
 *     summary: Lấy thông tin thông tin vận chuyển theo maVC
 *     tags:
 *       - TtVanChuyen
 *     parameters:
 *       - in: path
 *         name: maVC
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã thông tin vận chuyển cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin thông tin vận chuyển
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TtVanChuyen'
 *       '404':
 *         description: Không tìm thấy thông tin vận chuyển
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
router.get("/:maVC", async (req, res, next) => {
  const { maVC } = req.params;
  try {
    const item = await db.TtVanChuyen.findByPk(maVC);
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
 * /tt-van-chuyen:
 *   post:
 *     summary: Tạo thông tin vận chuyển mới
 *     tags:
 *       - TtVanChuyen
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TtVanChuyen'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TtVanChuyen'
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
    const ttvc = await db.TtVanChuyen.create(req.body);
    res.status(201).json(ttvc);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /tt-van-chuyen/{maVC}:
 *   put:
 *     summary: Cập nhật thông tin thông tin vận chuyển
 *     tags:
 *       - TtVanChuyen
 *     parameters:
 *       - in: path
 *         name: maVC
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã thông tin vận chuyển cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho thông tin vận chuyển
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TtVanChuyen'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TtVanChuyen'
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
 *         description: Không tìm thấy thông tin vận chuyển
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
router.put("/:maVC", async (req, res, next) => {
  try {
    const { maVC } = req.params;
    const TtVanChuyen = req.body;
    let item = await db.TtVanChuyen.findByPk(maVC);

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(TtVanChuyen);
      //res.status(200);
      res.status(200).json(item);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /tt-van-chuyen/{maVC}:
 *   delete:
 *     summary: Xoá thông tin vận chuyển theo maVC
 *     tags:
 *       - TtVanChuyen
 *     parameters:
 *       - in: path
 *         name: maVC
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã thông tin vận chuyển cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy thông tin vận chuyển
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
router.delete("/:maVC", async (req, res, next) => {
  try {
    const { maVC } = req.params;
    const deletedCount = await db.TtVanChuyen.destroy({
      where: {
        MaVC: maVC,
      },
    });

    if (deletedCount == 0) {
      res
        .status(404)
        .send({ description: "Không tìm thấy thông tin vận chuyển" });
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
