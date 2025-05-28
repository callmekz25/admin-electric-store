import { Router } from "express";
import taiKhoanRoute from "./taiKhoanRoute";
import loaiSPRoute from "./loaiSanPhamRoute";
import nccRoute from "./nhaCungCapRoute";
import ctspRoute from "./chiTietSanPhamRoute";
import spRoute from "./sanPhamRoute";
import hdRoute from "./hoaDonRoute";
import cthdRoute from "./chiTietHoaDonRoute";
import dgRoute from "./danhGiaRoute";
import vcRoute from "./ttVanChuyenRoute";

const router = Router();

router.use("/tai-khoan", taiKhoanRoute);
router.use("/loai-san-pham", loaiSPRoute);
router.use("/nha-cung-cap", nccRoute);
router.use("/chi-tiet-san-pham", ctspRoute);
router.use("/san-pham", spRoute);
router.use("/hoa-don", hdRoute);
router.use("/chi-tiet-hoa-don", cthdRoute);
router.use("/danh-gia", dgRoute);
router.use("/van-chuyen", vcRoute);

export default router;
