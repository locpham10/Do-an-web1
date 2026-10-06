// Hàm định dạng tiền tệ (VD: 150000 -> 150.000 đ)
function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
}

// Khởi chạy các UI cơ bản (Sidebar) sau khi trang đã tải xong
document.addEventListener("DOMContentLoaded", function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
});