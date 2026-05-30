const notifications = JSON.parse(
    localStorage.getItem("notifications")
) || [];

const container = document.getElementById("notifications-list");

notifications.forEach(notification => {

    container.innerHTML += `
        <div class="product-card">
            <h3>${notification.title}</h3>
            <p>${notification.message}</p>
            <p><small>${notification.date}</small></p>
        </div>
        <br>
    `;
});