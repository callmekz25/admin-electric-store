ALTER DATABASE BAITAPNHOM SET SINGLE_USER WITH ROLLBACK IMMEDIATE;


DROP DATABASE BAITAPNHOM;

use master
CREATE LOGIN my_admin
WITH PASSWORD = '1';

-- Tạo cơ sở dữ liệu
CREATE DATABASE BAITAPNHOM;
GO

-- Sử dụng cơ sở dữ liệu
USE BAITAPNHOM;
GO

CREATE USER my_admin FOR LOGIN my_admin;
ALTER ROLE db_owner ADD MEMBER my_admin;

-- Bảng tài khoản
CREATE TABLE TAIKHOAN (
    MaTK VARCHAR(10) NOT NULL PRIMARY KEY,
    HoTenTK NVARCHAR(30) NOT NULL,
    TenDangNhap VARCHAR(50) NOT NULL,
    MatKhau VARCHAR(50) NOT NULL,
    GioiTinh NVARCHAR(5) NOT NULL,
    NgaySinh DATE NOT NULL,
    Email VARCHAR(50) NOT NULL,
    DiaChi NVARCHAR(100) NOT NULL,
    SDT VARCHAR(20) NULL
);

-- Bảng loại sản phẩm
CREATE TABLE LOAISANPHAM (
    MaLoaiSP VARCHAR(10) NOT NULL PRIMARY KEY,
    TenLSP NVARCHAR(100) NOT NULL,
    MotaLSP NTEXT NOT NULL
);

-- Bảng nhà cung cấp
CREATE TABLE NHACUNGCAP (
    MaNCC VARCHAR(10) NOT NULL PRIMARY KEY,
    TenNCC NVARCHAR(20) NOT NULL,
    DiaChiNCC NVARCHAR(100) NULL,
    SDT_NCC VARCHAR(20) NULL
);

-- Bảng chi tiết sản phẩm
CREATE TABLE CHITIETSANPHAM (
    MaCTSP VARCHAR(10) NOT NULL PRIMARY KEY,
    MaNCC VARCHAR(10) NOT NULL,
    MaLoaiSP VARCHAR(10) NOT NULL,
    CauHinhChiTiet NVARCHAR(200) NULL,
    Series_SP VARCHAR(20) NULL,
    BaoHanh INT NULL,
    MauSP NVARCHAR(10) NULL
);

-- Bảng sản phẩm
CREATE TABLE SANPHAM (
    MaSP VARCHAR(10) NOT NULL PRIMARY KEY,
    TenSP NVARCHAR(100) NOT NULL,
    MaCTSP VARCHAR(10) NOT NULL,
    HinhAnh VARCHAR(200) NULL,
    SoLuongTon INT NULL,
    MucGiamGia VARCHAR(10) NULL,
    Gia MONEY NULL
);

-- Bảng hóa đơn
CREATE TABLE HOADON (
    MaHD VARCHAR(10) NOT NULL PRIMARY KEY,
    MaTK VARCHAR(10) NOT NULL,
    NgayLap DATE NULL,
    NgayGiao DATE NULL,
    NoiGiao NVARCHAR(100) NULL,
    HinhThucThanhToan NVARCHAR(20) NULL
);

-- Bảng chi tiết hóa đơn
CREATE TABLE CHITIET_HOADON (
    MaHD VARCHAR(10) NOT NULL,
    MaSP VARCHAR(10) NOT NULL,
    SoLuong INT NULL,
    GiaBan MONEY NULL,
    PRIMARY KEY (MaHD, MaSP),
    FOREIGN KEY (MaHD) REFERENCES HOADON(MaHD),
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP)
);

-- Bảng đánh giá
CREATE TABLE DANHGIA (
    MaDG INT NOT NULL PRIMARY KEY,
    MaSP VARCHAR(10) NOT NULL,
    MaTK VARCHAR(10) NOT NULL,
    SoSao INT CHECK (SoSao BETWEEN 1 AND 5),
    BinhLuan NVARCHAR(500),
    NgayDanhGia DATETIMEOFFSET DEFAULT GETDATE(),
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP),
    FOREIGN KEY (MaTK) REFERENCES TAIKHOAN(MaTK)
);

-- bang van chuyen
CREATE TABLE TTVANCHUYEN (
    MaVC INT IDENTITY(1,1) PRIMARY KEY,
    MaHD VARCHAR(10) NOT NULL, -- Liên kết với HOADON
    TenDonViVC NVARCHAR(255) NOT NULL, -- Đơn vị vận chuyển
    Status NVARCHAR(50) NOT NULL, -- VD: Đã xác nhận, Đang giao, Đã giao, Giao thất bại, Đã huỷ
    Description NVARCHAR(255),    -- Mô tả chi tiết trạng thái (tuỳ chọn)
    NgayGiaoDuKien DATE NULL,     -- Ngày giao dự kiến (nếu có)
    NgayGiaoThucTe DATE NULL,     -- Ngày giao thực tế (nếu có)
    CreatedAt DATETIMEOFFSET DEFAULT GETDATE(), -- Thời điểm cập nhật trạng thái
    UpdatedAt DATETIMEOFFSET DEFAULT GETDATE()
);

-- Ràng buộc khóa ngoại bổ sung
ALTER TABLE HOADON
ADD CONSTRAINT FK_HOADON_TAIKHOAN FOREIGN KEY (MaTK) REFERENCES TAIKHOAN(MaTK);

ALTER TABLE SANPHAM
ADD CONSTRAINT FK_SANPHAM_CHITIET FOREIGN KEY (MaCTSP) REFERENCES CHITIETSANPHAM(MaCTSP);

ALTER TABLE CHITIETSANPHAM
ADD CONSTRAINT FK_CTSP_LOAISP FOREIGN KEY (MaLoaiSP) REFERENCES LOAISANPHAM(MaLoaiSP),
    CONSTRAINT FK_CTSP_NCC FOREIGN KEY (MaNCC) REFERENCES NHACUNGCAP(MaNCC);

ALTER TABLE TTVANCHUYEN
ADD CONSTRAINT FK_TTVANCHUYEN_HOADON FOREIGN KEY (MaHD) REFERENCES HOADON(MaHD);

--------------------------------------------------------------------

INSERT INTO TAIKHOAN 
VALUES	
		('TK001', N'Hoàng Trung Hiếu', 'hoangtrunghieu', '123123', N'Nam', '2002-01-22', 'hoangtrunghieu2201@gmail.com', N'142 đường 23/10', '0372928583'),
		('TK002', N'Thái Văn Phú', 'thaivanphu', '123788', N'Nam', '2002-03-24', 'phuthai2403@gmail.com', N'22/5 Vĩnh Thái', '0904829981'),
		('TK003', N'Phan Hoàng Long', 'phanhoanglong', '12341234', N'Nam', '2002-01-21', 'phanhoanglong2201@gmail.com', N'142 đường 23/10', '012324352'),
		('TK004', N'Nguyễn Văn Đạt', 'nguyenvandat', '123789', N'Nam', '2002-10-23', 'vandat2310@gmail.com', N'44/5 đường 23/10', '0123908876'),
		('TK005', N'Trần Bình Minh', 'tranbinhminh', '789987', N'Nam', '2002-08-11', 'mingthongminh1108@gmail.com', N'229 Võ Nguyên Giáp', '0399887726'),
		('TK006', N'Nguyễn Minh Khuê', 'nguyenminhkhue', '789229', N'Nữ', '2002-09-17', 'nguyenminhkhue@gmail.com', N'229 Võ Nguyên Giáp', '0392101297'),
		('TK007', N'Nguyễn Thị Kiều Vy', 'nguyenthikieuvy', '129987', N'Nữ', '2001-01-21', 'nguyenthikieuvy@gmail.com', N'23/12 Hoàng Văn Thụ', '0323887261'),
		('TK008', N'Thanh Lâm', 'thanhlam', '10987', N'Nam', '2002-03-22', 'lamdeptrai2203@gmail.com', N'28 Vĩnh Thái', '0399999999'),
		('TK009', N'Đặng Trần Trúc Linh', 'dangtrantruclinh', '112200', N'Nữ', '2002-02-02', 'dttruclinh@gmail.com', N'212/3 Trần Phú', '0987221720'),
		('TK010', N'Nguyễn Lê Bảo Vy', 'nguyenlebaovy', '001122', N'Nữ', '2000-12-21', 'nguyenlebaovy@gmail.com', N'09 Đặng Tất', '0988736210')

INSERT INTO HOADON(MaHD, MaTK, NgayLap, NgayGiao, NoiGiao, HinhThucThanhToan)
VALUES
		('HD001', 'TK002', '2019-02-11', '2019-02-15', N'142 đường 23/10', N'Tiền mặt'),
	    ('HD002', 'TK005', '2020-09-25', '2020-10-01', N'229 Võ Nguyên Giáp', N'Tiền mặt'),
	    ('HD003', 'TK009', '2021-01-15', '2021-01-23', N'212/3 Trần Phú', N'Chuyển khoản'),
	    ('HD004', 'TK010', '2021-12-05', '2021-12-23', N'09 Đặng Tất', N'Tín dụng'),
	    ('HD005', 'TK004', '2022-03-05', '2022-03-13', N'44/5 đường 23/10', N'Tiền mặt (Trả góp)'),
	    ('HD006', 'TK002', '2015-03-21', '2015-10-15', N'234 Hai Bà Trưng', N'Tiền mặt'),
	    ('HD007', 'TK008', '2016-04-11', '2016-06-25', N'995 Phước Hải', N'Chuyển khoản'),
	    ('HD008', 'TK007', '2020-03-01', '2020-10-09', N'661 Phan Chu Trinh', N'Tiền mặt'),
		('HD009', 'TK004', '2022-03-30', '2022-04-07', N'135 Võ Thị Sáu', N'Tiền mặt'),
		('HD010', 'TK008', '2019-07-31', '2019-12-27', N'007 Lương Định Của', N'Chuyển khoản'),
	    ('HD011', 'TK008', '2022-04-12', '2022-04-22', N'28 Vĩnh Thái', N'Chuyển khoản'),
	    ('HD012', 'TK001', '2022-11-01', '2022-11-04', N'142 đường 23/10', N'Tiền mặt');


INSERT INTO LOAISANPHAM
VALUES 
		('LSP01', 'RAM', N'Bộ nhớ tạm thời'),
		('LSP02', 'CPU', N'Bộ sử lý trung tâm'),
		('LSP03', 'PSU', N'Bộ nguồn cấp điện'),
		('LSP04', 'SSD', N'Ổ cứng bán dẫn'),
		('LSP05', 'HDD', N'Ổ cứng cơ học'),
		('LSP06', 'VGA', N'Card màn hình'),
		('LSP07', 'CASE', N'Vỏ máy tính'),
		('LSP08', 'BTN', N'Bộ tản nhiệt'),
		('LSP09', 'MONITOR', N'Màn hình'),
		('LSP10', 'GEAR', N'Thiết bị ngoại vi khác'),
		('LSP11', 'LKK', N'Linh kiện thay thế khác'),
		('LSP12', 'MAIN', N'Bo mạch chủ')

INSERT INTO NHACUNGCAP
VALUES
		('NCC001', 'GIGABYTE', '2824 Stanford St .US' , '+1 901 2204'),
		('NCC002', 'ASUS', '1472 SanSire St .US' , '+1 241 1003'),
		('NCC003', 'NVIDIA', '299 Ajax St .US' , '+1 121 4503'),
		('NCC004', 'INTEL', '78 NewSiro St .US' , '+1 219 9865'),
		('NCC005', 'AMD', '182 Wangchao .China' , '+90 542 4141'),
		('NCC006', 'MSI', '15 Wengxiao St .Tepai' , '+91 426 4875'),
		('NCC007', 'COLORFUL', '215 Backyard St .Denmark' , '+15 154 2485'),
		('NCC008', 'FUHLEN', '1245 Amsterdam St .Holland' , '+23 251 2215'),
		('NCC009', 'STEELSERIES', '5567 Domway St .Finland' , '+16 125 3344 '),
		('NCC010', 'RAZER', '97 Chinatown St .Germany' , '+11 299 0807'),
		('NCC011', 'EDRA', N'69 Trần Duy Hưng .VietNam' , '+84 214 5525'),
		('NCC012', 'KINGSTON', N'214 Braut St .Cezch' , '+7 209 9908'),
		('NCC013', 'SAMSUNG', N'298 Hwang St Gwanju .Korean' , '+64 287 7724')

INSERT INTO CHITIETSANPHAM
VALUES
		('CTSP001', 'NCC004', 'LSP02','i5-12400 6 cores, 12 threads 4.40GHz', 'CPU-I1347A','36','Blue'),
		('CTSP002', 'NCC009', 'LSP10','Apex3 3 mode connect TKL blue switch', 'BP-S5582A','12','Black'),
		('CTSP003', 'NCC001', 'LSP12','H510-H socket 1200', 'M-G4712A','36','Black'),
		('CTSP004', 'NCC007', 'LSP03','CROSSFEED CF-G1250WN 1600W Platinum', 'CF-G1250WN','36','Black'),
		('CTSP005', 'NCC002', 'LSP06','Dual GeForce RTX 2060 OC 6G', 'VGA-A241OC','36','RGB'),
		('CTSP006', 'NCC011', 'LSP10','Death adder V2', 'M-R145V2','12','RGB'),
		('CTSP007', 'NCC003', 'LSP06','Quadro RTX8000 48Gb', 'VGA-IQ80X','48','Black'),
		('CTSP008', 'NCC005', 'LSP02','R5 5600HX 6cores 12 threads 4.20GHz', 'CPU-A560HX','36','Red'),
		('CTSP009', 'NCC013', 'LSP09','Odyssey G9 49inch', 'MO-S49INCH','36','Black'),
		('CTSP010', 'NCC002', 'LSP07','ROG Strix Helios GX601', 'CASE-AS601GX','12','White'),
		('CTSP011', 'NCC013', 'LSP04','860 Evo 250GB', 'MZ-76E250BW','24','Black'),
		('CTSP012', 'NCC012', 'LSP01','8Gb 3200Mhz HyperX', 'R-K85EB5','24','RGB'),
		('CTSP013', 'NCC011', 'LSP10','Death adder V2', 'M-R146V2','12','Green'),
		('CTSP014', 'NCC006', 'LSP12','H510-H socket 1200', 'M-M4711A','36','RGB'),
		('CTSP015', 'NCC011', 'LSP10','EK 387', 'B-E387A','12','Black')

INSERT INTO SANPHAM
VALUES
		('SP001', 'INTEL Core i5-12400', 'CTSP001', '', 166, '14', 9000000),
		('SP002', 'NVIDIA Quadro RTX8000', 'CTSP007', '', 200, '5', 30000000),
		('SP003', 'SAMSUNG Odyssey G9', 'CTSP009', '', 116, '10', 35000000),
		('SP004', 'RAZER Death adder V2', 'CTSP006', '', 312, '11', 1200000),
		('SP005', 'RAZER Death adder V2', 'CTSP013', '', 87, '2', 1500000),
		('SP006', 'STEELSERIES Apex3', 'CTSP002', '', 64, '5', 2700000),
		('SP007', 'GIGABYTE H510-H', 'CTSP003', '', 474, '10', 3000000),
		('SP008', 'MSI H510-H', 'CTSP014', '', 45, '6', 3400000),
		('SP009', 'ASUS ROG Strix Helios GX601', 'CTSP010', '', 500, '12', 2000000),
		('SP010', 'EDRA Ek387', 'CTSP015', '', 520, '22', 900000),
		('SP011', 'SAMSUNG 860 Evo', 'CTSP011', '', 20, NULL, 3100000),
		('SP012', 'KINGSTON HyperX', 'CTSP012', '', 46, '4', 800000),
		('SP013', 'ASUS GeForce RTX 2060', 'CTSP005', '', 6, NULL, 11100000),
		('SP014', 'AMD R5 5600HX', 'CTSP008', '', 90, '5', 9100000);


INSERT INTO CHITIET_HOADON
VALUES
		('HD001', 'SP010', 4, 400000),
		('HD002', 'SP001', 1, 250000),
		('HD003', 'SP009', 1, 50000),
		('HD004', 'SP005', 2, 10000),
		('HD005', 'SP010', 1, 220000),
		('HD006', 'SP002', 3, 170000),
		('HD007', 'SP004', 2, 130000),
		('HD008', 'SP012', 2, 399999),
		('HD009', 'SP014', 1, 340000),
		('HD010', 'SP005', 2, 123000),
		('HD011', 'SP011', 1, 122000),
		('HD012', 'SP003', 1, 100000);

INSERT INTO DANHGIA (MaDG, MaSP, MaTK, SoSao, BinhLuan, NgayDanhGia)
VALUES
(1, 'SP001', 'TK001', 5, N'Chất lượng sản phẩm rất tốt, hiệu năng cao, tôi rất hài lòng.', '2019-02-18'),
(2, 'SP002', 'TK002', 4, N'VGA này rất mạnh mẽ, nhưng giá khá cao so với các dòng khác.', '2020-10-05'),
(3, 'SP003', 'TK003', 5, N'Màn hình đẹp, chất lượng tuyệt vời, giá cả hợp lý.', '2021-01-26'),
(4, 'SP004', 'TK004', 3, N'Thời gian phản hồi của chuột hơi chậm, không như kỳ vọng.', '2021-12-26'),
(5, 'SP005', 'TK005', 4, N'Sản phẩm đẹp nhưng cảm giác sử dụng không được mượt mà như mong đợi.', '2022-03-17'),
(6, 'SP006', 'TK006', 5, N'Bàn phím rất êm, dễ sử dụng, đặc biệt là khi chơi game.', '2015-10-18'),
(7, 'SP007', 'TK007', 4, N'Giá thành hợp lý, nhưng độ bền của sản phẩm có thể cải thiện.', '2016-06-28'),
(8, 'SP008', 'TK008', 5, N'Rất ưng ý với vỏ máy tính, thiết kế sang trọng, chất liệu tốt.', '2020-10-15'),
(9, 'SP009', 'TK009', 5, N'Với màn hình 49 inch, đây là sự lựa chọn tuyệt vời cho công việc và giải trí.', '2022-04-10'),
(10, 'SP010', 'TK010', 4, N'Sản phẩm đẹp, nhưng không có nhiều tính năng vượt trội so với các dòng khác.', '2019-12-30');


INSERT INTO TTVANCHUYEN (MaHD, TenDonViVC, Status, Description, NgayGiaoDuKien, NgayGiaoThucTe, CreatedAt, UpdatedAt)
VALUES
    ('HD001', N'Viettel Post', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2019-02-14', NULL, '2019-02-11', '2019-02-11'),
    ('HD001', N'Viettel Post', N'Đang giao', N'Viettel Post đang giao hàng', '2019-02-14', '2019-02-15', '2019-02-14', '2019-02-15'),
    ('HD001', N'Viettel Post', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2019-02-15', '2019-02-15', '2019-02-15'),

    ('HD002', N'Giao Hàng Nhanh', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2020-09-29', NULL, '2020-09-25', '2020-09-25'),
    ('HD002', N'Giao Hàng Nhanh', N'Đang giao', N'Giao Hàng Nhanh đang giao hàng', '2020-09-29', '2020-10-01', '2020-09-29', '2020-10-01'),
    ('HD002', N'Giao Hàng Nhanh', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2020-10-01', '2020-10-01', '2020-10-01'),

    ('HD003', N'Shopee Express', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2021-01-22', NULL, '2021-01-15', '2021-01-15'),
    ('HD003', N'Shopee Express', N'Đang giao', N'Shopee Express đang giao hàng', '2021-01-22', '2021-01-23', '2021-01-22', '2021-01-23'),
    ('HD003', N'Shopee Express', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2021-01-23', '2021-01-23', '2021-01-23'),

    ('HD004', N'Bưu Điện', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2021-12-20', NULL, '2021-12-05', '2021-12-05'),
    ('HD004', N'Bưu Điện', N'Đang giao', N'Bưu Điện đang giao hàng', '2021-12-20', '2021-12-22', '2021-12-20', '2021-12-22'),
    ('HD004', N'Bưu Điện', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2021-12-22', '2021-12-22', '2021-12-22'),

    ('HD005', N'Viettel Post', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2022-03-08', NULL, '2022-03-05', '2022-03-05'),
    ('HD005', N'Viettel Post', N'Đang giao', N'Viettel Post đang giao hàng', '2022-03-08', '2022-03-12', '2022-03-08', '2022-03-12'),
    ('HD005', N'Viettel Post', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2022-03-12', '2022-03-12', '2022-03-12'),

    ('HD006', N'Giao Hàng Tiết Kiệm', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2015-10-12', NULL, '2015-03-21', '2015-03-21'),
    ('HD006', N'Giao Hàng Tiết Kiệm', N'Đang giao', N'Giao Hàng Tiết Kiệm đang giao hàng', '2015-10-12', '2015-10-15', '2015-10-12', '2015-10-15'),
    ('HD006', N'Giao Hàng Tiết Kiệm', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2015-10-15', '2015-10-15', '2015-10-15'),

    ('HD007', N'Shopee Express', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2016-06-22', NULL, '2016-04-11', '2016-04-11'),
    ('HD007', N'Shopee Express', N'Đang giao', N'Shopee Express đang giao hàng', '2016-06-22', '2016-06-25', '2016-06-22', '2016-06-25'),
    ('HD007', N'Shopee Express', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2016-06-25', '2016-06-25', '2016-06-25'),

    ('HD008', N'Bưu Điện', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2020-10-07', NULL, '2020-03-01', '2020-03-01'),
    ('HD008', N'Bưu Điện', N'Đang giao', N'Bưu Điện đang giao hàng', '2020-10-07', '2020-10-09', '2020-10-07', '2020-10-09'),
    ('HD008', N'Bưu Điện', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2020-10-09', '2020-10-09', '2020-10-09'),

    ('HD009', N'Viettel Post', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2022-04-04', NULL, '2022-03-30', '2022-03-30'),
    ('HD009', N'Viettel Post', N'Đang giao', N'Viettel Post đang giao hàng', '2022-04-04', '2022-04-07', '2022-04-04', '2022-04-07'),
    ('HD009', N'Viettel Post', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2022-04-07', '2022-04-07', '2022-04-07'),

    ('HD010', N'Giao Hàng Nhanh', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2019-12-26', NULL, '2019-07-31', '2019-07-31'),
    ('HD010', N'Giao Hàng Nhanh', N'Đang giao', N'Giao Hàng Nhanh đang giao hàng', '2019-12-26', '2019-12-27', '2019-12-26', '2019-12-27'),
    ('HD010', N'Giao Hàng Nhanh', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2019-12-27', '2019-12-27', '2019-12-27'),

    ('HD011', N'Shopee Express', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2022-04-18', NULL, '2022-04-12', '2022-04-12'),
    ('HD011', N'Shopee Express', N'Đang giao', N'Shopee Express đang giao hàng', '2022-04-18', '2022-04-22', '2022-04-18', '2022-04-22'),
    ('HD011', N'Shopee Express', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2022-04-22', '2022-04-22', '2022-04-22'),

    ('HD012', N'Bưu Điện', N'Đã xác nhận', N'Đơn hàng đã được xác nhận bởi người bán', '2022-11-03', NULL, '2022-11-01', '2022-11-01'),
    ('HD012', N'Bưu Điện', N'Đang giao', N'Bưu Điện đang giao hàng', '2022-11-03', '2022-11-04', '2022-11-03', '2022-11-04'),
    ('HD012', N'Bưu Điện', N'Đã giao', N'Đơn hàng đã giao thành công', NULL, '2022-11-04', '2022-11-04', '2022-11-04');


---Cập nhập giá chi tiết hóa đơn

Update CHITIET_HOADON
SET GiaBan = SoLuong*Gia
FROM HOADON, SANPHAM
WHERE HOADON.MaHD = CHITIET_HOADON.MaHD AND CHITIET_HOADON.MaSP  = SANPHAM.MaSP

Select * from HOADON left join CHITIET_HOADON
on HOADON.MaHD= CHITIET_HOADON.MaHD

-----Lệnh truy vấn------

-----===a. Truy vấn đơn giản: 3 câu===-----

-- Cập nhật giá chi tiết hóa đơn
UPDATE CHITIET_HOADON
SET GiaBan = SoLuong * Gia
FROM CHITIET_HOADON cthd
INNER JOIN HOADON hd ON hd.MaHD = cthd.MaHD
INNER JOIN SANPHAM sp ON sp.MaSP = cthd.MaSP;

-- Truy vấn đơn giản

-- 0. Lấy trạng thái giao hàng mới nhất của mỗi hóa đơn
SELECT t.MaHD, t.TenDonViVC, t.Status, t.Description, t.NgayGiaoDuKien, t.NgayGiaoThucTe, t.UpdatedAt
FROM TTVANCHUYEN t
WHERE t.UpdatedAt = (
    SELECT MAX(t2.UpdatedAt) FROM TTVANCHUYEN t2 WHERE t2.MaHD = t.MaHD
);

--0.1. lịch sử trạng thái giao hàng của mỗi hóa đơn
SELECT * FROM TTVANCHUYEN WHERE MaHD = 'HD001' ORDER BY CreatedAt;

-- 1. Cho biết mã, tên, số lượng sản phẩm tồn hiện có trong cửa hàng
SELECT MaSP, TenSP, SoluongTon
FROM SANPHAM;

-- 2. Cho biết danh sách thành viên đã đăng kí tài khoản sắp theo thứ tự từ A-Z của tên thành viên
SELECT MaTK, HoTenTK
FROM TAIKHOAN
ORDER BY HoTenTK COLLATE Vietnamese_CI_AS ASC;

-- 3. Cho biết địa chỉ, điện thoại của nhà cung cấp cung cấp sản phẩm tên “AMD R5 5600HX”
SELECT n.DiachiNCC, n.SDT_NCC
FROM SANPHAM s
JOIN CHITIETSANPHAM c ON s.MaCTSP = c.MaCTSP
JOIN NHACUNGCAP n ON c.MaNCC = n.MaNCC
WHERE s.TenSP LIKE 'AMD R5 5600HX';
-----===b. Truy vấn với Aggregate Functions: 7 câu ===-----

-- 4. Có bao nhiêu thành viên thuộc tính Gioitinh là Nữ và có địa chỉ ở “23/12 Hoàng Văn Thụ”
SELECT COUNT(MaTK) AS 'Số lượng Nữ có địa chỉ ở 23/12 Hoàng Văn Thụ'
FROM TAIKHOAN
WHERE Gioitinh = N'Nữ' AND DiaChi = N'23/12 Hoàng Văn Thụ';

-- 5. Có bao nhiêu sản phẩm được bảo hành 24 tháng
SELECT COUNT(s.MaSP) AS 'Số luợng SP được bảo hành 24 tháng'
FROM SANPHAM s
JOIN CHITIETSANPHAM c ON s.MaCTSP = c.MaCTSP
WHERE c.BaoHanh = 24;

-- 6. Cho biết số lượng hóa đơn mà từng thành viên đã mua (gồm Mã TK, tên KH, Số lượng hóa đơn đã lập)
SELECT t.MaTK, t.HoTenTK, COUNT(h.MaHD) AS 'Số lượng hóa đơn đã lập'
FROM TAIKHOAN t
JOIN HOADON h ON t.MaTK = h.MaTK
GROUP BY t.MaTK, t.HoTenTK;

-- 7. Cho biết mã, tên, số lượng sản phẩm có thuộc tính MauSP = "Black"
SELECT s.MaSP, s.TenSP, COUNT(s.MaSP) AS 'Số lượng sản phẩm màu Đen'
FROM SANPHAM s
JOIN CHITIETSANPHAM c ON s.MaCTSP = c.MaCTSP
WHERE c.MauSP = 'Black'
GROUP BY s.MaSP, s.TenSP;

-- 8. Có bao nhiêu thành viên mua sản phẩm của Nhà cung cấp “Intel”
SELECT COUNT(tk.MaTK) AS 'Số lượng thành viên mua SP của Nhà cung cấp Intel'
FROM TAIKHOAN tk
JOIN HOADON hd ON tk.MaTK = hd.MaTK
JOIN CHITIET_HOADON cthd ON hd.MaHD = cthd.MaHD
JOIN SANPHAM sp ON cthd.MaSP = sp.MaSP
JOIN CHITIETSANPHAM ctsp ON sp.MaCTSP = ctsp.MaCTSP
JOIN NHACUNGCAP ncc ON ctsp.MaNCC = ncc.MaNCC
WHERE ncc.TenNCC = 'Intel';

-- 9. Cho biết số luợng sản phẩm có giá >= 1000000
SELECT COUNT(MaSP) AS 'Số lượng SP có giá >= 1000000'
FROM SANPHAM
WHERE Gia >= 1000000;

-- 10. Có bao nhiêu hóa đơn được lập trong quý 2 năm 2022
SELECT COUNT(MaHD) AS 'Số lượng hóa đơn được lập trong Quý 2 Năm 2022'
FROM HOADON
WHERE NgayLap BETWEEN '2022-04-01' AND '2022-06-30';

-----===c. Truy vấn với mệnh đề having: 6 câu ===-----

-- 11. Cho biết số lượng thành viên đã mua ít nhất 3 hóa đơn
SELECT t.MaTK, t.HoTenTK, COUNT(h.MaHD) AS 'Số lượng hóa đơn đã lập'
FROM TAIKHOAN t
JOIN HOADON h ON t.MaTK = h.MaTK
GROUP BY t.MaTK, t.HoTenTK
HAVING COUNT(h.MaHD) >= 3;

-- 12. Cho biết số lượng sản phẩm đã bán ít nhất 2 chiếc
SELECT sp.MaSP, sp.TenSP, SUM(cthd.SoLuong) AS 'Tổng số lượng bán ra'
FROM SANPHAM sp
JOIN CHITIET_HOADON cthd ON sp.MaSP = cthd.MaSP
GROUP BY sp.MaSP, sp.TenSP
HAVING SUM(cthd.SoLuong) >= 2;

-- 13. Cho biết nhà cung cấp có ít nhất 2 sản phẩm đang bán
SELECT ncc.MaNCC, ncc.TenNCC, COUNT(s.MaSP) AS 'Số lượng sản phẩm'
FROM NHACUNGCAP ncc
JOIN CHITIETSANPHAM ctsp ON ncc.MaNCC = ctsp.MaNCC
JOIN SANPHAM s ON ctsp.MaCTSP = s.MaCTSP
GROUP BY ncc.MaNCC, ncc.TenNCC
HAVING COUNT(s.MaSP) >= 2;

-- 14. Cho biết thành viên đã mua tổng cộng ít nhất 10 triệu đồng giá trị hóa đơn
SELECT t.MaTK, t.HoTenTK, SUM(cthd.GiaBan) AS 'Tổng giá trị hóa đơn'
FROM TAIKHOAN t
JOIN HOADON h ON t.MaTK = h.MaTK
JOIN CHITIET_HOADON cthd ON h.MaHD = cthd.MaHD
GROUP BY t.MaTK, t.HoTenTK
HAVING SUM(cthd.GiaBan) >= 10000000;

-- 15. Cho biết sản phẩm có số lượng tồn kho ít nhất 50 và có giá bán >= 500000
SELECT sp.MaSP, sp.TenSP, sp.SoluongTon, sp.Gia
FROM SANPHAM sp
WHERE sp.SoluongTon >= 50 AND sp.Gia >= 500000;

-- 16. Tìm những đánh giá có số sao là 5 sao
SELECT d.MaDG, d.MaTK, d.MaSP, d.SoSao
FROM DANHGIA d
WHERE d.SoSao = 5;

-- Truy vấn lớn nhất, nhỏ nhất

-----===d. Truy vấn lớn nhất, nhỏ nhất: 3 câu===-----

-- 17. Cho biết mã, tên, loại sản phẩm có giá cao nhất trong cửa hàng
SELECT SP.MaSP, SP.TenSP, LSP.TenLSP, MAX(SP.Gia) AS 'Giá'
FROM SANPHAM SP 
INNER JOIN CHITIETSANPHAM CTSP ON SP.MaCTSP = CTSP.MaCTSP
INNER JOIN LOAISANPHAM LSP ON CTSP.MaLoaiSP = LSP.MaLoaiSP
GROUP BY SP.MaSP, SP.TenSP, LSP.TenLSP
HAVING MAX(SP.Gia) = (SELECT MAX(sp.Gia) 
                       FROM SANPHAM sp);  -- gia cao nhat trong shop

-- 18. Cho biết hóa đơn có giá trị thấp nhất trong quý 1 năm 2022
SELECT HD.MaHD, HD.NgayLap, HD.NgayGiao, HD.NoiGiao, MIN(CT.GiaBan) AS 'Giá Hóa Đơn'
FROM HOADON HD 
INNER JOIN CHITIET_HOADON CT ON HD.MaHD = CT.MaHD
GROUP BY HD.MaHD, HD.NgayLap, HD.NgayGiao, HD.NoiGiao
HAVING HD.NgayLap BETWEEN '2022-01-01' AND '2022-03-31'
AND MIN(CT.GiaBan) = (SELECT MIN(ct.GiaBan) 
                       FROM CHITIET_HOADON ct 
                       JOIN HOADON hd ON ct.MaHD = hd.MaHD 
                       WHERE hd.NgayLap BETWEEN '2022-01-01' AND '2022-03-31');  -- tim gia tri nho nhat

-- 19. Cho biết thành viên đã mua hóa đơn có trị giá cao nhất năm 2022.
SELECT TK.MaTK, TK.HoTenTK, TK.GioiTinh, HD.MaHD, HD.NgayLap, MAX(CT.GiaBan) AS 'Giá Hóa Đơn'
FROM TAIKHOAN TK 
INNER JOIN HOADON HD ON TK.MaTK = HD.MaTK 
INNER JOIN CHITIET_HOADON CT ON HD.MaHD = CT.MaHD
GROUP BY TK.MaTK, TK.HoTenTK, TK.GioiTinh, HD.MaHD, HD.NgayLap
HAVING YEAR(HD.NgayLap) = 2022 
AND MAX(CT.GiaBan) = (SELECT MAX(ct.GiaBan)
                       FROM CHITIET_HOADON ct 
                       JOIN HOADON hd ON ct.MaHD = hd.MaHD 
                       WHERE YEAR(hd.NgayLap) = 2022);  -- gia tri cao nhat tron nam 2022


-----===e. Truy vấn Không/chưa có: (Not In và left/right join): 6 câu===-----

-- Truy vấn Không/chưa có (Not In và left/right join)

-- 20. Cho biết tên sản phẩm không lập hóa đơn trong năm 2022
SELECT DISTINCT S.TenSP
FROM SANPHAM S 
LEFT JOIN CHITIET_HOADON CT ON S.MaSP = CT.MaSP
LEFT JOIN HOADON H ON CT.MaHD = H.MaHD
WHERE H.MaHD IS NULL OR YEAR(H.NgayLap) != 2022;  

-- 21. Cho biết danh sách thành viên không sống ở “đường 23/10”.
SELECT HoTenTK
FROM TAIKHOAN
WHERE DiaChi NOT LIKE N'%đường 23/10%';  

-- 22. Cho biết sản phẩm (mã SP, tên SP, giá) bắt đầu bằng tên “ASUS” mà có số lần mua nhiều nhất.
SELECT S.MaSP, S.TenSP, S.Gia, COUNT(CT.MaSP) AS SoLanMua
FROM SANPHAM S 
LEFT JOIN CHITIET_HOADON CT ON S.MaSP = CT.MaSP
WHERE S.TenSP LIKE 'ASUS%'  -- bắt đầu bằng ASUS
GROUP BY S.MaSP, S.TenSP, S.Gia
HAVING COUNT(CT.MaSP) = (
    SELECT MAX(CountMua)
    FROM (
        SELECT S2.MaSP, COUNT(CT2.MaSP) AS CountMua
        FROM SANPHAM S2
        LEFT JOIN CHITIET_HOADON CT2 ON S2.MaSP = CT2.MaSP
        WHERE S2.TenSP LIKE 'ASUS%'
        GROUP BY S2.MaSP
    ) AS Sub
);

-- 23. Đưa ra mã, tên thành viên mua 3 loại sản phẩm (mã SP, tên SP, loại SP) khác nhau
SELECT TK.MaTK, TK.HoTenTK, COUNT(DISTINCT S.MaSP) AS 'Số loại sản phẩm khác nhau'
FROM TAIKHOAN TK
LEFT JOIN HOADON HD ON TK.MaTK = HD.MaTK
LEFT JOIN CHITIET_HOADON CT ON CT.MaHD = HD.MaHD
LEFT JOIN SANPHAM S ON S.MaSP = CT.MaSP
GROUP BY TK.MaTK, TK.HoTenTK
HAVING COUNT(DISTINCT S.MaSP) >= 3;

-- 24. Cho biết mỗi thành viên (Mã thành viên, tên thành viên, email) đã lập bao nhiêu hóa đơn (nếu thành viên chưa hề lập 1 hóa đơn nào thì cho kết quả bằng 0).
SELECT TK.MaTK, TK.HoTenTK, TK.Email, COUNT(HD.MaHD) AS 'Số Hóa Đơn'
FROM TAIKHOAN TK
LEFT JOIN HOADON HD ON TK.MaTK = HD.MaTK
GROUP BY TK.MaTK, TK.HoTenTK, TK.Email;  

-- 25. Truy vấn các đơn giao hàng không thuộc Viettel Post và Shopee Express
SELECT DISTINCT HD.MaHD, HD.NgayLap, HD.NoiGiao
FROM HOADON HD
LEFT JOIN CHITIET_HOADON CT ON HD.MaHD = CT.MaHD
LEFT JOIN SANPHAM SP ON CT.MaSP = SP.MaSP
LEFT JOIN CHITIETSANPHAM CTSP ON SP.MaCTSP = CTSP.MaCTSP
LEFT JOIN (
    SELECT MaNCC
    FROM NHACUNGCAP
    WHERE TenNCC IN ('Viettel Post', 'Shopee Express')
) NCC_Filtered ON CTSP.MaNCC = NCC_Filtered.MaNCC
WHERE NCC_Filtered.MaNCC IS NULL;

-----===f. Truy vấn Hợp/Giao/Trừ: 3 câu===-----

-- 26. Cho biết mã, tên, địa chỉ và điện thoại của các thành viên và các nhà cung cấp của cửa hàng. 
SELECT MaTK as N'Mã', HoTenTK as N'Tên', DiaChi as N'Địa chỉ', SDT as N'Số điện thoại'
FROM TAIKHOAN
UNION ALL
SELECT MaNCC, TenNCC, DiaChiNCC, SDT_NCC
FROM NHACUNGCAP

--27. Tìm mã các sản phẩm không có trong bảng Hóa đơn chi tiết
SELECT MaSP, TenSP
FROM SANPHAM
WHERE MaSP NOT IN (
    SELECT MaSP FROM CHITIET_HOADON
);

--28. Cho biết mã các thành viên có đặt hóa đơn   
SELECT MaTK
FROM TAIKHOAN
INTERSECT 
SELECT MaTK
FROM HOADON
-----===g. Truy vấn Update, Delete:  7 câu===-----

-- 29. Xóa khỏi bảng SANPHAM những sản phẩm nào có số lượng tồn bằng 0 và không được đặt mua trong bất kỳ hóa đơn nào.
DELETE FROM SANPHAM WHERE SoLuongTon=0 
AND NOT EXISTS (SELECT MaHD 
				FROM CHITIET_HOADON WHERE MaSP=SANPHAM.MaSP)

-- 30. Tăng mã giảm giá lên bằng 30% cho  sản phảm mua được nhiều nhất.
UPDATE SANPHAM
SET MucGiamGia='30'
WHERE MaSP IN 
	(SELECT MaSP 
	FROM CHITIET_HOADON INNER JOIN HOADON 
	ON CHITIET_HOADON.MaHD = HOADON.MaHD 
	GROUP BY MaSP 
	HAVING SUM(SoLuong)>=ALL
			(SELECT SUM(SoLuong)
			 FROM CHITIET_HOADON INNER JOIN HOADON
			 ON CHITIET_HOADON.MaHD = HOADON.MaHD
			 GROUP BY MaSP))

-- 31. Xóa khỏi bảng TAIKHOAN những thành viên không có bất kỳ hóa đơn nào từ 01/01/2018 trở về.
-- Xóa đánh giá của các tài khoản KHÔNG có hóa đơn sau ngày 01/01/2018
DELETE FROM DANHGIA 
WHERE MaTK IN (
    SELECT MaTK FROM TAIKHOAN
    WHERE NOT EXISTS (
        SELECT 1 FROM HOADON
        WHERE HOADON.MaTK = TAIKHOAN.MaTK AND NgayLap > '2018-01-01'
    )
);

-- Sau đó xóa tài khoản
DELETE FROM TAIKHOAN 
WHERE NOT EXISTS (
    SELECT 1 FROM HOADON 
    WHERE HOADON.MaTK = TAIKHOAN.MaTK AND NgayLap > '2018-01-01'
);


-- 32. Tăng số lượng sản phẩm của những sản phẩm do “SAMSUNG” cung cấp lên gấp đôi.
UPDATE SANPHAM
SET SoLuongTon=SoLuongTon*2
FROM NHACUNGCAP, CHITIETSANPHAM
WHERE NHACUNGCAP.MaNCC=CHITIETSANPHAM.MaNCC 
AND CHITIETSANPHAM.MaCTSP=SANPHAM.MaCTSP AND TenNCC='SAMSUNG'

-- 33. Xóa khỏi bảng HOADON những hóa đơn trước năm 2010.
DELETE FROM HOADON WHERE YEAR(NgayLap)<2010

-- 34. Cập nhập giá giảm 5% đối với những sản phẩm thuộc thương hiệu “AMD”.
UPDATE SANPHAM
SET Gia=Gia-(Gia*0.05)
FROM NHACUNGCAP, CHITIETSANPHAM
WHERE NHACUNGCAP.MaNCC=CHITIETSANPHAM.MaNCC 
AND CHITIETSANPHAM.MaCTSP=SANPHAM.MaCTSP AND TenNCC='AMD'

-- 35. Cập nhập lại giá trị trường NOIGIAO trong bảng HOADON bằng địa chỉ của thành viên đối với những hóa đơn chưa xác định được nơi giao hàng (giá trị trường NOIGIAOHANG = NULL).
UPDATE HOADON 
SET NoiGiao=DiaChi
FROM TAIKHOAN
WHERE HOADON.MaTK=TAIKHOAN.MaTK AND NoiGiao IS NULL

-- 36. Xóa các đánh giá có số sao là 5
DELETE FROM DANHGIA
WHERE SoSao = 5;

-----h. Truy vấn sử dụng phép Chia: 2 câu-----


-- 37. Cho biết những sản phẩm nào chưa từng được đặt mua
SELECT MaSP, TenSP 
FROM SANPHAM
WHERE NOT EXISTS (SELECT MaSP FROM CHITIET_HOADON
				  WHERE MaSP=SANPHAM.MaSP)

-- 38. Cho biết những thành viên chưa từng lập bất kỳ 1 một hóa đơn đặt hàng nào.
SELECT MaTK,HoTenTK
FROM TAIKHOAN
WHERE NOT EXISTS (SELECT MaTK FROM CHITIET_HOADON, HOADON 
				  WHERE CHITIET_HOADON.MaHD=HOADON.MaHD 
				  AND HOADON.MaTK=TAIKHOAN.MaTK)

--- 5 thủ tục/hàm ---
 
-- 1. Thủ tục thêm chi tiết hóa đơn
CREATE PROC CTHD_INSERT
    (@MaHD VARCHAR(10),
     @MaSP VARCHAR(10),
     @SoLuong INT,
     @GiaBan Money)
AS
BEGIN
    INSERT INTO dbo.CHITIET_HOADON
    (MaHD, MaSP, SoLuong, GiaBan)
    VALUES
    (@MaHD, @MaSP, @SoLuong, @GiaBan)
END


-- 2. Thủ tục kiểm tra hóa đơn
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'Check_HD')
    DROP PROCEDURE Check_HD;
GO

CREATE PROCEDURE Check_HD
AS
BEGIN
    SELECT HD.MaHD, TK.HoTenTK, HD.NgayLap, HD.NgayGiao, CT.MaSP, CT.SoLuong, CT.GiaBan
    FROM TAIKHOAN TK
    INNER JOIN HOADON HD ON TK.MaTK = HD.MaTK
    INNER JOIN CHITIET_HOADON CT ON HD.MaHD = CT.MaHD
END


-- 3. Thủ tục thêm sản phẩm mới
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_insert')
    DROP PROCEDURE SP_insert;
GO

CREATE PROCEDURE SP_insert
    (@MaSP VARCHAR(10),
     @TenSP NVARCHAR(100),
     @MaCTSP VARCHAR(10),
     @HinhAnh VARCHAR(200),
     @SoLuongTon INT,
     @MucGiamGia VARCHAR(10),
     @Gia MONEY)
AS
BEGIN
    INSERT INTO dbo.SANPHAM
    (MaSP, TenSP, MaCTSP, HinhAnh, SoLuongTon, MucGiamGia, Gia)
    VALUES
    (@MaSP, @TenSP, @MaCTSP, @HinhAnh, @SoLuongTon, @MucGiamGia, @Gia)
END



-- 4. Thủ tục cập nhật sản phẩm
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_update')
    DROP PROCEDURE SP_update;
GO

CREATE PROCEDURE SP_update
    (@MaSP VARCHAR(10),
     @TenSP NVARCHAR(100),
     @MaCTSP VARCHAR(10),
     @HinhAnh VARCHAR(200),
     @SoLuongTon INT,
     @MucGiamGia VARCHAR(10),
     @Gia MONEY)
AS
BEGIN
    UPDATE dbo.SANPHAM
    SET TenSP = @TenSP,
        MaCTSP = @MaCTSP,
        HinhAnh = @HinhAnh,
        SoLuongTon = @SoLuongTon,
        MucGiamGia = @MucGiamGia,
        Gia = @Gia
    WHERE MaSP = @MaSP
END



-- 5. Thủ tục thêm thành viên mới
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'TK_insert')
    DROP PROCEDURE TK_insert;
GO

CREATE PROCEDURE TK_insert
    (@MaTK VARCHAR(10),
     @HoTenTK NVARCHAR(30),
     @TenDangNhap VARCHAR(50),
     @MatKhau VARCHAR(50),
     @GioiTinh NVARCHAR(5),
     @NgaySinh DATE,
     @Email VARCHAR(50),
     @DiaChi NVARCHAR(100),
     @SDT VARCHAR(20))
AS
BEGIN
    INSERT INTO dbo.TAIKHOAN
    (MaTK, HoTenTK, TenDangNhap, MatKhau, GioiTinh, NgaySinh, Email, DiaChi, SDT)
    VALUES
    (@MaTK, @HoTenTK, @TenDangNhap, @MatKhau, @GioiTinh, @NgaySinh, @Email, @DiaChi, @SDT)
END



-- 6. Trả về danh sách đánh giá của khách hàng theo mã sản phẩm
CREATE FUNCTION FN_DANHGIA_SANPHAM(@MaSP VARCHAR(10))
RETURNS TABLE
AS
RETURN (
    SELECT DG.MaDG, DG.MaSP, DG.MaTK, DG.SoSao, DG.BinhLuan, DG.NgayDanhGia
    FROM DANHGIA DG
    JOIN TAIKHOAN TK ON DG.MaTK = TK.MaTK
	JOIN SANPHAM SP ON DG.MaSP = SP.MaSP
    WHERE DG.MaSP = SP.MaSP
)

-- 7. Trả về danh sách hóa đơn của khách hàng theo mã sản phẩm
CREATE FUNCTION FN_DANHSACH_HOADON(@MaTK VARCHAR(10))
RETURNS TABLE
AS
RETURN (
    SELECT HD.MaHD,HD.MaTK, HD.NgayLap, HD.NgayGiao, HD.NoiGiao, HD.HinhThucThanhToan
    FROM HOADON HD
    WHERE HD.MaTK = @MaTK
)


-- 8. Hàm hiển thị thành viên và số lượng hóa đơn đặt hàng của từng thành viên.
CREATE FUNCTION TAIKHOAN_SOHD()
RETURNS @TK_SoHD TABLE (MaTK VARCHAR(10), HoTenTK NVARCHAR(30), SoLuong_HD INT)
AS
BEGIN
    INSERT INTO @TK_SoHD
    SELECT TK.MaTK, TK.HoTenTK, COUNT(CT.SoLuong)
    FROM TAIKHOAN TK
    JOIN HOADON HD ON TK.MaTK = HD.MaTK
    JOIN CHITIET_HOADON CT ON HD.MaHD = CT.MaHD
    GROUP BY TK.MaTK, TK.HoTenTK
    RETURN
END


-- 9. Hàm trả về thông tin các thành viên Nam hay Nữ (truyền vào Giới tính Nam|Nữ)
CREATE FUNCTION FN_TAIKHOAN_SELECT(@GIOITINH NVARCHAR(5))
RETURNS TABLE
AS
RETURN (
    SELECT MaTK, HoTenTK, GioiTinh
    FROM TAIKHOAN
    WHERE GioiTinh = @GIOITINH
)


-- 10. Hàm trả về thông tin chi tiết hóa đơn (truyền vào MaHD)
CREATE FUNCTION FN_CHITIETHD_SELECT(@MAHD VARCHAR(10))
RETURNS TABLE
AS
RETURN (
    SELECT MaHD, MaSP, SoLuong, GiaBan
    FROM CHITIET_HOADON
    WHERE MaHD = @MAHD
)


-- 11. Hàm hiển thị thành viên và tổng giá tiền chi của thành viên (truyền vào MaTK)
CREATE FUNCTION FN_TongGia_TK(@MaTK VARCHAR(10))
RETURNS @TK_TongGia TABLE (MaTK VARCHAR(10), HoTenTK NVARCHAR(30), TongGia INT)
AS
BEGIN
    INSERT INTO @TK_TongGia
    SELECT TK.MaTK, TK.HoTenTK, SUM(CT.GiaBan)
    FROM TAIKHOAN TK
    JOIN HOADON HD ON TK.MaTK = HD.MaTK
    JOIN CHITIET_HOADON CT ON HD.MaHD = CT.MaHD
    WHERE TK.MaTK = @MaTK
    GROUP BY TK.MaTK, TK.HoTenTK
    RETURN
END


-- 12. Hàm trả về thông tin Sản phẩm (truyền vào MaSP)
CREATE FUNCTION FN_SANPHAM_SELECT(@MASP VARCHAR(10))
RETURNS TABLE
AS
RETURN (
    SELECT MaSP, TenSP, SoLuongTon, MucGiamGia, Gia
    FROM SANPHAM
    WHERE MaSP = @MASP
)

--- 3 trigger ---
--1.Cập nhập lại số lượng tồn của bảng SANPHAM khi cập nhập cột SoLuong của bảng CHITIET_HOADON
CREATE TRIGGER trg_CHITIETHD_UPDATE_SL 
ON CHITIET_HOADON
FOR UPDATE AS
BEGIN
IF UPDATE(SoLuong) UPDATE SANPHAM 
SET SANPHAM.SoLuongTon = SANPHAM.SoLuongTon - (SELECT SUM(inserted.SoLuong - deleted.SoLuong)
FROM inserted INNER JOIN DELETED ON inserted.MaHD = deleted.MaHD WHERE inserted.MaSP = SANPHAM.MaSP)
WHERE SANPHAM.MaSP IN (SELECT MaSP FROM inserted)
END


--2.Cập nhập số lượng tồn của bảng SANPHAM sau khi đặt hóa đơn hoặc cập nhập cột SoLuong của bảng CHITIET_HOADON
CREATE TRIGGER trg_DatHD 
ON CHITIET_HOADON 
AFTER INSERT AS 
BEGIN 
	UPDATE SANPHAM
	SET SANPHAM.SoLuongTon = SANPHAM.SoLuongTon - (
	SELECT inserted.SoLuong
	FROM inserted
	WHERE inserted.MaSP = SANPHAM.MaSP
	)
	FROM SANPHAM
	INNER JOIN inserted
	ON SANPHAM.MaSP = inserted.MaSP
END


--3. Cập nhập số lượng tồn của bảng SANPHAM sau khi hủy đặt Hóa đơn
CREATE TRIGGER trg_HuyHD 
ON CHITIET_HOADON
FOR DELETE AS 
BEGIN 
	UPDATE SANPHAM
	SET SoLuongTon = SoLuongTon + (
	SELECT deleted.SoLuong 
	FROM deleted
	WHERE deleted.MaSP = SANPHAM.MaSP)
	FROM SANPHAM
	INNER JOIN deleted 
	ON SANPHAM.MaSP = deleted.MaSP
END

--============Phân quyền user============--

---QLAdmin 
---Member 
---Guest 