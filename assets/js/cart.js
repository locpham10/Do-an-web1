// ================= 0. KIỂM TRA ĐĂNG NHẬP & TRẠNG THÁI KHÓA =================
let loggedInUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));

// 1. Chưa đăng nhập -> Chuyển hướng sang index.html
if (!loggedInUser) {
    alert("Vui lòng đăng nhập để xem và quản lý giỏ hàng của bạn!");
    window.location.href = "index.html";
} else {
    // 2. Kiểm tra tài khoản có bị khóa không
    const danhSachNgungHoatDong = JSON.parse(localStorage.getItem("ngunghoatdong")) || [];
    const isLocked = danhSachNgungHoatDong.some(item => {
        if (typeof item === "string") {
            return (
                item.toLowerCase() === (loggedInUser.email || "").toLowerCase() ||
                item === loggedInUser.soDienThoai
            );
        } else if (typeof item === "object" && item !== null) {
            return (
                (item.email && item.email.toLowerCase() === (loggedInUser.email || "").toLowerCase()) ||
                (item.soDienThoai && item.soDienThoai === loggedInUser.soDienThoai)
            );
        }
        return false;
    });

    if (isLocked) {
        alert("Tài khoản của bạn đã bị ngừng hoạt động. Không thể thực hiện mua sắm!");
        localStorage.removeItem("nguoiDungDangNhap");
        window.location.href = "index.html";
    }
}

// ================= CÁC HÀM XỬ LÝ GIỎ HÀNG =================
function getCart() {
    const data = localStorage.getItem('cartItems');
    if (!data) {
        // Tạo giỏ mẫu nếu chưa có sản phẩm nào
        const defaultCart = [
            {
                name: "Samsung Galaxy S25 5G 12GB 256GB",
                color: "Đen",
                price: 18990000,
                quantity: 1,
                selected: true,
                image: "https://via.placeholder.com/80?text=S25"
            }
        ];
        localStorage.setItem('cartItems', JSON.stringify(defaultCart));
        return defaultCart;
    }
    return JSON.parse(data);
}

function saveCart(data) {
    localStorage.setItem('cartItems', JSON.stringify(data));
}

let cart = getCart();

const formatMoney = (amount) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'đ');

const cartItemsList = document.getElementById('cartItemsList');
const selectAllCheckbox = document.getElementById('selectAll');
const selectedCountText = document.getElementById('selectedCountText');
const totalItemsCount = document.getElementById('totalItemsCount');
const finalPayText = document.getElementById('finalPayText');

const cartStep = document.getElementById('cartStep');
const checkoutStep = document.getElementById('checkoutStep');
const btnProceedCheckout = document.getElementById('btnProceedCheckout');
const backToCartBtn = document.getElementById('backToCartBtn');

// 1. Hiển thị danh sách sản phẩm
function renderCart() {
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="card" style="text-align: center; padding: 40px; color: #888;">Giỏ hàng của bạn đang trống!</div>';
        updateSummary();
        return;
    }

    cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'card cart-item-card';
        itemEl.innerHTML = `
            <input type="checkbox" class="item-checkbox" data-index="${index}" ${item.selected ? 'checked' : ''}>
            <img src="${item.image || 'https://via.placeholder.com/75'}" alt="${item.name}" class="product-img">
            <div class="item-details">
                <div class="item-title">${item.name}</div>
                <div class="item-variant">Phân loại: ${item.color || 'Tiêu chuẩn'}</div>
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

    document.querySelectorAll('.item-checkbox').forEach(chk => {
        chk.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-index');
            cart[idx].selected = e.target.checked;
            saveCart(cart);
            checkAllStatusSync();
            updateSummary();
        });
    });

    checkAllStatusSync();
    updateSummary();
}

// 2. Tăng / Giảm số lượng
window.updateQty = function(index, delta) {
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

// 3. Xóa sản phẩm
window.deleteItem = function(index) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }
};

// 4. Chọn tất cả
selectAllCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    cart.forEach(item => item.selected = isChecked);
    saveCart(cart);
    renderCart();
});

document.getElementById('deleteAllBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
        cart = [];
        saveCart(cart);
        renderCart();
    }
});

function checkAllStatusSync() {
    const selectedItems = cart.filter(item => item.selected);
    selectAllCheckbox.checked = cart.length > 0 && selectedItems.length === cart.length;
    selectedCountText.innerText = selectedItems.length;
}

function updateSummary() {
    let totalPay = 0;
    let totalCount = 0;

    cart.forEach(item => {
        if (item.selected) {
            totalPay += item.price * item.quantity;
            totalCount += item.quantity;
        }
    });

    totalItemsCount.innerText = totalCount;
    finalPayText.innerText = formatMoney(totalPay);
}

// ================= 5. BƯỚC XÁC NHẬN ĐƠN HÀNG (BẮT BUỘC CÓ ĐỊA CHỈ) =================
btnProceedCheckout.addEventListener('click', () => {
    const selectedItems = cart.filter(item => item.selected);
    if (selectedItems.length === 0) {
        alert("Vui lòng tích chọn ít nhất 1 sản phẩm để thanh toán!");
        return;
    }

    // Luôn lấy dữ liệu mới nhất từ storage
    loggedInUser = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));

    // BẮT BUỘC KIỂM TRA ĐỊA CHỈ TRONG PROFILE
    if (!loggedInUser || !loggedInUser.diaChi || loggedInUser.diaChi.trim() === "") {
        alert("⚠️ Bạn chưa có địa chỉ giao hàng trong thông tin tài khoản!\nVui lòng nhập và lưu địa chỉ nhận hàng trước khi tiến hành thanh toán.");
        // Chuyển hướng sang trang profile và tự động mở modal sửa địa chỉ
        window.location.href = "profile.html#editAddress";
        return;
    }

    // Nếu đã có địa chỉ trong profile -> điền vào form thanh toán
    document.getElementById('custName').value = loggedInUser.hoTen || '';
    document.getElementById('custPhone').value = loggedInUser.soDienThoai || '';
    document.getElementById('custAddress').value = loggedInUser.diaChi || '';

    // Chuyển qua giao diện thanh toán
    cartStep.style.display = 'none';
    checkoutStep.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    renderCheckoutSummary(selectedItems);
});

backToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkoutStep.style.display = 'none';
    cartStep.style.display = 'block';
});

function renderCheckoutSummary(items) {
    const listContainer = document.getElementById('selectedCheckoutProducts');
    listContainer.innerHTML = '';

    let totalPay = 0;

    items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPay += itemTotal;

        const row = document.createElement('div');
        row.className = 'checkout-item';
        row.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/45'}" alt="${item.name}">
            <div style="flex: 1;">
                <div style="font-weight: bold;">${item.name}</div>
                <div style="color: #666;">Loại: ${item.color || 'Tiêu chuẩn'} | SL: x${item.quantity}</div>
            </div>
            <div style="font-weight: bold; color: #d70027;">${formatMoney(itemTotal)}</div>
        `;
        listContainer.appendChild(row);
    });

    document.getElementById('chkFinalTotal').innerText = formatMoney(totalPay);
}

// 6. Hoàn tất đặt hàng
document.getElementById('btnFinishOrder').addEventListener('click', () => {
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    if (!name || !phone || !address) {
        alert("Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng!");
        return;
    }

    // Nếu người dùng nhập địa chỉ mới lúc đặt hàng -> cập nhật luôn địa chỉ này cho profile
    if (loggedInUser && address !== loggedInUser.diaChi) {
        loggedInUser.diaChi = address;
        localStorage.setItem("nguoiDungDangNhap", JSON.stringify(loggedInUser));

        let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];
        const idx = taiKhoan.findIndex(acc => acc.email === loggedInUser.email || acc.soDienThoai === loggedInUser.soDienThoai);
        if (idx !== -1) {
            taiKhoan[idx].diaChi = address;
            localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
        }
    }

    const selectedItems = cart.filter(item => item.selected);
    const totalPay = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Lưu vào lịch sử đơn hàng
    let orders = JSON.parse(localStorage.getItem("danhSachDonHang")) || [];
    const newOrder = {
        orderId: "DH" + Math.floor(100000 + Math.random() * 900000),
        orderDate: new Date().toLocaleDateString('vi-VN'),
        receiver: name,
        phone: phone,
        address: address, // Giao đến đúng địa chỉ người dùng vừa nhập
        total: totalPay,
        items: selectedItems
    };
    orders.unshift(newOrder);
    localStorage.setItem("danhSachDonHang", JSON.stringify(orders));

    alert(`🎉 Đặt hàng thành công!\nĐơn hàng sẽ được chuyển tới: ${address}`);

    // Xóa sản phẩm đã mua khỏi giỏ
    cart = cart.filter(item => !item.selected);
    saveCart(cart);

    // Chuyển về profile xem danh sách đơn hàng vừa đặt
    window.location.href = "profile.html";
});

// Đăng xuất từ header
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("nguoiDungDangNhap");
        alert("Đăng xuất thành công!");
        window.location.href = "index.html";
    });
}

renderCart();