// =========================
// MARIAHOUSE CART SYSTEM (FINAL CLEAN)
// =========================

// ADD PRODUCT
function selectProduct(button, name, price) {

    // CHANGE BUTTON STATE
    button.innerText = "Selected";
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.disabled = true;

    // CART LOGIC
    let cart = JSON.parse(localStorage.getItem("mariahouse_cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("mariahouse_cart", JSON.stringify(cart));

    updateCartCount();
    showMessage("✔ Added to cart");
}
// =========================
// CART COUNT (HEADER - ALL PAGES)
// =========================
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("mariahouse_cart")) || [];

    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let counter = document.getElementById("cart-count");
    if (counter) {
        counter.textContent = totalItems;
    }
}

// =========================
// LOAD CART PAGE (TABLE VIEW)
// =========================
function loadCartPage() {

    let cart = JSON.parse(localStorage.getItem("mariahouse_cart")) || [];

    let tableBody = document.getElementById("cart-items");
    let totalEl = document.getElementById("total");
    let itemsCount = document.getElementById("items-count");
    let discountEl = document.getElementById("discount");

    if (!tableBody || !totalEl || !itemsCount || !discountEl) return;

    let total = 0;
    let totalItems = 0;

    tableBody.innerHTML = "";

    if (cart.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">No products selected</td></tr>`;
        totalEl.textContent = "0.00";
        itemsCount.textContent = "0";
        discountEl.textContent = "0.00";
        return;
    }

    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;

        total += subtotal;
        totalItems += item.quantity;

        tableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>

                <td>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </td>

                <td>$${subtotal.toFixed(2)}</td>

                <td>
                    <button onclick="removeItem(${index})"
                        style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    // Discount logic (optional)
    let discount = total > 100 ? total * 0.1 : 0;
    let finalTotal = total - discount;

    itemsCount.textContent = totalItems;
    discountEl.textContent = discount.toFixed(2);
    totalEl.textContent = finalTotal.toFixed(2);
}

// =========================
// CHANGE QUANTITY
// =========================
function changeQty(index, change) {

    let cart = JSON.parse(localStorage.getItem("mariahouse_cart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("mariahouse_cart", JSON.stringify(cart));

    loadCartPage();
    updateCartCount();
}

// =========================
// REMOVE ITEM
// =========================
function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("mariahouse_cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("mariahouse_cart", JSON.stringify(cart));

    loadCartPage();
    updateCartCount();
}

// =========================
// POPUP MESSAGE
// =========================
function showMessage(text) {

    let msg = document.getElementById("cart-message");

    if (!msg) return;

    msg.textContent = text;
    msg.classList.add("show");

    setTimeout(() => {
        msg.classList.remove("show");
    }, 1500);
}

// =========================
// INIT (RUN ON EVERY PAGE)
// =========================
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();

    if (typeof loadCartPage === "function") {
        loadCartPage();
    }
});