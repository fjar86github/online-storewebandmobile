<?php
session_start();
include('db.php'); // Include database connection

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Initialize variables
$product_id = "";
$name = "";
$description = "";
$price = "";
$stock = "";
$image = "";

// Check if the product ID is provided
if (isset($_GET['id'])) {
    $product_id = $_GET['id'];

    // Fetch product details from the database
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $name = $row['name'];
        $description = $row['description'];
        $price = $row['price'];
        $stock = $row['stock'];
        $image = $row['image'];
    } else {
        echo "<p>Product not found.</p>";
        exit();
    }
}

// Handle form submission for updating the product
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $stock = $_POST['stock'];
    $image = $_POST['image'];

    // Update product in the database
    $stmt = $conn->prepare("UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ? WHERE id = ?");
    $stmt->bind_param("ssdisi", $name, $description, $price, $stock, $image, $product_id);
    $stmt->execute();

    header("Location: index.php"); // Redirect to the main page after update
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Product</title>
    <link rel="stylesheet" href="style.css"> <!-- Link to CSS file -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f9fc;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            background: #ffffff;
            padding: 2em;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        h1 {
            font-size: 1.5em;
            color: #333;
            margin-bottom: 1em;
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 1em;
        }
        label {
            font-size: 0.9em;
            color: #555;
            text-align: left;
            margin-bottom: 0.2em;
        }
        input[type="text"],
        input[type="number"],
        textarea {
            padding: 0.5em;
            font-size: 1em;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            box-sizing: border-box;
        }
        button {
            padding: 0.7em;
            font-size: 1em;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        .message {
            margin-top: 1em;
            font-size: 0.9em;
        }
        .back-link {
            margin-top: 1em;
            font-size: 0.9em;
            color: #007bff;
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Edit Product</h1>
        <form method="POST">
            <label for="name">Product Name:</label>
            <input type="text" name="name" id="name" value="<?php echo htmlspecialchars($name); ?>" required>

            <label for="description">Description:</label>
            <textarea name="description" id="description" required><?php echo htmlspecialchars($description); ?></textarea>

            <label for="price">Price:</label>
            <input type="number" name="price" id="price" value="<?php echo htmlspecialchars($price); ?>" step="0.01" required>

            <label for="stock">Stock:</label>
            <input type="number" name="stock" id="stock" value="<?php echo htmlspecialchars($stock); ?>" required>

            <label for="image">Image URL:</label>
            <input type="text" name="image" id="image" value="<?php echo htmlspecialchars($image); ?>" required>

            <button type="submit">Update Product</button>
        </form>
        <p><a href="index.php" class="back-link">Back to Product List</a></p>
    </div>
</body>
</html>