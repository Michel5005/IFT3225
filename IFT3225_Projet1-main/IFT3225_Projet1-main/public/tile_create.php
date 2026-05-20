<?php

ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();
require_once __DIR__ . '/../includes/db.php';

if (!isset($_SESSION['account_id'])) {
    exit("Pas connecté");
}

// Verifie si le compte est admin
$query_admin = $bdd->prepare("SELECT admin FROM accounts WHERE account_id = :account_id");
$query_admin->execute(['account_id' => $_SESSION['account_id']]);
$isAdmin = (bool)$query_admin->fetchColumn();

$accountID = (int)$_SESSION['account_id'];
$tileID = trim($_POST['tile_id'] ?? '');
$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$category = trim($_POST['category'] ?? '');
$tile_date = $_POST['tile_date'] ?? '';

if ($title === '' || $category === '' || $tile_date === '') {
    exit("Veuillez remplir les champs obligatoires.");
}

// Creation d'une nouvelle tuile
if($tileID === "") {
    $query = $bdd->prepare(
      "INSERT INTO tiles (account_id, title, description, category, tile_date)
      VALUES (:account_id, :title, :description, :category, :tile_date)"
    );

    $query->execute([
      'account_id' => $_SESSION['account_id'],
      'title' => $title,
      'description' => $description,
      'category' => $category,
      'tile_date' => $tile_date,
    ]);
echo "OK";
exit;
}

// Sinon modification d'une tuile existante
$tileIdInt = (int)$tileID;
$sql = "UPDATE tiles
        SET title = :title,
            description = :description,
            category = :category,
            tile_date = :tile_date
        WHERE tile_id = :tile_id";

$params = [
  'title' => $title,
  'description' => $description,
  'category' => $category,
  'tile_date' => $tile_date,
  'tile_id' => $tileIdInt,
];

if (!$isAdmin) {
  $sql .= " AND account_id = :account_id";
  $params['account_id'] = $accountID;
}

$stmt = $bdd->prepare($sql);
$stmt->execute($params);
