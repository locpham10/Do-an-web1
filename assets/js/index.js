function khoiTaoDuLieuMau() {
  // 1. Tạo loại sản phẩm mẫu nếu chưa có
  if (!localStorage.getItem("loaiSanPham")) {
    const loaiMau = [
      { maLoai: "L01", tenLoai: "apple", moTa: "Điện thoại iPhone", trangThai: "hoatdong", hinh: "" },
      { maLoai: "L02", tenLoai: "samsung", moTa: "Điện thoại Samsung", trangThai: "hoatdong", hinh: "" },
      { maLoai: "L03", tenLoai: "oppo", moTa: "Điện thoại OPPO", trangThai: "hoatdong", hinh: "" }
    ];
    localStorage.setItem("loaiSanPham", JSON.stringify(loaiMau));
  }

  // 2. Tạo sản phẩm mẫu nếu chưa có
  if (!localStorage.getItem("danhMucSanPham")) {
    const spMau = [
      { maSP: "SP01", maLoai: "L01", tenLoai: "apple", tenSP: "iPhone 15 Pro Max", price: 29990000, moTa: "Máy mới 100%", trangThai: "hoatdong", hinh: "assets/images/default-image.jpeg", color: "Titan Tự Nhiên" },
      { maSP: "SP02", maLoai: "L02", tenLoai: "samsung", tenSP: "Galaxy S24 Ultra", price: 33990000, moTa: "Máy mới 100%", trangThai: "hoatdong", hinh: "assets/images/default-image.jpeg", color: "Đen Titan" },
      { maSP: "SP03", maLoai: "L03", tenLoai: "oppo", tenSP: "OPPO Find N3", price: 24990000, moTa: "Máy mới 100%", trangThai: "hoatdong", hinh: "assets/images/default-image.jpeg", color: "Vàng Đồng" }
    ];
    localStorage.setItem("danhMucSanPham", JSON.stringify(spMau));
  }

  // 3. Tạo phiếu nhập mẫu (Để đồng bộ với Admin Nhập hàng & Tồn kho)
  if (!localStorage.getItem("saved_imports")) {
    const phieuNhapMau = [
      {
        code: "PN001",
        date: "2026-10-25",
        status: "completed",
        totalAmount: 520000000,
        items: [
          { code: "SP01", name: "iPhone 15 Pro Max", image: "../assets/images/default-image.jpeg", qty: 10, price: 25000000 },
          { code: "SP02", name: "Galaxy S24 Ultra", image: "../assets/images/default-image.jpeg", qty: 5, price: 28000000 },
          { code: "SP03", name: "OPPO Find N3", image: "../assets/images/default-image.jpeg", qty: 6, price: 20000000 }
        ]
      }
    ];
    localStorage.setItem("saved_imports", JSON.stringify(phieuNhapMau));
  }

  // 4. Tạo bảng giá bán mẫu (ĐỂ TRANG CHỦ CÓ GIÁ BÁN HIỂN THỊ NGAY)
  if (!localStorage.getItem("saved_pricing")) {
    const giaMau = [
      { code: "SP001", name: "iPhone 15 Pro Max", image: "../assets/images/default-image.jpeg", totalQty: 10, totalCost: 250000000, importPrice: 25000000, retailPrice: 29990000 },
      { code: "SP002", name: "Galaxy S24 Ultra", image: "../assets/images/default-image.jpeg", totalQty: 5, totalCost: 140000000, importPrice: 28000000, retailPrice: 33990000 },
      { code: "SP003", name: "OPPO Find N3", image: "../assets/images/default-image.jpeg", totalQty: 6, totalCost: 120000000, importPrice: 20000000, retailPrice: 24990000 }
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

let rawProducts = JSON.parse(localStorage.getItem("danhMucSanPham")) || [];
let pricingData = JSON.parse(localStorage.getItem("saved_pricing")) || [];

// SỬA LỖI: Khởi tạo mảng rỗng hoàn toàn trước khi lọc
let allProducts = [];

for (let i = 0; i < rawProducts.length; i++) {
  let sp = rawProducts[i];

  // Bỏ qua nếu sản phẩm đang bị ẩn
  if (sp.trangThai !== "an") {
    // Tìm giá bán trong saved_pricing hoặc lấy giá mặc định có sẵn trong sp
    let giaBanObj = pricingData.find((p) => p.name === sp.tenSP);
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
        hinh: sp.hinh || "assets/images/default-image.jpeg",
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
    let imgSrc = product.hinh || "assets/images/default-image.jpeg";
    let prodName = product.tenSP || "Sản phẩm";

    let cardHTML = `
      <div class="product-card">
        <div onclick="showDetail('${product.maSP}')">
          <img src="${imgSrc}" alt="${prodName}" onerror="this.src='https://via.placeholder.com/200'">
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
    let productInfo =
      (product.tenSP || "") +
      " " +
      (product.tenLoai || "") +
      " " +
      (product.color || "");
    productInfo = productInfo.toLowerCase();

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
// HÀM 4: Lọc theo hãng & tên trên Menu
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
      if ((product.tenLoai || "").toLowerCase() === category.toLowerCase()) {
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

window.filterByName = function (keyword, event) {
  if (event) event.preventDefault();

  filteredProducts = [];

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];
    if (
      (product.tenSP || "").toLowerCase().includes(keyword.toLowerCase())
    ) {
      filteredProducts.push(product);
    }
  }

  let titleElem = document.getElementById("categoryTitle");
  if (titleElem) titleElem.innerText = "Dòng máy: " + keyword;

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
        <img src="${product.hinh}" alt="${product.tenSP}" onerror="this.src='https://via.placeholder.com/400'">
      </div>
      <div class="detail-info">
        <h2>${product.tenSP}</h2>
        <p class="detail-price">${formatPrice}</p>
        <p><strong>Thương hiệu:</strong> ${(product.tenLoai || "").toUpperCase()}</p>
        <p><strong>Màu sắc:</strong> ${product.color || "Đang cập nhật"}</p>
        <p style="line-height:1.6; color:#555;">${product.moTa || "Sản phẩm chính hãng mới 100%, bảo hành 12 tháng tại các trung tâm toàn quốc."}</p>
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