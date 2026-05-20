<?php
ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();
require_once __DIR__ . '/../includes/db.php';

if (!isset($_SESSION['account_id'])) {
  http_response_code(401);
  exit("Pas connecté");
}

$tileId = (int)($_POST['tile_id'] ?? 0);
if ($tileId <= 0) {
  http_response_code(400);
  exit("Tile_id invalide");
}

$query = $bdd->prepare(
  "DELETE FROM tiles WHERE tile_id = :tile_id AND account_id = :account_id"
);

$query->execute([
  'tile_id' => $tileId,
  'account_id' => $_SESSION['account_id']
]);

echo "OK";
