// =========================
// MARIAHOUSE SHOPPING CART
// =========================

let cart = [];

// =========================
// ADD PRODUCT TO CART
// =========================

function selectProduct(name, price) {

    let existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();
}

// =========================
// UPDATE CART DISPLAY
// =========================

function updateCart() {

    const cartContainer =
        document.getElementById("cart-items");

    let total = 0;

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        cartContainer.innerHTML += `

            <div class="cart-item">

                <h4>${item.name}</h4>

                <p>
                    Price:
                    $${item.price.toFixed(2)}
                </p>

                <div class="cart-qty">

                    <button
                        onclick="changeQty(${index}, -1)">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQty(${index}, 1)">
                        +
                    </button>

                </div>

                <p>
                    Subtotal:
                    $${subtotal.toFixed(2)}
                </p>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        `;
    });

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<p>No products selected</p>";
    }

    document.getElementById("total").innerText =
        "$" + total.toFixed(2);
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
// REMOVE PRODUCT
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

// =========================
// PAYMENT
// =========================

function pay() {

    if (cart.length === 0) {

        alert(
            "Please select at least one product."
        );

        return;
    }

    let total =
        document.getElementById("total").innerText;

    let summary = "Order Summary:\n\n";

    cart.forEach(item => {

        summary +=
            item.name +
            " x" +
            item.quantity +
            "\n";
    });

    summary +=
        "\nTotal: " +
        total;

    alert(summary);

    // Later:
    // Redirect to payment page
    // window.location.href = "payment.html";
}

// =========================
// IMAGE UPLOAD
// =========================

function uploadImage(event) {

    let file = event.target.files[0];

    if (!file) return;

    document.getElementById(
        "upload-status"
    ).innerText =
        "Uploaded: " +
        file.name +
        " (Waiting for admin response)";
}