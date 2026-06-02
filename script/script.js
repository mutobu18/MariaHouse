// =========================
// MARIAHOUSE CART SYSTEM (CLEAN FIXED)
// =========================

let cart = [];

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", function () {
    loadCart();
});

// =========================
// LOAD CART
// =========================
function loadCart() {

    let saved = localStorage.getItem("mariahouse_cart");

    if (saved) {
        cart = JSON.parse(saved);
    }

    updateCart();
}

// =========================
// ADD PRODUCT
// =========================
function selectProduct(name, price) {

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

    saveCart();
    updateCart();
    showMessage("✔ Added to cart");
}

// =========================
// SAVE CART
// =========================
function saveCart() {
    localStorage.setItem("mariahouse_cart", JSON.stringify(cart));
}

// =========================
// UPDATE CART + COUNTER
// =========================
function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");

    if (cartItems) {
        cartItems.innerHTML = "";
    }

    let totalItems = 0;

    cart.forEach((item, index) => {

        totalItems += item.quantity;

        let subtotal = item.price * item.quantity;

        if (cartItems) {
            cartItems.innerHTML += `
                <div class="cart-item">

                    <h4>${item.name}</h4>

                    <p>$${item.price.toFixed(2)}</p>

                    <div>
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>

                    <p>Subtotal: $${subtotal.toFixed(2)}</p>

                    <button onclick="removeItem(${index})">Remove</button>

                </div>
            `;
        }
    });

    // update cart number (HOME + ALL PAGES)
    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cart.length === 0 && cartItems) {
        cartItems.innerHTML = "<p>No products selected</p>";
    }

    saveCart();
}

// =========================
// CHANGE QUANTITY
// =========================
function changeQty(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// =========================
// REMOVE ITEM
// =========================
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// =========================
// MESSAGE POPUP
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