function khoiTaoDuLieuMau() {
    // ====== PHIÊN BẢN DỮ LIỆU MẪU ======
    // Đổi số này mỗi khi sửa dữ liệu mẫu để mọi máy tự nạp lại (ở CẢ admin.js và index.js).
    // Chỉ xóa dữ liệu mẫu, giữ nguyên tài khoản, giỏ hàng, đơn hàng.
    const DATA_VERSION = "5";
    if (localStorage.getItem("dataVersion") !== DATA_VERSION) {
        ["loaiSanPham", "danhMucSanPham", "saved_imports", "saved_pricing"]
            .forEach(function (k) { localStorage.removeItem(k); });
        localStorage.setItem("dataVersion", DATA_VERSION);
    }

    // 1. Tạo loại sản phẩm mẫu (4 hãng)
    if (!localStorage.getItem("loaiSanPham")) {
        const loaiMau = [
            { "maLoai": "L01", "tenLoai": "Apple", "moTa": "Các điện thoại iPhone", "trangThai": "hoatdong", "hinh": "../Img/Apple/hangApple.png" },
            { "maLoai": "L02", "tenLoai": "Samsung", "moTa": "Các điện thoại của hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/hangSamsung.png" },
            { "maLoai": "L03", "tenLoai": "Oppo", "moTa": "Các điện thoại của hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/hangOppo.png" },
            { "maLoai": "L04", "tenLoai": "Xiaomi", "moTa": "Các điện thoại của hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/xiaomi-logo.png" }
        ];
        localStorage.setItem("loaiSanPham", JSON.stringify(loaiMau));
    }

    // 2. Tạo sản phẩm mẫu
    if (!localStorage.getItem("danhMucSanPham")) {
        const spMau = [
            { "maSP": "SP01", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone 18 Pro", "price": 45500000, "moTa": "Màn hình: 6.9 inch LTPO Super Retina XDR OLED, 2868 x 1320, 120Hz ProMotion, Dynamic Island\nChip & bộ nhớ: Apple A20 Pro (2nm), RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP Fusion chính (khẩu độ biến thiên) + 48MP tele tiềm vọng (zoom quang 4x/8x) + 48MP siêu rộng; Trước: 18MP Center Stage\nPin & sạc: Khoảng 5391mAh (xem video đến 43 giờ), sạc nhanh có dây 50% trong 15 phút, sạc không dây MagSafe/Qi2 25W\nHệ điều hành: iOS 27 (nâng cấp được lên phiên bản mới nhất)\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone-18-pro.png", "color": "Đỏ Burgundy" },
            { "maSP": "SP02", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy S24 Ultra", "price": 33990000, "moTa": "Màn hình: 6.8 inch Dynamic AMOLED 2X, QHD+, 120Hz, kèm bút S Pen\nChip & bộ nhớ: Snapdragon 8 Gen 3 for Galaxy, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 12MP siêu rộng + 10MP tele 3x + 50MP tele 5x; Trước: 12MP\nPin & sạc: 5000mAh, sạc nhanh có dây 45W, sạc không dây 15W\nHệ điều hành: Android 14, One UI 6.1 (nâng cấp 7 năm)\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-s24-ultra.png", "color": "Đen Titan" },
            { "maSP": "SP03", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Find N3", "price": 24990000, "moTa": "Màn hình: Màn hình gập chính 7.82 inch AMOLED LTPO 120Hz + màn hình ngoài 6.31 inch\nChip & bộ nhớ: Snapdragon 8 Gen 2, RAM 16GB, bộ nhớ trong 512GB\nCamera: Sau: 48MP chính + 48MP siêu rộng + 64MP tele periscope 3x; Trước: 32MP\nPin & sạc: 4805mAh, sạc nhanh SUPERVOOC 67W, sạc không dây AIRVOOC 50W\nHệ điều hành: Android 13, ColorOS 13.2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-find-N3.png", "color": "Xanh lá" },
            { "maSP": "SP04", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone Duo", "price": 69000000, "moTa": "Màn hình: Màn hình gập OLED LTPO 120Hz, kích thước mở rộng khoảng 7.8 inch\nChip & bộ nhớ: Chip Apple thế hệ mới, RAM 12GB, bộ nhớ trong 512GB\nCamera: Sau: 48MP chính + 48MP siêu rộng; Trước: 18MP\nPin & sạc: Pin dung lượng lớn dùng cả ngày, sạc nhanh có dây, sạc không dây MagSafe\nHệ điều hành: iOS 26\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone_duo_night_sky.png", "color": "Xanh Dương Sẫm" },
            { "maSP": "SP05", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone 16 Pro", "price": 28990000, "moTa": "Màn hình: 6.3 inch Super Retina XDR OLED, 120Hz ProMotion, Dynamic Island\nChip & bộ nhớ: Apple A18 Pro, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP chính + 48MP siêu rộng + 12MP tele 5x; Trước: 12MP\nPin & sạc: Khoảng 3582mAh, sạc nhanh có dây ~30W, sạc không dây MagSafe 25W\nHệ điều hành: iOS 18 (nâng cấp được lên phiên bản mới nhất)\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone-16-pro-natural.png", "color": "Titan Sa Mạc" },
            { "maSP": "SP06", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone 17 Pro", "price": 24990000, "moTa": "Màn hình: 6.3 inch Super Retina XDR OLED, 120Hz ProMotion\nChip & bộ nhớ: Apple A19 Pro, RAM 16GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP chính + 48MP siêu rộng; Trước: 18MP Center Stage\nPin & sạc: Pin dùng cả ngày, sạc nhanh có dây, sạc không dây MagSafe/Qi2 25W\nHệ điều hành: iOS 26\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone-17-pro.png", "color": "Cam" },
            { "maSP": "SP07", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone Air", "price": 31990000, "moTa": "Màn hình: 6.5 inch Super Retina XDR OLED, 120Hz ProMotion, thiết kế siêu mỏng khoảng 5.6mm\nChip & bộ nhớ: Apple A19 Pro, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP chính; Trước: 18MP Center Stage\nPin & sạc: Pin dùng cả ngày, sạc nhanh có dây, sạc không dây MagSafe/Qi2\nHệ điều hành: iOS 26\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A, chỉ hỗ trợ eSIM\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone-air.png", "color": "Trắng Ngọc" },
            { "maSP": "SP08", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy S25 Ultra", "price": 31990000, "moTa": "Màn hình: 6.9 inch Dynamic AMOLED 2X, QHD+, 120Hz, kèm bút S Pen\nChip & bộ nhớ: Snapdragon 8 Elite for Galaxy, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 50MP siêu rộng + 10MP tele 3x + 50MP tele 5x; Trước: 12MP\nPin & sạc: 5000mAh, sạc nhanh có dây 45W, sạc không dây 15W\nHệ điều hành: Android 15, One UI 7\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-s25-ultra.png", "color": "Xám Titan" },
            { "maSP": "SP09", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy S26", "price": 24990000, "moTa": "Màn hình: 6.3 inch Dynamic AMOLED 2X, 120Hz\nChip & bộ nhớ: Exynos 2600 / Snapdragon 8 Elite Gen 5 for Galaxy (tùy thị trường), RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 12MP siêu rộng + 10MP tele 3x; Trước: 12MP\nPin & sạc: Khoảng 4300mAh, sạc nhanh có dây 25W, sạc không dây 15W\nHệ điều hành: Android 16, One UI 8.5\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-s26.png", "color": "Đen" },
            { "maSP": "SP10", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy Z Fold7", "price": 46990000, "moTa": "Màn hình: Màn hình trong 8.0 inch Dynamic AMOLED 2X 120Hz + màn hình ngoài 6.5 inch\nChip & bộ nhớ: Snapdragon 8 Elite for Galaxy, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 12MP siêu rộng + 10MP tele 3x; Trước: 10MP (ngoài) + 10MP (trong)\nPin & sạc: 4400mAh, sạc nhanh có dây 25W, sạc không dây 15W\nHệ điều hành: Android 16, One UI 8\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-zfold7.png", "color": "Xanh Bạc" },
            { "maSP": "SP11", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy A56 5G", "price": 11990000, "moTa": "Màn hình: 6.7 inch Super AMOLED, Full HD+, 120Hz\nChip & bộ nhớ: Exynos 1580, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 12MP siêu rộng + 5MP macro; Trước: 12MP\nPin & sạc: 5000mAh, sạc nhanh có dây 45W\nHệ điều hành: Android 15, One UI 7\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-a56-5g.png", "color": "Xám" },
            { "maSP": "SP12", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Find X8 Pro", "price": 29990000, "moTa": "Màn hình: 6.78 inch AMOLED LTPO, 2K, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 9400, RAM 16GB, bộ nhớ trong 512GB\nCamera: Sau: 50MP chính + 50MP siêu rộng + 50MP tele 3x + 50MP tele 6x; Trước: 32MP\nPin & sạc: 5910mAh, sạc nhanh có dây 80W, sạc không dây 50W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-find-x8-pro.png", "color": "Đen Không Gian" },
            { "maSP": "SP13", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Reno14 Pro 5G", "price": 19990000, "moTa": "Màn hình: 6.83 inch AMOLED, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 8450, RAM 12GB, bộ nhớ trong 512GB\nCamera: Sau: 50MP chính + 50MP tele 3.5x + 8MP siêu rộng; Trước: 50MP\nPin & sạc: 6200mAh, sạc nhanh có dây 80W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-reno14-pro.png", "color": "Xanh Ngọc" },
            { "maSP": "SP14", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Reno13 5G", "price": 12990000, "moTa": "Màn hình: 6.59 inch AMOLED, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 8350, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 50MP tele 3x + 8MP siêu rộng; Trước: 50MP\nPin & sạc: 5600mAh, sạc nhanh có dây 80W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-reno13-pro.png", "color": "Tím" },
            { "maSP": "SP15", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO A5 Pro 5G", "price": 6990000, "moTa": "Màn hình: 6.67 inch LCD, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 6300, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 2MP; Trước: 8MP\nPin & sạc: 5800mAh, sạc nhanh có dây 45W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-a5-pro.png", "color": "Xanh Dương" },
            { "maSP": "SP16", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Xiaomi 15 Ultra", "price": 31990000, "moTa": "Màn hình: 6.73 inch AMOLED LTPO, WQHD+, 120Hz\nChip & bộ nhớ: Snapdragon 8 Elite, RAM 16GB, bộ nhớ trong 512GB\nCamera: Sau (Leica): 50MP chính 1 inch + 50MP siêu rộng + 50MP tele 3x + 200MP tele periscope 4.3x; Trước: 32MP\nPin & sạc: 5410mAh, sạc nhanh có dây 90W, sạc không dây 80W\nHệ điều hành: Android 15, HyperOS 2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Xiaomi-15-ultra.png", "color": "Đen" },
            { "maSP": "SP17", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Xiaomi 15", "price": 19990000, "moTa": "Màn hình: 6.36 inch AMOLED LTPO, 120Hz\nChip & bộ nhớ: Snapdragon 8 Elite, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau (Leica): 50MP chính + 50MP siêu rộng + 50MP tele 3x; Trước: 32MP\nPin & sạc: 5240mAh, sạc nhanh có dây 90W, sạc không dây 50W\nHệ điều hành: Android 15, HyperOS 2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Xiaomi-15.png", "color": "Xanh Lá" },
            { "maSP": "SP18", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Xiaomi 14T Pro", "price": 14990000, "moTa": "Màn hình: 6.67 inch AMOLED, 144Hz\nChip & bộ nhớ: MediaTek Dimensity 9300+, RAM 12GB, bộ nhớ trong 512GB\nCamera: Sau (Leica): 50MP chính + 50MP tele 2.6x + 12MP siêu rộng; Trước: 32MP\nPin & sạc: 5000mAh, sạc nhanh có dây 120W\nHệ điều hành: Android 14, HyperOS\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Xiaomi-14t-pro.png", "color": "Xám Titan" },
            { "maSP": "SP19", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Redmi Note 14 Pro+ 5G", "price": 9990000, "moTa": "Màn hình: 6.67 inch AMOLED, 120Hz\nChip & bộ nhớ: Snapdragon 7s Gen 3, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 8MP siêu rộng + 2MP macro; Trước: 20MP\nPin & sạc: 5110mAh, sạc nhanh có dây 90W\nHệ điều hành: Android 14, HyperOS\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Redmi-note-14prop.png", "color": "Tím" },
            { "maSP": "SP20", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "POCO F7", "price": 11490000, "moTa": "Màn hình: 6.83 inch AMOLED, 120Hz\nChip & bộ nhớ: Snapdragon 8s Gen 4, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 8MP siêu rộng; Trước: 20MP\nPin & sạc: 6500mAh, sạc nhanh có dây 90W\nHệ điều hành: Android 15, HyperOS 2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/poco-f7.png", "color": "Bạc" }
        ];
        localStorage.setItem("danhMucSanPham", JSON.stringify(spMau));
    }

    // 3. Tạo 1 phiếu nhập mẫu: mỗi sản phẩm nhập 10 cái
    if (!localStorage.getItem("saved_imports")) {
        const phieuNhapMau = [
            {
                code: "PN001",
                date: "2026-10-25",
                status: "completed",
                totalAmount: 4537250000,
                items: [
                    { "maSP": "SP01", "tenSP": "iPhone 18 Pro", "hinh": "../Img/Apple/iphone-18-pro.png", "qty": 10, "price": 38675000 },
                    { "maSP": "SP02", "tenSP": "Galaxy S24 Ultra", "hinh": "../Img/Samsung/Samsung-galaxy-s24-ultra.png", "qty": 10, "price": 28890000 },
                    { "maSP": "SP03", "tenSP": "OPPO Find N3", "hinh": "../Img/OPPO/Oppo-find-N3.png", "qty": 10, "price": 21240000 },
                    { "maSP": "SP04", "tenSP": "iPhone Duo", "hinh": "../Img/Apple/iphone_duo_night_sky.png", "qty": 10, "price": 58650000 },
                    { "maSP": "SP05", "tenSP": "iPhone 16 Pro", "hinh": "../Img/Apple/iphone-16-pro-natural.png", "qty": 10, "price": 24640000 },
                    { "maSP": "SP06", "tenSP": "iPhone 17 Pro", "hinh": "../Img/Apple/iphone-17-pro.png", "qty": 10, "price": 21240000 },
                    { "maSP": "SP07", "tenSP": "iPhone Air", "hinh": "../Img/Apple/iphone-air.png", "qty": 10, "price": 27190000 },
                    { "maSP": "SP08", "tenSP": "Galaxy S25 Ultra", "hinh": "../Img/Samsung/Samsung-galaxy-s25-ultra.png", "qty": 10, "price": 27190000 },
                    { "maSP": "SP09", "tenSP": "Galaxy S26", "hinh": "../Img/Samsung/Samsung-galaxy-s26.png", "qty": 10, "price": 21240000 },
                    { "maSP": "SP10", "tenSP": "Galaxy Z Fold7", "hinh": "../Img/Samsung/Samsung-galaxy-zfold7.png", "qty": 10, "price": 39940000 },
                    { "maSP": "SP11", "tenSP": "Galaxy A56 5G", "hinh": "../Img/Samsung/Samsung-galaxy-a56-5g.png", "qty": 10, "price": 10190000 },
                    { "maSP": "SP12", "tenSP": "OPPO Find X8 Pro", "hinh": "../Img/OPPO/Oppo-find-x8-pro.png", "qty": 10, "price": 25490000 },
                    { "maSP": "SP13", "tenSP": "OPPO Reno14 Pro 5G", "hinh": "../Img/OPPO/Oppo-reno14-pro.png", "qty": 10, "price": 16990000 },
                    { "maSP": "SP14", "tenSP": "OPPO Reno13 5G", "hinh": "../Img/OPPO/Oppo-reno13-pro.png", "qty": 10, "price": 11040000 },
                    { "maSP": "SP15", "tenSP": "OPPO A5 Pro 5G", "hinh": "../Img/OPPO/Oppo-a5-pro.png", "qty": 10, "price": 5940000 },
                    { "maSP": "SP16", "tenSP": "Xiaomi 15 Ultra", "hinh": "../Img/Xiaomi/Xiaomi-15-ultra.png", "qty": 10, "price": 27190000 },
                    { "maSP": "SP17", "tenSP": "Xiaomi 15", "hinh": "../Img/Xiaomi/Xiaomi-15.png", "qty": 10, "price": 16990000 },
                    { "maSP": "SP18", "tenSP": "Xiaomi 14T Pro", "hinh": "../Img/Xiaomi/Xiaomi-14t-pro.png", "qty": 10, "price": 12740000 },
                    { "maSP": "SP19", "tenSP": "Redmi Note 14 Pro+ 5G", "hinh": "../Img/Xiaomi/Redmi-note-14prop.png", "qty": 10, "price": 8490000 },
                    { "maSP": "SP20", "tenSP": "POCO F7", "hinh": "../Img/Xiaomi/poco-f7.png", "qty": 10, "price": 9770000 }
                ]
            }
        ];
        localStorage.setItem("saved_imports", JSON.stringify(phieuNhapMau));
    }

    // 4. Tạo bảng giá bán mẫu (giá vốn = giá nhập bình quân, giá bán = giá niêm yết)
    if (!localStorage.getItem("saved_pricing")) {
        const giaMau = [
            { "maSP": "SP01", "tenSP": "iPhone 18 Pro", "hinh": "../Img/Apple/iphone-18-pro.png", "totalQty": 10, "totalCost": 386750000, "importPrice": 38675000, "retailPrice": 45500000 },
            { "maSP": "SP02", "tenSP": "Galaxy S24 Ultra", "hinh": "../Img/Samsung/Samsung-galaxy-s24-ultra.png", "totalQty": 10, "totalCost": 288900000, "importPrice": 28890000, "retailPrice": 33990000 },
            { "maSP": "SP03", "tenSP": "OPPO Find N3", "hinh": "../Img/OPPO/Oppo-find-N3.png", "totalQty": 10, "totalCost": 212400000, "importPrice": 21240000, "retailPrice": 24990000 },
            { "maSP": "SP04", "tenSP": "iPhone Duo", "hinh": "../Img/Apple/iphone_duo_night_sky.png", "totalQty": 10, "totalCost": 586500000, "importPrice": 58650000, "retailPrice": 69000000 },
            { "maSP": "SP05", "tenSP": "iPhone 16 Pro", "hinh": "../Img/Apple/iphone-16-pro-natural.png", "totalQty": 10, "totalCost": 246400000, "importPrice": 24640000, "retailPrice": 28990000 },
            { "maSP": "SP06", "tenSP": "iPhone 17 Pro", "hinh": "../Img/Apple/iphone-17-pro.png", "totalQty": 10, "totalCost": 212400000, "importPrice": 21240000, "retailPrice": 24990000 },
            { "maSP": "SP07", "tenSP": "iPhone Air", "hinh": "../Img/Apple/iphone-air.png", "totalQty": 10, "totalCost": 271900000, "importPrice": 27190000, "retailPrice": 31990000 },
            { "maSP": "SP08", "tenSP": "Galaxy S25 Ultra", "hinh": "../Img/Samsung/Samsung-galaxy-s25-ultra.png", "totalQty": 10, "totalCost": 271900000, "importPrice": 27190000, "retailPrice": 31990000 },
            { "maSP": "SP09", "tenSP": "Galaxy S26", "hinh": "../Img/Samsung/Samsung-galaxy-s26.png", "totalQty": 10, "totalCost": 212400000, "importPrice": 21240000, "retailPrice": 24990000 },
            { "maSP": "SP10", "tenSP": "Galaxy Z Fold7", "hinh": "../Img/Samsung/Samsung-galaxy-zfold7.png", "totalQty": 10, "totalCost": 399400000, "importPrice": 39940000, "retailPrice": 46990000 },
            { "maSP": "SP11", "tenSP": "Galaxy A56 5G", "hinh": "../Img/Samsung/Samsung-galaxy-a56-5g.png", "totalQty": 10, "totalCost": 101900000, "importPrice": 10190000, "retailPrice": 11990000 },
            { "maSP": "SP12", "tenSP": "OPPO Find X8 Pro", "hinh": "../Img/OPPO/Oppo-find-x8-pro.png", "totalQty": 10, "totalCost": 254900000, "importPrice": 25490000, "retailPrice": 29990000 },
            { "maSP": "SP13", "tenSP": "OPPO Reno14 Pro 5G", "hinh": "../Img/OPPO/Oppo-reno14-pro.png", "totalQty": 10, "totalCost": 169900000, "importPrice": 16990000, "retailPrice": 19990000 },
            { "maSP": "SP14", "tenSP": "OPPO Reno13 5G", "hinh": "../Img/OPPO/Oppo-reno13-pro.png", "totalQty": 10, "totalCost": 110400000, "importPrice": 11040000, "retailPrice": 12990000 },
            { "maSP": "SP15", "tenSP": "OPPO A5 Pro 5G", "hinh": "../Img/OPPO/Oppo-a5-pro.png", "totalQty": 10, "totalCost": 59400000, "importPrice": 5940000, "retailPrice": 6990000 },
            { "maSP": "SP16", "tenSP": "Xiaomi 15 Ultra", "hinh": "../Img/Xiaomi/Xiaomi-15-ultra.png", "totalQty": 10, "totalCost": 271900000, "importPrice": 27190000, "retailPrice": 31990000 },
            { "maSP": "SP17", "tenSP": "Xiaomi 15", "hinh": "../Img/Xiaomi/Xiaomi-15.png", "totalQty": 10, "totalCost": 169900000, "importPrice": 16990000, "retailPrice": 19990000 },
            { "maSP": "SP18", "tenSP": "Xiaomi 14T Pro", "hinh": "../Img/Xiaomi/Xiaomi-14t-pro.png", "totalQty": 10, "totalCost": 127400000, "importPrice": 12740000, "retailPrice": 14990000 },
            { "maSP": "SP19", "tenSP": "Redmi Note 14 Pro+ 5G", "hinh": "../Img/Xiaomi/Redmi-note-14prop.png", "totalQty": 10, "totalCost": 84900000, "importPrice": 8490000, "retailPrice": 9990000 },
            { "maSP": "SP20", "tenSP": "POCO F7", "hinh": "../Img/Xiaomi/poco-f7.png", "totalQty": 10, "totalCost": 97700000, "importPrice": 9770000, "retailPrice": 11490000 }
        ];
        localStorage.setItem("saved_pricing", JSON.stringify(giaMau));
    }
}

// Chạy tự động ngay khi mở web
khoiTaoDuLieuMau();
/*======================================================================
    ĐĂNG NHẬP CHO TRANG ADMIN
======================================================================*/
const KEY_ADMIN_PASS = 'adminPassword';

function getAdminPassword() {
    return localStorage.getItem(KEY_ADMIN_PASS) || '123456'
}

function handleLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Xóa thông báo cũ
    usernameError.textContent = '';
    passwordError.textContent = '';

    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    let isValid = true;

    // Kiểm tra tên đăng nhập
    if (!user) {
        usernameError.textContent = 'Vui lòng nhập tên đăng nhập!';
        usernameError.style.display = 'block';
        isValid = false;
    } else if (user !== 'admin') {
        usernameError.textContent = 'Tên đăng nhập không chính xác!';
        usernameError.style.display = 'block';
        isValid = false;
    }

    // Kiểm tra mật khẩu
    if (!pass) {
        passwordError.textContent = 'Vui lòng nhập mật khẩu!';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (pass !== getAdminPassword()) {
        passwordError.textContent = 'Mật khẩu không chính xác!';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    // Đăng nhập thành công
    document.getElementById('loginArea').style.display = 'none';
    document.getElementById('dashboardArea').style.display = 'flex';

    sessionStorage.setItem('isAdminLoggedIn', 'true');

    const defaultMenu = document.getElementById('menu-customers');
    if (defaultMenu) {
        defaultMenu.click();
    }
}

function openChangePassModal() {
    document.getElementById('oldAdminPass').value = '';
    document.getElementById('newAdminPass').value = '';
    document.getElementById('confirmAdminPass').value = '';
    document.getElementById('changePassModal').style.display = 'flex';
    document.getElementById('oldAdminPass').focus();
}

function saveAdminPassword() {
    const oldPass = document.getElementById('oldAdminPass').value;
    const newPass = document.getElementById('newAdminPass').value;
    const confirmPass = document.getElementById('confirmAdminPass').value;

    if (!oldPass || !newPass || !confirmPass) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    if (oldPass !== getAdminPassword()) {
        alert('Mật khẩu hiện tại không chính xác!');
        document.getElementById('oldAdminPass').focus();
        return;
    }
    if (newPass !== confirmPass) {
        alert('Mật khẩu xác nhận không khớp!')
        document.getElementById('confirmAdminPass').focus();
        return;
    }

    localStorage.setItem(KEY_ADMIN_PASS, newPass);
    closeModal();
    alert('Đổi mật khẩu thành công!');
}
// 2. HÀM XỬ LÝ ĐĂNG XUẤT
function handleLogout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        sessionStorage.removeItem('isAdminLoggedIn');
        document.getElementById('dashboardArea').style.display = 'none';
        document.getElementById('loginArea').style.display = 'flex';

        // Xóa trắng mật khẩu cũ
        document.getElementById('password').value = "";
    }
}

// Khởi chạy các UI cơ bản sau khi trang đã tải xong
document.addEventListener("DOMContentLoaded", function () {

    // Kiểm tra xem trước đó đã đăng nhập chưa (Chống văng khi F5)
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('dashboardArea').style.display = 'flex';
    }

    // Hỗ trợ ấn phím Enter ở ô mật khẩu để đăng nhập nhanh
    const passInput = document.getElementById('password');
    if (passInput) {
        passInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') handleLogin();
        });
    }
});
/*======================================================================
    PHẦN DÙNG CHUNG CHO CẢ TRANG ADMIN
======================================================================*/
// Hàm định dạng tiền tệ (VD: 150000 -> 150.000 đ)
function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + '\u00A0đ';
}

// Hàm ĐÓNG MODAL DÙNG CHUNG (Đã hợp nhất để tránh xung đột)
function closeModal() {
    const importModal = document.getElementById('importModal');
    if (importModal) importModal.style.display = 'none';

    const pricingModal = document.getElementById('pricingModal');
    if (pricingModal) pricingModal.style.display = 'none';

    const orderModal = document.getElementById('orderModal');
    if (orderModal) orderModal.style.display = 'none';

    const inventoryDetailModal = document.getElementById('inventoryDetailModal');
    if (inventoryDetailModal) inventoryDetailModal.style.display = 'none';

    const changePassModal = document.getElementById('changePassModal');
    if (changePassModal) changePassModal.style.display = 'none';
}

// Khởi chạy các UI cơ bản (Sidebar) sau khi trang đã tải xong
document.addEventListener("DOMContentLoaded", function () {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('collapsed');
        });
    }
});

/*======================================================================
    PHẦN DÙNG CHO TRANG QL KHÁCH HÀNG
======================================================================*/
const KEY_TAIKHOAN = "taiKhoan";
const KEY_HD = "hoatdong";
const KEY_NHD = "ngunghoatdong";
const KEY_DAXOA = "daXoa";

// Đọc JSON 
function docDuLieu(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || []; //nếu vế đầu trả về null, hàm sẽ trả về mảng rỗng
    } catch (e) {
        return [];
    }
}

// Lưu JSON
function luuDuLieu(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Chuẩn hóa để tìm kiếm không phân biệt dấu
function chuanHoaChu(value) {
    return String(value || "")
        .normalize("NFD") //tách é thành e + dấu sắc, vd vậy
        .replace(/[\u0300-\u036f]/g, "") //xóa các dấu vừa đc tách, Thế giới thành The gioi, vd v
        .replace(/đ/g, "d") //chuyển đ thành d
        .replace(/Đ/g, "D")
        .toLowerCase()
        .trim();
}

// Mã hóa nội dung trước khi đưa vào HTML
function anToanKH(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (c) { //chuyển dl vào thành String, nếu ko thì thay bằng chuỗi rỗng, đổi các kí tự trong [] thành:
        return {
            "&": "&amp;", //dấu và
            "<": "&lt;", //bé hơn
            ">": "&gt;", //lớn hơn
            '"': "&quot;",
            "'": "&#39;"
        }[c];
    });
}

// Chuẩn hóa danh sách trạng thái theo mã KH
function chuanHoaDanhSachKH(key) {
    const ds = docDuLieu(key); //lấy ds theo khóa (vd dskh, dssp)
    const taiKhoan = docDuLieu(KEY_TAIKHOAN);
    const ketQua = [];

    ds.forEach(function (item) {
        if (typeof item === "string") { //Nếu là kiểu chuỗi (MaKH, tên kh, sdt,...)
            const tk = taiKhoan.find(function (acc) {
                return acc.maKH === item ||
                    acc.email?.toLowerCase() === item.toLowerCase() || //dấu ? để dừng lại nếu ko tk ko có email, giúp tránh CT sập
                    acc.soDienThoai === item;
            });

            if (tk) ketQua.push(tk.maKH || tk.email);
        } else if (item && typeof item === "object") { //nếu là kiểu đối tượng ({maKH: "KH01",...})
            const tk = taiKhoan.find(function (acc) {
                return (item.maKH && acc.maKH === item.maKH) ||
                    (item.email && acc.email?.toLowerCase() === item.email.toLowerCase()) ||
                    (item.soDienThoai && acc.soDienThoai === item.soDienThoai);
            });

            if (tk) ketQua.push(tk.maKH || tk.email);
        }
    });

    return [...new Set(ketQua)]; ///... dùng để chuyển Set thành String (Set là 1 ctdl xóa các gtri bị lặp)
}

// Tạo mã KH cho tài khoản cũ chưa có mã
function capNhatMaKH() {
    let taiKhoan = docDuLieu(KEY_TAIKHOAN);
    let so = 1;

    taiKhoan.forEach(function (tk) {
        if (!tk.maKH) {
            let ma;

            do {
                ma = "KH" + String(so).padStart(3, "0"); //Phần đuôi có độ dài là 3, nếu thiếu thì điền 0 trước
                so++;
            } while (taiKhoan.some(function (acc) { //hàm some ktra xem trong ds tk có mã nào trùng ko, nếu có (true) vòng do-while chạy lại
                return acc.maKH === ma;
            }));

            tk.maKH = ma;
        }
    });

    luuDuLieu(KEY_TAIKHOAN, taiKhoan); //ghi đè dl mới đã cập nhật xong ds vào localStorage
}

// Xác định trạng thái tài khoản
function trangThaiKH(tk) {
    const id = tk.maKH || tk.email;
    const daXoa = chuanHoaDanhSachKH(KEY_DAXOA);
    const ngung = chuanHoaDanhSachKH(KEY_NHD);

    if (daXoa.includes(id)) return "daXoa";
    if (ngung.includes(id)) return "ngunghoatdong";
    return "hoatdong";
}

// Lưu trạng thái theo mã KH, email và số điện thoại
// Login user hiện tại có thể nhận diện email hoặc số điện thoại
function datTrangThaiKH(maKH, trangThai) {
    const taiKhoan = docDuLieu(KEY_TAIKHOAN);

    const tk = taiKhoan.find(function (item) {
        return (item.maKH || item.email) === maKH;
    });

    if (!tk) return;

    const thongTin = {
        maKH: tk.maKH,
        email: tk.email,
        soDienThoai: tk.soDienThoai
    };

    [KEY_HD, KEY_NHD, KEY_DAXOA].forEach(function (key) {
        let ds = docDuLieu(key);

        ds = ds.filter(function (item) { //loại bỏ các phần tử khớp với thông tin của tk
            if (typeof item === "string") {
                return item !== tk.maKH &&
                    item.toLowerCase() !== String(tk.email).toLowerCase() &&
                    item !== tk.soDienThoai;
            }

            return item.maKH !== tk.maKH &&
                String(item.email || "").toLowerCase() !==
                String(tk.email || "").toLowerCase() &&
                item.soDienThoai !== tk.soDienThoai;
        });

        luuDuLieu(key, ds);
    });

    const key = trangThai === "hoatdong"
        ? KEY_HD
        : trangThai === "ngunghoatdong"
            ? KEY_NHD
            : KEY_DAXOA;

    const dsMoi = docDuLieu(key);
    dsMoi.push(thongTin);
    luuDuLieu(key, dsMoi);
}

// Chuyển trạng thái tài khoản thành mã KH
function dongBoTrangThaiKH() {
    const taiKhoan = docDuLieu(KEY_TAIKHOAN);
    const hd = [];
    const nhd = [];
    const dx = [];

    taiKhoan.forEach(function (tk) {
        const id = tk.maKH || tk.email;
        const trangThai = trangThaiKH(tk);

        if (trangThai === "daXoa") dx.push(id);
        else if (trangThai === "ngunghoatdong") nhd.push(id);
        else hd.push(id);
    });

    luuDuLieu(KEY_HD, hd);
    luuDuLieu(KEY_NHD, nhd);
    luuDuLieu(KEY_DAXOA, dx);
}

// Khởi tạo trang khách hàng
function initCustomersPage() {
    const page = document.getElementById("customersPage");
    if (!page) return;

    capNhatMaKH();

    page.innerHTML = `
        <div class="customer-page">
            <div class="page-header">
                <h2 class="page-title">Quản lý khách hàng</h2>
            </div>

            <div class="customer-tabs">
                <button type="button" class="active"
                    data-customer-tab="list">Danh sách khách hàng</button>
                <button type="button"
                    data-customer-tab="reset">Reset mật khẩu khách hàng</button>
                <button type="button"
                    data-customer-tab="lock">Khóa / mở tài khoản</button>
            </div>

            <div class="customer-search">
                <input id="customerSearch"
                    placeholder="Tìm mã KH, tên, số điện thoại, email...">
                <button type="button" id="customerSearchBtn">Tìm kiếm</button>
            </div>

            <div id="customerListPanel">
                <div class="customer-list-heading">
                    <h3>Danh sách khách hàng</h3>
                </div>
                <div class="customer-table-wrap">
                    <table class="customer-table">
                        <thead>
                            <tr>
                                <th>Mã KH</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th> 
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody id="customerTableBody"></tbody>
                    </table>
                </div>
            </div>

            <div id="customerResetPanel" style="display:none;">
                <div class="customer-list-heading">
                    <h3>Reset mật khẩu khách hàng</h3>
                </div>
                <div class="customer-table-wrap">
                    <table class="customer-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="checkAllReset"></th>
                                <th>Mã KH</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th> 
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody id="resetTableBody"></tbody>
                    </table>
                </div>
                <div class="customer-actions">
                    <button type="button" id="resetSelectedCustomers">
                        Reset mật khẩu các tài khoản đã chọn
                    </button>
                </div>
        
            </div>

            <div id="customerLockPanel" style="display:none;">
                <div class="customer-list-heading">
                    <h3>Khóa / mở tài khoản</h3>
                </div>
                <div class="customer-table-wrap">
                    <table class="customer-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="checkAllLock"></th>
                                <th>Mã KH</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th> 
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody id="lockTableBody"></tbody>
                    </table>
                </div>
                <div class="customer-actions">
                    <button type="button" id="lockSelectedCustomers">
                        Khóa tài khoản đã chọn
                    </button>
                    <button type="button" id="unlockSelectedCustomers">
                        Mở khóa tài khoản đã chọn
                    </button>
                </div>
            </div>
        </div>

        <div class="customer-modal" id="resetPasswordModal">
            <div class="customer-modal-content">
                <h3>Reset mật khẩu</h3>
                <p id="resetCountText"></p>
                <label for="newCustomerPassword">Mật khẩu mới</label>
                <input type="password" id="newCustomerPassword"
                    autocomplete="new-password">
                <label for="confirmCustomerPassword">Xác nhận mật khẩu</label>
                <input type="password" id="confirmCustomerPassword"
                    autocomplete="new-password">
                <div class="customer-modal-actions">
                    <button type="button" id="cancelResetPassword">Hủy</button>
                    <button type="button" id="saveResetPassword">Lưu mật khẩu</button>
                </div>
            </div>
        </div>
    `;

    page.querySelectorAll("[data-customer-tab]").forEach(function (btn) {
        btn.onclick = function () {
            hienThiTabKH(btn.dataset.customerTab);
        };
    });

    document.getElementById("customerSearchBtn").onclick = renderCustomers;
    document.getElementById("customerSearch").oninput = renderCustomers;

    document.getElementById("checkAllReset").onchange = function () {
        document.querySelectorAll(".reset-customer-check").forEach(cb => {
            cb.checked = this.checked;
        });
    };

    document.getElementById("checkAllLock").onchange = function () {
        document.querySelectorAll(".lock-customer-check").forEach(cb => {
            cb.checked = this.checked;
        });
    };

    document.getElementById("resetSelectedCustomers").onclick =
        moFormResetKH;

    document.getElementById("cancelResetPassword").onclick = function () {
        document.getElementById("resetPasswordModal").style.display = "none";
    };

    document.getElementById("saveResetPassword").onclick = resetMatKhauKH;

    document.getElementById("lockSelectedCustomers").onclick = function () {
        thayDoiTrangThaiNhieuKH("ngunghoatdong");
    };

    document.getElementById("unlockSelectedCustomers").onclick = function () {
        thayDoiTrangThaiNhieuKH("hoatdong");
    };

    hienThiTabKH("list");
}

// Chuyển giữa 3 chức năng bên trong trang khách hàng
function hienThiTabKH(tab) {
    document.getElementById("customerListPanel").style.display =
        tab === "list" ? "block" : "none";

    document.getElementById("customerResetPanel").style.display =
        tab === "reset" ? "block" : "none";

    document.getElementById("customerLockPanel").style.display =
        tab === "lock" ? "block" : "none";

    document.querySelectorAll("[data-customer-tab]").forEach(function (btn) {
        btn.classList.toggle("active", btn.dataset.customerTab === tab);
    });

    renderCustomers();
}

// Lấy danh sách khách hàng theo từ khóa tìm kiếm
function layKHTheoTuKhoa() {
    const tuKhoa = chuanHoaChu(
        document.getElementById("customerSearch")?.value || ""
    );

    return docDuLieu(KEY_TAIKHOAN).filter(function (tk) {
        const noiDung = chuanHoaChu([
            tk.maKH,
            tk.hoTen,
            tk.soDienThoai,
            tk.email,
            tk.diaChi
        ].join(" "));

        return noiDung.includes(tuKhoa);
    });
}

// Hiển thị 3 bảng
function renderCustomers() {
    const ds = layKHTheoTuKhoa();

    const html = function (tk, loai) {
        const id = tk.maKH || tk.email;
        const status = trangThaiKH(tk);

        let tenTrangThai = "Hoạt động";
        if (status === "ngunghoatdong") {
            tenTrangThai = "Ngừng hoạt động";
        }
        if (status === "daXoa") {
            tenTrangThai = "Tài khoản đã xóa";
        }

        // Danh sách khách hàng: không hiển thị checkbox
        // Hai tab Reset và Khóa/mở: vẫn giữ checkbox để chọn tài khoản
        const cotCheckbox = loai === "list"
            ? ""
            : `<td>
                <input type="checkbox"
                    class="${loai}-customer-check"
                    value="${anToanKH(id)}"
                    ${status === "daXoa" ? "disabled" : ""}>
                </td>`;

        return `
            <tr>
                ${cotCheckbox}
                <td>${anToanKH(tk.maKH)}</td>
                <td>${anToanKH(tk.hoTen)}</td>
                <td>${anToanKH(tk.email)}</td>
                <td>${anToanKH(tk.soDienThoai)}</td>
                <td>${anToanKH(tk.diaChi || "Chưa cập nhật")}</td>

                <td>
                    <span class="customer-status ${status}">
                        ${tenTrangThai}
                    </span>
                </td>
            </tr>
        `;
    };

    // Bảng danh sách có 5 cột, hai bảng còn lại có 6 cột
    const emptyList = `
        <tr>
            <td colspan="6">Không có khách hàng phù hợp.</td>
        </tr>
    `;

    const emptyCheckbox = `
        <tr>
            <td colspan="7">Không có khách hàng phù hợp.</td>
        </tr>
    `;

    document.getElementById("customerTableBody").innerHTML =
        ds.length
            ? ds.map(tk => html(tk, "list")).join("")
            : emptyList;

    document.getElementById("resetTableBody").innerHTML =
        ds.length
            ? ds.map(tk => html(tk, "reset")).join("")
            : emptyCheckbox;

    document.getElementById("lockTableBody").innerHTML =
        ds.length
            ? ds.map(tk => html(tk, "lock")).join("")
            : emptyCheckbox;
}

// Lấy các khách hàng đã chọn
function layKHDaChon(loai) {
    return [...document.querySelectorAll("." + loai + "-customer-check:checked")]
        .map(cb => cb.value);
}

// Mở form reset mật khẩu
function moFormResetKH() {
    const ds = layKHDaChon("reset");

    if (ds.length === 0) {
        alert("Vui lòng chọn ít nhất một khách hàng!");
        return;
    }

    const taiKhoan = docDuLieu(KEY_TAIKHOAN);

    const khHopLe = ds.filter(function (id) {
        const tk = taiKhoan.find(acc => (acc.maKH || acc.email) === id);
        return tk && trangThaiKH(tk) === "hoatdong";
    });

    if (khHopLe.length === 0) {
        alert("Chỉ có thể reset mật khẩu tài khoản đang hoạt động!");
        return;
    }

    document.getElementById("resetCountText").textContent =
        "Bạn đang reset mật khẩu cho " + khHopLe.length + " tài khoản.";

    document.getElementById("resetPasswordModal").dataset.ids =
        JSON.stringify(khHopLe);

    document.getElementById("newCustomerPassword").value = "";
    document.getElementById("confirmCustomerPassword").value = "";
    document.getElementById("resetPasswordModal").style.display = "flex";
}

// Lưu mật khẩu mới vào taiKhoan
function resetMatKhauKH() {
    const modal = document.getElementById("resetPasswordModal");
    const ids = JSON.parse(modal.dataset.ids || "[]");

    const mkMoi = document.getElementById("newCustomerPassword").value;
    const xacNhan = document.getElementById("confirmCustomerPassword").value;

    if (!mkMoi) {
        alert("Vui lòng nhập mật khẩu mới!");
        return;
    }

    if (mkMoi !== xacNhan) {
        alert("Mật khẩu xác nhận không trùng khớp!");
        return;
    }

    let taiKhoan = docDuLieu(KEY_TAIKHOAN);
    let dem = 0;

    taiKhoan = taiKhoan.map(function (tk) {
        if (ids.includes(tk.maKH || tk.email) &&
            trangThaiKH(tk) === "hoatdong") {
            tk.matKhau = mkMoi;
            dem++;
        }
        return tk;
    });

    luuDuLieu(KEY_TAIKHOAN, taiKhoan);
    modal.style.display = "none";

    alert("Đã reset mật khẩu cho " + dem + " tài khoản.");
    renderCustomers();
}

// Khóa hoặc mở nhiều tài khoản
function thayDoiTrangThaiNhieuKH(trangThai) {
    const ds = layKHDaChon("lock");

    if (ds.length === 0) {
        alert("Vui lòng chọn ít nhất một khách hàng!");
        return;
    }

    const taiKhoan = docDuLieu(KEY_TAIKHOAN);

    ds.forEach(function (id) {
        const tk = taiKhoan.find(acc => (acc.maKH || acc.email) === id);
        if (!tk || trangThaiKH(tk) === "daXoa") return;

        datTrangThaiKH(id, trangThai);
    });

    renderCustomers();

    alert(trangThai === "ngunghoatdong"
        ? "Đã khóa các tài khoản được chọn."
        : "Đã mở khóa các tài khoản được chọn.");
}

// Theo dõi khi tài khoản user thay đổi từ tab khác
window.addEventListener("storage", function (e) {
    if ([KEY_TAIKHOAN, KEY_HD, KEY_NHD, KEY_DAXOA].includes(e.key)) {
        const page = document.getElementById("customersPage");
        if (page && page.style.display !== "none") {
            capNhatMaKH();
            renderCustomers();
        }
    }
});


// Khi nhấn các mục, nội dung bên phải sẽ thay đổi.
document.addEventListener("DOMContentLoaded", function () {
    const menuKH = document.getElementById("menu-customers");
    const menuLoai = document.getElementById("menu-product-types");
    const menuDanhMuc = document.getElementById("menu-product-categories");

    if (menuKH) {
        menuKH.addEventListener("click", function () {
            // 1. Ép ẩn TẤT CẢ các tab khác (Nhập hàng, Đơn hàng, Tồn kho...)
            document.querySelectorAll('.admin-module').forEach(mod => mod.style.display = 'none');

            // 2. Chuyển màu xám (active) cho menu Khách hàng
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
            this.classList.add('active');

            // 3. Gọi giao diện Khách hàng ra
            hienThiKhuVucQuanLy("customersPage");
            initCustomersPage();
        });
    }

    if (menuDanhMuc) {
        menuDanhMuc.addEventListener("click", function () {
            hienThiKhuVucQuanLy("productCategoriesPage");
        });
    }
});

// Ẩn các khu vực quản lý khác, chỉ hiện khu vực được chọn
function hienThiKhuVucQuanLy(id) {
    [
        "customersPage",
        "productTypesPage",
        "productCategoriesPage"
    ].forEach(function (pageId) {
        const page = document.getElementById(pageId);
        if (page) page.style.display = pageId === id ? "block" : "none";
    });

    if (id === "productTypesPage" &&
        typeof initProductTypesPage === "function") {
        initProductTypesPage();
    }

    if (id === "productCategoriesPage" &&
        typeof initProductCategoriesPage === "function") {
        initProductCategoriesPage();
    }
}

/*======================================================================
    PHẦN DÙNG CHO TRANG QUẢN LÝ SẢN PHẨM
======================================================================*/
function layDanhMucSanPham() {
    try { return JSON.parse(localStorage.getItem("danhMucSanPham")) || []; }
    catch (e) { return []; }
}

function luuDanhMucSanPham(ds) {
    localStorage.setItem("danhMucSanPham", JSON.stringify(ds));
}

// 1. Gắn sự kiện cho các nút bấm trong tab Sản phẩm
document.addEventListener("DOMContentLoaded", function () {
    const addProductBtn = document.getElementById("addProductBtn");
    if (addProductBtn) {
        addProductBtn.addEventListener("click", () => moFormSanPham());
        document.getElementById("cancelProductBtn").addEventListener("click", dongFormSanPham);
        document.getElementById("closeProductModalBtn").addEventListener("click", dongFormSanPham);

        document.getElementById("productSearchBtn").addEventListener("click", hienThiDanhMucSanPham);
        document.getElementById("productSearch").addEventListener("keydown", function (e) {
            if (e.key === "Enter") { e.preventDefault(); hienThiDanhMucSanPham(); }
        });

        document.getElementById("productResetSearchBtn").addEventListener("click", function () {
            document.getElementById("productSearch").value = "";
            if (document.getElementById("productCategoryFilter")) {
                document.getElementById("productCategoryFilter").value = "ALL";
            }
            hienThiDanhMucSanPham();
        });

        // Form submit
        document.getElementById("productForm").addEventListener("submit", function (e) {
            e.preventDefault();
            luuSanPhamTuForm();
        });

        // Xử lý ảnh
        document.getElementById("productImageFile").addEventListener("change", xemTruocAnhSanPham);
        document.getElementById("removeProductImageBtn").addEventListener("click", boAnhSanPham);

        // Lọc theo danh mục
        if (document.getElementById("productCategoryFilter")) {
            document.getElementById("productCategoryFilter").addEventListener("change", hienThiDanhMucSanPham);
        }
    }
});

// 2. Cập nhật các ô Dropdown chọn Loại sản phẩm
function capNhatLuaChonLoai() {
    const selectForm = document.getElementById("productCategory");
    const selectFilter = document.getElementById("productCategoryFilter");

    let dsLoai = [];
    try { dsLoai = JSON.parse(localStorage.getItem("loaiSanPham") || "[]"); } catch (e) { dsLoai = []; }

    // Chỉ lấy các loại đang hoạt động
    dsLoai = dsLoai.filter(loai => loai.trangThai !== "an");

    let options = '<option value="">-- Chọn loại sản phẩm --</option>';
    dsLoai.forEach(loai => {
        options += `<option value="${loai.maLoai}">${loai.tenLoai}</option>`;
    });

    if (selectForm) {
        const giaTriCu = selectForm.value;
        selectForm.innerHTML = options;
        selectForm.value = giaTriCu;
    }

    if (selectFilter) {
        const filterGiaTriCu = selectFilter.value;
        selectFilter.innerHTML = '<option value="ALL">Tất cả danh mục</option>' + options.replace('<option value="">-- Chọn loại sản phẩm --</option>', '');
        if (filterGiaTriCu) selectFilter.value = filterGiaTriCu;
    }
}

// 3. Mở Form Thêm / Sửa
function moFormSanPham(maSP = "") {
    const form = document.getElementById("productForm");
    const modal = document.getElementById("productModal");
    if (!form || !modal) return;

    form.reset();
    capNhatLuaChonLoai(); // Nạp mới danh sách Loại SP trước khi mở

    document.getElementById("productCode").value = "";
    document.getElementById("productFormTitle").textContent = maSP ? "Sửa sản phẩm" : "Thêm sản phẩm mới";

    form.dataset.maCu = maSP;
    form.dataset.hinhCu = "";
    form.dataset.hinhMoi = "";
    form.dataset.boAnh = "false";
    anHienXemTruocAnhSP(null);

    modal.style.display = "flex";

    if (!maSP) {
        document.getElementById("productCode").focus();
        return;
    }

    const sp = layDanhMucSanPham().find(x => x.maSP === maSP);
    if (!sp) {
        dongFormSanPham();
        alert("Không tìm thấy sản phẩm cần sửa!");
        return;
    }

    document.getElementById("productCode").value = sp.maSP || "";
    document.getElementById("productCategory").value = sp.maLoai || "";
    document.getElementById("productName").value = sp.tenSP || "";
    document.getElementById("productDescription").value = sp.moTa || "";
    form.dataset.hinhCu = sp.hinh || "";
    anHienXemTruocAnhSP(sp.hinh || null);
}

function dongFormSanPham() {
    document.getElementById("productModal").style.display = "none";
    document.getElementById("productForm").reset();
    anHienXemTruocAnhSP(null);
}

// 4. Xử lý hiển thị ảnh
function anHienXemTruocAnhSP(src) {
    const wrap = document.getElementById("productImagePreviewWrap");
    const img = document.getElementById("productImagePreview");
    if (!wrap || !img) return;

    if (src) {
        img.src = src;
        wrap.style.display = "block";
    } else {
        img.removeAttribute("src");
        wrap.style.display = "none";
    }
}

function xemTruocAnhSanPham() {
    const input = document.getElementById("productImageFile");
    const form = document.getElementById("productForm");
    const file = input.files && input.files[0];

    if (!file) return;
    if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn tệp hình ảnh!"); input.value = ""; return;
    }
    if (file.size > 2 * 1024 * 1024) {
        alert("Ảnh tối đa 2 MB. Vui lòng chọn ảnh nhỏ hơn!"); input.value = ""; return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        form.dataset.hinhMoi = e.target.result;
        form.dataset.boAnh = "false";
        anHienXemTruocAnhSP(e.target.result);
    };
    reader.readAsDataURL(file);
}

function boAnhSanPham() {
    const form = document.getElementById("productForm");
    const input = document.getElementById("productImageFile");
    input.value = "";
    form.dataset.hinhMoi = "";
    form.dataset.boAnh = "true";
    anHienXemTruocAnhSP(null);
}

// 5. Lưu thông tin Sản phẩm
function luuSanPhamTuForm() {
    const form = document.getElementById("productForm");
    const maCu = form.dataset.maCu || "";
    const maSP = document.getElementById("productCode").value.trim();
    const maLoai = document.getElementById("productCategory").value;
    const tenSP = document.getElementById("productName").value.trim();
    const moTa = document.getElementById("productDescription").value.trim();

    let ds = layDanhMucSanPham();

    if (!maSP || !maLoai || !tenSP) {
        alert("Vui lòng nhập đủ Mã, Tên và Loại sản phẩm!"); return;
    }

    // Kiểm tra trùng mã
    if (ds.some(sp => String(sp.maSP).toLowerCase() === maSP.toLowerCase() && sp.maSP !== maCu)) {
        alert("Mã sản phẩm đã tồn tại!"); return;
    }
    // Kiểm tra trùng tên
    if (ds.some(sp => String(sp.tenSP).toLowerCase() === tenSP.toLowerCase() && sp.maSP !== maCu)) {
        alert("Tên sản phẩm đã tồn tại!"); return;
    }

    // Lấy tên của Loại sản phẩm để lưu kèm cho dễ hiển thị
    let dsLoai = [];
    try { dsLoai = JSON.parse(localStorage.getItem("loaiSanPham") || "[]"); } catch (e) { dsLoai = []; }
    const loaiObj = dsLoai.find(l => l.maLoai === maLoai);

    const spCu = maCu ? ds.find(sp => sp.maSP === maCu) : null;
    let hinh = "";
    if (form.dataset.boAnh === "true") hinh = "";
    else if (form.dataset.hinhMoi) hinh = form.dataset.hinhMoi;
    else hinh = spCu ? (spCu.hinh || "") : "";

    const danhMucMoi = {
        ...(spCu || {}),
        maSP: maSP,
        maLoai: maLoai,
        tenLoai: loaiObj ? loaiObj.tenLoai : "Khác",
        tenSP: tenSP,
        hinh: hinh,
        moTa: moTa,
        trangThai: spCu ? (spCu.trangThai || "hoatdong") : "hoatdong"
    };

    if (maCu) {
        ds = ds.map(sp => sp.maSP === maCu ? danhMucMoi : sp);
    } else {
        ds.push(danhMucMoi);
    }

    luuDanhMucSanPham(ds);
    dongFormSanPham();
    hienThiDanhMucSanPham();

    // Báo cho tab Nhập hàng cập nhật lại danh sách SP (nếu cần)
    if (typeof loadProductsForImportDropdown === "function") {
        loadProductsForImportDropdown();
    }

    alert("Đã lưu thành công!");
}

// 6. Đổ dữ liệu ra Bảng
function layGiaBanSP(sp) {
    let gia = 0;
    try {
        const ds = JSON.parse(localStorage.getItem("saved_pricing") || "[]");
        const found = ds.find(p => (p.maSP || p.code) === sp.maSP || (p.tenSP || p.name) === sp.tenSP);
        if (found && found.retailPrice > 0) gia = found.retailPrice;
    } catch (e) { }
    if (!gia && Number(sp.price) > 0) gia = Number(sp.price);
    return gia > 0 ? `<strong>${formatMoney(gia)}</strong>` : `<span style="color:#dc3545;"><i>Chưa có giá</i></span>`;
}

function hienThiDanhMucSanPham() {
    const tbody = document.getElementById("productTableBody");
    const search = document.getElementById("productSearch");
    const filter = document.getElementById("productCategoryFilter");

    if (!tbody) return;

    const tuKhoa = chuanHoaChu(search ? search.value : "");
    const loaiFilter = filter ? filter.value : "ALL";

    const ds = layDanhMucSanPham().filter(sp => {
        const matchKeyword = chuanHoaChu(`${sp.maSP} ${sp.tenSP} ${sp.tenLoai}`).includes(tuKhoa);
        const matchCategory = (loaiFilter === "ALL" || sp.maLoai === loaiFilter);
        return matchKeyword && matchCategory;
    });

    if (ds.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:25px; color:#6c757d;">Không tìm thấy sản phẩm phù hợp.</td></tr>`;
        return;
    }

    tbody.innerHTML = ds.map(sp => {
        const trangThaiTxt = sp.trangThai === "an" ? "Đang ẩn" : "Đang hiển thị";
        const nutAnHien = sp.trangThai === "an" ? "Hiện" : "Ẩn";

        return `
            <tr>
                <td style="text-align: center;">
                    ${sp.hinh ? `<img src="${sp.hinh}" alt="Ảnh SP" class="product-thumbnail" style="width: 50px; height: 50px; object-fit: contain; background: #fff; border-radius: 4px; border: 1px solid #ddd;">` : `<img src="../assets/images/default-image.jpeg" alt="Mặc định" class="product-thumbnail" style="width: 50px; height: 50px; object-fit: contain; background: #fff; border-radius: 4px; border: 1px solid #ddd;">`}
                </td>
                <td><strong>${sp.maSP}</strong></td>
                <td>${sp.tenSP}</td>
                <td><span class="badge" style="background:#e9ecef; color:#333;">${sp.tenLoai}</span></td>
                <td style="text-align: right;">${layGiaBanSP(sp)}</td>
                <td>${trangThaiTxt}</td>
                <td style="text-align: center;">
                    <button type="button" class="btn-action btn-edit-active" onclick="suaSanPham('${sp.maSP}')">Sửa</button>
                    <button type="button" class="btn-action btn-view-detail" onclick="anHienSanPham('${sp.maSP}')">${nutAnHien}</button>
                    <button type="button" class="btn-action" style="background:#dc3545; color:white;" onclick="xoaSanPham('${sp.maSP}')">Xóa</button>
                </td>
            </tr>`;
    }).join("");
}

// 7. Thao tác trên Bảng
function suaSanPham(maSP) { moFormSanPham(maSP); }

function anHienSanPham(maSP) {
    const ds = layDanhMucSanPham().map(sp => {
        if (sp.maSP === maSP) sp.trangThai = sp.trangThai === "an" ? "hoatdong" : "an";
        return sp;
    });
    luuDanhMucSanPham(ds);
    hienThiDanhMucSanPham();
}

function xoaSanPham(maSP) {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
    const ds = layDanhMucSanPham().filter(sp => sp.maSP !== maSP);
    luuDanhMucSanPham(ds);
    hienThiDanhMucSanPham();
}
/*======================================================================
    PHẦN DÙNG CHO TRANG QUẢN LÝ LOẠI HÀNG
======================================================================*/
function layLoaiSanPham() {
    try {
        return JSON.parse(localStorage.getItem("loaiSanPham")) || [];
    } catch (e) {
        return [];
    }
}

function luuLoaiSanPham(ds) {
    localStorage.setItem("loaiSanPham", JSON.stringify(ds));
}

function anToanLoai(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

/* =========================================
    KHỞI TẠO TRANG QUẢN LÝ LOẠI SẢN PHẨM
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const addTypeBtn = document.getElementById("addTypeBtn");
    if (addTypeBtn) {
        addTypeBtn.addEventListener("click", () => moFormLoai());
        document.getElementById("cancelTypeBtn").addEventListener("click", dongFormLoai);
        document.getElementById("closeTypeModalBtn").addEventListener("click", dongFormLoai);

        document.getElementById("typeSearchBtn").addEventListener("click", hienThiLoaiSanPham);
        document.getElementById("typeSearch").addEventListener("keydown", function (e) {
            if (e.key === "Enter") { e.preventDefault(); hienThiLoaiSanPham(); }
        });

        document.getElementById("typeResetSearchBtn").addEventListener("click", function () {
            document.getElementById("typeSearch").value = "";
            hienThiLoaiSanPham();
        });

        document.getElementById("typeForm").addEventListener("submit", function (e) {
            e.preventDefault();
            luuLoaiTuForm();
        });

        document.getElementById("typeImageFile").addEventListener("change", xemTruocAnhLoai);
        document.getElementById("removeTypeImageBtn").addEventListener("click", boAnhLoai);
    }
});

function moFormLoai(maLoai = "") {
    const form = document.getElementById("typeForm");
    const modal = document.getElementById("typeModal");
    if (!form || !modal) return;

    // Reset lại form trống rỗng nếu là Thêm mới
    form.reset();
    document.getElementById("typeCode").value = "";
    document.getElementById("typeFormTitle").textContent = maLoai ? "Sửa loại sản phẩm" : "Thêm loại sản phẩm";

    form.dataset.maCu = maLoai;
    form.dataset.hinhCu = "";
    form.dataset.hinhMoi = "";
    form.dataset.boAnh = "false";

    anHienXemTruocAnhLoai(null);

    // Hiển thị modal lên màn hình
    modal.style.display = "flex";

    if (!maLoai) {
        document.getElementById("typeCode").focus();
        return;
    }

    // Nếu là chế độ Sửa, tìm dữ liệu cũ và điền sẵn vào form
    const item = layLoaiSanPham().find(x => x.maLoai === maLoai);

    if (!item) {
        dongFormLoai();
        alert("Không tìm thấy loại sản phẩm cần sửa!");
        return;
    }

    document.getElementById("typeCode").value = item.maLoai || "";
    document.getElementById("typeName").value = item.tenLoai || "";
    document.getElementById("typeDescription").value = item.moTa || "";

    form.dataset.hinhCu = item.hinh || "";
    form.dataset.hinhMoi = "";
    form.dataset.boAnh = "false";

    anHienXemTruocAnhLoai(item.hinh || null);
}

function dongFormLoai() {
    const modal = document.getElementById("typeModal");
    const form = document.getElementById("typeForm");

    if (modal) {
        modal.style.display = "none";
    }

    if (form) {
        form.reset();
    }

    anHienXemTruocAnhLoai(null);
}

/* =========================================
    XEM TRƯỚC ẢNH
========================================= */

function anHienXemTruocAnhLoai(src) {
    const wrap = document.getElementById("typeImagePreviewWrap");
    const img = document.getElementById("typeImagePreview");

    if (!wrap || !img) return;

    if (src) {
        img.src = src;
        wrap.style.display = "block";
    } else {
        img.removeAttribute("src");
        wrap.style.display = "none";
    }
}

function xemTruocAnhLoai() {
    const input = document.getElementById("typeImageFile");
    const form = document.getElementById("typeForm");
    const file = input.files && input.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn một tệp hình ảnh!");
        input.value = "";
        return;
    }

    // Giới hạn ảnh 2 MB
    if (file.size > 2 * 1024 * 1024) {
        alert("Ảnh quá lớn. Vui lòng chọn ảnh tối đa 2 MB.");
        input.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        form.dataset.hinhMoi = e.target.result;
        form.dataset.boAnh = "false";

        anHienXemTruocAnhLoai(e.target.result);
    };

    reader.onerror = function () {
        alert("Không đọc được ảnh. Vui lòng thử lại.");
        input.value = "";
    };

    reader.readAsDataURL(file);
}

function boAnhLoai() {
    const form = document.getElementById("typeForm");
    const input = document.getElementById("typeImageFile");

    if (!form || !input) return;

    input.value = "";
    form.dataset.hinhMoi = "";
    form.dataset.boAnh = "true";

    anHienXemTruocAnhLoai(null);
}

/* =========================================
    LƯU LOẠI SẢN PHẨM
========================================= */

function luuLoaiTuForm() {
    const form = document.getElementById("typeForm");

    const maCu = form.dataset.maCu || "";
    const maLoai = document.getElementById("typeCode").value.trim();
    const tenLoai = document.getElementById("typeName").value.trim();
    const moTa = document.getElementById("typeDescription").value.trim();

    let ds = layLoaiSanPham();

    if (!maLoai) {
        alert("Vui lòng tự nhập mã loại sản phẩm!");
        document.getElementById("typeCode").focus();
        return;
    }

    if (!tenLoai) {
        alert("Vui lòng nhập tên loại!");
        return;
    }

    // Kiểm tra trùng mã, không phân biệt chữ hoa/thường
    if (ds.some(item =>
        String(item.maLoai || "").toLowerCase() === maLoai.toLowerCase()
        && item.maLoai !== maCu
    )) {
        alert("Mã loại đã tồn tại. Vui lòng nhập mã khác!");
        document.getElementById("typeCode").focus();
        return;
    }

    // Kiểm tra trùng tên
    if (ds.some(item =>
        String(item.tenLoai || "").toLowerCase() === tenLoai.toLowerCase()
        && item.maLoai !== maCu
    )) {
        alert("Tên loại đã tồn tại!");
        return;
    }

    const itemCu = maCu
        ? ds.find(item => item.maLoai === maCu)
        : null;

    let hinh = "";

    if (form.dataset.boAnh === "true") {
        hinh = "";
    } else if (form.dataset.hinhMoi) {
        hinh = form.dataset.hinhMoi;
    } else {
        hinh = itemCu ? (itemCu.hinh || "") : "";
    }

    if (maCu) {
        // Nếu đổi mã loại, cập nhật mã tham chiếu của sản phẩm
        ds = ds.map(item => item.maLoai === maCu
            ? {
                ...item,
                maLoai: maLoai,
                tenLoai: tenLoai,
                moTa: moTa,
                hinh: hinh
            }
            : item
        );

        if (maCu !== maLoai) {
            try {
                const dsSP = JSON.parse(
                    localStorage.getItem("danhMucSanPham") || "[]"
                );

                const dsSPMoi = dsSP.map(sp =>
                    sp.maLoai === maCu
                        ? {
                            ...sp,
                            maLoai: maLoai,
                            tenLoai: tenLoai
                        }
                        : sp
                );

                localStorage.setItem(
                    "danhMucSanPham",
                    JSON.stringify(dsSPMoi)
                );
            } catch (e) {
                alert("Không thể cập nhật mã loại trong danh sách sản phẩm.");
                return;
            }
        } else {
            // Đồng bộ tên loại mới sang các sản phẩm đang sử dụng
            try {
                const dsSP = JSON.parse(
                    localStorage.getItem("danhMucSanPham") || "[]"
                );

                localStorage.setItem(
                    "danhMucSanPham",
                    JSON.stringify(dsSP.map(sp =>
                        sp.maLoai === maLoai
                            ? { ...sp, tenLoai: tenLoai }
                            : sp
                    ))
                );
            } catch (e) {
                alert("Không thể cập nhật tên loại trong danh sách sản phẩm.");
                return;
            }
        }
    } else {
        ds.push({
            maLoai: maLoai,
            tenLoai: tenLoai,
            moTa: moTa,
            hinh: hinh,
            trangThai: "hoatdong"
        });
    }

    try {
        luuLoaiSanPham(ds);
    } catch (e) {
        alert(
            "Không lưu được dữ liệu. Có thể dung lượng lưu trữ " +
            "của trình duyệt đã đầy. Hãy thử chọn ảnh nhỏ hơn."
        );
        return;
    }

    dongFormLoai();
    hienThiLoaiSanPham();

    if (typeof capNhatLuaChonLoai === "function") {
        capNhatLuaChonLoai();
    }

    if (typeof hienThiDanhMucSanPham === "function") {
        hienThiDanhMucSanPham();
    }

    alert("Đã lưu loại sản phẩm!");
}

/* =========================================
    HIỂN THỊ DANH SÁCH VÀ TÌM KIẾM
========================================= */

function hienThiLoaiSanPham() {
    const tbody = document.getElementById("typeTableBody");
    const search = document.getElementById("typeSearch");

    if (!tbody || !search) return;

    const tuKhoa = typeof chuanHoaChu === "function"
        ? chuanHoaChu(search.value)
        : search.value.trim().toLowerCase();

    const ds = layLoaiSanPham().filter(item => {
        const noiDung = `${item.maLoai || ""} ${item.tenLoai || ""}`;

        const noiDungChuanHoa = typeof chuanHoaChu === "function"
            ? chuanHoaChu(noiDung)
            : noiDung.toLowerCase();

        return noiDungChuanHoa.includes(tuKhoa);
    });

    tbody.innerHTML = ds.length
        ? ds.map(item => `
            <tr>
                <td style="text-align: center;">
                    ${item.hinh
                ? `<img
                            src="${anToanLoai(item.hinh)}"
                            alt="Ảnh loại sản phẩm"
                            style="width:60px;height:60px;object-fit:contain;">`
                : `<img 
                            src="../assets/images/default-image.jpeg" 
                            alt="Ảnh mặc định" 
                            style="width:60px;height:60px;object-fit:contain;">`
            }
                </td>

                <td>${anToanLoai(item.maLoai)}</td>
                <td>${anToanLoai(item.tenLoai)}</td>
                <td>${anToanLoai(item.moTa)}</td>

                <td>
                ${item.trangThai === "an"
                ? "Đang ẩn"
                : "Đang hiển thị"}
                </td>

                <td>
                    <button type="button"
                        class="btn-action btn-edit-active"
                        onclick="suaLoaiSanPham('${anToanLoai(item.maLoai)}')">
                        Sửa
                    </button>

                    <button type="button"
                        class="btn-action btn-view-detail"
                        onclick="anHienLoai('${anToanLoai(item.maLoai)}')">
                        ${item.trangThai === "an" ? "Hiện" : "Ẩn"}
                    </button>

                    <button type="button"
                        class="btn-action"
                        style="background:#dc3545;color:white;"
                        onclick="xoaLoaiSanPham('${anToanLoai(item.maLoai)}')">
                        Xóa
                    </button>
                </td>
            </tr>
        `).join("")
        : `<tr>
            <td colspan="6" style="text-align:center;padding:25px;">
                Không tìm thấy loại sản phẩm phù hợp.
            </td>
        </tr>`;
}

/* =========================================
    SỬA LOẠI SẢN PHẨM
========================================= */

function suaLoaiSanPham(maLoai) {
    const item = layLoaiSanPham().find(x => x.maLoai === maLoai);

    if (!item) {
        alert("Không tìm thấy loại sản phẩm!");
        return;
    }

    moFormLoai(maLoai);
}

/* =========================================
    ẨN / HIỆN LOẠI SẢN PHẨM
========================================= */

function anHienLoai(maLoai) {
    const ds = layLoaiSanPham().map(item => {
        if (item.maLoai === maLoai) {
            item.trangThai =
                item.trangThai === "an" ? "hoatdong" : "an";
        }

        return item;
    });

    luuLoaiSanPham(ds);
    hienThiLoaiSanPham();

    if (typeof capNhatLuaChonLoai === "function") {
        capNhatLuaChonLoai();
    }
}

/* =========================================
    XÓA LOẠI SẢN PHẨM
========================================= */

function xoaLoaiSanPham(maLoai) {
    let dsSP = [];

    try {
        dsSP = JSON.parse(
            localStorage.getItem("danhMucSanPham") || "[]"
        );
    } catch (e) {
        alert("Không đọc được danh sách sản phẩm.");
        return;
    }

    if (dsSP.some(sp => sp.maLoai === maLoai)) {
        alert(
            "Loại sản phẩm đang được sử dụng, không thể xóa! " +
            "Bạn hãy chuyển hoặc xóa các sản phẩm liên quan trước."
        );
        return;
    }

    if (!confirm("Bạn có chắc muốn xóa loại sản phẩm này?")) {
        return;
    }

    luuLoaiSanPham(
        layLoaiSanPham().filter(item => item.maLoai !== maLoai)
    );

    hienThiLoaiSanPham();
    if (typeof capNhatLuaChonLoai === "function") {
        capNhatLuaChonLoai();
    }
}
/*======================================================================
    PHẦN DÙNG CHO TRANG QL NHẬP HÀNG
======================================================================*/
let importList = [];
let productCatalog = new Set([]);
let currentDraftItems = [];
let editIndex = null; //con trỏ tới dòng dữ liệu đang sửa

const DEFAULT_IMAGE = "../assets/images/default-image.jpeg"; // Ảnh mặc định

// 2. HÀM CỐT LÕI: LƯU & TẢI TỪ TRÌNH DUYỆT (LOCAL STORAGE)
function saveToLocalStorage() {
    localStorage.setItem('saved_imports', JSON.stringify(importList));
    localStorage.setItem('saved_catalog', JSON.stringify(Array.from(productCatalog)));
}

function loadDataForImports() {
    const storedImports = localStorage.getItem('saved_imports');
    if (storedImports) {
        try { importList = JSON.parse(storedImports); }
        catch (e) { importList = []; }
    }

    const storedCatalog = localStorage.getItem('saved_catalog');
    if (storedCatalog) {
        try { productCatalog = new Set(JSON.parse(storedCatalog)); }
        catch (e) { productCatalog = new Set([]); }
    }

    // Quét toàn bộ phiếu nhập trước đó để nạp hết tên SP vào danh sách gợi ý
    importList.forEach(ticket => { //tương đương function(ticket){...}
        if (Array.isArray(ticket.items)) {
            ticket.items.forEach(item => {
                if (item.name) productCatalog.add(item.name);
            });
        }
    });

    renderTable();
}

// 3. LOGIC GIAO DIỆN
function renderTable() {
    const tableBody = document.getElementById('importTableBody');
    if (!tableBody) return;

    if (importList.length === 0) {
        tableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="5"><span class="empty-icon">📋</span>Chưa có phiếu nhập nào. Bấm <b>+ Lập phiếu mới</b> để tạo!</td>
            </tr>`;
        return;
    }

    tableBody.innerHTML = importList.map((item, index) => {
        const isCompleted = (item.status === 'completed');
        const badgeClass = isCompleted ? 'badge-completed' : 'badge-pending';
        const badgeText = isCompleted ? 'Đã hoàn thành' : 'Lưu tạm';
        const btnClass = isCompleted ? 'btn-view-detail' : 'btn-edit-active';
        const btnText = isCompleted ? 'Xem chi tiết' : 'Sửa';

        return `
            <tr>
                <td><strong>${item.code}</strong></td>
                <td>${item.date}</td>
                <td><strong>${formatMoney(item.totalAmount)}</strong></td>
                <td><span class="badge ${badgeClass}">${badgeText}</span></td>
                <td><button class="btn-action ${btnClass}" onclick="openEditModal(${index})">${btnText}</button></td>
            </tr>`;
    }).join('');
}

let globalProductList = []; // Biến lưu danh sách sản phẩm từ Tab 4

function loadProductsForImportDropdown() {
    const storedProducts = localStorage.getItem('danhMucSanPham');
    if (storedProducts) {
        try {
            // Chỉ lấy những sản phẩm không bị ẩn
            globalProductList = JSON.parse(storedProducts).filter(sp => sp.trangThai !== 'an');
        } catch (e) {
            globalProductList = [];
        }
    } else {
        globalProductList = [];
    }

    const selectEl = document.getElementById('itemProductSelect');
    if (!selectEl) return;

    selectEl.innerHTML = '<option value="">-- Vui lòng chọn sản phẩm --</option>' +
        globalProductList.map(sp => `<option value="${sp.maSP}">${sp.maSP} - ${sp.tenSP}</option>`).join('');
}

function openAddModel() {
    editIndex = null;
    currentDraftItems = [];
    document.getElementById('modalTitle').innerText = "Lập phiếu nhập hàng";

    const codeInput = document.getElementById('modalCode');
    codeInput.value = ""; codeInput.readOnly = false; codeInput.style.backgroundColor = "#fff";

    const dateInput = document.getElementById('modalDate');
    dateInput.valueAsDate = new Date(); dateInput.readOnly = false;

    // Đổ danh sách sản phẩm vào Dropdown mỗi khi mở Modal
    loadProductsForImportDropdown();

    document.getElementById('itemProductSelect').value = "";
    document.getElementById('itemQuantity').value = "1";
    document.getElementById('itemPrice').value = "";

    toggleActionButtons(false);
    renderDetailTable();

    document.getElementById('importModal').style.display = 'flex';
}


function openEditModal(index) {
    editIndex = index;
    const item = importList[index];
    const isCompleted = (item.status === 'completed');

    document.getElementById('modalTitle').innerText = isCompleted ? "Chi Tiết Phiếu Nhập: " + item.code : "Sửa Phiếu Nhập: " + item.code;

    const codeInput = document.getElementById('modalCode');
    codeInput.value = item.code; codeInput.readOnly = true; codeInput.style.backgroundColor = "#e9ecef";

    const dateInput = document.getElementById('modalDate');
    dateInput.value = item.date; dateInput.readOnly = isCompleted;

    // QUAN TRỌNG: Tải danh sách SP vào Dropdown (nếu phiếu chưa hoàn thành)
    if (!isCompleted) {
        loadProductsForImportDropdown();

        // Dọn dẹp sạch sẽ các ô nhập liệu bên dưới để sẵn sàng thêm món mới
        const selectEl = document.getElementById('itemProductSelect');
        if (selectEl) selectEl.value = "";
        document.getElementById('itemQuantity').value = "1";
        document.getElementById('itemPrice').value = "";
    }

    // Clone dữ liệu để sửa không ảnh hưởng mảng gốc nếu chưa bấm Lưu
    currentDraftItems = JSON.parse(JSON.stringify(item.items));

    toggleActionButtons(isCompleted);
    renderDetailTable(isCompleted);

    document.getElementById('importModal').style.display = 'flex';
}

function toggleActionButtons(isCompleted) {
    document.getElementById('addItemControls').style.display = isCompleted ? "none" : "flex";
    document.getElementById('actionHeader').style.display = isCompleted ? "none" : "table-cell";
    document.getElementById('btnSaveDraft').style.display = isCompleted ? "none" : "inline-block";
    document.getElementById('btnSaveComplete').style.display = isCompleted ? "none" : "inline-block";
}

function resetItemInputForm() {
    const selectEl = document.getElementById('itemProductSelect');
    if (selectEl) selectEl.value = "";
    document.getElementById('itemQuantity').value = "1";
    document.getElementById('itemPrice').value = "";
    if (selectEl) selectEl.focus();
}

function addItemToDraft() {
    const selectEl = document.getElementById('itemProductSelect');
    const selectedMaSP = selectEl.value;
    const qty = parseInt(document.getElementById('itemQuantity').value, 10);
    const price = parseFloat(document.getElementById('itemPrice').value);

    if (!selectedMaSP) { alert("Vui lòng chọn 1 sản phẩm từ danh sách!"); selectEl.focus(); return; }
    if (isNaN(qty) || qty <= 0) { alert("Số lượng phải lớn hơn 0!"); return; }
    if (isNaN(price) || price < 0) { alert("Đơn giá nhập không hợp lệ!"); return; }

    // Tìm sản phẩm theo maSP
    const productInfo = globalProductList.find(sp => sp.maSP === selectedMaSP);
    if (!productInfo) return;

    // Kiểm tra xem đã có trong phiếu nháp chưa
    const existing = currentDraftItems.find(i => (i.maSP || i.code) === selectedMaSP);
    if (existing) {
        existing.qty += qty;
        existing.price = price;
    } else {
        currentDraftItems.push({
            maSP: productInfo.maSP,
            tenSP: productInfo.tenSP,
            hinh: productInfo.hinh || DEFAULT_IMAGE,
            qty: qty,
            price: price
        });
    }

    // Vẽ lại bảng chi tiết + tổng tiền, rồi dọn ô nhập để thêm món tiếp theo
    renderDetailTable();
    resetItemInputForm();
}

function removeItemFromDraft(idx) {
    currentDraftItems.splice(idx, 1);
    renderDetailTable();
}

function renderDetailTable(isReadOnly = false) {
    const detailBody = document.getElementById('detailTableBody');
    const totalDisplay = document.getElementById('modalTotalDisplay');

    if (currentDraftItems.length === 0) {
        detailBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #888; padding: 15px;">Chưa có mặt hàng nào. Vui lòng nhập và bấm + Thêm hàng.</td></tr>`;
        totalDisplay.innerText = "0 đ";
        return;
    }

    let grandTotal = 0;
    detailBody.innerHTML = currentDraftItems.map((item, idx) => {
        const lineTotal = item.qty * item.price;
        grandTotal += lineTotal;
        const tenHienThi = item.tenSP || item.name || "";
        const hinhHienThi = item.hinh || item.image || DEFAULT_IMAGE;
        const removeBtn = !isReadOnly ? `<td style="text-align: center;"><button class="btn-remove-item" onclick="removeItemFromDraft(${idx})">&times;</button></td>` : '';
        return `
            <tr>
                <td>${idx + 1}</td>
                <td style="text-align: center;"><img src="${hinhHienThi}" class="product-thumb" alt="Ảnh" style="object-fit: contain; background: #fff;"></td>
                <td><strong>${tenHienThi}</strong></td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right;">${formatMoney(item.price)}</td>
                <td style="text-align: right;"><strong>${formatMoney(lineTotal)}</strong></td>
                ${removeBtn}
            </tr>`;
    }).join('');
    totalDisplay.innerText = formatMoney(grandTotal);
}

// 4. HÀM CHỐT LƯU PHIẾU
function saveForm(statusToSave) {
    const code = document.getElementById('modalCode').value.trim().toUpperCase();
    const date = document.getElementById('modalDate').value;

    if (!code || !date) { alert("Vui lòng nhập đủ mã phiếu và ngày nhập hàng!"); return; }
    if (currentDraftItems.length === 0) { alert("Phiếu nhập phải có ít nhất 1 mặt hàng!"); return; }

    if (statusToSave === 'completed' && !confirm("Xác nhận Hoàn thành? Hàng sẽ được lưu vào kho và không thể sửa lại.")) {
        return;
    }

    const totalAmount = currentDraftItems.reduce((sum, item) => sum + (item.qty * item.price), 0);

    if (editIndex === null) {
        if (importList.some(item => item.code.toUpperCase() === code)) {
            alert("Mã phiếu đã tồn tại!"); return;
        }
        importList.push({ code, date, items: currentDraftItems, totalAmount, status: statusToSave });
    } else {
        importList[editIndex].date = date;
        importList[editIndex].items = currentDraftItems;
        importList[editIndex].totalAmount = totalAmount;
        importList[editIndex].status = statusToSave;
    }

    // BẮT BUỘC: Gọi hàm lưu bộ nhớ ngay sau khi cập nhật mảng
    saveToLocalStorage();
    closeModal();
    renderTable();
}

function applyFilters() {
    // 1. Kiểm tra xem HTML đã có id chưa, nếu chưa có sẽ báo lỗi ngay lập tức
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');

    if (!fromDateInput || !toDateInput) {
        alert("LỖI: Không tìm thấy ô nhập ngày! Bạn hãy kiểm tra lại file admin.html xem đã thêm id='fromDate' và id='toDate' chưa nhé.");
        return;
    }

    const searchInput = document.getElementById('searchInput');
    const searchFilter = searchInput ? searchInput.value.trim().toUpperCase() : "";

    // 2. Chuyển đổi ngày sang dạng thời gian (timestamp) để so sánh tuyệt đối
    const fromTime = fromDateInput.value ? new Date(fromDateInput.value).setHours(0, 0, 0, 0) : null;
    const toTime = toDateInput.value ? new Date(toDateInput.value).setHours(23, 59, 59, 999) : null;

    const tbody = document.getElementById('importTableBody');
    if (!tbody) return;

    const rows = tbody.getElementsByTagName('tr');

    // 3. Quét bảng
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('empty-row')) continue;

        const codeCol = rows[i].getElementsByTagName('td')[0];
        const dateCol = rows[i].getElementsByTagName('td')[1];

        if (codeCol && dateCol) {
            const codeText = codeCol.textContent.trim().toUpperCase();
            const rowDateStr = dateCol.textContent.trim(); // "YYYY-MM-DD"  

            const matchSearch = codeText.includes(searchFilter); //chứa từ khóa trong ô tìm kiếm

            let matchDate = true;
            if (rowDateStr) {
                // Đặt mốc thời gian là 12h trưa để tránh lệch múi giờ
                const rowTime = new Date(rowDateStr).setHours(12, 0, 0, 0);

                if (fromTime && rowTime < fromTime) matchDate = false;
                if (toTime && rowTime > toTime) matchDate = false;
            }

            // Quyết định Hiển thị hay Ẩn
            if (matchSearch && matchDate) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

/*======================================================================
    PHẦN DÙNG CHO TRANG QL GIÁ BÁN
======================================================================*/

let currentProductCode = "";
let currentImportPrice = 0;
let pricingList = [];
let pendingTicketsCount = 0; // Biến đếm số phiếu đang bị "Lưu tạm"

/* --- 1. TẢI VÀ ĐỒNG BỘ DỮ LIỆU TỪ KHO NHẬP HÀNG --- */
/* --- CẬP NHẬT TRONG PHẦN GIÁ BÁN --- */
function getMargins() {
    try {
        const m = JSON.parse(localStorage.getItem('saved_margins') || '{}');
        return { types: m.types || {} };
    } catch (e) { return { types: {} }; }
}
function saveMargins(m) {
    localStorage.setItem('saved_margins', JSON.stringify(m));
}

// Giá bán = giá vốn × (1 + %), làm tròn đến nghìn
function tinhGiaTheoLoi(importPrice, percent) {
    return Math.round(importPrice * (1 + percent / 100) / 1000) * 1000;
}

function layMarginSP(p) {
    if (!(p.retailPrice > 0) || !(p.importPrice > 0)) return null;
    return ((p.retailPrice - p.importPrice) / p.importPrice) * 100;
}

// Lưu giá bán của nhiều sản phẩm một lượt (saved_pricing + danhMucSanPham)
function luuGiaBan(items) {
    let saved = [], dm = [];
    try { saved = JSON.parse(localStorage.getItem('saved_pricing') || '[]'); } catch (e) { saved = []; }
    try { dm = JSON.parse(localStorage.getItem('danhMucSanPham') || '[]'); } catch (e) { dm = []; }

    items.forEach(function (it) {
        const prod = it.prod;
        prod.retailPrice = it.retail;
        const idx = saved.findIndex(p => (p.maSP || p.code) === prod.code);
        if (idx > -1) saved[idx] = Object.assign({}, saved[idx], prod);
        else saved.push(Object.assign({}, prod));
        dm.forEach(sp => { if (sp.maSP === prod.code) sp.price = it.retail; });
    });

    localStorage.setItem('saved_pricing', JSON.stringify(saved));
    localStorage.setItem('danhMucSanPham', JSON.stringify(dm));
}

/* --- 1. TẢI VÀ ĐỒNG BỘ DỮ LIỆU --- */
function loadDataForPricing() {
    pendingTicketsCount = 0;
    const DEFAULT_IMG = '../assets/images/default-image.jpeg';

    let catalog = [], importList = [], savedPricingList = [];
    try { catalog = JSON.parse(localStorage.getItem('danhMucSanPham') || '[]'); } catch (e) { }
    try { importList = JSON.parse(localStorage.getItem('saved_imports') || '[]'); } catch (e) { }
    try { savedPricingList = JSON.parse(localStorage.getItem('saved_pricing') || '[]'); } catch (e) { }

    let productMap = {};
    const keyByName = {};
    catalog.forEach(sp => {
        productMap[sp.maSP] = {
            maSP: sp.maSP, tenSP: sp.tenSP, code: sp.maSP, name: sp.tenSP,
            maLoai: sp.maLoai || "", tenLoai: sp.tenLoai || "Khác",
            image: sp.hinh || DEFAULT_IMG,
            totalQty: 0, totalCost: 0, importPrice: 0,
            retailPrice: 0, catalogPrice: Number(sp.price) || 0
        };
        keyByName[sp.tenSP] = sp.maSP;
    });

    importList.forEach(ticket => {
        if (ticket.status !== 'completed') { pendingTicketsCount++; return; }
        if (!Array.isArray(ticket.items)) return;
        ticket.items.forEach(item => {
            const tenSP = item.tenSP || item.name;
            const maSP = item.maSP || item.code || keyByName[tenSP];
            if (!tenSP && !maSP) return;
            const key = maSP || tenSP;
            if (!productMap[key]) {
                productMap[key] = {
                    maSP: maSP || "", tenSP: tenSP, code: maSP || "", name: tenSP,
                    maLoai: "", tenLoai: "Khác",
                    image: item.hinh || item.image || DEFAULT_IMG,
                    totalQty: 0, totalCost: 0, importPrice: 0, retailPrice: 0, catalogPrice: 0
                };
            }
            productMap[key].totalQty += item.qty;
            productMap[key].totalCost += (item.qty * item.price);
        });
    });

    pricingList = Object.values(productMap).map((prod, index) => {
        prod.importPrice = prod.totalQty > 0 ? Math.round(prod.totalCost / prod.totalQty) : 0;
        if (!prod.code) prod.code = "SP" + String(index + 1).padStart(2, '0');
        prod.maSP = prod.code;

        const saved = savedPricingList.find(p => (p.maSP || p.code) === prod.code);
        if (saved && saved.retailPrice > 0) prod.retailPrice = saved.retailPrice;
        else if (prod.catalogPrice > 0) prod.retailPrice = prod.catalogPrice;
        return prod;
    }).filter(prod => prod.totalQty > 0);

    fillPricingCategoryFilter();
    renderTypeMarginTable();
    renderPricingTable();
}

/* --- 2. VẼ BẢNG GIÁ BÁN TỰ ĐỘNG CẬP NHẬT MÀU SẮC --- */
function fillPricingCategoryFilter() {
    const sel = document.getElementById('pricingCategoryFilter');
    if (!sel) return;
    const cur = sel.value || 'ALL';
    let types = [];
    try { types = JSON.parse(localStorage.getItem('loaiSanPham') || '[]'); } catch (e) { }
    sel.innerHTML = '<option value="ALL">-- Tất cả loại --</option>' +
        types.map(t => `<option value="${t.maLoai}">${t.tenLoai}</option>`).join('');
    sel.value = cur;
    if (sel.value !== cur) sel.value = 'ALL';
}

function resetPricingFilters() {
    document.getElementById('pricingCategoryFilter').value = 'ALL';
    document.getElementById('pricingStatusFilter').value = 'ALL';
    document.getElementById('pricingSearch').value = '';
    renderPricingTable();
}

/* --- 2. BẢNG % LỢI NHUẬN THEO LOẠI --- */
function renderTypeMarginTable() {
    const tbody = document.getElementById('typeMarginBody');
    if (!tbody) return;

    let types = [];
    try { types = JSON.parse(localStorage.getItem('loaiSanPham') || '[]'); } catch (e) { }
    const margins = getMargins();

    if (types.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:25px;color:#888;">Chưa có loại sản phẩm nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = types.map(t => {
        const list = pricingList.filter(p => p.maLoai === t.maLoai);
        const ms = list.map(layMarginSP).filter(m => m !== null);
        const avg = ms.length ? (ms.reduce((a, b) => a + b, 0) / ms.length).toFixed(1) + '%' : '--';
        const saved = margins.types[t.maLoai];

        return `
            <tr data-ma="${t.maLoai}">
                <td><strong>${t.maLoai}</strong></td>
                <td>${t.tenLoai}</td>
                <td style="text-align:center;">${list.length}</td>
                <td style="text-align:center;">${avg}</td>
                <td style="text-align:center;">
                    <input type="number" class="search-input" step="0.1"
                        style="width:100px;text-align:center;" placeholder="VD: 15"
                        value="${saved !== undefined ? saved : ''}"> %
                </td>
                <td style="text-align:center;">
                    <button class="btn-action btn-edit-active" onclick="applyTypeMargin(this)">Áp dụng cho cả loại</button>
                </td>
            </tr>`;
    }).join('');
}

function applyTypeMargin(btn) {
    const tr = btn.closest('tr');
    const maLoai = tr.dataset.ma;
    const pct = parseFloat(tr.querySelector('input').value);

    if (isNaN(pct) || pct <= -100) {
        alert("Vui lòng nhập % lợi nhuận hợp lệ!");
        return;
    }

    const targets = pricingList.filter(p => p.maLoai === maLoai && p.importPrice > 0);
    if (targets.length === 0) {
        alert("Loại này chưa có sản phẩm nào đã nhập hàng (chưa có giá vốn) nên chưa thể tính giá bán.");
        return;
    }
    if (pct < 0 && !confirm("CẢNH BÁO: % lợi nhuận âm, giá bán sẽ thấp hơn giá vốn.\nBạn có chắc chắn?")) return;
    if (!confirm("Áp dụng " + pct + "% lợi nhuận cho " + targets.length +
        " sản phẩm của loại này?\nGiá bán hiện tại của các sản phẩm đó sẽ bị thay thế.")) return;

    luuGiaBan(targets.map(p => ({ prod: p, retail: tinhGiaTheoLoi(p.importPrice, pct) })));

    const m = getMargins();
    m.types[maLoai] = pct;
    saveMargins(m);

    renderTypeMarginTable();
    renderPricingTable();
    alert("Đã cập nhật giá bán cho " + targets.length + " sản phẩm.");
}

/* --- 3. BẢNG GIÁ TỪNG SẢN PHẨM (CÓ LỌC / TRA CỨU) --- */
function renderPricingTable() {
    const tbody = document.getElementById('pricingTableBody');
    if (!tbody) return;

    if (pricingList.length === 0) {
        tbody.innerHTML = pendingTicketsCount > 0
            ? `<tr><td colspan="8" style="text-align:center;padding:50px;color:#dc3545;">
                <h3 style="margin-bottom:10px;">⚠️ Dữ liệu đang bị kẹt!</h3>
                Bạn đang có <b>${pendingTicketsCount} phiếu nhập</b> ở trạng thái "Lưu tạm".<br>
                Hãy vào trang Nhập hàng, sửa phiếu và bấm <b>Hoàn thành</b>.</td></tr>`
            : `<tr><td colspan="8" style="text-align:center;padding:50px;color:#888;">
                Chưa có sản phẩm nào trong kho để thiết lập giá.<br>Vui lòng tạo phiếu nhập và bấm <b>Hoàn thành</b>.</td></tr>`;
        return;
    }

    const catVal = (document.getElementById('pricingCategoryFilter') || {}).value || 'ALL';
    const stVal = (document.getElementById('pricingStatusFilter') || {}).value || 'ALL';
    const kw = chuanHoaChu((document.getElementById('pricingSearch') || {}).value || '');

    const list = pricingList.filter(p => {
        if (catVal !== 'ALL' && p.maLoai !== catVal) return false;
        if (kw && !chuanHoaChu(p.code + ' ' + p.name).includes(kw)) return false;
        const m = layMarginSP(p);
        if (stVal === 'none' && p.retailPrice > 0) return false;
        if (stVal === 'profit' && !(m !== null && m > 0)) return false;
        if (stVal === 'loss' && !(m !== null && m <= 0)) return false;
        return true;
    });

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:#6c757d;">Không tìm thấy sản phẩm phù hợp.</td></tr>`;
        return;
    }

    tbody.innerHTML = list.map(prod => {
        const hasRetail = prod.retailPrice > 0;
        const hasImport = prod.importPrice > 0;
        const m = layMarginSP(prod);
        const margin = m === null ? 0 : Math.round(m);
        const btnText = hasRetail ? "Cập nhật giá" : "Thiết lập giá";

        let retailHtml, badgeHtml;
        if (!hasRetail) {
            retailHtml = `<span style="font-weight:bold;color:#dc3545;">Chưa thiết lập</span>`;
            badgeHtml = `<span class="badge badge-pending" style="background:#e9ecef;color:#6c757d;">--</span>`;
        } else if (!hasImport) {
            retailHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
            badgeHtml = `<span class="badge badge-pending" style="background:#e9ecef;color:#6c757d;">--</span>`;
        } else {
            retailHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
            if (margin > 0) badgeHtml = `<span class="badge badge-completed">+${margin}%</span>`;
            else if (margin < 0) badgeHtml = `<span class="badge badge-loss">${margin}%</span>`;
            else badgeHtml = `<span class="badge badge-pending">0%</span>`;
        }

        const safeName = prod.name.replace(/'/g, "\\'");
        return `
            <tr>
                <td><strong>${prod.code}</strong></td>
                <td><img src="${prod.image}" style="width:50px;height:50px;object-fit:contain;background:#fff;border-radius:4px;border:1px solid #ddd;"></td>
                <td>${prod.name}</td>
                <td><span class="badge" style="background:#e9ecef;color:#333;">${prod.tenLoai}</span></td>
                <td style="text-align:right;color:#6c757d;">${hasImport ? formatMoney(prod.importPrice) : '<i>Chưa nhập hàng</i>'}</td>
                <td style="text-align:right;">${retailHtml}</td>
                <td style="text-align:center;">${badgeHtml}</td>
                <td style="text-align:center;">
                    <button class="btn-action btn-edit-active" onclick="openPricingModal('${prod.code}', '${safeName}', ${prod.importPrice})">${btnText}</button>
                </td>
            </tr>`;
    }).join('');
}

/* --- 3. LOGIC MODAL TÍNH GIÁ THÔNG MINH --- */
function openPricingModal(code, name, importPrice) {
    currentProductCode = code;
    currentImportPrice = importPrice;

    document.getElementById('modalProdCode').value = code;
    document.getElementById('modalProdName').value = name;
    document.getElementById('modalImportPrice').value = formatMoney(importPrice);

    const prod = pricingList.find(p => p.code === code);
    if (prod && prod.retailPrice > 0) {
        document.getElementById('modalRetailPrice').value = prod.retailPrice;
        calculateMargin();
    } else {
        document.getElementById('modalRetailPrice').value = "";
        document.getElementById('modalMarginPercent').value = "";
        updateProfitDisplay(0);
    }

    document.getElementById('pricingModal').style.display = 'flex';
}

function calculateMargin() {
    const retailPrice = parseFloat(document.getElementById('modalRetailPrice').value) || 0;
    if (retailPrice === 0) {
        document.getElementById('modalMarginPercent').value = "";
        updateProfitDisplay(0);
        return;
    }
    const profit = retailPrice - currentImportPrice;
    if (currentImportPrice <= 0) {
        document.getElementById('modalMarginPercent').value = "";
        updateProfitDisplay(0);
        return;
    }
    let marginPercent = (profit / currentImportPrice) * 100;
    document.getElementById('modalMarginPercent').value = marginPercent.toFixed(1);
    updateProfitDisplay(profit);
}

function calculateRetailPrice() {
    const marginPercent = parseFloat(document.getElementById('modalMarginPercent').value) || 0;
    const profit = currentImportPrice * (marginPercent / 100);
    const retailPrice = currentImportPrice + profit;

    // Tự động làm tròn số chẵn (VD: 149.320 -> 149.000)
    const roundedRetailPrice = Math.round(retailPrice / 1000) * 1000;
    const finalProfit = roundedRetailPrice - currentImportPrice;

    document.getElementById('modalRetailPrice').value = roundedRetailPrice;
    updateProfitDisplay(finalProfit);
}

function applyQuickMargin(percent) {
    document.getElementById('modalMarginPercent').value = percent;
    calculateRetailPrice();
}

function updateProfitDisplay(profit) {
    const profitEl = document.getElementById('expectedProfit');
    profitEl.innerText = formatMoney(profit) + ' / SP';
    if (profit < 0) {
        profitEl.classList.add('loss');
    } else {
        profitEl.classList.remove('loss');
    }
}

/* --- 4. HÀM CHỐT LƯU GIÁ BÁN & TÌM KIẾM --- */
function savePricing() {
    const retailPrice = parseFloat(document.getElementById('modalRetailPrice').value);

    if (!retailPrice || retailPrice <= 0) {
        alert("Vui lòng nhập giá bán lớn hơn 0!");
        document.getElementById('modalRetailPrice').focus();
        return;
    }
    if (retailPrice < currentImportPrice) {
        if (!confirm("CẢNH BÁO: Giá bán đang thấp hơn giá nhập.\nBạn có chắc chắn muốn lưu?")) return;
    }

    const prod = pricingList.find(p => p.code === currentProductCode);
    if (prod) luuGiaBan([{ prod: prod, retail: retailPrice }]);

    closeModal();
    renderTypeMarginTable();
    renderPricingTable();
}

/*======================================================================
    PHẦN DÙNG CHO TRANG QL ĐƠN HÀNG
======================================================================*/

let orderList = [];
let currentEditingOrderId = "";

// 1. TẢI DỮ LIỆU ĐƠN HÀNG (Kèm chức năng Tự động tạo Mock Data)
function loadDataForOrders() {
    const storedOrders = localStorage.getItem('saved_orders');

    if (storedOrders) {
        try { orderList = JSON.parse(storedOrders); }
        catch (e) { orderList = []; }
    }

    renderOrderTable();
}

// 2. VẼ BẢNG ĐƠN HÀNG
function renderOrderTable() {
    const tbody = document.getElementById('orderTableBody');
    if (!tbody) return;

    if (orderList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 50px; color: #888;">Chưa có đơn hàng nào trong hệ thống!</td></tr>`;
        return;
    }

    tbody.innerHTML = orderList.map(order => {
        let badgeHtml = "";
        switch (order.status) {
            case 'pending': badgeHtml = `<span class="badge badge-pending">Chờ xác nhận</span>`; break;
            case 'processed': badgeHtml = `<span class="badge badge-delivering">Đã xử lý</span>`; break;
            case 'completed': badgeHtml = `<span class="badge badge-completed">Thành công</span>`; break;
            case 'cancelled': badgeHtml = `<span class="badge badge-loss">Đã hủy</span>`; break;
        }

        return `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.date}</td>
                <td>
                    <strong>${order.customerName}</strong><br>
                    <span style="font-size: 12px; color: #6c757d;">📞 ${order.customerPhone}</span>
                </td>
                <td style="text-align: right; color: #dc3545; font-weight: bold;">${formatMoney(order.totalAmount)}</td>
                <td style="text-align: center;">${badgeHtml}</td>
                <td style="text-align: center;">
                    <button class="btn-action btn-view-detail" onclick="openOrderModal('${order.id}')">
                        ${(order.status === 'completed' || order.status === 'cancelled') ? 'Xem chi tiết' : 'Chi tiết / Duyệt'}
                    </button>
                </td>
            </tr>`;
    }).join('');
}

function isOrderLocked(status) {
    return status === 'completed' || status === 'cancelled';
}
// 3. MỞ MODAL XEM CHI TIẾT
function openOrderModal(orderId) {
    const order = orderList.find(o => o.id === orderId);
    if (!order) return;

    currentEditingOrderId = order.id;

    document.getElementById('modalOrderId').innerText = order.id;
    document.getElementById('modalCustomerName').value = order.customerName;
    document.getElementById('modalCustomerPhone').value = order.customerPhone;
    document.getElementById('modalCustomerAddress').value = order.customerAddress;
    document.getElementById('modalOrderTotal').innerText = formatMoney(order.totalAmount);

    const statusSelect = document.getElementById('modalOrderStatusUpdate');
    const saveBtn = document.getElementById('btnSaveOrderStatus');
    const lockNote = document.getElementById('orderLockedNote');
    const locked = isOrderLocked(order.status);

    statusSelect.value = order.status;
    statusSelect.disabled = locked;
    saveBtn.style.display = locked ? 'none' : 'inline-block';
    lockNote.style.display = locked ? 'inline' : 'none';
    lockNote.innerText = order.status === 'completed'
        ? 'Đơn đã giao thành công, không thể thay đổi trạng thái.'
        : 'Đơn đã hủy, không thể thay đổi trạng thái.';

    const detailBody = document.getElementById('orderDetailBody');
    detailBody.innerHTML = order.items.map((item, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td><strong>${item.name || item.tenSP}</strong></td>
            <td style="text-align: center;">${item.qty}</td>
            <td style="text-align: right;">${formatMoney(item.price)}</td>
            <td style="text-align: right; font-weight: bold;">${formatMoney(item.qty * item.price)}</td>
        </tr>
    `).join('');

    document.getElementById('orderModal').style.display = 'flex';
}

// 4. LƯU CẬP NHẬT TRẠNG THÁI
function saveOrderStatus() {
    const newStatus = document.getElementById('modalOrderStatusUpdate').value;
    const orderIndex = orderList.findIndex(o => o.id === currentEditingOrderId);

    if (orderIndex === -1) return;

    // Chặn sửa đơn đã chốt
    if (isOrderLocked(orderList[orderIndex].status)) {
        alert("Đơn hàng này đã " +
            (orderList[orderIndex].status === 'completed' ? "giao thành công" : "hủy") +
            ", không thể thay đổi trạng thái!");
        closeModal();
        return;
    }

    // Xác nhận trước khi chốt trạng thái cuối
    if (isOrderLocked(newStatus) &&
        !confirm("Sau khi chuyển sang trạng thái này, bạn sẽ KHÔNG thể sửa lại. Xác nhận?")) {
        return;
    }

    orderList[orderIndex].status = newStatus;
    localStorage.setItem('saved_orders', JSON.stringify(orderList));

    closeModal();
    renderOrderTable();
    applyOrderFilters();
}

// 5. BỘ LỌC ĐƠN HÀNG 
function applyOrderFilters() {
    const searchFilter = document.getElementById('orderSearchInput').value.trim().toUpperCase();
    const fromTime = document.getElementById('orderFromDate').value ? new Date(document.getElementById('orderFromDate').value).setHours(0, 0, 0, 0) : null;
    const toTime = document.getElementById('orderToDate').value ? new Date(document.getElementById('orderToDate').value).setHours(23, 59, 59, 999) : null;
    const statusFilter = document.getElementById('orderStatusFilter').value;

    const rows = document.getElementById('orderTableBody').getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('empty-row')) continue;

        const idText = rows[i].getElementsByTagName('td')[0].textContent.trim().toUpperCase();
        const customerText = rows[i].getElementsByTagName('td')[2].textContent.trim().toUpperCase();
        const dateText = rows[i].getElementsByTagName('td')[1].textContent.trim();
        const orderData = orderList[i];

        const matchSearch = idText.includes(searchFilter) || customerText.includes(searchFilter);
        const matchStatus = (statusFilter === "ALL" || orderData.status === statusFilter);

        let matchDate = true;
        if (dateText) {
            const rowTime = new Date(dateText).setHours(12, 0, 0, 0);
            if (fromTime && rowTime < fromTime) matchDate = false;
            if (toTime && rowTime > toTime) matchDate = false;
        }

        if (matchSearch && matchStatus && matchDate) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
/*======================================================================
    PHẦN DÙNG CHO TRANG BÁO CÁO TỒN KHO
======================================================================*/
let rawImports = [];
let rawOrders = [];
let savedProducts = [];
let inventoryRowsCache = {};

function loadDataForInventory() {
    function doc(key) {
        try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
    }
    rawImports = doc('saved_imports');
    rawOrders = doc('saved_orders');
    savedProducts = doc('danhMucSanPham');

    const categorySet = new Set();
    savedProducts.forEach(sp => { if (sp.tenLoai) categorySet.add(sp.tenLoai); });

    const catFilterEl = document.getElementById('invCategoryFilter');
    if (catFilterEl) {
        const cur = catFilterEl.value || 'ALL';
        catFilterEl.innerHTML = '<option value="ALL">-- Tất cả loại --</option>' +
            Array.from(categorySet).map(loai => `<option value="${loai}">${loai}</option>`).join('');
        catFilterEl.value = cur;
        if (catFilterEl.value !== cur) catFilterEl.value = 'ALL';
    }

    applyInventoryFilters();
}

// Nút "Tra cứu": kiểm tra khoảng ngày rồi lọc
function traCuuTonKho() {
    const from = document.getElementById('invFromDate').value;
    const to = document.getElementById('invToDate').value;
    if (from && to && from > to) {
        alert("Từ ngày không được lớn hơn Đến ngày!");
        return;
    }
    applyInventoryFilters();
}

function resetInventoryFilters() {
    ['invFromDate', 'invToDate', 'inventorySearchInput'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('invCategoryFilter').value = 'ALL';
    document.getElementById('invStatusFilter').value = 'ALL';
    document.getElementById('invThreshold').value = 5;
    applyInventoryFilters();
}

function applyInventoryFilters() {
    const g = id => document.getElementById(id);
    if (!g('invFromDate')) return;

    const fromStr = g('invFromDate').value;       // yyyy-mm-dd
    const toStr = g('invToDate').value;
    const catFilter = g('invCategoryFilter').value;
    const statusFilter = g('invStatusFilter').value;
    const keyword = g('inventorySearchInput').value.trim().toLowerCase();
    let threshold = parseInt(g('invThreshold').value, 10);
    if (isNaN(threshold) || threshold < 1) threshold = 5;

    const DEFAULT_IMG = '../assets/images/default-image.jpeg';
    const inventoryMap = {};
    const keyByName = {};

    const newRow = (code, name, image, category, inCatalog) => ({
        code: code, name: name, image: image || DEFAULT_IMG, category: category, inCatalog: inCatalog,
        totalCost: 0, totalImportedQty: 0, importPrice: 0,
        openingStock: 0, importedInRange: 0, soldInRange: 0, currentStock: 0,
        moves: []
    });

    savedProducts.forEach(sp => {
        inventoryMap[sp.maSP] = newRow(sp.maSP, sp.tenSP, sp.hinh, sp.tenLoai || 'Chưa phân loại', true);
        keyByName[sp.tenSP] = sp.maSP;
    });

    const getRow = (item, createIfMissing) => {
        const tenSP = item.tenSP || item.name;
        const maSP = item.maSP || item.code || keyByName[tenSP];
        const key = maSP || tenSP;
        if (!key) return null;
        if (!inventoryMap[key] && createIfMissing) {
            inventoryMap[key] = newRow(maSP || "", tenSP, item.hinh || item.image, 'Khác', false);
        }
        return inventoryMap[key] || null;
    };

    // Ghi nhận 1 giao dịch nhập (kind='in') hoặc xuất (kind='out')
    function addMove(row, date, ref, kind, qty) {
        if (toStr && date > toStr) return;                 // sau mốc tra cứu: bỏ qua
        const signed = kind === 'in' ? qty : -qty;
        row.currentStock += signed;
        if (fromStr && date < fromStr) {                   // trước kỳ: cộng vào tồn đầu
            row.openingStock += signed;
        } else {                                           // trong kỳ
            if (kind === 'in') row.importedInRange += qty;
            else row.soldInRange += qty;
            row.moves.push({ date: date, ref: ref, kind: kind, qty: qty });
        }
    }

    // NHẬP: chỉ phiếu đã hoàn thành
    let pendingCount = 0;
    rawImports.forEach(ticket => {
        if (ticket.status !== 'completed') { pendingCount++; return; }
        if (!Array.isArray(ticket.items)) return;
        ticket.items.forEach(item => {
            const row = getRow(item, true);
            if (!row) return;
            const qty = Number(item.qty) || 0;
            const price = Number(item.price) || 0;
            if (!toStr || ticket.date <= toStr) {
                row.totalImportedQty += qty;
                row.totalCost += qty * price;
            }
            addMove(row, ticket.date, ticket.code, 'in', qty);
        });
    });

    Object.values(inventoryMap).forEach(p => {
        p.importPrice = p.totalImportedQty > 0 ? Math.round(p.totalCost / p.totalImportedQty) : 0;
    });

    // XUẤT: đơn đã xử lý hoặc đã giao
    rawOrders.forEach(order => {
        if (order.status !== 'processed' && order.status !== 'completed') return;
        if (!Array.isArray(order.items)) return;
        order.items.forEach(item => {
            const row = getRow(item, false);
            if (!row) return;
            addMove(row, order.date, order.id, 'out', Number(item.qty) || 0);
        });
    });

    inventoryRowsCache = inventoryMap;

    const trangThaiTon = s => s <= 0 ? 'out' : (s < threshold ? 'low' : 'ok');

    // LỌC
    const finalData = Object.values(inventoryMap).filter(item => {
        if (!item.inCatalog && item.currentStock === 0 && item.importedInRange === 0 && item.soldInRange === 0) return false;
        if (catFilter !== 'ALL' && item.category !== catFilter) return false;
        if (keyword && !String(item.name).toLowerCase().includes(keyword) &&
            !String(item.code).toLowerCase().includes(keyword)) return false;
        if (statusFilter !== 'ALL' && trangThaiTon(item.currentStock) !== statusFilter) return false;
        return true;
    });

    // THỐNG KÊ
    let totalItems = 0, totalValue = 0, lowCount = 0, outCount = 0;
    finalData.forEach(p => {
        const st = trangThaiTon(p.currentStock);
        if (p.currentStock > 0) {
            totalItems += p.currentStock;
            totalValue += p.currentStock * p.importPrice;
        }
        if (st === 'low') lowCount++;
        if (st === 'out') outCount++;
    });

    updateInventoryDashboard(totalItems, totalValue, lowCount, outCount, threshold);
    renderInventoryTable(finalData, trangThaiTon);
    showInventoryPendingNote(pendingCount);
}

function renderInventoryTable(data, trangThaiTon) {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:40px;color:#6c757d;">Không tìm thấy sản phẩm nào phù hợp!</td></tr>`;
        return;
    }

    const nhan = {
        ok: '<span class="stock-badge stock-ok">Còn hàng</span>',
        low: '<span class="stock-badge stock-low">⚠ Sắp hết</span>',
        out: '<span class="stock-badge stock-out">Hết hàng</span>'
    };

    tbody.innerHTML = data.map(item => {
        const st = trangThaiTon(item.currentStock);
        return `
        <tr class="${st === 'out' ? 'row-out' : (st === 'low' ? 'row-low' : '')}">
            <td style="text-align:center;"><strong>${item.code}</strong></td>
            <td style="text-align:center;">
                <img src="${item.image}" alt="Ảnh SP" style="width:50px;height:50px;object-fit:contain;background:#fff;border-radius:4px;border:1px solid #ddd;">
            </td>
            <td><strong>${item.name}</strong></td>
            <td style="text-align:center;"><span class="badge" style="background:#e9ecef;color:#333;">${item.category}</span></td>
            <td style="text-align:center;font-size:15px;">${item.openingStock}</td>
            <td style="text-align:center;font-size:15px;font-weight:bold;color:#28a745;">+ ${item.importedInRange}</td>
            <td style="text-align:center;font-size:15px;font-weight:bold;color:#dc3545;">- ${item.soldInRange}</td>
            <td style="text-align:center;font-size:17px;font-weight:900;">= ${item.currentStock}</td>
            <td style="text-align:center;">${nhan[st]}</td>
            <td style="text-align:center;">
                <button class="btn-action btn-view-detail" onclick="openInventoryDetail('${item.code}')">Chi tiết</button>
            </td>
        </tr>`;
    }).join('');
}

function updateInventoryDashboard(totalItems, totalValue, lowCount, outCount, threshold) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    set('invTotalQty', new Intl.NumberFormat('vi-VN').format(totalItems));
    set('invTotalValue', formatMoney(totalValue));
    set('invLowStockAlert', lowCount);
    set('invOutStockAlert', outCount);
    set('invThresholdText', threshold);
}

// MODAL: nhập - xuất - tồn của 1 sản phẩm trong khoảng thời gian
function openInventoryDetail(code) {
    const row = inventoryRowsCache[code];
    if (!row) return;

    const from = document.getElementById('invFromDate').value;
    const to = document.getElementById('invToDate').value;
    const khoang = (from || to)
        ? 'Từ ' + (from || '...') + ' đến ' + (to || '...')
        : 'Toàn bộ thời gian';

    document.getElementById('invDetailName').innerText = row.code + ' - ' + row.name;
    document.getElementById('invDetailSummary').innerHTML = `
        <div><span>Khoảng thời gian</span><b>${khoang}</b></div>
        <div><span>Tồn đầu kỳ</span><b>${row.openingStock}</b></div>
        <div><span>Tổng nhập</span><b style="color:#28a745;">+ ${row.importedInRange}</b></div>
        <div><span>Tổng xuất</span><b style="color:#dc3545;">- ${row.soldInRange}</b></div>
        <div><span>Tồn cuối kỳ</span><b style="color:#007bff;">${row.currentStock}</b></div>`;

    const moves = row.moves.slice().sort((a, b) => a.date.localeCompare(b.date));
    let balance = row.openingStock;
    const body = document.getElementById('invDetailBody');

    if (moves.length === 0) {
        body.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#888;padding:20px;">Không có phát sinh nhập/xuất trong khoảng thời gian này.</td></tr>`;
    } else {
        body.innerHTML = moves.map(m => {
            balance += m.kind === 'in' ? m.qty : -m.qty;
            return `
            <tr>
                <td>${m.date}</td>
                <td>${m.ref}</td>
                <td>${m.kind === 'in' ? 'Nhập hàng' : 'Bán hàng'}</td>
                <td style="text-align:center;color:#28a745;font-weight:bold;">${m.kind === 'in' ? '+ ' + m.qty : ''}</td>
                <td style="text-align:center;color:#dc3545;font-weight:bold;">${m.kind === 'out' ? '- ' + m.qty : ''}</td>
                <td style="text-align:center;font-weight:bold;">${balance}</td>
            </tr>`;
        }).join('');
    }
    document.getElementById('inventoryDetailModal').style.display = 'flex';
}

// Nhắc khi còn phiếu nhập "Lưu tạm" (các phiếu này chưa được tính vào tồn kho)
function showInventoryPendingNote(pendingCount) {
    const section = document.getElementById('tab-inventory');
    if (!section) return;
    let note = document.getElementById('invPendingNote');
    if (!note) {
        const tableWrap = section.querySelector('.card-table');
        if (!tableWrap) return;
        note = document.createElement('div');
        note.id = 'invPendingNote';
        note.style.cssText = 'margin: 0 0 12px; padding: 10px 14px; border-radius: 6px; background: #fff3cd; color: #856404; border: 1px solid #ffeeba;';
        tableWrap.parentNode.insertBefore(note, tableWrap);
    }
    if (pendingCount > 0) {
        note.innerHTML = `⚠️ Có <b>${pendingCount} phiếu nhập</b> đang ở trạng thái "Lưu tạm" nên chưa được tính vào tồn kho. Hãy vào <b>Quản lý nhập hàng</b>, mở phiếu và bấm <b>Hoàn thành</b>.`;
        note.style.display = 'block';
    } else {
        note.style.display = 'none';
    }
}

/*======================================================================
    HÀM CHUYỂN ĐỔI TAB (MÔ HÌNH SINGLE PAGE APPLICATION)
======================================================================*/
function switchTab(tabName) {
    // 1. Ẩn tất cả các module
    const modules = document.querySelectorAll('.admin-module');
    modules.forEach(mod => mod.style.display = 'none');

    // 2. Chỉ hiện module được người dùng click chọn
    const targetModule = document.getElementById('tab-' + tabName);
    if (targetModule) targetModule.style.display = 'block';

    // 3. Xóa class active ở tất cả thẻ <li> và gắn lại cho thẻ vừa click
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    const activeMenu = document.getElementById('menu-' + tabName);
    if (activeMenu) activeMenu.classList.add('active');

    // 4. Reset & Tải lại dữ liệu trực tiếp để 2 kho tự đồng bộ hóa với nhau ngay lập tức
    if (tabName === 'products') {
        capNhatLuaChonLoai();
        hienThiDanhMucSanPham();
    } else if (tabName === 'product-types') {
        hienThiLoaiSanPham();
    } else if (tabName === 'pricing') {
        loadDataForPricing();
    } else if (tabName === 'imports') {
        loadDataForImports();
    } else if (tabName === 'orders') {
        loadDataForOrders();
    } else if (tabName === 'inventory') {
        loadDataForInventory();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (typeof loadDataForImports === "function") loadDataForImports();
    if (typeof loadDataForPricing === "function") loadDataForPricing();
    if (typeof loadDataForOrders === "function") loadDataForOrders();
    if (typeof loadDataForInventory === "function") loadDataForInventory();

    const defaultMenu = document.getElementById("menu-customers");
    if (defaultMenu) {
        defaultMenu.click();
    }

});