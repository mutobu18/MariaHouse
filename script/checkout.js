let cart = JSON.parse(localStorage.getItem("mariahouse_cart")) || [];

function loadCart() {

    let container = document.getElementById("order-summary");
    let totalBox = document.getElementById("total");

    let total = 0;

    container.innerHTML = "";

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

function goToPayment() {

    window.location.href = "payment.html";
}

loadCart();