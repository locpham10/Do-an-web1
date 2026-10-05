/* =======================================
   DÀNH RIÊNG CHO TRANG QUẢN LÝ NHẬP HÀNG
==========================================*/

// 1. Khai báo trạng thái (State)
let importList = [];
let currentDraftItems = [];
let editIndex = null;
let currentImageBase64 = "";

let productCatalog = new Set([]);

const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%236c757d'%3ECh%C6%B0a c%C3%B3 %E1%BA%A3nh%3C/text%3E%3C/svg%3E";

// 2. Các hàm tương tác với HTML của trang Import

function closeModal() {
    const modal = document.getElementById('importModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function renderTable() {
    const tableBody = document.getElementById('importTableBody');
    if (!tableBody) {
        return;
    }

    if (importList.length === 0) {
        tableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="5">
                    <span class="empty-icon">📋</span>
                    Chưa có phiếu nhập nào. Bấm <b>+ Lập phiếu mới</b> để tạo!
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = importList.map(function(item, index) {
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
                <td>
                    <span class="badge ${badgeClass}">${badgeText}</span>
                </td>
                <td>
                    <button class="btn-action ${btnClass}" onclick="openEditModal(${index})">
                        ${btnText}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function openAddModel() {
    editIndex = null;
    currentDraftItems = [];
    
    document.getElementById('modalTitle').innerText = "Lập phiếu nhập hàng";
    
    const modalCode = document.getElementById('modalCode');
    modalCode.value = ""; 
    modalCode.readOnly = false; 
    modalCode.style.backgroundColor = "#ffffff";
    
    const modalDate = document.getElementById('modalDate');
    modalDate.valueAsDate = new Date(); 
    modalDate.readOnly = false;

    resetItemInputForm();
    
    document.getElementById('addItemControls').style.display = "flex";
    document.getElementById('actionHeader').style.display = "table-cell";
    document.getElementById('btnSaveDraft').style.display = "inline-block"; 
    document.getElementById('btnSaveComplete').style.display = "inline-block";

    renderDetailTable();
    
    document.getElementById('importModal').style.display = 'flex';
}

function openEditModal(index) {
    editIndex = index;
    const item = importList[index];
    const isCompleted = (item.status === 'completed');

    document.getElementById('modalTitle').innerText = isCompleted ? "Chi Tiết Phiếu Nhập: " + item.code : "Sửa Phiếu Nhập: " + item.code;
    
    const modalCode = document.getElementById('modalCode');
    modalCode.value = item.code; 
    modalCode.readOnly = true; 
    modalCode.style.backgroundColor = "#e9ecef";
    
    const modalDate = document.getElementById('modalDate');
    modalDate.value = item.date; 
    modalDate.readOnly = isCompleted;

    currentDraftItems = JSON.parse(JSON.stringify(item.items));
    
    document.getElementById('addItemControls').style.display = isCompleted ? "none" : "flex"; 
    document.getElementById('actionHeader').style.display = isCompleted ? "none" : "table-cell";
    document.getElementById('btnSaveDraft').style.display = isCompleted ? "none" : "inline-block"; 
    document.getElementById('btnSaveComplete').style.display = isCompleted ? "none" : "inline-block";

    renderDetailTable(isCompleted);
    
    document.getElementById('importModal').style.display = 'flex';
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

    if (!name) { 
        alert("Vui lòng nhập tên mặt hàng!"); 
        nameInput.focus(); 
        return; 
    }
    
    if (isNaN(qty) || qty <= 0) { 
        alert("Số lượng phải lớn hơn 0!"); 
        return; 
    }
    
    if (isNaN(price) || price <= 0) { 
        alert("Đơn giá nhập không hợp lệ!"); 
        return; 
    }

    productCatalog.add(name); 

    const existing = currentDraftItems.find(function(i) {
        return i.name.toLowerCase() === name.toLowerCase();
    });

    if (existing) {
        existing.qty += qty; 
        existing.price = price; 
        if (currentImageBase64) {
            existing.image = finalImage;
        }
    } else {
        currentDraftItems.push({
            image: finalImage,
            name: name,
            qty: qty,
            price: price
        });
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
        detailBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #888; padding: 15px;">
                    Chưa có mặt hàng nào. Vui lòng nhập và bấm + Thêm hàng.
                </td>
            </tr>
        `;
        totalDisplay.innerText = "0 đ";
        return;
    }

    let grandTotal = 0;
    
    detailBody.innerHTML = currentDraftItems.map(function(item, idx) {
        const lineTotal = item.qty * item.price;
        grandTotal += lineTotal;
        
        let removeButtonHtml = '';
        if (!isReadOnly) {
            removeButtonHtml = `
                <td style="text-align: center;">
                    <button class="btn-remove-item" onclick="removeItemFromDraft(${idx})">&times;</button>
                </td>
            `;
        }

        return `
            <tr>
                <td>${idx + 1}</td>
                <td style="text-align: center;">
                    <img src="${item.image}" class="product-thumb" alt="Ảnh SP">
                </td>
                <td><strong>${item.name}</strong></td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right;">${formatMoney(item.price)}</td>
                <td style="text-align: right;"><strong>${formatMoney(lineTotal)}</strong></td>
                ${removeButtonHtml}
            </tr>
        `;
    }).join('');
    
    totalDisplay.innerText = formatMoney(grandTotal);
}

function saveForm(statusToSave) {
    const code = document.getElementById('modalCode').value.trim().toUpperCase();
    const date = document.getElementById('modalDate').value;

    if (!code || !date) { 
        alert("Vui lòng nhập đủ mã phiếu và ngày nhập hàng!"); 
        return; 
    }
    
    if (currentDraftItems.length === 0) { 
        alert("Phiếu nhập phải có ít nhất 1 mặt hàng!"); 
        return; 
    }
    
    if (statusToSave === 'completed') {
        const confirmMsg = "Xác nhận Hoàn thành? Hàng sẽ được đẩy vào kho và phiếu không thể sửa lại.";
        if (!confirm(confirmMsg)) {
            return;
        }
    }

    const totalAmount = currentDraftItems.reduce(function(sum, item) {
        return sum + (item.qty * item.price);
    }, 0);

    if (editIndex === null) {
        const isDuplicate = importList.some(function(item) {
            return item.code.toUpperCase() === code;
        });
        
        if (isDuplicate) { 
            alert("Mã phiếu đã tồn tại!"); 
            return; 
        }
        
        importList.push({ 
            code: code, 
            date: date, 
            items: currentDraftItems, 
            totalAmount: totalAmount, 
            status: statusToSave 
        });
    } else {
        importList[editIndex].date = date; 
        importList[editIndex].items = currentDraftItems;
        importList[editIndex].totalAmount = totalAmount; 
        importList[editIndex].status = statusToSave;
    }
    
    closeModal();
    renderTable();
}

function searchImport() {
    const filter = document.getElementById('searchInput').value.toUpperCase();
    const rows = document.getElementById('importTableBody').getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains('empty-row')) {
            continue;
        }
        
        const codeCol = rows[i].getElementsByTagName('td')[0];
        
        if (codeCol) {
            const textValue = codeCol.textContent || codeCol.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

// 3. Khởi chạy sự kiện lắng nghe riêng cho trang Import
document.addEventListener("DOMContentLoaded", function() {
    
    const tableBody = document.getElementById('importTableBody');
    if (!tableBody) {
        return;
    }

    const itemImageInput = document.getElementById('itemImage');
    if (itemImageInput) {
        itemImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) { 
                    currentImageBase64 = event.target.result; 
                }
                reader.readAsDataURL(file);
            } else {
                currentImageBase64 = "";
            }
        });
    }

    const itemProduct = document.getElementById('itemProduct');
    const productSuggestions = document.getElementById('productSuggestions');
    
    if (itemProduct && productSuggestions) {
        itemProduct.addEventListener('input', function() {
            const keyword = this.value.trim().toLowerCase();
            productSuggestions.innerHTML = ''; 

            if (!keyword) { 
                productSuggestions.style.display = 'none'; 
                return; 
            }

            const matches = Array.from(productCatalog).filter(function(name) {
                return name.toLowerCase().includes(keyword);
            });
            
            if (matches.length > 0) {
                matches.forEach(function(match) {
                    const li = document.createElement('li');
                    li.textContent = match;
                    li.onclick = function() {
                        itemProduct.value = match;
                        productSuggestions.style.display = 'none'; 
                        document.getElementById('itemQuantity').focus(); 
                    };
                    productSuggestions.appendChild(li);
                });
                productSuggestions.style.display = 'block';
            } else {
                productSuggestions.style.display = 'none';
            }
        });

        document.addEventListener('click', function(e) {
            if (e.target !== itemProduct && e.target !== productSuggestions) {
                productSuggestions.style.display = 'none';
            }
        });
    }

    const itemPrice = document.getElementById('itemPrice');
    if (itemPrice) {
        itemPrice.addEventListener('keydown', function(e) {
            let currentValue = parseFloat(this.value) || 0;
            if (e.key === 'ArrowUp') { 
                e.preventDefault(); 
                this.value = currentValue + 1000; 
            } else if (e.key === 'ArrowDown') { 
                e.preventDefault(); 
                this.value = Math.max(0, currentValue - 1000); 
            }
        });
    }

    const modal = document.getElementById('importModal');
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    renderTable();
});