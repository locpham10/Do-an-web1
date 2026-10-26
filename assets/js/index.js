function khoiTaoDuLieuMau() {
    // 1. Tạo loại sản phẩm mẫu nếu chưa có
    if (!localStorage.getItem("loaiSanPham")) {
        const loaiMau = [{ maLoai: "L01", tenLoai: "Điện thoại", moTa: "Danh mục gốc", trangThai: "hoatdong", hinh: "" }];
        localStorage.setItem("loaiSanPham", JSON.stringify(loaiMau));
    }

    // 2. Tạo sản phẩm mẫu nếu chưa có
    if (!localStorage.getItem("danhMucSanPham")) {
        const spMau = [
            { maSP: "SP01", maLoai: "L01", tenLoai: "Điện thoại", tenSP: "Sản phẩm mẫu 1", moTa: "Mô tả mẫu", trangThai: "hoatdong", hinh: "../assets/images/default-image.jpeg" }
        ];
        localStorage.setItem("danhMucSanPham", JSON.stringify(spMau));
    }
}

// Chạy tự động ngay khi mở web
khoiTaoDuLieuMau();
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
<<<<<<< HEAD
=======

// ======================================================================
// PHẦN HIỂN THỊ VÀ TÌM KIẾM SẢN PHẨM (DÙNG JS CƠ BẢN NHẤT)
// ======================================================================

// 1. Lấy dữ liệu từ localStorage ra và gán vào biến
let allProducts = JSON.parse(localStorage.getItem("danhMucSanPham")) || [];

// Tạo một mảng mới để chứa các sản phẩm sẽ hiển thị ra màn hình
let filteredProducts = [];
// Dùng vòng lặp for để copy toàn bộ sản phẩm từ allProducts sang filteredProducts
for (let i = 0; i < allProducts.length; i++) {
  filteredProducts.push(allProducts[i]);
}

let currentPage = 1;
let itemsPerPage = 8; // Hiện 8 sản phẩm 1 trang

// ---------------------------------------------------------
// HÀM 1: Vẽ sản phẩm ra màn hình
// ---------------------------------------------------------
function renderProducts(page) {
  let productGrid = document.getElementById("productGrid");
  if (!productGrid) return;

  productGrid.innerHTML = ""; // Xóa các sản phẩm cũ

  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let hasProduct = false;

  // Dùng vòng lặp for cơ bản duyệt qua mảng để in sản phẩm ra
  for (let i = startIndex; i < endIndex; i++) {
    if (i >= filteredProducts.length) break;

    hasProduct = true;
    let product = filteredProducts[i];
    let formatPrice = product.price.toLocaleString("vi-VN") + " đ";

    let cardHTML = `
      <div class="product-card">
        <div onclick="showDetail(${product.maSP})">
          <img src="${product.hinh}" alt="${product.tenSP}">
          <h4>${product.tenSP}</h4>
          <p class="price">${formatPrice}</p>
        </div>
        <button onclick="addToCart(${product.maSP})">Thêm vào giỏ</button>
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
// HÀM 2: Tạo các nút Phân trang (1, 2, 3...)
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
// HÀM 3: Tìm kiếm thông minh trên Header
// ---------------------------------------------------------
let searchInputHeader = document.querySelector(".search-container input");
let searchIconHeader = document.querySelector(".search-container .fa-search");

function searchBasic() {
  if (!searchInputHeader) return;
  let keyword = searchInputHeader.value.toLowerCase().trim();

  filteredProducts = [];

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];

    // Ghép tên, hãng và màu sắc thành 1 câu dài chữ thường
    let productInfo =
      product.tenSP + " " + product.tenLoai + " " + (product.color || "");
    productInfo = productInfo.toLowerCase();

    // Loại bỏ dấu cách trống trong chuỗi info để đối chiếu dễ hơn
    let compactedInfo = productInfo.replace(/\s+/g, "");

    if (
      productInfo.includes(keyword) ||
      compactedInfo.includes(keyword.replace(/\s+/g, ""))
    ) {
      filteredProducts.push(product);
    }
  }

  let titleElem = document.getElementById("categoryTitle");
  if (titleElem)
    titleElem.innerText = 'Kết quả tìm kiếm cho: "' + keyword + '"';

  currentPage = 1;
  hideDetail();
  renderProducts(currentPage);
  renderPagination();
}

if (searchIconHeader) searchIconHeader.addEventListener("click", searchBasic);
if (searchInputHeader) {
  searchInputHeader.addEventListener("keyup", function (e) {
    if (e.key === "Enter") searchBasic();
  });
}

// ---------------------------------------------------------
// HÀM 4: Lọc theo hãng khi bấm trên Menu
// ---------------------------------------------------------
function filterByCategory(category, event) {
  if (event) event.preventDefault();
  filteredProducts = [];

  if (category === "all") {
    for (let i = 0; i < allProducts.length; i++) {
      filteredProducts.push(allProducts[i]);
    }
    let titleElem = document.getElementById("categoryTitle");
    if (titleElem) titleElem.innerText = "Tất cả sản phẩm";
  } else {
    for (let i = 0; i < allProducts.length; i++) {
      let product = allProducts[i];
      if (product.tenLoai === category) {
        filteredProducts.push(product);
      }
    }
    let titleElem = document.getElementById("categoryTitle");
    if (titleElem) titleElem.innerText = "Sản phẩm " + category.toUpperCase();
  }

  currentPage = 1;
  hideDetail();
  renderProducts(currentPage);
  renderPagination();
}

// HÀM MỚI Lọc theo TÊN SẢN PHẨM (từ Submenu)
window.filterByName = function (keyword, event) {
  if (event) event.preventDefault(); // Chặn load lại trang

  filteredProducts = []; // Làm rỗng mảng kết quả

  // Dùng vòng lặp tìm các máy có tên chứa từ khóa
  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];

    // So sánh chữ thường: nếu tên máy chứa từ khóa thì đưa vào mảng
    if (product.tenSP.toLowerCase().includes(keyword.toLowerCase())) {
      filteredProducts.push(product);
    }
  }

  // Đổi tiêu đề hiển thị
  let titleElem = document.getElementById("categoryTitle");
  if (titleElem) titleElem.innerText = "Dòng máy: " + keyword;

  currentPage = 1;
  hideDetail(); // Ẩn trang chi tiết nếu đang mở
  renderProducts(currentPage); // Vẽ lại sản phẩm
  renderPagination(); // Vẽ lại phân trang
};

// ---------------------------------------------------------
// HÀM 5: Hiển thị giao diện Chi tiết 1 sản phẩm
// ---------------------------------------------------------
function showDetail(id) {
  let product = null;

  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id === id) {
      product = allProducts[i];
      break;
    }
  }

  if (product === null) return;

  let formatPrice = product.price.toLocaleString("vi-VN") + " đ";
  let detailView = document.getElementById("detailView");
  if (!detailView) return;

  detailView.innerHTML = `
    <button class="back-btn" onclick="hideDetail()">Quay lại danh sách</button>
    <div class="detail-container">
      <div class="detail-image">
        <img src="${product.hinh}" alt="${product.tenSP}">
      </div>
      <div class="detail-info">
        <h2>${product.tenSP}</h2>
        <p class="detail-price">${formatPrice}</p>
        <p><strong>Thương hiệu:</strong> ${product.tenLoai.toUpperCase()}</p>
        <p><strong>Màu sắc:</strong> ${product.color || "Đang cập nhật"}</p>
        <p style="line-height:1.6; color:#555;">Sản phẩm chính hãng mới 100%, bảo hành 12 tháng tại các trung tâm toàn quốc.</p>
        <button class="add-to-cart-large" onclick="addToCart(${product.maSP})">Thêm vào giỏ hàng</button>
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

function updateCartBadge() {
  let badge = document.getElementById("cartBadge");
  if (!badge) return;

  let cart = JSON.parse(localStorage.getItem("gioHang")) || [];
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

// Hàm thêm vào giỏ hàng thực tế
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("gioHang")) || [];
  
  let daCo = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = (cart[i].quantity || 1) + 1;
      daCo = true;
      break;
    }
  }

  if (!daCo) {
    cart.push({ id: id, quantity: 1 });
  }

  localStorage.setItem("gioHang", JSON.stringify(cart));
  
  updateCartBadge();
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Bật chấm đỏ ngay khi tải trang
document.addEventListener("DOMContentLoaded", function() {
  updateCartBadge();
});

// Khởi chạy khi load trang
renderProducts(currentPage);
renderPagination();
>>>>>>> 7496561 (Them cham do gio hang, sua cac san pham mac dinh)
