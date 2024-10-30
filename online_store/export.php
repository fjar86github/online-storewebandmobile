<?php
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=data_export.csv');
session_start();
include('db.php');
// Check if user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
// Database connection settings
$servername = "localhost"; // e.g., "localhost"
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "online_store_db"; // your database name

// Create connection
//$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

// Set column headers for CSV file
fputcsv($output, ['Table', 'ID', 'Username', 'Email', 'Product Name', 'Description', 'Price', 'Stock', 'Order Date', 'Quantity']);

// Query and fetch data from users table
$resultUsers = $conn->query("SELECT id, username, email FROM users");
while ($row = $resultUsers->fetch_assoc()) {
    fputcsv($output, ['users', $row['id'], $row['username'], $row['email'], '', '', '', '', '', '']);
}

// Query and fetch data from products table
$resultProducts = $conn->query("SELECT id, name, description, price, stock FROM products");
while ($row = $resultProducts->fetch_assoc()) {
    fputcsv($output, ['products', $row['id'], '', '', $row['name'], $row['description'], $row['price'], $row['stock'], '', '']);
}

// Query and fetch data from orders table
$resultOrders = $conn->query("SELECT id, user_id, product_id, quantity, order_date FROM orders");
while ($row = $resultOrders->fetch_assoc()) {
    fputcsv($output, ['orders', $row['id'], '', '', '', '', '', '', $row['order_date'], $row['quantity']]);
}

// Close the file pointer
fclose($output);
$conn->close();
exit();