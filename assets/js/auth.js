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

const forgotEmail = document.getElementById("forgotEmail");
const forgotPhone = document.getElementById("forgotPhone");
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");

const forgotPassword = document.getElementById("forgotPassword");
const backToLogin = document.getElementById("backToLogin");

// =====================================================================
// HÀM HIỆN / XÓA LỖI DƯỚI Ô NHẬP
// =====================================================================
function clearError(input) {
    input.classList.remove("input-error");
    const next = input.nextElementSibling;
    if (next && next.classList.contains("field-error")) next.remove();
}

function showError(input, message) {
    clearError(input);
    input.classList.add("input-error");
    const err = document.createElement("small");
    err.className = "field-error";
    err.textContent = message;
    input.insertAdjacentElement("afterend", err);
}

function clearAllErrors(form) {
    if (!form) return;
    form.querySelectorAll("input").forEach(clearError);
}

// Gõ lại vào ô nào thì lỗi của ô đó tự biến mất
[loginForm, registerForm, forgotForm].forEach(function (form) {
    if (!form) return;
    form.noValidate = true; // tắt bong bóng cảnh báo mặc định của trình duyệt
    form.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("input", function () {
            clearError(input);
        });
    });
});

// Kiểm tra tài khoản có nằm trong danh sách (khóa / đã xóa) không
function namTrongDanhSach(key, nguoiDung) {
    const ds = JSON.parse(localStorage.getItem(key)) || [];
    return ds.some(function (item) {
        if (typeof item === "string") {
            return (
                item.toLowerCase() === nguoiDung.email.toLowerCase() ||
                item === nguoiDung.soDienThoai
            );
        } else if (typeof item === "object" && item !== null) {
            return (
                (item.email && item.email.toLowerCase() === nguoiDung.email.toLowerCase()) ||
                (item.soDienThoai && item.soDienThoai === nguoiDung.soDienThoai)
            );
        }
        return false;
    });
}

const REGEX_SDT = /^0[0-9]{9}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =====================================================================
// CHUYỂN FORM
// =====================================================================
function showLogin() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    forgotForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    clearAllErrors(loginForm);
    clearAllErrors(registerForm);
    clearAllErrors(forgotForm);
}

function showRegister() {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    forgotForm.classList.add("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.add("active");

    clearAllErrors(loginForm);
    clearAllErrors(registerForm);
    clearAllErrors(forgotForm);
}

function showForgot() {
    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");
    forgotForm.classList.remove("hidden");

    loginTab.classList.remove("active");
    registerTab.classList.remove("active");

    clearAllErrors(loginForm);
    clearAllErrors(registerForm);
    clearAllErrors(forgotForm);
}

if (loginTab) loginTab.addEventListener("click", showLogin);
if (registerTab) registerTab.addEventListener("click", showRegister);
if (document.getElementById("goRegister")) document.getElementById("goRegister").addEventListener("click", showRegister);
if (document.getElementById("goLogin")) document.getElementById("goLogin").addEventListener("click", showLogin);
if (forgotPassword) forgotPassword.addEventListener("click", showForgot);
if (backToLogin) backToLogin.addEventListener("click", showLogin);

// =====================================================================
// ĐĂNG KÝ
// =====================================================================
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors(registerForm);

        const hoTen = registerName.value.trim();
        const soDienThoai = registerPhone.value.trim();
        const email = registerEmail.value.trim().toLowerCase();
        const matKhau = registerPassword.value;
        const xacNhanMatKhau = confirmPassword.value;

        let coLoi = false;
        let oDauTien = null;
        function loi(input, msg) {
            showError(input, msg);
            coLoi = true;
            if (!oDauTien) oDauTien = input;
        }

        if (!hoTen) loi(registerName, "Vui lòng nhập họ và tên!");

        if (!soDienThoai) loi(registerPhone, "Vui lòng nhập số điện thoại!");
        else if (!REGEX_SDT.test(soDienThoai))
            loi(registerPhone, "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0!");

        if (!email) loi(registerEmail, "Vui lòng nhập email!");
        else if (!REGEX_EMAIL.test(email)) loi(registerEmail, "Email không đúng định dạng!");

        if (!matKhau) loi(registerPassword, "Vui lòng nhập mật khẩu!");
        else if (matKhau.length < 6) loi(registerPassword, "Mật khẩu phải có ít nhất 6 ký tự!");

        if (!xacNhanMatKhau) loi(confirmPassword, "Vui lòng nhập lại mật khẩu!");
        else if (matKhau !== xacNhanMatKhau) loi(confirmPassword, "Mật khẩu xác nhận không trùng khớp!");

        // Kiểm tra trùng email / SĐT (chỉ khi 2 ô này đã hợp lệ)
        let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];
        if (!registerPhone.classList.contains("input-error") &&
            taiKhoan.some(a => a.soDienThoai === soDienThoai)) {
            loi(registerPhone, "Số điện thoại này đã được đăng ký!");
        }
        if (!registerEmail.classList.contains("input-error") &&
            taiKhoan.some(a => a.email.toLowerCase() === email)) {
            loi(registerEmail, "Email này đã được đăng ký!");
        }

        if (coLoi) {
            oDauTien.focus();
            return;
        }

        taiKhoan.push({
            hoTen: hoTen,
            soDienThoai: soDienThoai,
            email: email,
            matKhau: matKhau
        });
        localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));

        alert("Đăng ký thành công!");
        registerForm.reset();
        showLogin();
    });
}

// =====================================================================
// ĐĂNG NHẬP
// =====================================================================
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors(loginForm);

        const taiKhoanNhap = loginAccount.value.trim();
        const matKhauNhap = loginPassword.value;

        let coLoi = false;
        if (!taiKhoanNhap) {
            showError(loginAccount, "Vui lòng nhập số điện thoại hoặc email!");
            coLoi = true;
        }
        if (!matKhauNhap) {
            showError(loginPassword, "Vui lòng nhập mật khẩu!");
            coLoi = true;
        }
        if (coLoi) return;

        const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];

        // Tìm theo email / SĐT trước để biết sai ở ô nào
        const nguoiDungTheoTK = taiKhoan.find(function (account) {
            return (
                account.email.toLowerCase() === taiKhoanNhap.toLowerCase() ||
                account.soDienThoai === taiKhoanNhap
            );
        });

        if (!nguoiDungTheoTK) {
            showError(loginAccount, "Tài khoản không tồn tại!");
            loginAccount.focus();
            return;
        }

        if (nguoiDungTheoTK.matKhau !== matKhauNhap) {
            showError(loginPassword, "Mật khẩu không chính xác!");
            loginPassword.focus();
            return;
        }

        const nguoiDung = nguoiDungTheoTK;

        // Tài khoản đã xóa
        if (namTrongDanhSach("daXoa", nguoiDung) || nguoiDung.trangThai === "daXoa") {
            showError(loginAccount, "Tài khoản này đã bị xóa vĩnh viễn, không thể đăng nhập!");
            return;
        }

        // Tài khoản bị khóa
        if (namTrongDanhSach("ngunghoatdong", nguoiDung)) {
            showError(loginAccount, "Tài khoản đã bị ngừng hoạt động bởi quản trị viên!");
            return;
        }

        // Đăng nhập thành công
        localStorage.setItem("nguoiDungDangNhap", JSON.stringify(nguoiDung));
        alert("Đăng nhập thành công!");
        loginForm.reset();

        const authModal = document.getElementById("authModal");
        if (authModal) {
            authModal.classList.add("hidden");
            if (typeof checkLoginStatus === "function") checkLoginStatus();
            if (typeof updateCartBadge === "function") updateCartBadge();
        } else {
            window.location.href = "index.html";
        }
    });
}

// =====================================================================
// QUÊN MẬT KHẨU
// =====================================================================
if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors(forgotForm);

        const email = forgotEmail.value.trim().toLowerCase();
        const soDienThoai = forgotPhone.value.trim();
        const matKhauMoi = newPassword.value;
        const xacNhanMatKhau = confirmNewPassword.value;

        let coLoi = false;
        let oDauTien = null;
        function loi(input, msg) {
            showError(input, msg);
            coLoi = true;
            if (!oDauTien) oDauTien = input;
        }

        if (!email) loi(forgotEmail, "Vui lòng nhập email!");
        else if (!REGEX_EMAIL.test(email)) loi(forgotEmail, "Email không đúng định dạng!");

        if (!soDienThoai) loi(forgotPhone, "Vui lòng nhập số điện thoại!");
        else if (!REGEX_SDT.test(soDienThoai))
            loi(forgotPhone, "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0!");

        if (!matKhauMoi) loi(newPassword, "Vui lòng nhập mật khẩu mới!");
        else if (matKhauMoi.length < 6) loi(newPassword, "Mật khẩu phải có ít nhất 6 ký tự!");

        if (!xacNhanMatKhau) loi(confirmNewPassword, "Vui lòng nhập lại mật khẩu mới!");
        else if (matKhauMoi !== xacNhanMatKhau)
            loi(confirmNewPassword, "Mật khẩu xác nhận không trùng khớp!");

        if (coLoi) {
            oDauTien.focus();
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
            loi(forgotEmail, "Email hoặc số điện thoại không đúng!");
            forgotEmail.focus();
            return;
        }

        if (namTrongDanhSach("daXoa", nguoiDung) || nguoiDung.trangThai === "daXoa") {
            showError(forgotEmail, "Tài khoản này đã bị xóa vĩnh viễn, không thể đổi mật khẩu!");
            return;
        }

        if (namTrongDanhSach("ngunghoatdong", nguoiDung)) {
            showError(forgotEmail, "Tài khoản đã bị ngừng hoạt động, không thể thực hiện thao tác này!");
            return;
        }

        nguoiDung.matKhau = matKhauMoi;
        localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));

        alert("Đổi mật khẩu thành công!");
        forgotForm.reset();
        showLogin();
    });
}