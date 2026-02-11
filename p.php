<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ================= DB CONNECTION =================
$conn = mysqli_connect("localhost", "root", "", "pearls_petals");
if (!$conn) {
    die("DB Connection Failed: " . mysqli_connect_error());
}

$action = $_POST['action'] ?? "";


// ================= BOOKING =================
if ($action === "booking") {

    $name    = $_POST['name'] ?? "";
    $email   = $_POST['email'] ?? "";
    $phone   = $_POST['phone'] ?? "";
    $address = $_POST['address'] ?? "";
    $country = $_POST['country'] ?? "";
    $city    = $_POST['city'] ?? "";
    $product = $_POST['product'] ?? "";
    $price   = $_POST['price'] ?? 0;

    $sql = "INSERT INTO bookings 
            (name, email, phone, address, country, city, product, price)
            VALUES 
            ('$name', '$email', '$phone', '$address', '$country', '$city', '$product', '$price')";

    echo mysqli_query($conn, $sql) ? "success" : mysqli_error($conn);
}


// ================= CONTACT =================
if ($action === "contact") {

    $name = $_POST['name'] ?? "";
    $email = $_POST['email'] ?? "";
    $message = $_POST['message'] ?? "";

    $sql = "INSERT INTO contacts (name, email, message)
            VALUES ('$name', '$email', '$message')";

    echo mysqli_query($conn, $sql) ? "success" : mysqli_error($conn);
}


// ================= SUPPORT =================
if ($action === "support") {

    $type = $_POST['type'] ?? "";
    $order = $_POST['order'] ?? "";
    $message = $_POST['message'] ?? "";

    if ($type === "Complaint") {
        $sql = "INSERT INTO complaints (issue) VALUES ('$message')";
    }
    elseif ($type === "Feedback") {
        $sql = "INSERT INTO feedback (feedback) VALUES ('$message')";
    }
    elseif ($type === "Return") {
        $sql = "INSERT INTO returns (order_no, reason)
                VALUES ('$order', '$message')";
    }
    elseif ($type === "Refund") {
        $sql = "INSERT INTO refunds (order_no, reason)
                VALUES ('$order', '$message')";
    }

    echo mysqli_query($conn, $sql) ? "success" : mysqli_error($conn);
}
?>
