// Display the total from localStorage
let total = localStorage.getItem("cartTotal");

if(total){
    document.getElementById("payment-amount").textContent = total + " $";
}else{
    document.getElementById("payment-amount").textContent = "0 $";
}

function continuePayment(){

    const phone = document.getElementById("phone").value.trim();

    if(phone === ""){
        alert("Please enter your Vodacom M-Pesa phone number.");
        return;
    }

    // Save phone number for the next page
    localStorage.setItem("customerPhone", phone);

    // Go to confirmation page
    window.location.href = "confirm-payment.html";
}