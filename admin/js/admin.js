/*======================================================================
    PHẦN DÙNG CHUNG CHO CẢ TRANG ADMIN
======================================================================*/ 
// Hàm định dạng tiền tệ (VD: 150000 -> 150.000 đ)
function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
}

// Hàm ĐÓNG MODAL DÙNG CHUNG (Đã hợp nhất để tránh xung đột)
function closeModal() {
    const importModal = document.getElementById('importModal');
    if (importModal) importModal.style.display = 'none';
    
    const pricingModal = document.getElementById('pricingModal');
    if (pricingModal) pricingModal.style.display = 'none';

    const orderModal = document.getElementById('orderModal');
    if (orderModal) orderModal.style.display = 'none';
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

/*======================================================================
    PHẦN DÙNG CHO TRANG QL NHẬP HÀNG
======================================================================*/ 
let importList = [];
let productCatalog = new Set([]);
let currentDraftItems = [];
let editIndex = null;
let currentImageBase64 = "";

const DEFAULT_IMAGE = "../assets/images/default-image.jpeg"; // Ảnh mặc định

// 2. HÀM CỐT LÕI: LƯU & TẢI TỪ TRÌNH DUYỆT (LOCAL STORAGE)
function saveToLocalStorage() {
    localStorage.setItem('saved_imports', JSON.stringify(importList));
    localStorage.setItem('saved_catalog', JSON.stringify(Array.from(productCatalog)));
}

function loadFromLocalStorage() {
    const storedImports = localStorage.getItem('saved_imports');
    if (storedImports) {
        try { importList = JSON.parse(storedImports); } 
        catch (e) { importList = []; }
    }

    const storedCatalog = localStorage.getItem('saved_catalog');
    if (storedCatalog) {
        try { productCatalog = new Set(JSON.parse(storedCatalog)); } 
        catch (e) { productCatalog = new Set([]); }
    }
}

// 3. LOGIC GIAO DIỆN VÀ MODAL
function renderTable() {
    const tableBody = document.getElementById('importTableBody');
    if (!tableBody) return;

    if (importList.length === 0) {
        tableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="5"><span class="empty-icon">📋</span>Chưa có phiếu nhập nào. Bấm <b>+ Lập phiếu mới</b> để tạo!</td>
            </tr>`;
        return;
    }
    
    tableBody.innerHTML = importList.map((item, index) => {
        const isCompleted = (item.status === 'completed');
        const badgeClass = isCompleted ? 'badge-completed' : 'badge-pending';
        const badgeText = isCompleted ? 'Đã hoàn thành' : 'Lưu tạm';
        const btnClass = isCompleted ? 'btn-view-detail' : 'btn-edit-active';
        const btnText = isCompleted ? 'Xem chi tiết' : 'Sửa';

        return `
            <tr>
                <td><strong>${item.code}</strong></td>
                <td>${item.date}</td>
                <td><strong>${formatMoney(item.totalAmount)}</strong></td>
                <td><span class="badge ${badgeClass}">${badgeText}</span></td>
                <td><button class="btn-action ${btnClass}" onclick="openEditModal(${index})">${btnText}</button></td>
            </tr>`;
    }).join('');
}

function openAddModel() {
    editIndex = null;
    currentDraftItems = [];
    document.getElementById('modalTitle').innerText = "Lập phiếu nhập hàng";
    
    const codeInput = document.getElementById('modalCode');
    codeInput.value = ""; codeInput.readOnly = false; codeInput.style.backgroundColor = "#fff";
    
    const dateInput = document.getElementById('modalDate');
    dateInput.valueAsDate = new Date(); dateInput.readOnly = false;

    resetItemInputForm();
    toggleActionButtons(false);
    renderDetailTable();
    
    document.getElementById('importModal').style.display = 'flex';
}

function openEditModal(index) {
    editIndex = index;
    const item = importList[index];
    const isCompleted = (item.status === 'completed');

    document.getElementById('modalTitle').innerText = isCompleted ? "Chi Tiết Phiếu Nhập: " + item.code : "Sửa Phiếu Nhập: " + item.code;
    
    const codeInput = document.getElementById('modalCode');
    codeInput.value = item.code; codeInput.readOnly = true; codeInput.style.backgroundColor = "#e9ecef";
    
    const dateInput = document.getElementById('modalDate');
    dateInput.value = item.date; dateInput.readOnly = isCompleted;

    // Clone dữ liệu để sửa không ảnh hưởng mảng gốc nếu chưa bấm Lưu
    currentDraftItems = JSON.parse(JSON.stringify(item.items));
    
    toggleActionButtons(isCompleted);
    renderDetailTable(isCompleted);
    
    document.getElementById('importModal').style.display = 'flex';
}

function toggleActionButtons(isCompleted) {
    document.getElementById('addItemControls').style.display = isCompleted ? "none" : "flex"; 
    document.getElementById('actionHeader').style.display = isCompleted ? "none" : "table-cell";
    document.getElementById('btnSaveDraft').style.display = isCompleted ? "none" : "inline-block"; 
    document.getElementById('btnSaveComplete').style.display = isCompleted ? "none" : "inline-block";
}

function resetItemInputForm() {
    document.getElementById('itemImage').value = ""; 
    currentImageBase64 = ""; 
    document.getElementById('itemProduct').value = "";
    document.getElementById('itemQuantity').value = "1";
    document.getElementById('itemPrice').value = "";
    document.getElementById('itemProduct').focus();
}

function addItemToDraft() {
    const nameInput = document.getElementById('itemProduct');
    const name = nameInput.value.trim(); 
    const qty = parseInt(document.getElementById('itemQuantity').value, 10);
    const price = parseFloat(document.getElementById('itemPrice').value);
    const finalImage = currentImageBase64 || DEFAULT_IMAGE; 

    if (!name) { alert("Vui lòng nhập tên mặt hàng!"); nameInput.focus(); return; }
    if (isNaN(qty) || qty <= 0) { alert("Số lượng phải lớn hơn 0!"); return; }
    if (isNaN(price) || price < 0) { alert("Đơn giá nhập không hợp lệ!"); return; }

    productCatalog.add(name); 

    const existing = currentDraftItems.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        existing.qty += qty; 
        existing.price = price; 
        if (currentImageBase64) existing.image = finalImage;
    } else {
        currentDraftItems.push({ image: finalImage, name: name, qty: qty, price: price });
    }
    
    renderDetailTable();
    resetItemInputForm();
}

function removeItemFromDraft(idx) {
    currentDraftItems.splice(idx, 1);
    renderDetailTable();
}

function renderDetailTable(isReadOnly = false) {
    const detailBody = document.getElementById('detailTableBody');
    const totalDisplay = document.getElementById('modalTotalDisplay');
    
    if (currentDraftItems.length === 0) {
        detailBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #888; padding: 15px;">Chưa có mặt hàng nào. Vui lòng nhập và bấm + Thêm hàng.</td></tr>`;
        totalDisplay.innerText = "0 đ";
        return;
    }

    let grandTotal = 0;
    detailBody.innerHTML = currentDraftItems.map((item, idx) => {
        const lineTotal = item.qty * item.price;
        grandTotal += lineTotal;
        const removeBtn = !isReadOnly ? `<td style="text-align: center;"><button class="btn-remove-item" onclick="removeItemFromDraft(${idx})">&times;</button></td>` : '';
        return `
            <tr>
                <td>${idx + 1}</td>
                <td style="text-align: center;"><img src="${item.image}" class="product-thumb" alt="Ảnh"></td>
                <td><strong>${item.name}</strong></td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right;">${formatMoney(item.price)}</td>
                <td style="text-align: right;"><strong>${formatMoney(lineTotal)}</strong></td>
                ${removeBtn}
            </tr>`;
    }).join('');
    totalDisplay.innerText = formatMoney(grandTotal);
}

// 4. HÀM CHỐT LƯU PHIẾU
function saveForm(statusToSave) {
    const code = document.getElementById('modalCode').value.trim().toUpperCase();
    const date = document.getElementById('modalDate').value;

    if (!code || !date) { alert("Vui lòng nhập đủ mã phiếu và ngày nhập hàng!"); return; }
    if (currentDraftItems.length === 0) { alert("Phiếu nhập phải có ít nhất 1 mặt hàng!"); return; }
    
    if (statusToSave === 'completed' && !confirm("Xác nhận Hoàn thành? Hàng sẽ được lưu vào kho và không thể sửa lại.")) {
        return;
    }

    const totalAmount = currentDraftItems.reduce((sum, item) => sum + (item.qty * item.price), 0);

    if (editIndex === null) {
        if (importList.some(item => item.code.toUpperCase() === code)) { 
            alert("Mã phiếu đã tồn tại!"); return; 
        }
        importList.push({ code, date, items: currentDraftItems, totalAmount, status: statusToSave });
    } else {
        importList[editIndex].date = date; 
        importList[editIndex].items = currentDraftItems;
        importList[editIndex].totalAmount = totalAmount; 
        importList[editIndex].status = statusToSave;
    }
    
    // BẮT BUỘC: Gọi hàm lưu bộ nhớ ngay sau khi cập nhật mảng
    saveToLocalStorage(); 
    closeModal();
    renderTable();
}

function applyFilters() {
    // 1. Kiểm tra xem HTML đã có id chưa, nếu chưa có sẽ báo lỗi ngay lập tức
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');

    if (!fromDateInput || !toDateInput) {
        alert("LỖI: Không tìm thấy ô nhập ngày! Bạn hãy kiểm tra lại file admin.html xem đã thêm id='fromDate' và id='toDate' chưa nhé.");
        return;
    }

    const searchInput = document.getElementById('searchInput');
    const searchFilter = searchInput ? searchInput.value.trim().toUpperCase() : "";

    // 2. Chuyển đổi ngày sang dạng thời gian (timestamp) để so sánh tuyệt đối
    const fromTime = fromDateInput.value ? new Date(fromDateInput.value).setHours(0, 0, 0, 0) : null;
    const toTime = toDateInput.value ? new Date(toDateInput.value).setHours(23, 59, 59, 999) : null;

    const tbody = document.getElementById('importTableBody');
    if (!tbody) return;

    const rows = tbody.getElementsByTagName('tr');

    // 3. Quét bảng
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('empty-row')) continue;

        const codeCol = rows[i].getElementsByTagName('td')[0];
        const dateCol = rows[i].getElementsByTagName('td')[1];

        if (codeCol && dateCol) {
            const codeText = codeCol.textContent.trim().toUpperCase();
            const rowDateStr = dateCol.textContent.trim(); // "YYYY-MM-DD"

            const matchSearch = codeText.includes(searchFilter);

            let matchDate = true;
            if (rowDateStr) {
                // Đặt mốc thời gian là 12h trưa để tránh lệch múi giờ
                const rowTime = new Date(rowDateStr).setHours(12, 0, 0, 0); 
                
                if (fromTime && rowTime < fromTime) matchDate = false;
                if (toTime && rowTime > toTime) matchDate = false;
            }

            // Quyết định Hiển thị hay Ẩn
            if (matchSearch && matchDate) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

// 5. KHỞI CHẠY KHI MỞ TRANG
document.addEventListener("DOMContentLoaded", function() {
    // 1. Tải dữ liệu từ LocalStorage trước tiên
    loadFromLocalStorage();

    // 2. Gắn sự kiện HTML
    const itemImageInput = document.getElementById('itemImage');
    if (itemImageInput) {
        itemImageInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = event => currentImageBase64 = event.target.result;
                reader.readAsDataURL(file);
            } else currentImageBase64 = "";
        });
    }

    const itemProduct = document.getElementById('itemProduct');
    const productSuggestions = document.getElementById('productSuggestions');
    if (itemProduct && productSuggestions) {
        itemProduct.addEventListener('input', function() {
            const keyword = this.value.trim().toLowerCase();
            productSuggestions.innerHTML = ''; 
            if (!keyword) { productSuggestions.style.display = 'none'; return; }

            const matches = Array.from(productCatalog).filter(name => name.toLowerCase().includes(keyword));
            if (matches.length > 0) {
                matches.forEach(match => {
                    const li = document.createElement('li');
                    li.textContent = match;
                    li.onclick = () => {
                        itemProduct.value = match;
                        productSuggestions.style.display = 'none'; 
                        document.getElementById('itemQuantity').focus(); 
                    };
                    productSuggestions.appendChild(li);
                });
                productSuggestions.style.display = 'block';
            } else productSuggestions.style.display = 'none';
        });

        document.addEventListener('click', e => {
            if (e.target !== itemProduct && e.target !== productSuggestions) {
                productSuggestions.style.display = 'none';
            }
        });
    }

    // 3. Vẽ bảng (Sẽ có dữ liệu ngay lập tức nhờ hàm Load ở trên)
    renderTable();
});
/*======================================================================
    PHẦN DÙNG CHO TRANG QL GIÁ BÁN
======================================================================*/ 

let currentProductCode = "";
let currentImportPrice = 0;
let pricingList = []; 
let pendingTicketsCount = 0; // Biến đếm số phiếu đang bị "Lưu tạm"

/* --- 1. TẢI VÀ ĐỒNG BỘ DỮ LIỆU TỪ KHO NHẬP HÀNG --- */
function loadDataForPricing() {
    pendingTicketsCount = 0;
    const storedImports = localStorage.getItem('saved_imports');
    let importList = [];
    
    if (storedImports) {
        try { importList = JSON.parse(storedImports); } 
        catch (e) { console.error("Lỗi file JSON Nhập hàng"); }
    }

    let productMap = {}; 
    
    // Quét toàn bộ phiếu nhập
    importList.forEach(ticket => {
        // Đếm xem có bao nhiêu phiếu chưa Hoàn thành để báo lỗi cho user
        if (ticket.status !== 'completed') {
            pendingTicketsCount++;
        }
        
        // CHỈ gom nhóm dữ liệu của những phiếu ĐÃ HOÀN THÀNH
        if (ticket.status === 'completed' && Array.isArray(ticket.items)) {
            ticket.items.forEach(item => {
                if (!item.name) return; // Bỏ qua dữ liệu rác nếu có

                if (!productMap[item.name]) {
                    productMap[item.name] = {
                        name: item.name,
                        image: item.image || '../assets/images/default-image.svg',
                        totalQty: 0,
                        totalCost: 0,
                        importPrice: 0,
                        retailPrice: 0 
                    };
                }
                productMap[item.name].totalQty += item.qty;
                productMap[item.name].totalCost += (item.qty * item.price);
            });
        }
    });

    // Tính giá nhập bình quân và tạo mã SP
    pricingList = Object.values(productMap).map((prod, index) => {
        prod.importPrice = prod.totalQty > 0 ? Math.round(prod.totalCost / prod.totalQty) : 0;
        prod.code = "SP" + String(index + 1).padStart(3, '0'); 
        return prod;
    });

    // Kéo BẢNG GIÁ ĐÃ LƯU (nếu có) đắp vào danh sách hiện tại
    const storedPricing = localStorage.getItem('saved_pricing');
    if (storedPricing) {
        try {
            const savedPricingList = JSON.parse(storedPricing);
            pricingList.forEach(prod => {
                // TÌM THEO TÊN (Khớp tuyệt đối 100%, không sợ bị lệch mã SP khi thêm hàng mới)
                const savedProd = savedPricingList.find(p => p.name === prod.name);
                if (savedProd && savedProd.retailPrice > 0) {
                    prod.retailPrice = savedProd.retailPrice;
                }
            });
        } catch (e) { console.error("Lỗi file JSON Giá bán"); }
    }

    renderPricingTable();
}

/* --- 2. VẼ BẢNG GIÁ BÁN TỰ ĐỘNG CẬP NHẬT MÀU SẮC --- */
function renderPricingTable() {
    const tbody = document.getElementById('pricingTableBody');
    if (!tbody) return;

    // HIỂN THỊ CẢNH BÁO THÔNG MINH NẾU BẢNG TRỐNG
    if (pricingList.length === 0) {
        if (pendingTicketsCount > 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 50px; color: #dc3545;">
                <h3 style="margin-bottom:10px;">⚠️ Dữ liệu đang bị kẹt!</h3>
                Bạn đang có <b>${pendingTicketsCount} phiếu Nhập hàng</b> ở trạng thái "Lưu tạm".<br>
                Hãy quay lại trang Nhập hàng, sửa phiếu và bấm <b>Hoàn thành</b> thì sản phẩm mới được chuyển sang đây!
            </td></tr>`;
        } else {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 50px; color: #888;">
                Chưa có sản phẩm nào trong kho.<br>Vui lòng sang trang Nhập hàng và tạo phiếu mới.
            </td></tr>`;
        }
        return;
    }

    // VẼ DANH SÁCH SẢN PHẨM (Kèm logic Đổi màu tự động)
    tbody.innerHTML = pricingList.map(prod => {
        const hasRetailPrice = prod.retailPrice > 0;
        const margin = hasRetailPrice ? Math.round(((prod.retailPrice - prod.importPrice) / prod.importPrice) * 100) : 0;
        
        let retailPriceHtml, badgeHtml;
        const btnText = hasRetailPrice ? "Cập nhật giá" : "Thiết lập giá";

        if (hasRetailPrice) {
            if (margin > 0) {
                retailPriceHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
                badgeHtml = `<span class="badge badge-completed">+${margin}%</span>`;
            } else if (margin < 0) {
                retailPriceHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
                badgeHtml = `<span class="badge badge-loss">${margin}%</span>`;
            } else {
                retailPriceHtml = `<span>${formatMoney(prod.retailPrice)}</span>`;
                badgeHtml = `<span class="badge badge-pending">0%</span>`;
            }
        } else {
            retailPriceHtml = `<span style="font-weight: bold; color: #dc3545;">Chưa thiết lập</span>`;
            badgeHtml = `<span class="badge badge-pending" style="background: #e9ecef; color: #6c757d;">--</span>`;
        }

        const safeName = prod.name.replace(/'/g, "\\'");

        return `
            <tr>
                <td><strong>${prod.code}</strong></td>
                <td><img src="${prod.image}" width="40" height="40" style="border-radius: 4px; object-fit: cover; border: 1px solid #ddd;"></td>
                <td>${prod.name}</td>
                <td style="text-align: right; color: #6c757d;">${formatMoney(prod.importPrice)}</td>
                <td style="text-align: right;">${retailPriceHtml}</td>
                <td style="text-align: center;">${badgeHtml}</td>
                <td style="text-align: center;">
                    <button class="btn-action btn-edit-active" onclick="openPricingModal('${prod.code}', '${safeName}', ${prod.importPrice})">${btnText}</button>
                </td>
            </tr>`;
    }).join('');
}

/* --- 3. LOGIC MODAL TÍNH GIÁ THÔNG MINH --- */
function openPricingModal(code, name, importPrice) {
    currentProductCode = code;
    currentImportPrice = importPrice;

    document.getElementById('modalProdCode').value = code;
    document.getElementById('modalProdName').value = name;
    document.getElementById('modalImportPrice').value = formatMoney(importPrice);
    
    const prod = pricingList.find(p => p.code === code);
    if (prod && prod.retailPrice > 0) {
        document.getElementById('modalRetailPrice').value = prod.retailPrice;
        calculateMargin();
    } else {
        document.getElementById('modalRetailPrice').value = "";
        document.getElementById('modalMarginPercent').value = "";
        updateProfitDisplay(0);
    }

    document.getElementById('pricingModal').style.display = 'flex';
}

function calculateMargin() {
    const retailPrice = parseFloat(document.getElementById('modalRetailPrice').value) || 0;
    if (retailPrice === 0) {
        document.getElementById('modalMarginPercent').value = "";
        updateProfitDisplay(0);
        return;
    }
    const profit = retailPrice - currentImportPrice;
    let marginPercent = (profit / currentImportPrice) * 100;
    document.getElementById('modalMarginPercent').value = marginPercent.toFixed(1);
    updateProfitDisplay(profit);
}

function calculateRetailPrice() {
    const marginPercent = parseFloat(document.getElementById('modalMarginPercent').value) || 0;
    const profit = currentImportPrice * (marginPercent / 100);
    const retailPrice = currentImportPrice + profit;
    
    // Tự động làm tròn số chẵn (VD: 149.320 -> 149.000)
    const roundedRetailPrice = Math.round(retailPrice / 1000) * 1000;
    const finalProfit = roundedRetailPrice - currentImportPrice;

    document.getElementById('modalRetailPrice').value = roundedRetailPrice;
    updateProfitDisplay(finalProfit);
}

function applyQuickMargin(percent) {
    document.getElementById('modalMarginPercent').value = percent;
    calculateRetailPrice();
}

function updateProfitDisplay(profit) {
    const profitEl = document.getElementById('expectedProfit');
    profitEl.innerText = formatMoney(profit) + ' / SP';
    if (profit < 0) {
        profitEl.classList.add('loss');
    } else {
        profitEl.classList.remove('loss');
    }
}

/* --- 4. HÀM CHỐT LƯU GIÁ BÁN & TÌM KIẾM --- */
function savePricing() {
    const retailPrice = parseFloat(document.getElementById('modalRetailPrice').value);
    
    if (!retailPrice || retailPrice <= 0) {
        alert("Vui lòng nhập giá bán lớn hơn 0!");
        document.getElementById('modalRetailPrice').focus();
        return;
    }

    if (retailPrice < currentImportPrice) {
        if (!confirm("CẢNH BÁO: Giá bán đang thấp hơn giá nhập.\nBạn có chắc chắn muốn lưu?")) return;
    }

    const prodIndex = pricingList.findIndex(p => p.code === currentProductCode);
    if (prodIndex > -1) {
        pricingList[prodIndex].retailPrice = retailPrice;
        localStorage.setItem('saved_pricing', JSON.stringify(pricingList));
    }
    
    closeModal();
    renderPricingTable();
}

/*======================================================================
    PHẦN DÙNG CHO TRANG QL ĐƠN HÀNG
======================================================================*/ 
document.addEventListener("DOMContentLoaded", () => {
    loadDataForPricing();
});

let orderList = [];
let currentEditingOrderId = "";

// 1. TẢI DỮ LIỆU ĐƠN HÀNG (Kèm chức năng Tự động tạo Mock Data)
function loadDataForOrders() {
    const storedOrders = localStorage.getItem('saved_orders');
    
    if (storedOrders) {
        try { orderList = JSON.parse(storedOrders); } 
        catch (e) { orderList = []; }
    } 

    if (orderList.length === 0) {
        orderList = [
            {
                id: "DH-0001", date: "2026-10-10", customerName: "Nguyễn Nhật", customerPhone: "0901234567",
                customerAddress: "123 Đường Tôn Đức Thắng, Quận 1, TP.HCM", totalAmount: 300000, status: "pending",
                items: [{ name: "Áo thun Polo trơn", qty: 2, price: 150000 }]
            },
            {
                id: "DH-0002", date: "2026-10-09", customerName: "Lê Trần Dứa", customerPhone: "0987654321",
                customerAddress: "456 Nguyễn Thị Minh Khai, Quận 3, TP.HCM", totalAmount: 1450000, status: "processing",
                items: [{ name: "Giày thể thao Nike", qty: 1, price: 1200000 }, { name: "Vớ thể thao trắng", qty: 5, price: 50000 }]
            }
        ];
        localStorage.setItem('saved_orders', JSON.stringify(orderList));
    }

    renderOrderTable();
}

// 2. VẼ BẢNG ĐƠN HÀNG
function renderOrderTable() {
    const tbody = document.getElementById('orderTableBody');
    if (!tbody) return;

    if (orderList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-row">Chưa có đơn hàng nào trong hệ thống!</td></tr>`;
        return;
    }

    tbody.innerHTML = orderList.map(order => {
        let badgeHtml = "";
        switch (order.status) {
            case 'pending': badgeHtml = `<span class="badge badge-pending">Chờ xác nhận</span>`; break;
            case 'processing': badgeHtml = `<span class="badge badge-delivering">Đang giao hàng</span>`; break;
            case 'completed': badgeHtml = `<span class="badge badge-completed">Thành công</span>`; break;
            case 'cancelled': badgeHtml = `<span class="badge badge-loss">Đã hủy</span>`; break;
        }

        return `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.date}</td>
                <td>
                    <strong>${order.customerName}</strong><br>
                    <span style="font-size: 12px; color: #6c757d;">📞 ${order.customerPhone}</span>
                </td>
                <td style="text-align: right; color: #dc3545; font-weight: bold;">${formatMoney(order.totalAmount)}</td>
                <td style="text-align: center;">${badgeHtml}</td>
                <td style="text-align: center;">
                    <button class="btn-action btn-view-detail" onclick="openOrderModal('${order.id}')">Chi tiết / Duyệt</button>
                </td>
            </tr>`;
    }).join('');
}

// 3. MỞ MODAL XEM CHI TIẾT
function openOrderModal(orderId) {
    const order = orderList.find(o => o.id === orderId);
    if (!order) return;

    currentEditingOrderId = order.id;

    document.getElementById('modalOrderId').innerText = order.id;
    document.getElementById('modalCustomerName').value = order.customerName;
    document.getElementById('modalCustomerPhone').value = order.customerPhone;
    document.getElementById('modalCustomerAddress').value = order.customerAddress;
    document.getElementById('modalOrderTotal').innerText = formatMoney(order.totalAmount);
    document.getElementById('modalOrderStatusUpdate').value = order.status;

    const detailBody = document.getElementById('orderDetailBody');
    detailBody.innerHTML = order.items.map((item, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td style="text-align: center;">${item.qty}</td>
            <td style="text-align: right;">${formatMoney(item.price)}</td>
            <td style="text-align: right; font-weight: bold;">${formatMoney(item.qty * item.price)}</td>
        </tr>
    `).join('');

    document.getElementById('orderModal').style.display = 'flex';
}

// 4. LƯU CẬP NHẬT TRẠNG THÁI
function saveOrderStatus() {
    const newStatus = document.getElementById('modalOrderStatusUpdate').value;
    const orderIndex = orderList.findIndex(o => o.id === currentEditingOrderId);
    
    if (orderIndex > -1) {

        orderList[orderIndex].status = newStatus;
        localStorage.setItem('saved_orders', JSON.stringify(orderList));
        
        closeModal();
        
        renderOrderTable();
        
        applyOrderFilters(); 
    
    }
}

// 5. BỘ LỌC ĐƠN HÀNG 
function applyOrderFilters() {
    const searchFilter = document.getElementById('orderSearchInput').value.trim().toUpperCase();
    const fromTime = document.getElementById('orderFromDate').value ? new Date(document.getElementById('orderFromDate').value).setHours(0,0,0,0) : null;
    const toTime = document.getElementById('orderToDate').value ? new Date(document.getElementById('orderToDate').value).setHours(23,59,59,999) : null;
    const statusFilter = document.getElementById('orderStatusFilter').value;

    const rows = document.getElementById('orderTableBody').getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('empty-row')) continue;

        const idText = rows[i].getElementsByTagName('td')[0].textContent.trim().toUpperCase();
        const customerText = rows[i].getElementsByTagName('td')[2].textContent.trim().toUpperCase();
        const dateText = rows[i].getElementsByTagName('td')[1].textContent.trim();
        const orderData = orderList[i]; 

        const matchSearch = idText.includes(searchFilter) || customerText.includes(searchFilter);
        const matchStatus = (statusFilter === "ALL" || orderData.status === statusFilter);

        let matchDate = true;
        if (dateText) {
            const rowTime = new Date(dateText).setHours(12,0,0,0);
            if (fromTime && rowTime < fromTime) matchDate = false;
            if (toTime && rowTime > toTime) matchDate = false;
        }

        if (matchSearch && matchStatus && matchDate) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
/*======================================================================
    HÀM CHUYỂN ĐỔI TAB (MÔ HÌNH SINGLE PAGE APPLICATION)
======================================================================*/ 
function switchTab(tabName) {
    // 1. Ẩn tất cả các module
    const modules = document.querySelectorAll('.admin-module');
    modules.forEach(mod => mod.style.display = 'none');

    // 2. Chỉ hiện module được người dùng click chọn
    const targetModule = document.getElementById('tab-' + tabName);
    if(targetModule) targetModule.style.display = 'block';

    // 3. Xóa class active ở tất cả thẻ <li> và gắn lại cho thẻ vừa click
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    const activeMenu = document.getElementById('menu-' + tabName);
    if(activeMenu) activeMenu.classList.add('active');

    // 4. Reset & Tải lại dữ liệu trực tiếp để 2 kho tự đồng bộ hóa với nhau ngay lập tức
    if (tabName === 'pricing') {
        loadDataForPricing();
    } else if (tabName === 'imports') {
        renderTable();
    } else if (tabName === 'orders') {
        loadDataForOrders();
    }
}