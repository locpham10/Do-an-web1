// Hàm format tiền tệ VNĐ
const formatMoney = (amount) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'đ');

// 1. Kiểm tra tài khoản đã đăng nhập chưa
let loggedInUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));

// THÊM DÒNG NÀY ĐỂ XÓA ĐƠN HÀNG ẢO BỊ KẸT:
// (Nhớ xóa dòng này đi sau khi F5 trang web thấy mất đơn hàng ảo)
localStorage.removeItem("danhSachDonHang");

if (!loggedInUser) {
    alert("Vui lòng đăng nhập để xem thông tin tài khoản!");
    window.location.href = "index.html";
}

// Hàm hiển thị thông tin ra màn hình
function renderUserProfile() {
    if (!loggedInUser) return;
    document.getElementById("profileName").innerText = loggedInUser.hoTen || "Khách hàng";
    document.getElementById("profileEmail").innerText = loggedInUser.email || "Chưa cập nhật";
    document.getElementById("profilePhone").innerText = loggedInUser.soDienThoai || "Chưa cập nhật";
    document.getElementById("profileGender").innerText = loggedInUser.gioiTinh || "Chưa cập nhật";
    
    const addrEl = document.getElementById("profileAddress");
    if (loggedInUser.diaChi && loggedInUser.diaChi.trim() !== "") {
        addrEl.innerText = loggedInUser.diaChi;
        addrEl.style.color = "#333";
    } else {
        addrEl.innerText = "Chưa có địa chỉ (Vui lòng bổ sung để đặt hàng)";
        addrEl.style.color = "#d70027";
    }

    if (loggedInUser.hoTen) {
        document.getElementById("avatarText").innerText = loggedInUser.hoTen.trim().charAt(0).toUpperCase();
    }
}

// 2. Kích hoạt header & các sự kiện
document.addEventListener("DOMContentLoaded", function () {
    renderUserProfile();

    const userItem = document.querySelector(".user-item");
    const cartBtn = document.getElementById("cartBtn");
    const headerBtnLogout = document.getElementById("headerBtnLogout");
    const btnLogout = document.getElementById("btnLogout");

    if (loggedInUser && userItem) {
        userItem.classList.add("logged-in");
    }

    if (cartBtn) {
        cartBtn.addEventListener("click", function () {
            window.location.href = "cart.html";
        });
    }

    if (headerBtnLogout) headerBtnLogout.addEventListener("click", executeLogout);
    if (btnLogout) btnLogout.addEventListener("click", executeLogout);

    setupEditProfileModal();

    // Nếu chuyển từ giỏ hàng sang với hash #editAddress thì tự động mở modal sửa
    if (window.location.hash === "#editAddress") {
        openEditModal();
    }
});

// 3. Xử lý Modal Chỉnh Sửa Thông Tin Cá Nhân & Địa Chỉ
function setupEditProfileModal() {
    const editModal = document.getElementById("editProfileModal");
    const btnOpen = document.getElementById("btnOpenEditModal");
    const btnClose = document.getElementById("closeEditModal");
    const btnCancel = document.getElementById("btnCancelEdit");
    const editForm = document.getElementById("editProfileForm");

    window.openEditModal = function() {
        if (!loggedInUser) return;
        document.getElementById("editName").value = loggedInUser.hoTen || "";
        document.getElementById("editPhone").value = loggedInUser.soDienThoai || "";
        document.getElementById("editEmail").value = loggedInUser.email || "";
        document.getElementById("editGender").value = loggedInUser.gioiTinh || "Nam";
        document.getElementById("editAddress").value = loggedInUser.diaChi || "";
        editModal.classList.remove("hidden");
    };

    function closeEdit() {
        editModal.classList.add("hidden");
    }

    if (btnOpen) btnOpen.addEventListener("click", openEditModal);
    if (btnClose) btnClose.addEventListener("click", closeEdit);
    if (btnCancel) btnCancel.addEventListener("click", closeEdit);

    window.addEventListener("click", function (e) {
        if (e.target === editModal) closeEdit();
    });

    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const oldEmail = loggedInUser.email;
            const oldPhone = loggedInUser.soDienThoai;

            const updatedName = document.getElementById("editName").value.trim();
            const updatedPhone = document.getElementById("editPhone").value.trim();
            const updatedEmail = document.getElementById("editEmail").value.trim().toLowerCase();
            const updatedGender = document.getElementById("editGender").value;
            const updatedAddress = document.getElementById("editAddress").value.trim();

            if (!updatedAddress) {
                alert("Vui lòng nhập địa chỉ nhận hàng!");
                return;
            }

            // Cập nhật đối tượng session đăng nhập
            loggedInUser.hoTen = updatedName;
            loggedInUser.soDienThoai = updatedPhone;
            loggedInUser.email = updatedEmail;
            loggedInUser.gioiTinh = updatedGender;
            loggedInUser.diaChi = updatedAddress;

            localStorage.setItem("nguoiDungDangNhap", JSON.stringify(loggedInUser));

            // Đồng bộ cập nhật vào danh sách tài khoản tổng
            let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];
            const accIndex = taiKhoan.findIndex(acc => 
                (oldEmail && acc.email && acc.email.toLowerCase() === oldEmail.toLowerCase()) ||
                (oldPhone && acc.soDienThoai === oldPhone)
            );

            if (accIndex !== -1) {
                taiKhoan[accIndex].hoTen = updatedName;
                taiKhoan[accIndex].soDienThoai = updatedPhone;
                taiKhoan[accIndex].email = updatedEmail;
                taiKhoan[accIndex].gioiTinh = updatedGender;
                taiKhoan[accIndex].diaChi = updatedAddress;
                localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
            }

            alert("Đã lưu cập nhật thông tin và địa chỉ thành công!");
            closeEdit();
            renderUserProfile();

            // Nếu người dùng vừa chuyển qua từ giỏ hàng cần nhập địa chỉ thì hỏi quay lại
            if (window.location.hash === "#editAddress") {
                if (confirm("Bạn đã có địa chỉ giao hàng! Bạn có muốn quay lại Giỏ hàng để hoàn tất đặt hàng ngay?")) {
                    window.location.href = "cart.html";
                }
            }
        });
    }
}

// 4. Chuyển đổi view [Thông tin & Đơn hàng] và [Xóa tài khoản] theo URL Hash
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

// 5. Tải danh sách đơn hàng đã mua
function getOrders() {
    let orders = JSON.parse(localStorage.getItem("danhSachDonHang"));
    
    // Nếu chưa có đơn hàng nào, trả về mảng rỗng 
    if (!orders) {
        orders = [];
    }
    
    return orders;
}

// 6. Render đơn hàng đã mua
function renderOrders() {
    const orders = getOrders();
    const orderListContainer = document.getElementById("orderList");
    const orderCount = document.getElementById("orderCount");

    if (!orderListContainer || !orderCount) return;

    orderCount.innerText = orders.length;

    if (orders.length === 0) {
        orderListContainer.innerHTML = '<div class="empty-orders">Bạn chưa có đơn hàng nào đã mua.</div>';
        return;
    }

    orderListContainer.innerHTML = '';

    orders.forEach((order) => {
        let itemsHtml = '';
        order.items.forEach(item => {
            const itemTotal = Number(item.price) * Number(item.quantity);
            itemsHtml += `
                <div class="order-product-row">
                    <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
                    <div class="order-product-info">
                        <div class="order-product-name">${item.name}</div>
                        <div class="order-product-meta">Phân loại: ${item.color || 'Mặc định'} | Số lượng: x${item.quantity}</div>
                    </div>
                    <div class="order-product-price">${formatMoney(itemTotal)}</div>
                </div>
            `;
        });

        const orderBox = document.createElement("div");
        orderBox.className = "order-box";
        orderBox.innerHTML = `
            <div class="order-header">
                <span><b>Mã đơn:</b> #${order.orderId || 'DH' + Math.floor(Math.random()*10000)} | <b>Ngày đặt:</b> ${order.orderDate || 'Mới đặt'}</span>
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

// 7. Hàm thực hiện đăng xuất
function executeLogout(event) {
    if (event) event.preventDefault();
    if (confirm("Bạn có chắc chắn muốn đăng xuất tài khoản?")) {
        localStorage.removeItem("nguoiDungDangNhap");
        window.location.href = "index.html";
    }
}

// 8. Xóa tài khoản
const formConfirmDelete = document.getElementById("formConfirmDelete");
if (formConfirmDelete) {
    formConfirmDelete.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputPassword = document.getElementById("confirmPassword").value;

        if (loggedInUser && loggedInUser.matKhau && inputPassword !== loggedInUser.matKhau) {
            alert("Mật khẩu không chính xác! Vui lòng thử lại.");
            return;
        }

        const confirmAction = confirm("Bạn có chắc chắn 100% muốn xóa tài khoản này không? Toàn bộ thông tin sẽ bị hủy!");
        if (confirmAction) {
            let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];
            const accIndex = taiKhoan.findIndex(u => u.email === loggedInUser.email && u.soDienThoai === loggedInUser.soDienThoai);
            
            if (accIndex !== -1) {
                taiKhoan[accIndex].trangThai = "daXoa";
                localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
            }

            localStorage.removeItem("nguoiDungDangNhap");
            localStorage.removeItem("danhSachDonHang");

            alert("Tài khoản của bạn đã được xóa thành công!");
            window.location.href = "index.html";
        }
    });
}

renderOrders();