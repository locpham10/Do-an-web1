// DỮ LIỆU MẪU PHẢI GIỐNG HỆT admin.js (dùng chung localStorage) - trang nào mở trước cũng tạo ra cùng một bộ dữ liệu.
function khoiTaoDuLieuMau() {
    // ====== PHIÊN BẢN DỮ LIỆU MẪU ======
    // Đổi số này mỗi khi sửa dữ liệu mẫu để mọi máy tự nạp lại (ở CẢ admin.js và index.js).
    // Chỉ xóa dữ liệu mẫu, giữ nguyên tài khoản, giỏ hàng, đơn hàng.
    const DATA_VERSION = "3";
    if (localStorage.getItem("dataVersion") !== DATA_VERSION) {
        ["loaiSanPham", "danhMucSanPham", "saved_imports", "saved_pricing"]
            .forEach(function (k) { localStorage.removeItem(k); });
        localStorage.setItem("dataVersion", DATA_VERSION);
    }

    // 1. Tạo loại sản phẩm mẫu (4 hãng)
    if (!localStorage.getItem("loaiSanPham")) {
        const loaiMau = [
            {"maLoai": "L01", "tenLoai": "Apple", "moTa": "Các điện thoại iPhone", "trangThai": "hoatdong", "hinh": "../Img/Apple/hangApple.png"},
            {"maLoai": "L02", "tenLoai": "Samsung", "moTa": "Các điện thoại của hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/hangSamsung.png"},
            {"maLoai": "L03", "tenLoai": "Oppo", "moTa": "Các điện thoại của hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/Oppo/hangOppo.png"},
            {"maLoai": "L04", "tenLoai": "Xiaomi", "moTa": "Các điện thoại của hãng Xiaomi", "trangThai": "hoatdong", "hinh": ""}
        ];
        localStorage.setItem("loaiSanPham", JSON.stringify(loaiMau));
    }

    // 2. Tạo sản phẩm mẫu (mỗi hãng 5 sản phẩm, hình để trống trừ các máy đã có hình)
    if (!localStorage.getItem("danhMucSanPham")) {
        const spMau = [
            {"maSP": "SP01", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone 15 Pro Max", "price": 29990000, "moTa": "Màn hình: 6.7 inch Super Retina XDR OLED, 2796 x 1290, 120Hz ProMotion, Dynamic Island\nChip & bộ nhớ: Apple A17 Pro, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP chính + 12MP tele 5x + 12MP siêu rộng; Trước: 12MP\nPin & sạc: Khoảng 4422mAh, sạc nhanh có dây ~27W, sạc không dây MagSafe 15W\nHệ điều hành: iOS 17 (nâng cấp được lên phiên bản mới nhất)\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iPhone15_den.png", "color": "Titan Tự Nhiên"},
            {"maSP": "SP02", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy S24 Ultra", "price": 33990000, "moTa": "Màn hình: 6.8 inch Dynamic AMOLED 2X, QHD+, 120Hz, kèm bút S Pen\nChip & bộ nhớ: Snapdragon 8 Gen 3 for Galaxy, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 12MP siêu rộng + 10MP tele 3x + 50MP tele 5x; Trước: 12MP\nPin & sạc: 5000mAh, sạc nhanh có dây 45W, sạc không dây 15W\nHệ điều hành: Android 14, One UI 6.1 (nâng cấp 7 năm)\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-s24-ultra.png", "color": "Đen Titan"},
            {"maSP": "SP03", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Find N3", "price": 24990000, "moTa": "Màn hình: Màn hình gập chính 7.82 inch AMOLED LTPO 120Hz + màn hình ngoài 6.31 inch\nChip & bộ nhớ: Snapdragon 8 Gen 2, RAM 16GB, bộ nhớ trong 512GB\nCamera: Sau: 48MP chính + 48MP siêu rộng + 64MP tele periscope 3x; Trước: 32MP\nPin & sạc: 4805mAh, sạc nhanh SUPERVOOC 67W, sạc không dây AIRVOOC 50W\nHệ điều hành: Android 13, ColorOS 13.2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-find-N3.png", "color": "Xanh lá"},
            {"maSP": "SP04", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone Duo", "price": 69000000, "moTa": "Màn hình: Màn hình gập OLED LTPO 120Hz, kích thước mở rộng khoảng 7.8 inch\nChip & bộ nhớ: Chip Apple thế hệ mới, RAM 12GB, bộ nhớ trong 512GB\nCamera: Sau: 48MP chính + 48MP siêu rộng; Trước: 18MP\nPin & sạc: Pin dung lượng lớn dùng cả ngày, sạc nhanh có dây, sạc không dây MagSafe\nHệ điều hành: iOS 26\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone_duo_night_sky.png", "color": "Xanh Dương Sẫm"},
            {"maSP": "SP05", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone 16 Pro", "price": 28990000, "moTa": "Màn hình: 6.3 inch Super Retina XDR OLED, 120Hz ProMotion, Dynamic Island\nChip & bộ nhớ: Apple A18 Pro, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP chính + 48MP siêu rộng + 12MP tele 5x; Trước: 12MP\nPin & sạc: Khoảng 3582mAh, sạc nhanh có dây ~30W, sạc không dây MagSafe 25W\nHệ điều hành: iOS 18 (nâng cấp được lên phiên bản mới nhất)\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone-16-pro-natural.png", "color": "Titan Sa Mạc"},
            {"maSP": "SP06", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone 17 Pro", "price": 24990000, "moTa": "Màn hình: 6.3 inch Super Retina XDR OLED, 120Hz ProMotion\nChip & bộ nhớ: Apple A19 Pro, RAM 16GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP chính + 48MP siêu rộng; Trước: 18MP Center Stage\nPin & sạc: Pin dùng cả ngày, sạc nhanh có dây, sạc không dây MagSafe/Qi2 25W\nHệ điều hành: iOS 26\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone-17-pro.png", "color": "Cam"},
            {"maSP": "SP07", "maLoai": "L01", "tenLoai": "Apple", "tenSP": "iPhone Air", "price": 31990000, "moTa": "Màn hình: 6.5 inch Super Retina XDR OLED, 120Hz ProMotion, thiết kế siêu mỏng khoảng 5.6mm\nChip & bộ nhớ: Apple A19 Pro, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 48MP chính; Trước: 18MP Center Stage\nPin & sạc: Pin dùng cả ngày, sạc nhanh có dây, sạc không dây MagSafe/Qi2\nHệ điều hành: iOS 26\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng VN/A, chỉ hỗ trợ eSIM\nPhụ kiện: Cáp USB-C, sách hướng dẫn, que lấy SIM (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Apple", "trangThai": "hoatdong", "hinh": "../Img/Apple/iphone-air.png", "color": "Trắng Ngọc"},
            {"maSP": "SP08", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy S25 Ultra", "price": 31990000, "moTa": "Màn hình: 6.9 inch Dynamic AMOLED 2X, QHD+, 120Hz, kèm bút S Pen\nChip & bộ nhớ: Snapdragon 8 Elite for Galaxy, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 50MP siêu rộng + 10MP tele 3x + 50MP tele 5x; Trước: 12MP\nPin & sạc: 5000mAh, sạc nhanh có dây 45W, sạc không dây 15W\nHệ điều hành: Android 15, One UI 7\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-s25-ultra.png", "color": "Xám Titan"},
            {"maSP": "SP09", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy S26", "price": 24990000, "moTa": "Màn hình: 6.3 inch Dynamic AMOLED 2X, 120Hz\nChip & bộ nhớ: Exynos 2600 / Snapdragon 8 Elite Gen 5 for Galaxy (tùy thị trường), RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 12MP siêu rộng + 10MP tele 3x; Trước: 12MP\nPin & sạc: Khoảng 4300mAh, sạc nhanh có dây 25W, sạc không dây 15W\nHệ điều hành: Android 16, One UI 8.5\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-s26.png", "color": "Đen"},
            {"maSP": "SP10", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy Z Fold7", "price": 46990000, "moTa": "Màn hình: Màn hình trong 8.0 inch Dynamic AMOLED 2X 120Hz + màn hình ngoài 6.5 inch\nChip & bộ nhớ: Snapdragon 8 Elite for Galaxy, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 12MP siêu rộng + 10MP tele 3x; Trước: 10MP (ngoài) + 10MP (trong)\nPin & sạc: 4400mAh, sạc nhanh có dây 25W, sạc không dây 15W\nHệ điều hành: Android 16, One UI 8\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-zfold7.png", "color": "Xanh Bạc"},
            {"maSP": "SP11", "maLoai": "L02", "tenLoai": "Samsung", "tenSP": "Galaxy A56 5G", "price": 11990000, "moTa": "Màn hình: 6.7 inch Super AMOLED, Full HD+, 120Hz\nChip & bộ nhớ: Exynos 1580, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 12MP siêu rộng + 5MP macro; Trước: 12MP\nPin & sạc: 5000mAh, sạc nhanh có dây 45W\nHệ điều hành: Android 15, One UI 7\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Cáp USB-C, que lấy SIM, sách hướng dẫn (không kèm củ sạc)\nBảo hành: 12 tháng chính hãng Samsung", "trangThai": "hoatdong", "hinh": "../Img/Samsung/Samsung-galaxy-a56-5g.png", "color": "Xám"},
            {"maSP": "SP12", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Find X8 Pro", "price": 29990000, "moTa": "Màn hình: 6.78 inch AMOLED LTPO, 2K, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 9400, RAM 16GB, bộ nhớ trong 512GB\nCamera: Sau: 50MP chính + 50MP siêu rộng + 50MP tele 3x + 50MP tele 6x; Trước: 32MP\nPin & sạc: 5910mAh, sạc nhanh có dây 80W, sạc không dây 50W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-find-x8-pro.png", "color": "Đen Không Gian"},
            {"maSP": "SP13", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Reno14 Pro 5G", "price": 19990000, "moTa": "Màn hình: 6.83 inch AMOLED, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 8450, RAM 12GB, bộ nhớ trong 512GB\nCamera: Sau: 50MP chính + 50MP tele 3.5x + 8MP siêu rộng; Trước: 50MP\nPin & sạc: 6200mAh, sạc nhanh có dây 80W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-reno14-pro.png", "color": "Xanh Ngọc"},
            {"maSP": "SP14", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO Reno13 5G", "price": 12990000, "moTa": "Màn hình: 6.59 inch AMOLED, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 8350, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 50MP tele 3x + 8MP siêu rộng; Trước: 50MP\nPin & sạc: 5600mAh, sạc nhanh có dây 80W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-reno13-pro.png", "color": "Tím"},
            {"maSP": "SP15", "maLoai": "L03", "tenLoai": "Oppo", "tenSP": "OPPO A5 Pro 5G", "price": 6990000, "moTa": "Màn hình: 6.67 inch LCD, 120Hz\nChip & bộ nhớ: MediaTek Dimensity 6300, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 2MP; Trước: 8MP\nPin & sạc: 5800mAh, sạc nhanh có dây 45W\nHệ điều hành: Android 15, ColorOS 15\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 12 tháng chính hãng OPPO", "trangThai": "hoatdong", "hinh": "../Img/OPPO/Oppo-a5-pro.png", "color": "Xanh Dương"},
            {"maSP": "SP16", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Xiaomi 15 Ultra", "price": 31990000, "moTa": "Màn hình: 6.73 inch AMOLED LTPO, WQHD+, 120Hz\nChip & bộ nhớ: Snapdragon 8 Elite, RAM 16GB, bộ nhớ trong 512GB\nCamera: Sau (Leica): 50MP chính 1 inch + 50MP siêu rộng + 50MP tele 3x + 200MP tele periscope 4.3x; Trước: 32MP\nPin & sạc: 5410mAh, sạc nhanh có dây 90W, sạc không dây 80W\nHệ điều hành: Android 15, HyperOS 2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Xiaomi-15-ultra.png", "color": "Đen"},
            {"maSP": "SP17", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Xiaomi 15", "price": 19990000, "moTa": "Màn hình: 6.36 inch AMOLED LTPO, 120Hz\nChip & bộ nhớ: Snapdragon 8 Elite, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau (Leica): 50MP chính + 50MP siêu rộng + 50MP tele 3x; Trước: 32MP\nPin & sạc: 5240mAh, sạc nhanh có dây 90W, sạc không dây 50W\nHệ điều hành: Android 15, HyperOS 2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Xiaomi-15.png", "color": "Xanh Lá"},
            {"maSP": "SP18", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Xiaomi 14T Pro", "price": 14990000, "moTa": "Màn hình: 6.67 inch AMOLED, 144Hz\nChip & bộ nhớ: MediaTek Dimensity 9300+, RAM 12GB, bộ nhớ trong 512GB\nCamera: Sau (Leica): 50MP chính + 50MP tele 2.6x + 12MP siêu rộng; Trước: 32MP\nPin & sạc: 5000mAh, sạc nhanh có dây 120W\nHệ điều hành: Android 14, HyperOS\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Xiaomi-14t-pro.png", "color": "Xám Titan"},
            {"maSP": "SP19", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "Redmi Note 14 Pro+ 5G", "price": 9990000, "moTa": "Màn hình: 6.67 inch AMOLED, 120Hz\nChip & bộ nhớ: Snapdragon 7s Gen 3, RAM 8GB, bộ nhớ trong 256GB\nCamera: Sau: 200MP chính + 8MP siêu rộng + 2MP macro; Trước: 20MP\nPin & sạc: 5110mAh, sạc nhanh có dây 90W\nHệ điều hành: Android 14, HyperOS\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/Redmi-note-14prop.png", "color": "Tím"},
            {"maSP": "SP20", "maLoai": "L04", "tenLoai": "Xiaomi", "tenSP": "POCO F7", "price": 11490000, "moTa": "Màn hình: 6.83 inch AMOLED, 120Hz\nChip & bộ nhớ: Snapdragon 8s Gen 4, RAM 12GB, bộ nhớ trong 256GB\nCamera: Sau: 50MP chính + 8MP siêu rộng; Trước: 20MP\nPin & sạc: 6500mAh, sạc nhanh có dây 90W\nHệ điều hành: Android 15, HyperOS 2\nTình trạng máy: Máy mới 100%, nguyên seal, chính hãng\nPhụ kiện: Củ sạc nhanh, cáp USB-C, ốp lưng, que lấy SIM, sách hướng dẫn\nBảo hành: 18 tháng chính hãng Xiaomi", "trangThai": "hoatdong", "hinh": "../Img/Xiaomi/poco-f7.png", "color": "Bạc"}
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
                totalAmount: 4405400000,
                items: [
                    {"maSP": "SP01", "tenSP": "iPhone 15 Pro Max", "hinh": "../Img/Apple/iPhone15_den.png", "qty": 10, "price": 25490000},
                    {"maSP": "SP02", "tenSP": "Galaxy S24 Ultra", "hinh": "../Img/Samsung/Samsung-galaxy-s24-ultra.png", "qty": 10, "price": 28890000},
                    {"maSP": "SP03", "tenSP": "OPPO Find N3", "hinh": "../Img/Oppo/Oppo-find-N3.png", "qty": 10, "price": 21240000},
                    {"maSP": "SP04", "tenSP": "iPhone Duo", "hinh": "../Img/Apple/iphone_duo_night_sky.png", "qty": 10, "price": 58650000},
                    {"maSP": "SP05", "tenSP": "iPhone 16 Pro", "hinh": "", "qty": 10, "price": 24640000},
                    {"maSP": "SP06", "tenSP": "iPhone 17", "hinh": "", "qty": 10, "price": 21240000},
                    {"maSP": "SP07", "tenSP": "iPhone Air", "hinh": "", "qty": 10, "price": 27190000},
                    {"maSP": "SP08", "tenSP": "Galaxy S25 Ultra", "hinh": "", "qty": 10, "price": 27190000},
                    {"maSP": "SP09", "tenSP": "Galaxy S26", "hinh": "", "qty": 10, "price": 21240000},
                    {"maSP": "SP10", "tenSP": "Galaxy Z Fold7", "hinh": "", "qty": 10, "price": 39940000},
                    {"maSP": "SP11", "tenSP": "Galaxy A56 5G", "hinh": "", "qty": 10, "price": 10190000},
                    {"maSP": "SP12", "tenSP": "OPPO Find X8 Pro", "hinh": "", "qty": 10, "price": 25490000},
                    {"maSP": "SP13", "tenSP": "OPPO Reno14 Pro 5G", "hinh": "", "qty": 10, "price": 16990000},
                    {"maSP": "SP14", "tenSP": "OPPO Reno13 5G", "hinh": "", "qty": 10, "price": 11040000},
                    {"maSP": "SP15", "tenSP": "OPPO A5 Pro 5G", "hinh": "", "qty": 10, "price": 5940000},
                    {"maSP": "SP16", "tenSP": "Xiaomi 15 Ultra", "hinh": "", "qty": 10, "price": 27190000},
                    {"maSP": "SP17", "tenSP": "Xiaomi 15", "hinh": "", "qty": 10, "price": 16990000},
                    {"maSP": "SP18", "tenSP": "Xiaomi 14T Pro", "hinh": "", "qty": 10, "price": 12740000},
                    {"maSP": "SP19", "tenSP": "Redmi Note 14 Pro+ 5G", "hinh": "", "qty": 10, "price": 8490000},
                    {"maSP": "SP20", "tenSP": "POCO F7", "hinh": "", "qty": 10, "price": 9770000}
                ]
            }
        ];
        localStorage.setItem("saved_imports", JSON.stringify(phieuNhapMau));
    }

    // 4. Tạo bảng giá bán mẫu (giá vốn = giá nhập bình quân, giá bán = giá niêm yết)
    if (!localStorage.getItem("saved_pricing")) {
        const giaMau = [
            {"maSP": "SP01", "tenSP": "iPhone 15 Pro Max", "hinh": "../Img/Apple/iPhone15_den.png", "totalQty": 10, "totalCost": 254900000, "importPrice": 25490000, "retailPrice": 29990000},
            {"maSP": "SP02", "tenSP": "Galaxy S24 Ultra", "hinh": "../Img/Samsung/Samsung-galaxy-s24-ultra.png", "totalQty": 10, "totalCost": 288900000, "importPrice": 28890000, "retailPrice": 33990000},
            {"maSP": "SP03", "tenSP": "OPPO Find N3", "hinh": "../Img/Oppo/Oppo-find-N3.png", "totalQty": 10, "totalCost": 212400000, "importPrice": 21240000, "retailPrice": 24990000},
            {"maSP": "SP04", "tenSP": "iPhone Duo", "hinh": "../Img/Apple/iphone_duo_night_sky.png", "totalQty": 10, "totalCost": 586500000, "importPrice": 58650000, "retailPrice": 69000000},
            {"maSP": "SP05", "tenSP": "iPhone 16 Pro", "hinh": "", "totalQty": 10, "totalCost": 246400000, "importPrice": 24640000, "retailPrice": 28990000},
            {"maSP": "SP06", "tenSP": "iPhone 17", "hinh": "", "totalQty": 10, "totalCost": 212400000, "importPrice": 21240000, "retailPrice": 24990000},
            {"maSP": "SP07", "tenSP": "iPhone Air", "hinh": "", "totalQty": 10, "totalCost": 271900000, "importPrice": 27190000, "retailPrice": 31990000},
            {"maSP": "SP08", "tenSP": "Galaxy S25 Ultra", "hinh": "", "totalQty": 10, "totalCost": 271900000, "importPrice": 27190000, "retailPrice": 31990000},
            {"maSP": "SP09", "tenSP": "Galaxy S26", "hinh": "", "totalQty": 10, "totalCost": 212400000, "importPrice": 21240000, "retailPrice": 24990000},
            {"maSP": "SP10", "tenSP": "Galaxy Z Fold7", "hinh": "", "totalQty": 10, "totalCost": 399400000, "importPrice": 39940000, "retailPrice": 46990000},
            {"maSP": "SP11", "tenSP": "Galaxy A56 5G", "hinh": "", "totalQty": 10, "totalCost": 101900000, "importPrice": 10190000, "retailPrice": 11990000},
            {"maSP": "SP12", "tenSP": "OPPO Find X8 Pro", "hinh": "", "totalQty": 10, "totalCost": 254900000, "importPrice": 25490000, "retailPrice": 29990000},
            {"maSP": "SP13", "tenSP": "OPPO Reno14 Pro 5G", "hinh": "", "totalQty": 10, "totalCost": 169900000, "importPrice": 16990000, "retailPrice": 19990000},
            {"maSP": "SP14", "tenSP": "OPPO Reno13 5G", "hinh": "", "totalQty": 10, "totalCost": 110400000, "importPrice": 11040000, "retailPrice": 12990000},
            {"maSP": "SP15", "tenSP": "OPPO A5 Pro 5G", "hinh": "", "totalQty": 10, "totalCost": 59400000, "importPrice": 5940000, "retailPrice": 6990000},
            {"maSP": "SP16", "tenSP": "Xiaomi 15 Ultra", "hinh": "", "totalQty": 10, "totalCost": 271900000, "importPrice": 27190000, "retailPrice": 31990000},
            {"maSP": "SP17", "tenSP": "Xiaomi 15", "hinh": "", "totalQty": 10, "totalCost": 169900000, "importPrice": 16990000, "retailPrice": 19990000},
            {"maSP": "SP18", "tenSP": "Xiaomi 14T Pro", "hinh": "", "totalQty": 10, "totalCost": 127400000, "importPrice": 12740000, "retailPrice": 14990000},
            {"maSP": "SP19", "tenSP": "Redmi Note 14 Pro+ 5G", "hinh": "", "totalQty": 10, "totalCost": 84900000, "importPrice": 8490000, "retailPrice": 9990000},
            {"maSP": "SP20", "tenSP": "POCO F7", "hinh": "", "totalQty": 10, "totalCost": 97700000, "importPrice": 9770000, "retailPrice": 11490000}
        ];
        localStorage.setItem("saved_pricing", JSON.stringify(giaMau));
    }
}


// Chạy tự động ngay khi mở web
khoiTaoDuLieuMau();

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (slides.length === 0) return;

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
  }
    // Dừng mọi video, rồi chỉ phát video của slide đang hiện
  document.querySelectorAll(".slides video").forEach(function (v) {
    v.pause();
  });
  const vid = slides[slideIndex - 1].querySelector("video");
  if (vid) {
    vid.currentTime = 0;
    vid.play().catch(function () {});
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const authModal = document.getElementById("authModal");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const userBtn = document.getElementById("userBtn");
  const cartBtn = document.getElementById("cartBtn");
  const userItem = document.querySelector(".user-item");
  const logoutBtn = document.getElementById("logoutBtn");

  function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (user) {
      userItem.classList.add("logged-in");
    } else {
      userItem.classList.remove("logged-in");
    }
  }

  checkLoginStatus();

  function openModal() {
    authModal.classList.remove("hidden");
    showLogin();
  }

  function closeModal() {
    authModal.classList.add("hidden");
  }

  // Cho phép các hàm ngoài (vd: addToCart) mở popup đăng nhập
  window.openAuthModal = openModal;

  if (closeAuthModal) closeAuthModal.addEventListener("click", closeModal);
  window.addEventListener("click", function (e) {
    if (e.target === authModal) {
      closeModal();
    }
  });

  userBtn.addEventListener("click", function () {
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (!user) {
      openModal();
    }
  });

  cartBtn.addEventListener("click", function () {
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (!user) {
      alert("Vui lòng đăng nhập để xem giỏ hàng!");
      openModal();
    } else {
      window.location.href = "cart.html";
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("nguoiDungDangNhap");
      alert("Đăng xuất thành công!");
      checkLoginStatus();
      updateCartBadge(); // ẩn chấm đỏ khi đã đăng xuất
    });
  }

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotForm = document.getElementById("forgotForm");

  const loginAccount = document.getElementById("loginAccount");
  const loginPassword = document.getElementById("loginPassword");

  const registerName = document.getElementById("registerName");
  const registerPhone = document.getElementById("registerPhone");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  const forgotPassword = document.getElementById("forgotPassword");
  const backToLogin = document.getElementById("backToLogin");

  function showLogin() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    forgotForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  }

  function showRegister() {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    forgotForm.classList.add("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.add("active");
  }

  function showForgot() {
    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");
    forgotForm.classList.remove("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.remove("active");
  }

  loginTab.addEventListener("click", showLogin);
  registerTab.addEventListener("click", showRegister);
  document.getElementById("goRegister").addEventListener("click", showRegister);
  document.getElementById("goLogin").addEventListener("click", showLogin);
  forgotPassword.addEventListener("click", showForgot);
  backToLogin.addEventListener("click", showLogin);

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const hoTen = registerName.value.trim();
    const soDienThoai = registerPhone.value.trim();
    const email = registerEmail.value.trim().toLowerCase();
    const matKhau = registerPassword.value;
    const xacNhanMatKhau = confirmPassword.value;

    if (matKhau !== xacNhanMatKhau) {
      alert("Mật khẩu xác nhận không trùng khớp!");
      return;
    }

    let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];

    const daTonTai = taiKhoan.some(function (account) {
      return (
        account.email.toLowerCase() === email ||
        account.soDienThoai === soDienThoai
      );
    });

    if (daTonTai) {
      alert("Email hoặc số điện thoại đã được đăng ký!");
      return;
    }

    const nguoiDung = {
      hoTen: hoTen,
      soDienThoai: soDienThoai,
      email: email,
      matKhau: matKhau,
    };

    taiKhoan.push(nguoiDung);
    localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));

    alert("Đăng ký thành công!");
    registerForm.reset();
    showLogin();
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taiKhoanNhap = loginAccount.value.trim();
    const matKhauNhap = loginPassword.value;

    const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];

    const nguoiDung = taiKhoan.find(function (account) {
      return (
        (account.email.toLowerCase() === taiKhoanNhap.toLowerCase() ||
          account.soDienThoai === taiKhoanNhap) &&
        account.matKhau === matKhauNhap
      );
    });

    if (!nguoiDung) {
      alert("Sai email/số điện thoại hoặc mật khẩu!");
      return;
    }

    const danhSachNgungHoatDong =
      JSON.parse(localStorage.getItem("ngunghoatdong")) || [];

    const isLocked = danhSachNgungHoatDong.some(function (item) {
      if (typeof item === "string") {
        return (
          item.toLowerCase() === nguoiDung.email.toLowerCase() ||
          item === nguoiDung.soDienThoai
        );
      } else if (typeof item === "object" && item !== null) {
        return (
          (item.email &&
            item.email.toLowerCase() === nguoiDung.email.toLowerCase()) ||
          (item.soDienThoai && item.soDienThoai === nguoiDung.soDienThoai)
        );
      }
      return false;
    });

    if (isLocked) {
      alert(
        "Tài khoản của bạn đã bị ngừng hoạt động bởi quản trị viên! Không thể đăng nhập.",
      );
      return;
    }

    localStorage.setItem("nguoiDungDangNhap", JSON.stringify(nguoiDung));
    alert("Đăng nhập thành công!");
    loginForm.reset();
    closeModal();
    checkLoginStatus();
    updateCartBadge(); // hiện lại chấm đỏ sau khi đăng nhập
  });

  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document
      .getElementById("forgotEmail")
      .value.trim()
      .toLowerCase();
    const soDienThoai = document.getElementById("forgotPhone").value.trim();
    const matKhauMoi = document.getElementById("newPassword").value;
    const xacNhanMatKhau = document.getElementById("confirmNewPassword").value;

    if (matKhauMoi !== xacNhanMatKhau) {
      alert("Mật khẩu xác nhận không trùng khớp!");
      return;
    }

    let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];

    const nguoiDung = taiKhoan.find(function (account) {
      return (
        account.email.toLowerCase() === email &&
        account.soDienThoai === soDienThoai
      );
    });

    if (!nguoiDung) {
      alert("Email hoặc số điện thoại không đúng!");
      return;
    }

    const danhSachNgungHoatDong =
      JSON.parse(localStorage.getItem("ngunghoatdong")) || [];
    const isLocked = danhSachNgungHoatDong.some(function (item) {
      const val =
        typeof item === "string" ? item : item.email || item.soDienThoai;
      return val && (val.toLowerCase() === email || val === soDienThoai);
    });

    if (isLocked) {
      alert(
        "Tài khoản này đã bị ngừng hoạt động, không thể thực hiện thao tác này!",
      );
      return;
    }

    nguoiDung.matKhau = matKhauMoi;
    localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));

    alert("Đổi mật khẩu thành công!");
    forgotForm.reset();
    showLogin();
  });
});

// ======================================================================
// PHẦN HIỂN THỊ VÀ TÌM KIẾM SẢN PHẨM
// ======================================================================

const DEFAULT_IMG = "assets/images/default-image.jpeg";

// Ảnh lưu từ trang admin có thể là "../assets/..." (đúng với trang admin, sai với index.html)
// -> bỏ "../" để đúng với thư mục gốc; rỗng thì dùng ảnh mặc định.
function layAnhSP(hinh) {
  if (!hinh) return DEFAULT_IMG;
  hinh = String(hinh).trim();
  if (hinh === "") return DEFAULT_IMG;
  while (hinh.startsWith("../")) hinh = hinh.slice(3);
  return hinh;
}

let rawProducts = JSON.parse(localStorage.getItem("danhMucSanPham")) || [];
let pricingData = JSON.parse(localStorage.getItem("saved_pricing")) || [];

// SỬA LỖI: Khởi tạo mảng rỗng hoàn toàn trước khi lọc
let allProducts = [];

for (let i = 0; i < rawProducts.length; i++) {
  let sp = rawProducts[i];

  // Bỏ qua nếu sản phẩm đang bị ẩn
  if (sp.trangThai !== "an") {
    // Tìm giá bán trong saved_pricing hoặc lấy giá mặc định có sẵn trong sp
    let giaBanObj =
      pricingData.find((p) => (p.maSP || p.code) === sp.maSP) ||
      pricingData.find((p) => (p.tenSP || p.name) === sp.tenSP);
    let giaHienThi =
      giaBanObj && giaBanObj.retailPrice > 0
        ? giaBanObj.retailPrice
        : sp.price || 0;

    // Chỉ hiển thị sản phẩm có giá bán > 0
    if (giaHienThi > 0) {
      allProducts.push({
        maSP: sp.maSP,
        tenSP: sp.tenSP,
        tenLoai: sp.tenLoai || "Khác",
        hinh: layAnhSP(sp.hinh),
        price: Number(giaHienThi),
        color: sp.color || "Tiêu chuẩn",
        moTa: sp.moTa || "",
      });
    }
  }
}

let filteredProducts = [];
for (let i = 0; i < allProducts.length; i++) {
  filteredProducts.push(allProducts[i]);
}

let currentPage = 1;
let itemsPerPage = 8;

// ---------------------------------------------------------
// HÀM 1: Vẽ sản phẩm ra màn hình
// ---------------------------------------------------------
function renderProducts(page) {
  let productGrid = document.getElementById("productGrid");
  if (!productGrid) return;

  productGrid.innerHTML = "";

  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let hasProduct = false;

  for (let i = startIndex; i < endIndex; i++) {
    if (i >= filteredProducts.length) break;

    hasProduct = true;
    let product = filteredProducts[i];

    // SỬA LỖI: Khai báo đầy đủ imgSrc, prodName, formatPrice
    let formatPrice = Number(product.price || 0).toLocaleString("vi-VN") + " đ";
    let imgSrc = layAnhSP(product.hinh);
    let prodName = product.tenSP || "Sản phẩm";

    let cardHTML = `
      <div class="product-card">
        <div onclick="showDetail('${product.maSP}')">
          <img src="${imgSrc}" alt="${prodName}" onerror="this.onerror=null; this.src='assets/images/default-image.jpeg'">
          <h4>${prodName}</h4>
          <p class="price">${formatPrice}</p>
        </div>
        <button onclick="addToCart('${product.maSP}')">Thêm vào giỏ</button>
      </div>
    `;
    productGrid.innerHTML += cardHTML;
  }

  if (hasProduct === false) {
    productGrid.innerHTML =
      "<h3 style='grid-column: span 4; text-align:center;'>Không tìm thấy sản phẩm nào!</h3>";
  }
}

// ---------------------------------------------------------
// HÀM 2: Tạo các nút Phân trang
// ---------------------------------------------------------
function renderPagination() {
  let paginationDiv = document.getElementById("pagination");
  if (!paginationDiv) return;
  paginationDiv.innerHTML = "";

  let totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.className = "active";
    }

    btn.addEventListener("click", function () {
      currentPage = i;
      renderProducts(currentPage);
      renderPagination();
      let titleElem = document.getElementById("categoryTitle");
      if (titleElem) titleElem.scrollIntoView({ behavior: "smooth" });
    });

    paginationDiv.appendChild(btn);
  }
}

// ---------------------------------------------------------
// HÀM 3 & 4: Tìm kiếm, Lọc Danh Mục & Lọc theo Tên (CODE THUẦN CƠ BẢN)
// ---------------------------------------------------------
let searchInputHeader = document.getElementById("searchInputHeader");
let searchIconHeader = document.getElementById("searchIconHeader");
let searchSuggestions = document.getElementById("searchSuggestions");

// --- Hàm Cập nhật Giao diện Breadcrumb (Dùng IF/FOR cơ bản) ---
function updateBreadcrumbUI(activeCategory, searchKeyword, isAdvancedFilter) {
  let resultTitle = document.getElementById("searchResultTitle");

  // Dùng getElementsByClassName thay cho querySelector nâng cao
  let bannerElements = document.getElementsByClassName("banner-slider");
  let bannerSection = null;
  if (bannerElements.length > 0) bannerSection = bannerElements[0];

  let items = document.getElementsByClassName("breadcrumb-item");

  // 1. Quản lý trạng thái Active trên các nút danh mục
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active");

      let itemText = items[i].innerText.toLowerCase();
      // Kiểm tra xem chữ trên web có khớp với mục đang chọn không
      if (
        itemText === activeCategory ||
        (activeCategory === "khac" && itemText === "khác")
      ) {
        items[i].classList.add("active");
      }
    }
  }

  // 2. Xử lý hiển thị Tiêu đề phụ (Tìm kiếm / Lọc) và Banner
  if (searchKeyword) {
    // Đang Tìm Kiếm
    if (resultTitle) {
      if (filteredProducts.length > 0) {
        // NẾU CÓ SẢN PHẨM: Hiện dòng chữ nhỏ
        resultTitle.innerText =
          "Tìm thấy " +
          filteredProducts.length +
          ' sản phẩm cho "' +
          searchKeyword +
          '"';
        resultTitle.classList.remove("hidden");
      } else {
        // NẾU BẰNG 0: Ẩn luôn dòng chữ nhỏ đi cho đỡ rối
        resultTitle.classList.add("hidden");
      }
    }
    if (bannerSection) bannerSection.classList.add("hide-banner");

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active");
    }
  } else if (isAdvancedFilter) {
    // Đang dùng Bộ Lọc Nâng Cao
    if (resultTitle) {
      if (filteredProducts.length > 0) {
        // NẾU CÓ SẢN PHẨM: Hiện dòng chữ nhỏ
        resultTitle.innerText =
          "Lọc được " + filteredProducts.length + " sản phẩm";
        resultTitle.classList.remove("hidden");
      } else {
        // NẾU BẰNG 0: Ẩn luôn dòng chữ nhỏ
        resultTitle.classList.add("hidden");
      }
    }
    if (bannerSection) bannerSection.classList.add("hide-banner");

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active");
    }
  } else {
    // Chỉ đang xem Danh Mục (Bình thường)
    if (resultTitle) resultTitle.classList.add("hidden");

    if (activeCategory === "all") {
      if (bannerSection) bannerSection.classList.remove("hide-banner");
    } else {
      if (bannerSection) bannerSection.classList.add("hide-banner");
    }
  }
}

// --- Hàm TÌM KIẾM CƠ BẢN (Gõ thanh ngang) ---
function searchBasic() {
  if (!searchInputHeader) return;
  let originalKeyword = searchInputHeader.value.trim();
  let keyword = originalKeyword.toLowerCase();

  filteredProducts = [];

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];

    // Khai báo rõ ràng từng thuộc tính
    let tenSP = (product.tenSP || "").toLowerCase();
    let tenLoai = (product.tenLoai || "").toLowerCase();
    let mauSac = (product.color || "").toLowerCase();

    // Dùng indexOf cơ bản thay cho includes hay Regex phức tạp
    if (
      tenSP.indexOf(keyword) >= 0 ||
      tenLoai.indexOf(keyword) >= 0 ||
      mauSac.indexOf(keyword) >= 0
    ) {
      filteredProducts.push(product);
    }
  }

  // Nếu ô tìm kiếm trống, quay về trang chủ
  if (keyword === "") {
    filterByCategory("all");
  } else {
    updateBreadcrumbUI(null, originalKeyword, false);
    currentPage = 1;
    hideDetail();
    renderProducts(currentPage);
    renderPagination();
  }
}

// Bắt sự kiện Enter
if (searchIconHeader) searchIconHeader.addEventListener("click", searchBasic);
if (searchInputHeader) {
  searchInputHeader.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      if (searchSuggestions) searchSuggestions.classList.add("hidden");
      searchBasic();
    }
  });

  // Bắt sự kiện gõ phím để hiện gợi ý
  if (searchSuggestions) {
    searchInputHeader.addEventListener("input", function () {
      let keyword = this.value.toLowerCase().trim();
      if (keyword === "") {
        searchSuggestions.classList.add("hidden");
        return;
      }

      let matchedProducts = [];
      for (let i = 0; i < allProducts.length; i++) {
        let product = allProducts[i];
        let tenSP = (product.tenSP || "").toLowerCase();

        // Dùng indexOf cơ bản
        if (tenSP.indexOf(keyword) >= 0) {
          matchedProducts.push(product);
        }
      }

      searchSuggestions.innerHTML = "";

      if (matchedProducts.length > 0) {
        let limit = matchedProducts.length;
        if (limit > 5) limit = 5;

        for (let i = 0; i < limit; i++) {
          let product = matchedProducts[i];
          let div = document.createElement("div");
          div.className = "suggestion-item";
          div.innerHTML = product.tenSP;

          div.addEventListener("click", function () {
            searchInputHeader.value = product.tenSP;
            searchSuggestions.classList.add("hidden");
            searchBasic();
          });

          searchSuggestions.appendChild(div);
        }
        searchSuggestions.classList.remove("hidden");
      } else {
        searchSuggestions.classList.add("hidden");
      }
    });

    document.addEventListener("click", function (e) {
      if (
        !searchInputHeader.contains(e.target) &&
        !searchSuggestions.contains(e.target)
      ) {
        searchSuggestions.classList.add("hidden");
      }
    });
  }
}

// --- Hàm LỌC DANH MỤC (Khi bấm chữ APPLE, SAMSUNG trên Breadcrumb) ---
function filterByCategory(category, event) {
  if (event) event.preventDefault();
  filteredProducts = [];

  if (searchInputHeader) searchInputHeader.value = "";

  if (category === "all") {
    for (let i = 0; i < allProducts.length; i++) {
      filteredProducts.push(allProducts[i]);
    }
  } else {
    for (let i = 0; i < allProducts.length; i++) {
      let product = allProducts[i];
      let tenLoai = (product.tenLoai || "").toLowerCase();

      // Kiểm tra bằng IF cơ bản
      if (
        category === "khac" &&
        tenLoai !== "apple" &&
        tenLoai !== "samsung" &&
        tenLoai !== "oppo"
      ) {
        filteredProducts.push(product);
      } else if (tenLoai === category.toLowerCase()) {
        filteredProducts.push(product);
      }
    }
  }

  updateBreadcrumbUI(category, null, false);

  currentPage = 1;
  hideDetail();
  renderProducts(currentPage);
  renderPagination();
}

// --- Hàm LỌC THEO TÊN (Khi bấm vào Menu con xổ xuống VD: iPhone 18) ---
window.filterByName = function (keyword, event) {
  if (event) event.preventDefault();

  filteredProducts = [];

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];
    let tenSP = (product.tenSP || "").toLowerCase();

    // Đổi includes thành indexOf
    if (tenSP.indexOf(keyword.toLowerCase()) >= 0) {
      filteredProducts.push(product);
    }
  }

  updateBreadcrumbUI(null, keyword, false);

  currentPage = 1;
  hideDetail();
  renderProducts(currentPage);
  renderPagination();
};
// ---------------------------------------------------------
// HÀM 5: Hiển thị giao diện Chi tiết 1 sản phẩm
// ---------------------------------------------------------
function showDetail(maSP) {
  let product = null;

  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].maSP === maSP) {
      product = allProducts[i];
      break;
    }
  }

  if (product === null) return;

  let formatPrice = Number(product.price || 0).toLocaleString("vi-VN") + " đ";
  let detailView = document.getElementById("detailView");
  if (!detailView) return;

  detailView.innerHTML = `
    <button class="back-btn" onclick="hideDetail()">Quay lại danh sách</button>
    <div class="detail-container">
      <div class="detail-image">
        <img src="${product.hinh}" alt="${product.tenSP}" onerror="this.onerror=null; this.src='assets/images/default-image.jpeg'">
      </div>
      <div class="detail-info">
        <h2>${product.tenSP}</h2>
        <p class="detail-price">${formatPrice}</p>
        <p><strong>Thương hiệu:</strong> ${(product.tenLoai || "").toUpperCase()}</p>
        <p><strong>Màu sắc:</strong> ${product.color || "Đang cập nhật"}</p>
        <p style="line-height:1.6; color:#555; white-space:pre-line;">${product.moTa || "Sản phẩm chính hãng mới 100%, bảo hành 12 tháng tại các trung tâm toàn quốc."}</p>
        <button class="add-to-cart-large" onclick="addToCart('${product.maSP}')">Thêm vào giỏ hàng</button>
      </div>
    </div>
  `;

  let mainView = document.getElementById("mainView");
  if (mainView) mainView.classList.add("hidden");
  detailView.classList.remove("hidden");
  window.scrollTo(0, 0);
}

// ---------------------------------------------------------
// HÀM 6: Nút quay lại danh sách
// ---------------------------------------------------------
function hideDetail() {
  let mainView = document.getElementById("mainView");
  let detailView = document.getElementById("detailView");

  if (mainView) mainView.classList.remove("hidden");
  if (detailView) detailView.classList.add("hidden");
}

// ---------------------------------------------------------
// HÀM 7: Quản lý Giỏ hàng & Chấm đỏ (Đồng bộ với cart.js)
// ---------------------------------------------------------
function updateCartBadge() {
  let badge = document.getElementById("cartBadge");
  if (!badge) return;

  // Chưa đăng nhập -> luôn ẩn chấm đỏ
  if (!localStorage.getItem("nguoiDungDangNhap")) {
    badge.classList.add("hidden");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalQty = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQty += cart[i].quantity || 1;
  }

  if (totalQty > 0) {
    badge.innerText = totalQty;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

function addToCart(maSP) {
  let product = allProducts.find((p) => p.maSP === maSP);
  if (!product) return;

  // Bắt buộc đăng nhập mới được thêm vào giỏ hàng
  if (!localStorage.getItem("nguoiDungDangNhap")) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    if (typeof window.openAuthModal === "function") window.openAuthModal();
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  let daCo = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === maSP) {
      cart[i].quantity = (cart[i].quantity || 1) + 1;
      daCo = true;
      break;
    }
  }

  if (!daCo) {
    cart.push({
      id: product.maSP,
      name: product.tenSP,
      price: product.price,
      image: product.hinh,
      color: product.color || "Tiêu chuẩn",
      quantity: 1,
      selected: true,
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));

  updateCartBadge();
  alert("Đã thêm " + product.tenSP + " vào giỏ hàng!");
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  renderProducts(currentPage);
  renderPagination();
});

// =========================================================
// TÌM KIẾM NÂNG CAO: Kết hợp Tên + Phân Loại + Khoảng giá
// =========================================================
let filterBtn = document.getElementById("filterBtn");
let filterDropdown = document.getElementById("filterDropdown");
let applyFilterBtn = document.getElementById("applyFilterBtn");

// 1. Tắt/Bật bảng lọc khi bấm vào icon cái Phễu
if (filterBtn && filterDropdown) {
  filterBtn.addEventListener("click", function () {
    filterDropdown.classList.toggle("hidden");

    // Nếu đang mở bảng gợi ý chữ thì ẩn nó đi
    let suggestions = document.getElementById("searchSuggestions");
    if (suggestions) suggestions.classList.add("hidden");
  });
}

// 2. Hàm chạy Lọc Nâng Cao khi bấm nút "Áp dụng lọc"
function searchAdvanced() {
  // Dùng biến trung gian để lấy giá trị an toàn, không bị lỗi khi chưa tải trang
  let searchInputObj = document.getElementById("searchInputHeader");
  let keyword = "";
  if (searchInputObj) {
    keyword = searchInputObj.value.toLowerCase().trim();
  }

  let categoryObj = document.getElementById("filterCategory");
  let selectedCategory = "all";
  if (categoryObj) {
    selectedCategory = categoryObj.value.toLowerCase();
  }

  let priceObj = document.getElementById("filterPrice");
  let selectedPrice = "all";
  if (priceObj) {
    selectedPrice = priceObj.value;
  }

  filteredProducts = []; // Xóa mảng cũ để đựng kết quả mới

  // Dùng vòng lặp for duyệt qua kho hàng
  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];

    // ĐIỀU KIỆN 1: Kiểm tra Tên sản phẩm
    let tenSP = (product.tenSP || "").toLowerCase();
    let matchName = false;
    if (keyword === "" || tenSP.indexOf(keyword) >= 0) {
      matchName = true;
    }

    // ĐIỀU KIỆN 2: Kiểm tra Hãng
    let loaiSP = (product.tenLoai || "").toLowerCase();
    let matchCategory = false;
    if (selectedCategory === "all" || loaiSP === selectedCategory) {
      matchCategory = true;
    }

    // ĐIỀU KIỆN 3: Kiểm tra Giá
    let giaSP = product.price || 0;
    let matchPrice = false;
    if (selectedPrice === "all") {
      matchPrice = true;
    } else if (selectedPrice === "under10" && giaSP < 10000000) {
      matchPrice = true;
    } else if (
      selectedPrice === "10to20" &&
      giaSP >= 10000000 &&
      giaSP <= 20000000
    ) {
      matchPrice = true;
    } else if (selectedPrice === "over20" && giaSP > 20000000) {
      matchPrice = true;
    }

    // GỘP CHUNG: Nếu 1 cái máy thỏa mãn CẢ 3 ĐIỀU KIỆN trên thì mới lấy
    if (matchName === true && matchCategory === true && matchPrice === true) {
      filteredProducts.push(product);
    }
  }

  // Đổi tiêu đề sau khi xử lý vòng lặp for (Gọi hàm updateBreadcrumbUI)
  if (keyword === "" && selectedCategory === "all" && selectedPrice === "all") {
    filterByCategory("all"); // Không lọc gì thì về trang chủ
  } else {
    updateBreadcrumbUI(null, null, true); // Gọi hàm UI, báo là đang dùng Lọc Nâng Cao

    currentPage = 1;
    hideDetail();
    renderProducts(currentPage);
    renderPagination();
  }

  // Ẩn bảng lọc
  let filterDropdownObj = document.getElementById("filterDropdown");
  if (filterDropdownObj) {
    filterDropdownObj.classList.add("hidden");
  }
}

// Bắt sự kiện click cho nút Áp dụng
if (applyFilterBtn) {
  applyFilterBtn.addEventListener("click", searchAdvanced);
}

// 3. Tự động ẩn bảng lọc nếu click ra ngoài khoảng trống
document.addEventListener("click", function (e) {
  if (filterBtn && filterDropdown) {
    if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
      filterDropdown.classList.add("hidden");
    }
  }
});
