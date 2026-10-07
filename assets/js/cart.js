const items = [
    {id: 1, name: "OPPO Reno16 F 5G 8GB 256GB Trắng CPH2859", price: 14990000, old: 15990000, qty: 1, color: "Trắng", checked: true},
    {id: 2, name: "Samsung Galaxy S25 5G 12GB 256GB", price: 18990000, old: 19990000, qty: 1, color: "Đen", checked: true}
];

const cartItems = document.getElementById("cartItems");
const selectAll = document.getElementById("selectAll");
const totalEl = document.getElementById("total");
const payEl = document.getElementById("pay");
const countEl = document.getElementById("count");

function money(n) {
    return n.toLocaleString("vi-VN") + "đ";
}

function render() {
    if (!items.length) {
        cartItems.innerHTML = '<div class="empty">Giỏ hàng đang trống</div>';
        updateSummary();
        return;
    }

    cartItems.innerHTML = items.map(item => `
        <div class="product">
            <div class="product-main">
                <input class="item-check" data-id="${item.id}" type="checkbox" ${item.checked ? "checked" : ""}>
                <div class="product-img"><div class="phone"></div></div>
                <div>
                    <div class="name">${item.name}</div>
                    <div class="color">Màu: ${item.color}　⌄</div>
                </div>
                <div class="prices">
                    <div class="sale">${money(item.price)}</div>
                    <div class="old">${money(item.old)}</div>
                </div>
                <div class="qty">
                    <button class="minus" data-id="${item.id}">−</button>
                    <span>${item.qty}</span>
                    <button class="plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove" data-id="${item.id}">♙</button>
            </div>
            <div class="promo">🟠 <b>SIM SHOP</b>　Mua kèm gói cước ưu đãi</div>
        </div>
    `).join("");

    document.querySelectorAll(".item-check").forEach(el => {
        el.addEventListener("change", () => {
            const item = items.find(x => x.id == el.dataset.id);
            item.checked = el.checked;
            updateSummary();
        });
    });

    document.querySelectorAll(".plus").forEach(el => el.addEventListener("click", () => changeQty(el.dataset.id, 1)));
    document.querySelectorAll(".minus").forEach(el => el.addEventListener("click", () => changeQty(el.dataset.id, -1)));
    document.querySelectorAll(".remove").forEach(el => el.addEventListener("click", () => removeItem(el.dataset.id)));

    updateSummary();
}

function changeQty(id, amount) {
    const item = items.find(x => x.id == id);
    item.qty = Math.max(1, item.qty + amount);
    render();
}

function removeItem(id) {
    const index = items.findIndex(x => x.id == id);
    items.splice(index, 1);
    render();
}

function updateSummary() {
    const selected = items.filter(x => x.checked);
    const total = selected.reduce((sum, x) => sum + x.price * x.qty, 0);
    const discount = selected.length ? 1000000 : 0;
    const pay = Math.max(0, total - discount);

    totalEl.textContent = money(total);
    payEl.textContent = money(pay);
    countEl.textContent = `(${selected.length})`;
    selectAll.checked = items.length > 0 && selected.length === items.length;
}

selectAll.addEventListener("change", () => {
    items.forEach(item => item.checked = selectAll.checked);
    render();
});

document.getElementById("deleteAll").addEventListener("click", () => {
    for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].checked) items.splice(i, 1);
    }
    render();
});

document.getElementById("checkout").addEventListener("click", () => {
    if (!items.some(x => x.checked)) {
        alert("Dứa hãy chọn ít nhất một sản phẩm.");
        return;
    }
    alert("Đã xác nhận đơn demo. Phần thông tin giao hàng sẽ làm ở bước tiếp theo.");
});

render();
