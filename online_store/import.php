<?php
session_start();
include('db.php');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    die("Please log in to access this page.");
}

// Handle CSV file upload
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['csv_file'])) {
    $file = $_FILES['csv_file']['tmp_name'];

    if ($_FILES['csv_file']['error'] === UPLOAD_ERR_OK) {
        // Open the CSV file for reading
        if (($handle = fopen($file, 'r')) !== false) {
            // Prepare a statement for inserting data
            $stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");

            // Skip the header row
            fgetcsv($handle);
            while (($data = fgetcsv($handle)) !== false) {
                // Assuming the CSV columns are: username, password, email
                $username = $data[0];
                $password = password_hash($data[1], PASSWORD_BCRYPT); // Hash the password
                $email = $data[2];

                // Bind parameters and execute
                $stmt->bind_param("sss", $username, $password, $email);
                $stmt->execute();
            }

            fclose($handle);
            $message = "<div class='alert alert-success'>Data imported successfully.</div>";
        } else {
            $message = "<div class='alert alert-danger'>Error opening the CSV file.</div>";
        }
    } else {
        $message = "<div class='alert alert-danger'>File upload error: " . $_FILES['csv_file']['error'] . "</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import Data</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h2 class="text-center mb-4">Import Data</h2>

        <?php if (isset($message)) echo $message; ?>

        <form method="POST" enctype="multipart/form-data" class="border p-4 rounded bg-white">
            <div class="form-group">
                <label for="csv_file">Upload CSV File:</label>
                <input type="file" name="csv_file" id="csv_file" class="form-control" accept=".csv" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Import</button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>