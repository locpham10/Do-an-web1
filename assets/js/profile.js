document.addEventListener("DOMContentLoaded", function () {
    // 1. Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));
    if (!currentUser) {
        alert("Vui lòng đăng nhập để xem thông tin!");
        window.location.href = "index.html"; 
        return;
    }

    // 2. Đổ dữ liệu cá nhân ra Profile
    document.getElementById("profileName").innerText = currentUser.hoTen || "Chưa cập nhật";
    document.getElementById("profileEmail").innerText = currentUser.email || "---";
    document.getElementById("profilePhone").innerText = currentUser.soDienThoai || "---";
    
    // Xử lý địa chỉ và giới tính (nếu có)
    const addressEl = document.getElementById("profileAddress");
    addressEl.innerText = currentUser.diaChi || "Chưa có địa chỉ";
    addressEl.style.color = currentUser.diaChi ? "#333" : "#d70027";
    
    document.getElementById("profileGender").innerText = currentUser.gioiTinh || "Chưa cập nhật";
    document.getElementById("avatarText").innerText = currentUser.hoTen ? currentUser.hoTen.charAt(0).toUpperCase() : "U";

    // 3. LẤY VÀ ĐỒNG BỘ TRẠNG THÁI ĐƠN HÀNG TỪ ADMIN
    const allOrders = JSON.parse(localStorage.getItem("saved_orders")) || [];
    
    // Lọc ra các đơn hàng đúng của user này (dựa vào số điện thoại)
    const myOrders = allOrders.filter(order => order.customerPhone === currentUser.soDienThoai);

    document.getElementById("orderCount").innerText = myOrders.length;
    const orderListContainer = document.getElementById("orderList");

    if (myOrders.length === 0) {
        orderListContainer.innerHTML = `<div style="text-align:center; padding: 30px; color:#888;">Bạn chưa mua đơn hàng nào.</div>`;
    } else {
        // Đảo ngược mảng để đơn mới nhất (vừa đặt) nhảy lên đầu tiên
        orderListContainer.innerHTML = myOrders.reverse().map(order => {
            
            // MAP TRẠNG THÁI ĐỒNG BỘ VỚI ADMIN
            let statusText = "";
            let statusColor = "";
            let statusBg = "";
            
            switch(order.status) {
                case 'pending': 
                    statusText = "Chờ xác nhận"; 
                    statusColor = "#856404"; 
                    statusBg = "#fff3cd";
                    break;
                case 'processed': 
                    statusText = "Đang giao hàng"; 
                    statusColor = "#004085"; 
                    statusBg = "#cce5ff";
                    break;
                case 'completed': 
                    statusText = "Đã giao thành công"; 
                    statusColor = "#155724"; 
                    statusBg = "#d4edda";
                    break;
                case 'cancelled': 
                    statusText = "Đã hủy"; 
                    statusColor = "#721c24"; 
                    statusBg = "#f8d7da";
                    break;
                default:
                    statusText = "Không xác định";
                    statusColor = "#383d41";
                    statusBg = "#e2e3e5";
            }

            // In danh sách các món hàng trong đơn này
            const itemsHtml = order.items.map(item => `
                <div style="display:flex; justify-content:space-between; border-bottom:1px dashed #ddd; padding:8px 0; font-size: 14px;">
                    <span>${item.name} <strong>(x${item.qty})</strong></span>
                    <span>${Number(item.price).toLocaleString('vi-VN')} đ</span>
                </div>
            `).join('');

            // Khung giao diện cho từng đơn hàng
            return `
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                        <strong style="font-size: 16px;">Mã ĐH: ${order.id}</strong>
                        <span style="color: ${statusColor}; background-color: ${statusBg}; font-weight: bold; padding: 5px 10px; border-radius: 20px; font-size: 13px;">
                            ${statusText}
                        </span>
                    </div>
                    <div style="margin-bottom: 12px; font-size: 14px; color: #555; line-height: 1.6;">
                        <div>📅 Ngày đặt: <strong>${order.date}</strong></div>
                        <div>📍 Giao đến: <strong>${order.customerAddress || currentUser.diaChi}</strong></div>
                    </div>
                    <div style="background: #f8f9fa; padding: 10px 15px; border-radius: 6px; margin-bottom: 15px;">
                        ${itemsHtml}
                    </div>
                    <div style="text-align: right; font-size: 16px;">
                        Tổng thanh toán: <strong style="color: #d70027; font-size: 18px;">${Number(order.totalAmount).toLocaleString('vi-VN')} đ</strong>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ==========================================================
    // 4. XỬ LÝ MODAL CHỈNH SỬA THÔNG TIN & ĐỊA CHỈ
    // ==========================================================
    const btnOpenEditModal = document.getElementById("btnOpenEditModal");
    const editProfileModal = document.getElementById("editProfileModal");
    const closeEditModal = document.getElementById("closeEditModal");
    const btnCancelEdit = document.getElementById("btnCancelEdit");
    const editProfileForm = document.getElementById("editProfileForm");

    if (btnOpenEditModal) {
        btnOpenEditModal.addEventListener("click", function() {
            document.getElementById("editName").value = currentUser.hoTen || "";
            document.getElementById("editPhone").value = currentUser.soDienThoai || "";
            document.getElementById("editEmail").value = currentUser.email || "";
            document.getElementById("editGender").value = currentUser.gioiTinh || "Nam";
            document.getElementById("editAddress").value = currentUser.diaChi || "";
            editProfileModal.classList.remove("hidden");
        });
    }

    function closeEdit() { editProfileModal.classList.add("hidden"); }
    if (closeEditModal) closeEditModal.addEventListener("click", closeEdit);
    if (btnCancelEdit) btnCancelEdit.addEventListener("click", closeEdit);

    if (editProfileForm) {
        editProfileForm.addEventListener("submit", function(e) {
            e.preventDefault(); 
            
            const newName = document.getElementById("editName").value.trim();
            const newPhone = document.getElementById("editPhone").value.trim();
            const newEmail = document.getElementById("editEmail").value.trim();
            const newGender = document.getElementById("editGender").value;
            const newAddress = document.getElementById("editAddress").value.trim();

            currentUser.hoTen = newName;
            currentUser.soDienThoai = newPhone;
            currentUser.email = newEmail;
            currentUser.gioiTinh = newGender;
            currentUser.diaChi = newAddress;
            localStorage.setItem("nguoiDungDangNhap", JSON.stringify(currentUser));

            let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];
            const index = taiKhoan.findIndex(tk => tk.soDienThoai === currentUser.soDienThoai || tk.email === currentUser.email);
            if (index !== -1) {
                taiKhoan[index].hoTen = newName;
                taiKhoan[index].soDienThoai = newPhone;
                taiKhoan[index].email = newEmail;
                taiKhoan[index].gioiTinh = newGender;
                taiKhoan[index].diaChi = newAddress;
                localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
            }

            alert("Cập nhật thông tin và địa chỉ thành công!");
            closeEdit();
            window.location.reload();
        });
    }

    // ==========================================================
    // 5. XỬ LÝ NÚT ĐĂNG XUẤT TRONG TRANG PROFILE
    // ==========================================================
    const btnLogoutProfile = document.getElementById("btnLogout");
    if (btnLogoutProfile) {
        btnLogoutProfile.addEventListener("click", function() {
            if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
                localStorage.removeItem("nguoiDungDangNhap");
                window.location.href = "index.html"; 
            }
        });
    }

    // =========================================================================
    // 6. CHUYỂN ĐỔI VIEW [THÔNG TIN & ĐƠN HÀNG] VÀ [XÓA TÀI KHOẢN] (ĐÃ KHÔI PHỤC)
    // =========================================================================
    function handleViewRouting() {
        const hash = window.location.hash;
        const sectionProfile = document.getElementById("sectionProfile");
        const sectionDelete = document.getElementById("sectionDelete");
        const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");

        if (hash === "#delete") {
            if (sectionProfile) sectionProfile.style.display = "none";
            if (sectionDelete) sectionDelete.style.display = "block";
            if (breadcrumbCurrent) breadcrumbCurrent.innerText = "Xóa tài khoản";
        } else {
            if (sectionProfile) sectionProfile.style.display = "grid";
            if (sectionDelete) sectionDelete.style.display = "none";
            if (breadcrumbCurrent) breadcrumbCurrent.innerText = "Thông tin tài khoản";
        }
    }
    
    handleViewRouting(); // Chạy ngay khi tải trang
    window.addEventListener("hashchange", handleViewRouting); // Lắng nghe khi bấm nút trên giao diện

    // =========================================================================
    // 7. XÓA TÀI KHOẢN VĨNH VIỄN (ĐÃ KHÔI PHỤC)
    // =========================================================================
    const formConfirmDelete = document.getElementById("formConfirmDelete");
    if (formConfirmDelete) {
        formConfirmDelete.addEventListener("submit", function (e) {
            e.preventDefault();
            const inputPassword = document.getElementById("confirmPassword").value;

            if (currentUser && currentUser.matKhau && inputPassword !== currentUser.matKhau) {
                alert("Mật khẩu không chính xác! Vui lòng thử lại.");
                return;
            }

            const confirmAction = confirm("Bạn có chắc chắn 100% muốn xóa tài khoản này không? Toàn bộ thông tin sẽ bị hủy!");
            if (confirmAction) {
                let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];
                const accIndex = taiKhoan.findIndex(u => u.email === currentUser.email && u.soDienThoai === currentUser.soDienThoai);
                
                if (accIndex !== -1) {
                    // Cập nhật trạng thái mềm thành 'daXoa'
                    taiKhoan[accIndex].trangThai = "daXoa";
                    localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));

                    // Đưa vào danh sách xóa để Admin nhận diện
                    let danhSachDaXoa = JSON.parse(localStorage.getItem("daXoa")) || [];
                    danhSachDaXoa.push({
                        email: currentUser.email,
                        soDienThoai: currentUser.soDienThoai
                    });
                    localStorage.setItem("daXoa", JSON.stringify(danhSachDaXoa));
                }

                localStorage.removeItem("nguoiDungDangNhap");
                alert("Tài khoản của bạn đã được xóa thành công!");
                window.location.href = "index.html";
            }
        });
    }
});