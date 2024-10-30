<?php
session_start();
include('db.php'); // Include database connection

// Pagination variables
$limit = 10; // Number of products per page
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

// Sales statistics
$sales_stats_query = "SELECT 
        p.id AS product_id,
        p.name AS product_name,
        COALESCE(SUM(o.quantity), 0) AS total_quantity_sold,
        COALESCE(SUM(o.quantity * p.price), 0) AS total_sales,
        COUNT(o.id) AS total_orders
    FROM 
        products p
    LEFT JOIN 
        orders o ON p.id = o.product_id
    GROUP BY 
        p.id
    ORDER BY 
        total_sales DESC";
$sales_stats_result = $conn->query($sales_stats_query);
$sales_stats = $sales_stats_result->fetch_assoc();

// Handle product deletion
if (isset($_GET['delete'])) {
    $product_id = $_GET['delete'];
    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    header("Location: index.php"); // Redirect after deletion
    exit();
}

// Handle product search
$search_query = "";
if (isset($_POST['search'])) {
    $search_query = $_POST['search'];
    $search_query = "%$search_query%";
    $query = "SELECT * FROM products WHERE name LIKE ? OR description LIKE ? LIMIT ?, ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssii", $search_query, $search_query, $offset, $limit);
} else {
    $query = "SELECT * FROM products LIMIT ?, ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $offset, $limit);
}

// Execute query
$stmt->execute();
$result = $stmt->get_result();

// Get total number of products for pagination
$total_query = "SELECT COUNT(*) as total FROM products";
$total_result = $conn->query($total_query);
$total_row = $total_result->fetch_assoc();
$total_products = $total_row['total'];
$total_pages = ceil($total_products / $limit);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Store</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <!-- Font Awesome for icons -->
    <style>
        .product-item {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            margin: 10px;
            text-align: center;
            transition: transform 0.2s;
        }

        .product-item:hover {
            transform: scale(1.05);
        }

        .pagination {
            justify-content: center;
        }

        .pagination-link {
            margin: 0 5px;
        }

        .active {
            font-weight: bold;
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="my-4">
            <h1 class="text-center">Welcome to the Online Store</h1>
            <div class="text-center">
                <?php if (isset($_SESSION['username'])): ?>
                    <p>Hello, <?php echo htmlspecialchars($_SESSION['username']); ?>! 
                       <a href="logout.php" class="btn btn-link"><i class="fas fa-sign-out-alt"></i> Logout</a> | 
                       <a href="add_product.php" class="btn btn-link"><i class="fas fa-plus"></i> Add Product</a> | 
                       <a href="order.php" class="btn btn-link"><i class="fas fa-shopping-cart"></i> Order Page</a>
		       <a href="import.php" class="btn btn-secondary">Import Data</a>
			<a href="export.php" class="btn btn-secondary">Export Data</a>
                    </p>
                <?php else: ?>
                    <p><a href="login.php" class="btn btn-link"><i class="fas fa-sign-in-alt"></i> Login</a> | 
                       <a href="register.php" class="btn btn-link"><i class="fas fa-user-plus"></i> Register</a></p>
                <?php endif; ?>
            </div>
        </header>
        
        <!-- Sales Statistics Section -->
        <section class="sales-statistics mb-4">
            <h2 class="text-center">Sales Statistics</h2>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                        <p><strong>Product Id:</strong> <?php echo $sales_stats['product_id']; ?></p>
                            <p><strong>Nama Produk:</strong> <?php echo $sales_stats['product_name']; ?></p>
                            <p><strong>Total Penjualan:</strong> $<?php echo number_format($sales_stats['total_quantity_sold'], 2); ?></p>
                            <p><strong>Total Sales:</strong> <?php echo $sales_stats['total_sales']; ?></p>
                            <p><strong>Total Permintaan:</strong> <?php echo $sales_stats['total_orders']; ?></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="search-section mb-4">
            <h2 class="text-center">Search Products</h2>
            <form method="POST" class="form-inline justify-content-center">
                <input type="text" name="search" value="<?php echo htmlspecialchars($search_query); ?>" placeholder="Search for products..." class="form-control mr-2" required>
                <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i> Search</button>
            </form>
        </section>
        
        <section class="product-section">
            <h2 class="text-center">Products</h2>
            <div class="row">
                <?php if ($result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <div class="col-md-4">
                            <div class="product-item">
                                <img src="<?php echo htmlspecialchars($row['image']); ?>" alt="<?php echo htmlspecialchars($row['name']); ?>" class="img-fluid" style="max-height: 200px; object-fit: cover;">
                                <div class="product-info mt-2">
                                    <h5><?php echo htmlspecialchars($row['name']); ?></h5>
                                    <p><?php echo htmlspecialchars($row['description']); ?></p>
                                    <p class="price">Price: $<?php echo number_format($row['price'], 2); ?></p>
                                    <p class="stock">Stock: <?php echo htmlspecialchars($row['stock']); ?></p>
                                    <div class="product-actions">
                                        <a href="edit_product.php?id=<?php echo $row['id']; ?>" class="btn btn-warning btn-sm">Edit</a>
                                        <a href="?delete=<?php echo $row['id']; ?>" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this product?');">Delete</a>
                                        <?php if (isset($_SESSION['username'])): ?>
                                            <a href="order.php?product_id=<?php echo $row['id']; ?>" class="btn btn-success btn-sm">Order Now</a>
                                        <?php else: ?>
                                            <span>Please <a href="login.php" class="btn btn-link">log in</a> to place an order.</span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; ?>
                <?php else: ?>
                    <p class="text-center">No products available.</p>
                <?php endif; ?>
            </div>
            
            <!-- Pagination Links -->
            <div class="pagination mt-4">
                <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                    <a href="?page=<?php echo $i; ?>" class="pagination-link btn btn-outline-primary <?php echo $i === $page ? 'active' : ''; ?>"><?php echo $i; ?></a>
                <?php endfor; ?>
            </div>
        </section>
        
        <footer class="text-center my-4">
            <p>&copy; <?php echo date("Y"); ?> Online Store. All Rights Reserved.</p>
        </footer>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
