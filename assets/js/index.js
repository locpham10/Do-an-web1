let slideIndex = 1;

// Gọi hàm để hiển thị slide đầu tiên khi vừa tải trang
showSlides(slideIndex);

// Hàm xử lý khi bấm nút Next (Phải) hoặc Prev (Trái)
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Hàm xử lý khi bấm vào các dấu chấm tròn bên dưới
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Hàm chính xử lý logic ẩn/hiện ảnh
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");

  // Nếu vuốt quá ảnh cuối cùng -> quay lại ảnh số 1
  if (n > slides.length) {
    slideIndex = 1;
  }

  // Nếu vuốt ngược qua ảnh số 1 -> đi tới ảnh cuối cùng
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Vòng lặp ẩn tất cả các ảnh đi
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Vòng lặp xóa trạng thái "active" (màu trắng sáng) của tất cả dấu chấm
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Hiển thị ảnh hiện tại và bật sáng dấu chấm tương ứng
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
  // ==================== CÁC PHẦN TỬ MODAL & USER ====================
  const authModal = document.getElementById("authModal");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const userBtn = document.getElementById("userBtn");
  const cartBtn = document.getElementById("cartBtn");
  const userItem = document.querySelector(".user-item");
  const logoutBtn = document.getElementById("logoutBtn");

  // ==================== KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP ====================
  function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (user) {
      // Đã đăng nhập: Thêm class .logged-in để rê chuột vào hiện 2 dòng
      userItem.classList.add("logged-in");
    } else {
      // Chưa đăng nhập: Gỡ class, rê chuột vào KHÔNG hiện dòng nào
      userItem.classList.remove("logged-in");
    }
  }

  checkLoginStatus();

  // Bật/tắt popup
  function openModal() {
    authModal.classList.remove("hidden");
    showLogin();
  }

  function closeModal() {
    authModal.classList.add("hidden");
  }

  if (closeAuthModal) closeAuthModal.addEventListener("click", closeModal);
  window.addEventListener("click", function (e) {
    if (e.target === authModal) {
      closeModal();
    }
  });

  // ==================== CÁC SỰ KIỆN CLICK ====================
  // Bấm vào icon tài khoản: nếu chưa đăng nhập thì bật form đăng nhập/đăng ký
  userBtn.addEventListener("click", function (e) {
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (!user) {
      openModal();
    }
  });

  // Bấm vào giỏ hàng: nếu chưa đăng nhập thì không vào được và hiện form đăng nhập
  cartBtn.addEventListener("click", function (e) {
    const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (!user) {
      alert("Vui lòng đăng nhập để xem giỏ hàng!");
      openModal();
    } else {
      window.location.href = "cart.html";
    }
  });

  // Bấm Đăng xuất: xóa trạng thái và vẫn ở trang index.html
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("nguoiDungDangNhap");
      alert("Đăng xuất thành công!");
      checkLoginStatus();
    });
  }

  // ==================== TOÀN BỘ LOGIC CỦA AUTH.JS ====================
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

  // ĐĂNG NHẬP
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

    // Kiểm tra tài khoản trong danh sách ngunghoatdong
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

    // Đăng nhập thành công
    localStorage.setItem("nguoiDungDangNhap", JSON.stringify(nguoiDung));
    alert("Đăng nhập thành công!");
    loginForm.reset();
    closeModal();
    checkLoginStatus(); // Cập nhật lại trạng thái giao diện ngay tại index
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
