const orders = JSON.parse(localStorage.getItem("orders")) || [];

const ordersList = document.getElementById("orders-list");
const totalOrders = document.getElementById("total-orders");
const totalSpent = document.getElementById("total-spent");

if (orders.length === 0) {

    ordersList.innerHTML = "<p>No orders found.</p>";

} else {

    let html = "";
    let grandTotal = 0;

    orders.forEach((order, index) => {

        html += `
            <div class="product-card">
                <h4>Order #${index + 1}</h4>
                <p>${order.date}</p>
        `;

        order.items.forEach(item => {
            html += `
                <p>
                    ${item.name}
                    (${item.quantity})
                    - $${(item.price * item.quantity).toFixed(2)}
                </p>
            `;
        });

        html += `
                <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
            </div>
            <br>
        `;

        grandTotal += order.total;
    });

    ordersList.innerHTML = html;
    totalOrders.textContent = orders.length;
    totalSpent.textContent = "$" + grandTotal.toFixed(2);
}