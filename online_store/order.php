<?php
session_start();
include('db.php');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    die("Please log in to place an order.");
}

$user_id = $_SESSION['user_id'];

// Fetch available products
$product_query = "SELECT id AS product_id, name, price, stock, image FROM products WHERE stock > 0";
$product_result = $conn->query($product_query);

// Check if the query was successful
if (!$product_result) {
    die("Query failed: " . $conn->error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];

    // Validate input
    if ($quantity <= 0) {
        echo "<div class='alert alert-danger'>Quantity must be greater than zero.</div>";
    } else {
        // Check product stock
        $stock_check_query = $conn->prepare("SELECT stock FROM products WHERE id = ?");
        $stock_check_query->bind_param("i", $product_id);
        $stock_check_query->execute();
        $stock_result = $stock_check_query->get_result();
        $product = $stock_result->fetch_assoc();

        if ($product && $product['stock'] >= $quantity) {
            // Place order and update stock in a transaction
            $conn->begin_transaction();
            try {
                // Insert order
                $order_query = $conn->prepare("INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)");
                $order_query->bind_param("iii", $user_id, $product_id, $quantity);
                $order_query->execute();

                // Update product stock
                $update_stock_query = $conn->prepare("UPDATE products SET stock = stock - ? WHERE id = ?");
                $update_stock_query->bind_param("ii", $quantity, $product_id);
                $update_stock_query->execute();

                // Commit transaction
                $conn->commit();
                echo "<div class='alert alert-success'>Order placed successfully!</div>";

                // Refresh the page to load updated product stock
                header("Refresh:1; url=" . $_SERVER['PHP_SELF']);
                exit(); // Stop executing the script
            } catch (Exception $e) {
                $conn->rollback();
                echo "<div class='alert alert-danger'>Error placing order: " . $e->getMessage() . "</div>";
            }
        } else {
            echo "<div class='alert alert-danger'>Insufficient stock for the selected product.</div>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order Page</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }
        .product-card:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h1 class="text-center mb-4">Place an Order</h1>
        
        <div class="row">
            <?php while ($product = $product_result->fetch_assoc()) { ?>
                <div class="col-md-4 mb-4">
                    <div class="product-card p-3 text-center">
                        <?php if (!empty($product['image'])): ?>
                            <img src="<?php echo htmlspecialchars($product['image']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" class="img-fluid mb-3">
                        <?php else: ?>
                            <img src="placeholder.png" alt="No image available" class="img-fluid mb-3">
                        <?php endif; ?>
                        <h2 class="h5"><?php echo htmlspecialchars($product['name']); ?></h2>
                        <p class="font-weight-bold">Price: $<?php echo number_format($product['price'], 2); ?></p>
                        <p>Stock: <?php echo $product['stock']; ?></p>
                        
                        <form method="POST" class="order-form">
                            <input type="hidden" name="product_id" value="<?php echo $product['product_id']; ?>">
                            <div class="form-group">
                                <label for="quantity_<?php echo $product['product_id']; ?>">Quantity:</label>
                                <input type="number" name="quantity" id="quantity_<?php echo $product['product_id']; ?>" class="form-control" min="1" max="<?php echo $product['stock']; ?>" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Place Order</button>
                        </form>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

<?php
$conn->close();
?>
