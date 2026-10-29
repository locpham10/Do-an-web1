function khoiTaoDuLieuMau() {
    // 1. Tạo loại sản phẩm mẫu
    if (!localStorage.getItem("loaiSanPham")) {
        const loaiMau = [
            { maLoai: "L01", tenLoai: "Apple", moTa: "Các điện thoại iPhone", trangThai: "hoatdong", hinh: "../Img/Apple/hangApple.png" },
            { maLoai: "L02", tenLoai: "Samsung", moTa: "Các điện thoại của hãng Samsung", trangThai: "hoatdong", hinh: "../Img/Samsung/hangSamsung.png" },
            { maLoai: "L03", tenLoai: "Oppo", moTa: "Các điện thoại của hãng OPPO", trangThai: "hoatdong", hinh: "../Img/Oppo/hangOppo.png" }
        ];
        localStorage.setItem("loaiSanPham", JSON.stringify(loaiMau));
    }

    // 2. Tạo sản phẩm mẫu
    if (!localStorage.getItem("danhMucSanPham")) {
        const spMau = [
            { maSP: "SP01", maLoai: "L01", tenLoai: "Apple", tenSP: "iPhone 15 Pro Max", price: 29990000, moTa: "Máy mới 100%", trangThai: "hoatdong", hinh: "../Img/Apple/iPhone15_den.png", color: "Titan Tự Nhiên" },
            { maSP: "SP02", maLoai: "L02", tenLoai: "Samsung", tenSP: "Galaxy S24 Ultra", price: 33990000, moTa: "Máy mới 100%", trangThai: "hoatdong", hinh: "../Img/Samsung/Samsung-galaxy-s24-ultra.png", color: "Đen Titan" },
            { maSP: "SP03", maLoai: "L03", tenLoai: "Oppo", tenSP: "OPPO Find N3", price: 24990000, moTa: "Máy mới 100%", trangThai: "hoatdong", hinh: "../Img/Oppo/Oppo-find-N3.png", color: "Vàng Đồng" },
            { maSP: "SP04", maLoai: "L04", tenLoai: "Apple", tenSP: "iPhone Duo", price: 69000000, moTa: "Máy mới 100%", trangThai: "hoatdong", hinh: "../Img/Apple/iphone_duo_night_sky.png", color: "Xanh Dương Sẫm" }
        ];
        localStorage.setItem("danhMucSanPham", JSON.stringify(spMau));
    }

    // 3. Tạo phiếu nhập mẫu (Dùng maSP, tenSP, hinh)
    if (!localStorage.getItem("saved_imports")) {
        const phieuNhapMau = [
            {
                code: "PN001",
                date: "2026-10-25",
                status: "completed",
                totalAmount: 510000000,
                items: [
                    { maSP: "SP01", tenSP: "iPhone 15 Pro Max", hinh: "../assets/images/default-image.jpeg", qty: 10, price: 25000000 },
                    { maSP: "SP02", tenSP: "Galaxy S24 Ultra", hinh: "../assets/images/default-image.jpeg", qty: 5, price: 28000000 },
                    { maSP: "SP03", tenSP: "OPPO Find N3", hinh: "../assets/images/default-image.jpeg", qty: 6, price: 20000000 }
                ]
            }
        ];
        localStorage.setItem("saved_imports", JSON.stringify(phieuNhapMau));
    }

    // 4. Tạo bảng giá bán mẫu
    if (!localStorage.getItem("saved_pricing")) {
        const giaMau = [
            { maSP: "SP01", tenSP: "iPhone 15 Pro Max", hinh: "../assets/images/default-image.jpeg", totalQty: 10, totalCost: 250000000, importPrice: 25000000, retailPrice: 29990000 },
            { maSP: "SP02", tenSP: "Galaxy S24 Ultra", hinh: "../assets/images/default-image.jpeg", totalQty: 5, totalCost: 140000000, importPrice: 28000000, retailPrice: 33990000 },
            { maSP: "SP03", tenSP: "OPPO Find N3", hinh: "../assets/images/default-image.jpeg", totalQty: 6, totalCost: 120000000, importPrice: 20000000, retailPrice: 24990000 }
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

    // Đặt sẵn Tài khoản/Mật khẩu cho đồ án (Ví dụ: admin / 123456)
    if (user === 'admin' && pass === getAdminPassword()) {
        document.getElementById('loginArea').style.display = 'none'; // Giấu form login
        document.getElementById('dashboardArea').style.display = 'flex'; // Mở dashboard

        // Lưu trạng thái đăng nhập để xài Live Server không bị out ra ngoài
        sessionStorage.setItem('isAdminLoggedIn', 'true');
    } else {
        alert('Sai tài khoản hoặc mật khẩu!\n');
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
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
}

// Hàm ĐÓNG MODAL DÙNG CHUNG (Đã hợp nhất để tránh xung đột)
function closeModal() {
    const importModal = document.getElementById('importModal');
    if (importModal) importModal.style.display = 'none';

    const pricingModal = document.getElementById('pricingModal');
    if (pricingModal) pricingModal.style.display = 'none';

    const orderModal = document.getElementById('orderModal');
    if (orderModal) orderModal.style.display = 'none';

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
        return JSON.parse(localStorage.getItem(key)) || [];
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
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .trim();
}

// Mã hóa nội dung trước khi đưa vào HTML
function anToanKH(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (c) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c];
    });
}

// Chuẩn hóa danh sách trạng thái theo mã KH
function chuanHoaDanhSachKH(key) {
    const ds = docDuLieu(key);
    const taiKhoan = docDuLieu(KEY_TAIKHOAN);
    const ketQua = [];

    ds.forEach(function (item) {
        if (typeof item === "string") {
            const tk = taiKhoan.find(function (acc) {
                return acc.maKH === item ||
                    acc.email?.toLowerCase() === item.toLowerCase() ||
                    acc.soDienThoai === item;
            });

            if (tk) ketQua.push(tk.maKH || tk.email);
        } else if (item && typeof item === "object") {
            const tk = taiKhoan.find(function (acc) {
                return (item.maKH && acc.maKH === item.maKH) ||
                    (item.email && acc.email?.toLowerCase() === item.email.toLowerCase()) ||
                    (item.soDienThoai && acc.soDienThoai === item.soDienThoai);
            });

            if (tk) ketQua.push(tk.maKH || tk.email);
        }
    });

    return [...new Set(ketQua)];
}

// Tạo mã KH cho tài khoản cũ chưa có mã
function capNhatMaKH() {
    let taiKhoan = docDuLieu(KEY_TAIKHOAN);
    let so = 1;

    taiKhoan.forEach(function (tk) {
        if (!tk.maKH) {
            let ma;

            do {
                ma = "KH" + String(so).padStart(3, "0");
                so++;
            } while (taiKhoan.some(function (acc) {
                return acc.maKH === ma;
            }));

            tk.maKH = ma;
        }
    });

    luuDuLieu(KEY_TAIKHOAN, taiKhoan);
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

        ds = ds.filter(function (item) {
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
            tk.email
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
            <td colspan="5">Không có khách hàng phù hợp.</td>
        </tr>
    `;

    const emptyCheckbox = `
        <tr>
            <td colspan="6">Không có khách hàng phù hợp.</td>
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
                    ${sp.hinh ? `<img src="${sp.hinh}" alt="Ảnh SP" class="product-thumbnail">` : `<img src="../assets/images/default-image.jpeg" alt="Mặc định" class="product-thumbnail">`}
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
let editIndex = null;
let currentImageBase64 = "";

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
    importList.forEach(ticket => {
        if (Array.isArray(ticket.items)) {
            ticket.items.forEach(item => {
                if (item.name) productCatalog.add(item.name);
            });
        }
    });

    renderTable();
}

// 3. LOGIC GIAO DIỆN VÀ MODAL
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
                <td style="text-align: center;"><img src="${hinhHienThi}" class="product-thumb" alt="Ảnh"></td>
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

            const matchSearch = codeText.includes(searchFilter);

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

// 5. GẮN SỰ KIỆN CHO MODAL NHẬP HÀNG
// 5. GẮN SỰ KIỆN CHO MODAL NHẬP HÀNG
function initImportEvents() {

    const itemProduct = document.getElementById('itemProduct');
    const productSuggestions = document.getElementById('productSuggestions');

    if (itemProduct && productSuggestions) {
        // Chỉ chạy khi người dùng bắt đầu gõ phím vào ô
        itemProduct.addEventListener('input', function () {
            const keyword = this.value.trim().toLowerCase();
            productSuggestions.innerHTML = '';

            // Nếu chưa gõ gì (hoặc xóa hết chữ) thì ẩn ngay danh sách
            if (!keyword) {
                productSuggestions.style.display = 'none';
                return;
            }

            const matches = Array.from(productCatalog).filter(name =>
                name.toLowerCase().includes(keyword)
            );

            if (matches.length > 0) {
                matches.forEach(match => {
                    const li = document.createElement('li');
                    li.textContent = match;
                    li.onclick = () => {
                        itemProduct.value = match;
                        productSuggestions.style.display = 'none';
                        document.getElementById('itemQuantity').focus();
                    };
                    productSuggestions.appendChild(li);
                });
                productSuggestions.style.display = 'block';
            } else {
                productSuggestions.style.display = 'none';
            }
        });

        // Ẩn danh sách khi click chuột ra ngoài
        document.addEventListener('click', e => {
            if (e.target !== itemProduct && !productSuggestions.contains(e.target)) {
                productSuggestions.style.display = 'none';
            }
        });
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
function loadDataForPricing() {
    pendingTicketsCount = 0;
    const DEFAULT_IMG = '../assets/images/default-image.jpeg';

    // 1. Đọc danh mục sản phẩm, phiếu nhập, bảng giá đã lưu
    let catalog = [], importList = [], savedPricingList = [];
    try { catalog = JSON.parse(localStorage.getItem('danhMucSanPham') || '[]'); } catch (e) { console.error("Lỗi JSON Sản phẩm"); }
    try { importList = JSON.parse(localStorage.getItem('saved_imports') || '[]'); } catch (e) { console.error("Lỗi JSON Nhập hàng"); }
    try { savedPricingList = JSON.parse(localStorage.getItem('saved_pricing') || '[]'); } catch (e) { console.error("Lỗi JSON Giá bán"); }

    // 2. Khởi tạo từ TOÀN BỘ sản phẩm trong danh mục (kể cả chưa nhập hàng)
    let productMap = {};
    const keyByName = {};
    catalog.forEach(sp => {
        productMap[sp.maSP] = {
            maSP: sp.maSP, tenSP: sp.tenSP, code: sp.maSP, name: sp.tenSP,
            image: sp.hinh || DEFAULT_IMG,
            totalQty: 0, totalCost: 0, importPrice: 0,
            retailPrice: 0,
            catalogPrice: Number(sp.price) || 0
        };
        keyByName[sp.tenSP] = sp.maSP;
    });

    // 3. Cộng dồn số lượng / giá vốn từ các phiếu nhập đã hoàn thành
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
                    image: item.hinh || item.image || DEFAULT_IMG,
                    totalQty: 0, totalCost: 0, importPrice: 0, retailPrice: 0, catalogPrice: 0
                };
            }
            productMap[key].totalQty += item.qty;
            productMap[key].totalCost += (item.qty * item.price);
        });
    });

    // 4. Tính giá nhập bình quân + gắn giá bán đã lưu
    pricingList = Object.values(productMap).map((prod, index) => {
        prod.importPrice = prod.totalQty > 0 ? Math.round(prod.totalCost / prod.totalQty) : 0;
        if (!prod.code) prod.code = "SP" + String(index + 1).padStart(2, '0');
        prod.maSP = prod.code;

        const saved = savedPricingList.find(p =>
            (p.maSP || p.code) === prod.code || (p.tenSP || p.name) === prod.tenSP);
        if (saved && saved.retailPrice > 0) prod.retailPrice = saved.retailPrice;
        else if (prod.catalogPrice > 0) prod.retailPrice = prod.catalogPrice;
        return prod;
    })
    // CHỈ hiển thị sản phẩm đã có nhập hàng (phiếu đã hoàn thành, số lượng > 0)
    .filter(prod => prod.totalQty > 0);

    renderPricingTable();
}

/* --- 2. VẼ BẢNG GIÁ BÁN TỰ ĐỘNG CẬP NHẬT MÀU SẮC --- */
function renderPricingTable() {
    const tbody = document.getElementById('pricingTableBody');
    if (!tbody) return;

    // HIỂN THỊ CẢNH BÁO THÔNG MINH NẾU BẢNG TRỐNG
    if (pricingList.length === 0) {
        if (pendingTicketsCount > 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 50px; color: #dc3545;">
                <h3 style="margin-bottom:10px;">⚠️ Dữ liệu đang bị kẹt!</h3>
                Bạn đang có <b>${pendingTicketsCount} phiếu Nhập hàng</b> ở trạng thái "Lưu tạm".<br>
                Hãy quay lại trang Nhập hàng, sửa phiếu và bấm <b>Hoàn thành</b> thì sản phẩm mới được chuyển sang đây!
            </td></tr>`;
        } else {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 50px; color: #888;">
                Chưa có sản phẩm nào trong kho để thiết lập giá.<br>Vui lòng sang trang Nhập hàng, tạo phiếu và bấm <b>Hoàn thành</b>.
            </td></tr>`;
        }
        return;
    }

    // VẼ DANH SÁCH SẢN PHẨM (Kèm logic Đổi màu tự động)
    tbody.innerHTML = pricingList.map(prod => {
        const hasRetailPrice = prod.retailPrice > 0;
        const hasImport = prod.importPrice > 0;
        const margin = (hasRetailPrice && hasImport) ? Math.round(((prod.retailPrice - prod.importPrice) / prod.importPrice) * 100) : 0;

        let retailPriceHtml, badgeHtml;
        const btnText = hasRetailPrice ? "Cập nhật giá" : "Thiết lập giá";

        if (hasRetailPrice && !hasImport) {
            retailPriceHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
            badgeHtml = `<span class="badge badge-pending" style="background: #e9ecef; color: #6c757d;">--</span>`;
        } else if (hasRetailPrice) {
            if (margin > 0) {
                retailPriceHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
                badgeHtml = `<span class="badge badge-completed">+${margin}%</span>`;
            } else if (margin < 0) {
                retailPriceHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
                badgeHtml = `<span class="badge badge-loss">${margin}%</span>`;
            } else {
                retailPriceHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
                badgeHtml = `<span class="badge badge-pending">0%</span>`;
            }
        } else {
            retailPriceHtml = `<span style="font-weight: bold; color: #dc3545;">Chưa thiết lập</span>`;
            badgeHtml = `<span class="badge badge-pending" style="background: #e9ecef; color: #6c757d;">--</span>`;
        }

        const safeName = prod.name.replace(/'/g, "\\'");

        return `
            <tr>
                <td><strong>${prod.code}</strong></td>
                <td><img src="${prod.image}" width="40" height="40" style="border-radius: 4px; object-fit: cover; border: 1px solid #ddd;"></td>
                <td>${prod.name}</td>
                <td style="text-align: right; color: #6c757d;">${hasImport ? formatMoney(prod.importPrice) : '<i>Chưa nhập hàng</i>'}</td>
                <td style="text-align: right;">${retailPriceHtml}</td>
                <td style="text-align: center;">${badgeHtml}</td>
                <td style="text-align: center;">
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

    const prodIndex = pricingList.findIndex(p => p.code === currentProductCode);
    if (prodIndex > -1) {
        pricingList[prodIndex].retailPrice = retailPrice;

        // Gộp vào bảng giá đã lưu (không ghi đè giá của các SP chưa hiện trong bảng)
        let savedAll = [];
        try { savedAll = JSON.parse(localStorage.getItem('saved_pricing') || '[]'); } catch (e) { savedAll = []; }
        const cur = pricingList[prodIndex];
        const sIdx = savedAll.findIndex(p => (p.maSP || p.code) === cur.code || (p.tenSP || p.name) === cur.tenSP);
        if (sIdx > -1) savedAll[sIdx] = Object.assign({}, savedAll[sIdx], cur);
        else savedAll.push(cur);
        localStorage.setItem('saved_pricing', JSON.stringify(savedAll));

        // Đồng bộ giá bán sang danh mục sản phẩm (để tab Sản phẩm / trang bán hàng đọc được)
        try {
            const dm = JSON.parse(localStorage.getItem('danhMucSanPham') || '[]');
            dm.forEach(sp => { if (sp.maSP === currentProductCode) sp.price = retailPrice; });
            localStorage.setItem('danhMucSanPham', JSON.stringify(dm));
        } catch (e) { console.error("Lỗi đồng bộ giá", e); }
    }

    closeModal();
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
                    <button class="btn-action btn-view-detail" onclick="openOrderModal('${order.id}')">Chi tiết / Duyệt</button>
                </td>
            </tr>`;
    }).join('');
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
    document.getElementById('modalOrderStatusUpdate').value = order.status;

    const detailBody = document.getElementById('orderDetailBody');
    detailBody.innerHTML = order.items.map((item, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td><strong>${item.name}</strong></td>
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

    if (orderIndex > -1) {

        orderList[orderIndex].status = newStatus;
        localStorage.setItem('saved_orders', JSON.stringify(orderList));

        closeModal();

        renderOrderTable();

        applyOrderFilters();

    }
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
let savedProducts = []; // Lấy từ Tab 4 để biết Sản phẩm thuộc Loại nào

function loadDataForInventory() {
    const storedImports = localStorage.getItem('saved_imports');
    const storedOrders = localStorage.getItem('saved_orders');
    const storedProducts = localStorage.getItem('danhMucSanPham');

    rawImports = storedImports ? JSON.parse(storedImports) : [];
    rawOrders = storedOrders ? JSON.parse(storedOrders) : [];
    savedProducts = storedProducts ? JSON.parse(storedProducts) : [];

    // Gom nhóm theo tenLoai (tiếng Việt)
    const categorySet = new Set();
    savedProducts.forEach(sp => { if (sp.tenLoai) categorySet.add(sp.tenLoai); });

    const catFilterEl = document.getElementById('invCategoryFilter');
    if (catFilterEl) {
        catFilterEl.innerHTML = '<option value="ALL">-- Tất cả loại --</option>' +
            Array.from(categorySet).map(loai => `<option value="${loai}">${loai}</option>`).join('');
    }

    applyInventoryFilters();
}

function applyInventoryFilters() {
    const fromDateStr = document.getElementById('invFromDate').value;
    const toDateStr = document.getElementById('invToDate').value;
    const catFilter = document.getElementById('invCategoryFilter').value;
    const searchKeyword = document.getElementById('inventorySearchInput').value.trim().toLowerCase();

    const fromTime = fromDateStr ? new Date(fromDateStr).setHours(0, 0, 0, 0) : 0;
    const toTime = toDateStr ? new Date(toDateStr).setHours(23, 59, 59, 999) : new Date("2100-01-01").getTime();
    const DEFAULT_IMG = '../assets/images/default-image.jpeg';

    let inventoryMap = {};
    const keyByName = {};
    const newRow = (code, name, image, category, inCatalog) => ({
        code: code, name: name, image: image || DEFAULT_IMG, category: category,
        inCatalog: inCatalog, importPrice: 0, totalCost: 0, totalImportedQty: 0,
        importedInRange: 0, soldInRange: 0, currentStock: 0
    });

    // BƯỚC 1: Khởi tạo từ danh mục sản phẩm (khóa theo mã SP)
    savedProducts.forEach(sp => {
        inventoryMap[sp.maSP] = newRow(sp.maSP, sp.tenSP, sp.hinh, sp.tenLoai || 'Chưa phân loại', true);
        keyByName[sp.tenSP] = sp.maSP;
    });

    // Hàm tìm đúng dòng của 1 mặt hàng trong phiếu (ưu tiên mã SP, sau đó theo tên)
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

    // BƯỚC 2: QUÉT HÀNG NHẬP (chỉ phiếu đã hoàn thành)
    let pendingCount = 0;
    rawImports.forEach(ticket => {
        if (ticket.status !== 'completed') { pendingCount++; return; }
        const ticketTime = new Date(ticket.date).setHours(12, 0, 0, 0);
        if (ticketTime > toTime || !Array.isArray(ticket.items)) return;

        ticket.items.forEach(item => {
            const row = getRow(item, true);
            if (!row) return;
            const qty = Number(item.qty) || 0;
            const price = Number(item.price) || 0;
            row.currentStock += qty;
            row.totalImportedQty += qty;
            row.totalCost += qty * price;
            if (ticketTime >= fromTime) row.importedInRange += qty;
        });
    });

    Object.values(inventoryMap).forEach(prod => {
        prod.importPrice = prod.totalImportedQty > 0 ? Math.round(prod.totalCost / prod.totalImportedQty) : 0;
    });

    // BƯỚC 3: QUÉT HÀNG XUẤT (ĐƠN HÀNG)
    rawOrders.forEach(order => {
        if (order.status !== 'processed' && order.status !== 'completed') return;
        const orderTime = new Date(order.date).setHours(12, 0, 0, 0);
        if (orderTime > toTime || !Array.isArray(order.items)) return;

        order.items.forEach(item => {
            const row = getRow(item, false);
            if (!row) return;
            const qty = Number(item.qty) || 0;
            row.currentStock -= qty;
            if (orderTime >= fromTime) row.soldInRange += qty;
        });
    });

    // BƯỚC 4: LỌC DỮ LIỆU ĐỂ HIỂN THỊ
    let finalData = Object.values(inventoryMap).filter(item => {
        if (catFilter !== 'ALL' && item.category !== catFilter) return false;
        if (searchKeyword && !String(item.name).toLowerCase().includes(searchKeyword) && !String(item.code).toLowerCase().includes(searchKeyword)) return false;
        // Chỉ ẩn mặt hàng "rác" nằm ngoài danh mục; sản phẩm trong danh mục luôn hiển thị (kể cả tồn = 0)
        if (!item.inCatalog && item.currentStock === 0 && item.importedInRange === 0 && item.soldInRange === 0) return false;
        return true;
    });

    let totalItems = 0;
    let totalValue = 0;
    let lowStockCount = 0;

    finalData.forEach(prod => {
        if (prod.currentStock > 0) {
            totalItems += prod.currentStock;
            totalValue += (prod.currentStock * prod.importPrice);
        }
        if (prod.currentStock > 0 && prod.currentStock < 5) {
            lowStockCount++;
        }
    });

    updateInventoryDashboard(totalItems, totalValue, lowStockCount);
    renderInventoryTable(finalData);
    showInventoryPendingNote(pendingCount);
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

// HÀM VẼ GIAO DIỆN BẢNG
function renderInventoryTable(data) {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: #6c757d;">Không tìm thấy sản phẩm nào phù hợp!</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(item => `
        <tr>
            <td style="text-align: center;"><strong>${item.code}</strong></td>
            <td style="text-align: center;">
                <img src="${item.image}" alt="Ảnh SP" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc;">
            </td>
            <td><strong>${item.name}</strong></td>
            <td style="text-align: center;"><span class="badge" style="background:#e9ecef; color:#333;">${item.category}</span></td>
            
            <td style="text-align: center; font-size: 16px; font-weight: bold;">+ ${item.importedInRange}</td>
            <td style="text-align: center; font-size: 16px; font-weight: bold;">- ${item.soldInRange}</td>
            <td style="text-align: center; font-size: 18px; font-weight: 900;">= ${item.currentStock}</td>
        </tr>
    `).join('');
}

function updateInventoryDashboard(totalItems, totalValue, lowStockCount) {
    const elQty = document.getElementById('invTotalQty');
    const elValue = document.getElementById('invTotalValue');
    const elAlert = document.getElementById('invLowStockAlert');

    if (elQty) elQty.innerText = new Intl.NumberFormat('vi-VN').format(totalItems);
    if (elValue) elValue.innerText = formatMoney(totalValue);
    if (elAlert) elAlert.innerText = lowStockCount;
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
    if (typeof initImportEvents === "function") initImportEvents();
    if (typeof loadDataForPricing === "function") loadDataForPricing();
    if (typeof loadDataForOrders === "function") loadDataForOrders();
    if (typeof loadDataForInventory === "function") loadDataForInventory();

    const defaultMenu = document.getElementById("menu-customers");
    if (defaultMenu) {
        defaultMenu.click();
    }

});