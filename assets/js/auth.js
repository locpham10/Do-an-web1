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

// HIỂN THỊ ĐĂNG NHẬP
function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  forgotForm.classList.add("hidden");

  loginTab.classList.add("active");
  registerTab.classList.remove("active");
}

// HIỂN THỊ ĐĂNG KÝ
function showRegister() {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  forgotForm.classList.add("hidden");

  loginTab.classList.remove("active");
  registerTab.classList.add("active");
}

// HIỂN THỊ QUÊN MẬT KHẨU
function showForgot() {
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  forgotForm.classList.remove("hidden");

  loginTab.classList.remove("active");
  registerTab.classList.remove("active");
}

// CHUYỂN FORM
loginTab.addEventListener("click", showLogin);
registerTab.addEventListener("click", showRegister);
document.getElementById("goRegister").addEventListener("click", showRegister);
document.getElementById("goLogin").addEventListener("click", showLogin);
forgotPassword.addEventListener("click", showForgot);
backToLogin.addEventListener("click", showLogin);

// ĐĂNG KÝ
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

// ĐĂNG NHẬP (KIỂM TRA KHÓA THEO ID: ngunghoatdong)
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taiKhoanNhap = loginAccount.value.trim();
  const matKhauNhap = loginPassword.value;

  const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];

  // Tìm tài khoản theo email hoặc số điện thoại, đúng mật khẩu
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

  // Lấy danh sách tài khoản ngừng hoạt động từ localStorage với key 'ngunghoatdong'
  const danhSachNgungHoatDong =
    JSON.parse(localStorage.getItem("ngunghoatdong")) || [];

  // Kiểm tra tài khoản có nằm trong danh sách ngunghoatdong hay không
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

  // Nếu tài khoản đã bị ngừng hoạt động, chặn đăng nhập
  if (isLocked) {
    alert(
      "Tài khoản của bạn đã bị ngừng hoạt động bởi quản trị viên! Không thể đăng nhập.",
    );
    return;
  }

  // Đăng nhập thành công
  localStorage.setItem("nguoiDungDangNhap", JSON.stringify(nguoiDung));
  alert("Đăng nhập thành công!");
  loginForm.reset();
  window.location.href = "index.html";
});

// QUÊN MẬT KHẨU
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

  // Kiểm tra nếu tài khoản đang bị ngừng hoạt động thì không cho đổi mật khẩu
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
