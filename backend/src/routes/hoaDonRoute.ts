import { Router, Request, Response, NextFunction } from "express";
import { db } from "../models";
import { HoaDon } from "../models/HoaDon";
import { ChiTietHoaDon } from "../models/ChiTietHoaDon";
import { ChiTietSanPham } from "../models/ChiTietSanPham";
import { LoaiSanPham } from "../models/LoaiSanPham";
import { NhaCungCap } from "../models/NhaCungCap";
import { SanPham } from "../models/SanPham";
import { TaiKhoan } from "../models/TaiKhoan";
import { TtVanChuyen } from "../models/TtVanChuyen";
import { col, fn, literal } from "sequelize";
import dayjs from "dayjs";

const router = Router();

/**
 * @openapi
 * /hoa-don:
 *   get:
 *     summary: Lấy danh sách tất cả hóa đơn
 *     tags:
 *       - HoaDon
 *     parameters:
 *       - in: query
 *         name: hd
 *         schema:
 *           type: string
 *       - in: query
 *         name: tk
 *         schema:
 *           type: string
 *       - in: query
 *         name: nl
 *         schema:
 *           type: string
 *       - in: query
 *         name: ngayg
 *         schema:
 *           type: string
 *       - in: query
 *         name: noig
 *         schema:
 *           type: string
 *       - in: query
 *         name: httt
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HoaDon'
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
  const { hd, tk, nl, ngayg, noig, httt } = _req.query;

  try {
    let list = await db.HoaDon.findAll({
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

    if (hd != undefined)
      list = list.filter((hoaDon) =>
        hoaDon.MaHD.toLowerCase().includes(hd.toString().toLowerCase().trim())
      );

    if (tk != undefined)
      list = list.filter((hd) =>
        hd.MaTK.toLowerCase().includes(tk.toString().toLowerCase().trim())
      );

    if (nl != undefined)
      list = list.filter((hd) =>
        new Date(hd.NgayLap ?? "")
          .toISOString()
          .toLowerCase()
          .includes(nl.toString().toLowerCase().trim())
      );

    if (ngayg != undefined)
      list = list.filter((hd) =>
        new Date(hd.NgayGiao ?? "")
          .toISOString()
          .toLowerCase()
          .includes(ngayg.toString().toLowerCase().trim())
      );

    if (noig != undefined)
      list = list.filter((hd) =>
        hd.NoiGiao?.toLowerCase().includes(noig.toString().toLowerCase().trim())
      );

    if (httt != undefined)
      list = list.filter((hd) =>
        hd.HinhThucThanhToan?.toLowerCase().includes(
          httt.toString().toLowerCase().trim()
        )
      );

    res.json(list);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /hoa-don/thong-ke:
 *   get:
 *     summary: Lấy thống kê doanh thu
 *     tags:
 *       - HoaDon
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HoaDon'
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
router.get("/thong-ke-thang", async (_req, res, next) => {
  const { year } = _req.query;

  try {
    const list = await db.sequelize.query(`DECLARE @Year INT = ${year};
  WITH Months AS (
    SELECT 1 AS [Month]
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
    UNION ALL SELECT 5
    UNION ALL SELECT 6
    UNION ALL SELECT 7
    UNION ALL SELECT 8
    UNION ALL SELECT 9
    UNION ALL SELECT 10
    UNION ALL SELECT 11
    UNION ALL SELECT 12
), RevenueByMonth AS (
    SELECT
      MONTH(h.NgayLap)            AS [Month],
      SUM(ct.SoLuong * ct.GiaBan) AS Revenue
    FROM HOADON h
    JOIN CHITIET_HOADON ct ON h.MaHD = ct.MaHD
    WHERE YEAR(h.NgayLap) = @Year
    GROUP BY MONTH(h.NgayLap)
)
    SELECT
  m.[Month],
  ISNULL(r.Revenue, 0) AS Revenue
FROM Months m
LEFT JOIN RevenueByMonth r
  ON m.[Month] = r.[Month]
ORDER BY m.[Month];`);

    res.json(list[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /hoa-don/thong-ke:
 *   get:
 *     summary: Lấy thống kê doanh thu
 *     tags:
 *       - HoaDon
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Trả về mảng các hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HoaDon'
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
router.get("/thong-ke-quy", async (_req, res, next) => {
  const { year } = _req.query;

  try {
    const list = await db.sequelize.query(`DECLARE @Year INT = ${year};
 WITH Quarters AS (
    SELECT 1 AS [Quarter]
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
), RevenueByQuarter AS (
    SELECT
      DATEPART(QUARTER, h.NgayLap)   AS [Quarter],
      SUM(ct.SoLuong * ct.GiaBan)    AS Revenue
    FROM HOADON h
    JOIN CHITIET_HOADON ct ON h.MaHD = ct.MaHD
    WHERE YEAR(h.NgayLap) = @Year
    GROUP BY DATEPART(QUARTER, h.NgayLap)
)
    SELECT
  q.[Quarter],
  ISNULL(r.Revenue, 0) AS Revenue
FROM Quarters q
LEFT JOIN RevenueByQuarter r
  ON q.[Quarter] = r.[Quarter]
ORDER BY q.[Quarter];`);

    res.json(list[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /hoa-don/{maHD}:
 *   get:
 *     summary: Lấy thông tin hóa đơn theo maHD
 *     tags:
 *       - HoaDon
 *     parameters:
 *       - in: path
 *         name: maHD
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã hóa đơn cần truy vấn
 *     responses:
 *       '200':
 *         description: Trả về thông tin hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HoaDon'
 *       '404':
 *         description: Không tìm thấy hóa đơn
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
    const item = await db.HoaDon.findByPk(maHD, {
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
    if (!item) {
      res.sendStatus(404);
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

interface PeriodRevenue {
  year: number;
  month: number;
  revenue: number;
}

// 1) Get overall date range:
async function getDateRange(): Promise<{
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
}> {
  const minMax = await HoaDon.findOne({
    attributes: [
      [fn("MIN", col("NgayLap")), "minDate"],
      [fn("MAX", col("NgayLap")), "maxDate"],
    ],
    raw: true,
  });
  return {
    start: dayjs((minMax as any).minDate),
    end: dayjs((minMax as any).maxDate),
  };
}

// 2) Fetch actual revenue by month:
async function fetchRevenueByMonth() {
  return ChiTietHoaDon.findAll({
    include: [{ model: HoaDon, attributes: [] }],
    attributes: [
      [fn("YEAR", col("Invoice.NgayLap")), "year"],
      [fn("MONTH", col("Invoice.NgayLap")), "month"],
      [literal("SUM(SoLuong * GiaBan)"), "revenue"],
    ],
    group: ["year", "month"],
    order: [
      ["year", "ASC"],
      ["month", "ASC"],
    ],
    raw: true,
  });
}

// 3) Generate full month list between two dates:
function genMonthSeries(start: dayjs.Dayjs, end: dayjs.Dayjs) {
  const arr: { year: number; month: number }[] = [];
  let cur = start.startOf("month");
  while (cur.isBefore(end) || cur.isSame(end, "month")) {
    arr.push({ year: cur.year(), month: cur.month() + 1 });
    cur = cur.add(1, "month");
  }
  return arr;
}

// 4) Combine and fill zeros:
export async function revenueByMonthComplete() {
  const { start, end } = await getDateRange();
  const data = await fetchRevenueByMonth();
  const full = genMonthSeries(start, end).map((p) => {
    console.log(data);
    // const found = data.find((d) => d.year === p.year && d.month === p.month);
    // return { ...p, revenue: found ? Number(found.revenue) : 0 };
  });
  return data; // array of { year, month, revenue }
}

/**
 * @openapi
 * /hoa-don:
 *   post:
 *     summary: Tạo hóa đơn mới
 *     tags:
 *       - HoaDon
 *     requestBody:
 *       description: The account data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HoaDon'
 *     responses:
 *       '201':
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HoaDon'
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
    const hd = await db.HoaDon.create(req.body, {
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

    res.status(201).json(hd);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /hoa-don/{maHD}:
 *   put:
 *     summary: Cập nhật thông tin hóa đơn
 *     tags:
 *       - HoaDon
 *     parameters:
 *       - in: path
 *         name: maHD
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã hóa đơn cần cập nhật
 *     requestBody:
 *       description: Dữ liệu cập nhật cho hóa đơn
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HoaDon'
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HoaDon'
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
 *         description: Không tìm thấy hóa đơn
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
    const HoaDon = req.body;
    let item = await db.HoaDon.findByPk(maHD, {
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

    if (!item) {
      res.sendStatus(404);
    } else {
      await item.update(HoaDon);
      await item.TtVanChuyen?.update(HoaDon["TtVanChuyen"]);

      res.status(200).json(item);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /hoa-don/{maHD}:
 *   delete:
 *     summary: Xoá hóa đơn theo maHD
 *     tags:
 *       - HoaDon
 *     parameters:
 *       - in: path
 *         name: maHD
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã hóa đơn cần xóa
 *     responses:
 *       '204':
 *         description: Xóa thành công, không trả về nội dung
 *       '404':
 *         description: Không tìm thấy hóa đơn
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
    const deletedCount = await db.HoaDon.destroy({
      where: {
        MaHD: maHD,
      },
    });

    if (deletedCount == 0) {
      res.status(404).send({ description: "Không tìm thấy hóa đơn" });
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
