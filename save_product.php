<?php

$conn = new mysqli("localhost", "root", "", "mariahouse");

$data = json_decode(file_get_contents("php://input"), true);

$cart = $data['cart'];

foreach ($cart as $item) {

    $name = $item['name'];
    $price = $item['price'];
    $qty = $item['quantity'];

    $stmt = $conn->prepare("
        INSERT INTO mariahouse_products 
        (product_name, price, quantity)
        VALUES (?, ?, ?)
    ");

    $stmt->bind_param("sdi", $name, $price, $qty);
    $stmt->execute();
}

echo "Cart saved successfully";

$conn->close();

?>