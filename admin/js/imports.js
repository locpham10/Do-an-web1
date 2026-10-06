/* =========================================================
   MODULE XỬ LÝ TRANG QUẢN LÝ NHẬP HÀNG (IMPORTS)
========================================================= */

// 1. Biến toàn cục
let importList = [];
let productCatalog = new Set([]);
let currentDraftItems = [];
let editIndex = null;
let currentImageBase64 = "";

const DEFAULT_IMAGE = "../assets/images/default-image.svg"; // Ảnh mặc định

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
function closeModal() {
    const modal = document.getElementById('importModal');
    if (modal) modal.style.display = 'none';
}

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

function searchImport() {
    const filter = document.getElementById('searchInput').value.toUpperCase();
    const rows = document.getElementById('importTableBody').getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('empty-row')) continue;
        const codeCol = rows[i].getElementsByTagName('td')[0];
        if (codeCol) {
            rows[i].style.display = (codeCol.innerText.toUpperCase().indexOf(filter) > -1) ? "" : "none";
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