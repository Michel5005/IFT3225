<?php
ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();

require_once __DIR__ . '/../includes/db.php';

if (!isset($_SESSION['account_id'])) {
  header('Location: login.php');
  exit;
}

$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$category = trim($_POST['category'] ?? '');
$tile_date = $_POST['tile_date'] ?? '';

if ($title === '' || $category === '' || $tile_date === '') {
    echo "<script>alert('Les champs titre, catégorie et date sont obligatoires.');</script>";
    exit;
}



$query = "INSERT INTO tiles (account_id, title, description, category, tile_date)
        VALUES (:account_id, :title, :description, :category, :tile_date)";

$stmt = $bdd->prepare($query);
$stmt->execute([
  'account_id' => $_SESSION['account_id'],
  'title' => $title,
  'description' => $description,
  'category' => $category,
  'tile_date' => $tile_date,
]);

header('Location: user_home.php');
exit;
