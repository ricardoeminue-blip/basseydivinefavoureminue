<?php
session_start();

if (isset($_POST['login'])) {
    $_SESSION['username'] = $_POST['username'];
}

if (!isset($_SESSION['username'])) {
    header('Location: index.html');
    exit;
}

if (!isset($_SESSION['products'])) {
    $_SESSION['products'] = array();
}

if (isset($_POST['add'])) {
    $_SESSION['products'][] = array(
        'name' => $_POST['name'],
        'price' => $_POST['price']
    );
}

if (isset($_POST['delete'])) {
    unset($_SESSION['products'][$_POST['number']]);
    $_SESSION['products'] = array_values($_SESSION['products']);
}

if (isset($_POST['logout'])) {
    session_destroy();
    header('Location: index.html');
    exit;
}
?>

<h1>Products</h1>
<p>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></p>

<form method="post">
    <p>Product name: <input type="text" name="name" required></p>
    <p>Price: <input type="number" name="price" step="0.01" required></p>
    <button type="submit" name="add">Add product</button>
</form>

<h2>Product list</h2>

<table border="1">
    <tr>
        <th>Product name</th>
        <th>Price</th>
        <th>Delete</th>
    </tr>

    <?php foreach ($_SESSION['products'] as $number => $product): ?>
        <tr>
            <td><?php echo htmlspecialchars($product['name']); ?></td>
            <td><?php echo htmlspecialchars($product['price']); ?></td>
            <td>
                <form method="post" class="delete-form">
                    <input type="hidden" name="number" value="<?php echo $number; ?>">
                    <button type="submit" name="delete">Delete</button>
                </form>
            </td>
        </tr>
    <?php endforeach; ?>
</table>

<form method="post">
    <p><button type="submit" name="logout">Logout</button></p>
</form>

<script src="script.js"></script>
