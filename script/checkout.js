let cart = JSON.parse(localStorage.getItem("mariahouse_cart")) || [];

// LOAD CART
function loadCart() {

    let container = document.getElementById("order-summary");
    let totalBox = document.getElementById("total");

    let total = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>No products selected</p>";
        totalBox.innerText = "Total: $0.00";
        return;
    }

    cart.forEach(item => {

        let subtotal = item.price * item.quantity;
        total += subtotal;

        container.innerHTML += `
            <p>
                ${item.name} x ${item.quantity}
                = $${subtotal.toFixed(2)}
            </p>
        `;
    });

    totalBox.innerText = "Total: $" + total.toFixed(2);
}

// ✅ PAYMENT BUTTON FUNCTION
function goToPayment() {
    window.location.href = "payment.html";
}

// RUN WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", function () {
    loadCart();
});