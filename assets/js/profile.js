// Hàm format tiền tệ VNĐ
const formatMoney = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(amount)
    .replace("₫", "đ");

// 1. Kiểm tra tài khoản đã đăng nhập chưa
const loggedInUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));

if (!loggedInUser) {
  alert("Vui lòng đăng nhập để xem thông tin tài khoản!");
  window.location.href = "auth.html";
} else {
  // Hiển thị thông tin cá nhân
  document.getElementById("profileName").innerText =
    loggedInUser.hoTen || "Khách hàng";
  document.getElementById("profileEmail").innerText =
    loggedInUser.email || "Chưa cập nhật";
  document.getElementById("profilePhone").innerText =
    loggedInUser.soDienThoai || "Chưa cập nhật";

  // Tạo avatar ký tự đầu của họ tên
  if (loggedInUser.hoTen) {
    document.getElementById("avatarText").innerText = loggedInUser.hoTen
      .trim()
      .charAt(0)
      .toUpperCase();
  }
}

// 2. Chuyển đổi qua lại giữa mục [Thông tin & Đơn hàng] và [Xóa tài khoản] theo URL Hash
function handleViewRouting() {
  const hash = window.location.hash;
  const sectionProfile = document.getElementById("sectionProfile");
  const sectionDelete = document.getElementById("sectionDelete");
  const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");

  if (hash === "#delete") {
    sectionProfile.style.display = "none";
    sectionDelete.style.display = "block";
    breadcrumbCurrent.innerText = "Xóa tài khoản";
  } else {
    sectionProfile.style.display = "grid";
    sectionDelete.style.display = "none";
    breadcrumbCurrent.innerText = "Thông tin tài khoản";
  }
}

window.addEventListener("DOMContentLoaded", handleViewRouting);
window.addEventListener("hashchange", handleViewRouting);

// 3. Tải danh sách đơn hàng đã mua từ localStorage
function getOrders() {
  let orders = JSON.parse(localStorage.getItem("danhSachDonHang"));

  if (!orders || orders.length === 0) {
    orders = [
      {
        orderId: "DH1001",
        orderDate: "05/10/2026",
        receiver: loggedInUser ? loggedInUser.hoTen : "Khách hàng",
        phone: loggedInUser ? loggedInUser.soDienThoai : "0900000000",
        address: "Hồ Chí Minh",
        total: 18990000,
        items: [
          {
            name: "Samsung Galaxy S25 5G 12GB 256GB",
            color: "Đen",
            quantity: 1,
            price: 18990000,
            image: "https://via.placeholder.com/80?text=S25",
          },
        ],
      },
    ];
    localStorage.setItem("danhSachDonHang", JSON.stringify(orders));
  }
  return orders;
}

// 4. Render danh sách đơn hàng
function renderOrders() {
  const orders = getOrders();
  const orderListContainer = document.getElementById("orderList");
  const orderCount = document.getElementById("orderCount");

  orderCount.innerText = orders.length;

  if (orders.length === 0) {
    orderListContainer.innerHTML =
      '<div class="empty-orders">Bạn chưa có đơn hàng nào đã mua.</div>';
    return;
  }

  orderListContainer.innerHTML = "";

  orders.forEach((order) => {
    let itemsHtml = "";
    order.items.forEach((item) => {
      const itemTotal = Number(item.price) * Number(item.quantity);
      itemsHtml += `
                <div class="order-product-row">
                    <img src="${item.image || "https://via.placeholder.com/80"}" alt="${item.name}">
                    <div class="order-product-info">
                        <div class="order-product-name">${item.name}</div>
                        <div class="order-product-meta">Phân loại: ${item.color || "Mặc định"} | Số lượng: x${item.quantity}</div>
                    </div>
                    <div class="order-product-price">${formatMoney(itemTotal)}</div>
                </div>
            `;
    });

    const orderBox = document.createElement("div");
    orderBox.className = "order-box";
    orderBox.innerHTML = `
            <div class="order-header">
                <span><b>Mã đơn:</b> #${order.orderId || "DH" + Math.floor(Math.random() * 10000)} | <b>Ngày đặt:</b> ${order.orderDate || "Mới đặt"}</span>
                <span class="order-status">✔ Đang giao hàng</span>
            </div>
            <div class="order-items">
                ${itemsHtml}
            </div>
            <div class="order-footer">
                <div class="order-address-info">
                    <b>Giao đến:</b> ${order.receiver} (${order.phone}) - ${order.address}
                </div>
                <div>
                    Tổng tiền: <span class="order-total-price">${formatMoney(order.total)}</span>
                </div>
            </div>
        `;
    orderListContainer.appendChild(orderBox);
  });
}

// 5. Hàm thực hiện đăng xuất -> Đưa về trang index.html
function executeLogout(event) {
  if (event) event.preventDefault();
  if (confirm("Bạn có chắc chắn muốn đăng xuất tài khoản?")) {
    localStorage.removeItem("nguoiDungDangNhap");
    window.location.href = "index.html";
  }
}

// Gán sự kiện đăng xuất cho cả nút trên sidebar và trên dropdown header
const btnLogout = document.getElementById("btnLogout");
const headerBtnLogout = document.getElementById("headerBtnLogout");

if (btnLogout) btnLogout.addEventListener("click", executeLogout);
if (headerBtnLogout) headerBtnLogout.addEventListener("click", executeLogout);

// 6. Xử lý xóa tài khoản (Yêu cầu xác nhận mật khẩu)
const formConfirmDelete = document.getElementById("formConfirmDelete");
if (formConfirmDelete) {
  formConfirmDelete.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra khớp mật khẩu đã lưu khi đăng ký/đăng nhập
    if (
      loggedInUser &&
      loggedInUser.matKhau &&
      inputPassword !== loggedInUser.matKhau
    ) {
      alert("Mật khẩu không chính xác! Vui lòng thử lại.");
      return;
    }

    const confirmAction = confirm(
      "Bạn có chắc chắn 100% muốn xóa/khóa tài khoản này không? Toàn bộ thông tin sẽ bị hủy!",
    );
    if (confirmAction) {
      // Lấy danh sách tài khoản tổng và xóa người dùng này
      let danhSachNguoiDung =
        JSON.parse(localStorage.getItem("danhSachNguoiDung")) || [];
      danhSachNguoiDung = danhSachNguoiDung.filter(
        (u) => u.email !== loggedInUser.email,
      );
      localStorage.setItem(
        "danhSachNguoiDung",
        JSON.stringify(danhSachNguoiDung),
      );

      // Xóa session và danh sách đơn hàng
      localStorage.removeItem("nguoiDungDangNhap");
      localStorage.removeItem("danhSachDonHang");

      alert("Tài khoản của bạn đã được xóa thành công!");
      window.location.href = "index.html";
    }
  });
}

// Chạy khởi tạo danh sách đơn hàng
renderOrders();
