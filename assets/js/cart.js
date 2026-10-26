// ================= 0. KIỂM TRA ĐĂNG NHẬP & TRẠNG THÁI KHÓA =================
const loggedInUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));

// 1. Chưa đăng nhập -> Chuyển hướng sang trang đăng nhập auth.html
if (!loggedInUser) {
  alert("Vui lòng đăng nhập để xem và quản lý giỏ hàng của bạn!");
  window.location.href = "auth.html";
} else {
  // 2. Đã đăng nhập nhưng kiểm tra xem có bị admin đưa vào danh sách 'ngunghoatdong' không
  const danhSachNgungHoatDong =
    JSON.parse(localStorage.getItem("ngunghoatdong")) || [];
  const isLocked = danhSachNgungHoatDong.some((item) => {
    if (typeof item === "string") {
      return (
        item.toLowerCase() === (loggedInUser.email || "").toLowerCase() ||
        item === loggedInUser.soDienThoai
      );
    } else if (typeof item === "object" && item !== null) {
      return (
        (item.email &&
          item.email.toLowerCase() ===
            (loggedInUser.email || "").toLowerCase()) ||
        (item.soDienThoai && item.soDienThoai === loggedInUser.soDienThoai)
      );
    }
    return false;
  });

  if (isLocked) {
    alert(
      "Tài khoản của bạn đã bị ngừng hoạt động. Không thể thực hiện mua sắm!",
    );
    localStorage.removeItem("nguoiDungDangNhap");
    window.location.href = "auth.html";
  }
}

// ================= CÁC HÀM XỬ LÝ GIỎ HÀNG =================

// Lấy giỏ hàng từ localStorage
function getCart() {
  const data = localStorage.getItem("cartItems");
  return data ? JSON.parse(data) : [];
}

function saveCart(data) {
  localStorage.setItem("cartItems", JSON.stringify(data));
}

let cart = getCart();

// Hàm định dạng số tiền VND
const formatMoney = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(amount)
    .replace("₫", "đ");

// Các phần tử DOM
const cartItemsList = document.getElementById("cartItemsList");
const selectAllCheckbox = document.getElementById("selectAll");
const selectedCountText = document.getElementById("selectedCountText");
const totalItemsCount = document.getElementById("totalItemsCount");
const finalPayText = document.getElementById("finalPayText");

const cartStep = document.getElementById("cartStep");
const checkoutStep = document.getElementById("checkoutStep");
const btnProceedCheckout = document.getElementById("btnProceedCheckout");
const backToCartBtn = document.getElementById("backToCartBtn");

// 1. Hiển thị danh sách sản phẩm trong giỏ hàng
function renderCart() {
  cartItemsList.innerHTML = "";

  if (cart.length === 0) {
    cartItemsList.innerHTML =
      '<div class="card" style="text-align: center; padding: 40px; color: #888;">Giỏ hàng của bạn đang trống!</div>';
    updateSummary();
    updateCartBadge();
    return;
  }

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "card cart-item-card";
    itemEl.innerHTML = `
            <input type="checkbox" class="item-checkbox" data-index="${index}" ${item.selected ? "checked" : ""}>
            <img src="${item.image || "https://via.placeholder.com/75"}" alt="${item.name}" class="product-img">
            <div class="item-details">
                <div class="item-title">${item.name}</div>
                <div class="item-variant">Phân loại: ${item.color || "Tiêu chuẩn"}</div>
                <div class="current-price">${formatMoney(item.price)}</div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                    <input type="text" class="qty-val" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                </div>
            </div>
            <button class="btn-delete-item" onclick="deleteItem(${index})" title="Xóa món này">🗑️</button>
        `;
    cartItemsList.appendChild(itemEl);
  });

  // Bắt sự kiện chọn từng món
  document.querySelectorAll(".item-checkbox").forEach((chk) => {
    chk.addEventListener("change", (e) => {
      const idx = e.target.getAttribute("data-index");
      cart[idx].selected = e.target.checked;
      saveCart(cart);
      checkAllStatusSync();
      updateSummary();
    });
  });

  checkAllStatusSync();
  updateSummary();
  updateCartBadge();
}

// 2. Tăng / Giảm số lượng
window.updateQty = function (index, delta) {
  if (cart[index].quantity + delta <= 0) {
    if (confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      cart.splice(index, 1);
    }
  } else {
    cart[index].quantity += delta;
  }
  saveCart(cart);
  renderCart();
};

// 3. Xóa từng sản phẩm
window.deleteItem = function (index) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }
};

// 4. Chọn tất cả / Bỏ chọn tất cả
selectAllCheckbox.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  cart.forEach((item) => (item.selected = isChecked));
  saveCart(cart);
  renderCart();
});

// Xóa tất cả giỏ hàng
document.getElementById("deleteAllBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
    cart = [];
    saveCart(cart);
    renderCart();
  }
});

// Đồng bộ trạng thái checkbox "Chọn tất cả"
function checkAllStatusSync() {
  const selectedItems = cart.filter((item) => item.selected);
  selectAllCheckbox.checked =
    cart.length > 0 && selectedItems.length === cart.length;
  selectedCountText.innerText = selectedItems.length;
}

// 5. Cập nhật tổng tiền đơn hàng
function updateSummary() {
  let totalPay = 0;
  let totalCount = 0;

  cart.forEach((item) => {
    if (item.selected) {
      totalPay += item.price * item.quantity;
      totalCount += item.quantity;
    }
  });

  totalItemsCount.innerText = totalCount;
  finalPayText.innerText = formatMoney(totalPay);
}

// ================= 6. BƯỚC XÁC NHẬN ĐƠN -> CHUYỂN SANG THANH TOÁN =================
btnProceedCheckout.addEventListener("click", () => {
  const selectedItems = cart.filter((item) => item.selected);
  if (selectedItems.length === 0) {
    alert("Vui lòng tích chọn ít nhất 1 sản phẩm để thanh toán!");
    return;
  }

  // Tự động điền thông tin người dùng đã đăng nhập vào form nhận hàng
  if (loggedInUser) {
    if (
      document.getElementById("custName") &&
      !document.getElementById("custName").value
    ) {
      document.getElementById("custName").value = loggedInUser.hoTen || "";
    }
    if (
      document.getElementById("custPhone") &&
      !document.getElementById("custPhone").value
    ) {
      document.getElementById("custPhone").value =
        loggedInUser.soDienThoai || "";
    }
  }

  // Ẩn giỏ hàng, hiển thị bước thanh toán
  cartStep.style.display = "none";
  checkoutStep.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Hiển thị chi tiết các sản phẩm đã chọn sang trang thanh toán
  renderCheckoutSummary(selectedItems);
});

// Nút quay lại giỏ hàng từ trang thanh toán
backToCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkoutStep.style.display = "none";
  cartStep.style.display = "block";
});

// Render danh sách chi tiết các món mua tại trang thanh toán
function renderCheckoutSummary(items) {
  const listContainer = document.getElementById("selectedCheckoutProducts");
  listContainer.innerHTML = "";

  let totalPay = 0;

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPay += itemTotal;

    const row = document.createElement("div");
    row.className = "checkout-item";
    row.innerHTML = `
            <img src="${item.image || "https://via.placeholder.com/45"}" alt="${item.name}">
            <div style="flex: 1;">
                <div style="font-weight: bold;">${item.name}</div>
                <div style="color: #666;">Loại: ${item.color || "Tiêu chuẩn"} | SL: x${item.quantity}</div>
            </div>
            <div style="font-weight: bold; color: #e0052b;">${formatMoney(itemTotal)}</div>
        `;
    listContainer.appendChild(row);
  });

  document.getElementById("chkFinalTotal").innerText = formatMoney(totalPay);
}
// 7. Hoàn tất đặt hàng (Đồng bộ lưu vào danh sách đơn hàng cho profile.html hiển thị)
document.getElementById("btnFinishOrder").addEventListener("click", () => {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng!");
    return;
  }

  const selectedItems = cart.filter((item) => item.selected);
  const totalPay = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Tạo đơn hàng mới và lưu vào localStorage để profile.html đọc được
  let orders = JSON.parse(localStorage.getItem("danhSachDonHang")) || [];
  const newOrder = {
    orderId: "DH" + Math.floor(100000 + Math.random() * 900000),
    orderDate: new Date().toLocaleDateString("vi-VN"),
    receiver: name,
    phone: phone,
    address: address,
    total: totalPay,
    items: selectedItems,
  };
  orders.unshift(newOrder); // Đưa đơn mới lên đầu danh sách
  localStorage.setItem("danhSachDonHang", JSON.stringify(orders));

  alert(`🎉 Đặt hàng thành công!\nCảm ơn bạn ${name} đã mua hàng.`);

  // Xóa các món đã mua khỏi giỏ hàng
  cart = cart.filter((item) => !item.selected);
  saveCart(cart);
  updateCartBadge();

  // Xóa trắng địa chỉ và quay lại trang đơn hàng profile.html
  document.getElementById("custAddress").value = "";
  window.location.href = "profile.html#info";
});
// Thêm đoạn này vào cuối file assets/js/cart.js
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("nguoiDungDangNhap");
    alert("Đăng xuất thành công!");
    window.location.href = "index.html";
  });
}
// Chạy lần đầu khi load trang
renderCart();
