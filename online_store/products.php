<?php
include('db.php');

$result = $conn->query("SELECT * FROM products");
while ($row = $result->fetch_assoc()) {
    echo "<div>";
    echo "<h2>" . $row['name'] . "</h2>";
    echo "<p>" . $row['description'] . "</p>";
    echo "<p>Price: " . $row['price'] . "</p>";
    echo "<p>Stock: " . $row['stock'] . "</p>";
    echo "<img src='" . $row['image'] . "' alt='Product Image'>";
    echo "</div>";
}
?>
