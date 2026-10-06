/* =========================================================
   MODULE XỬ LÝ TRANG QUẢN LÝ GIÁ BÁN & LỢI NHUẬN (BẢN CHỐNG LỖI)
========================================================= */

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

function closeModal() {
    document.getElementById('pricingModal').style.display = 'none';
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
        if (!confirm("CẢNH BÁO: Giá bán đang thấp hơn giá nhập (CHỊU LỖ).\nBạn có chắc chắn muốn lưu?")) return;
    }

    const prodIndex = pricingList.findIndex(p => p.code === currentProductCode);
    if (prodIndex > -1) {
        pricingList[prodIndex].retailPrice = retailPrice;
        
        // BẮT BUỘC: Đẩy vào LocalStorage để KHÔNG BỊ MẤT DỮ LIỆU KHI SẬP NGUỒN
        localStorage.setItem('saved_pricing', JSON.stringify(pricingList));
    }
    
    closeModal();
    renderPricingTable();
}

function searchProduct() {
    const filter = document.getElementById('searchInput').value.toUpperCase();
    const rows = document.getElementById('pricingTableBody').getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const codeCol = rows[i].getElementsByTagName('td')[0];
        const nameCol = rows[i].getElementsByTagName('td')[2];
        if (codeCol || nameCol) {
            const text = (codeCol.textContent || "") + " " + (nameCol.textContent || "");
            rows[i].style.display = text.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

/* --- 5. TỰ ĐỘNG CHẠY KHI MỞ TRANG --- */
document.addEventListener("DOMContentLoaded", () => {
    loadDataForPricing();
});