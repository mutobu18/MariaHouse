// Get saved phone number
const phone = localStorage.getItem("customerPhone");

// Get total amount
const amount = localStorage.getItem("cartTotal");

// Display details
document.getElementById("confirm-phone").textContent =
phone || "Not provided";

document.getElementById("confirm-amount").textContent =
(amount || "0") + " $";

function confirmPayment(){

    alert(
        "Are you sure you want to pay " + (amount || "0") + " $ from the phone number: " + (phone || "Not provided") + "?"
    );

    // Later:
    // Here we'll connect the official Vodacom M-Pesa API
}