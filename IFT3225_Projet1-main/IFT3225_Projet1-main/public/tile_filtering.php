<?php
ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();
require_once __DIR__ . '/../includes/db.php';

if (!isset($_SESSION['account_id'])) {
  exit;
}

// Logique nombre de tuiles par pages
$perPage = 15;
$page = max(1, (int)($_GET['page'] ?? 1));
$offset = ($page - 1) * $perPage;

// Verifie si le compte est admin
$query_admin = $bdd->prepare("SELECT admin FROM accounts WHERE account_id = :account_id");
$query_admin->execute(['account_id' => $_SESSION['account_id']]);
$isAdmin = (bool)$query_admin->fetchColumn();

$title = trim($_GET['title'] ?? '');
$description = trim($_GET['description'] ?? '');
$category = trim($_GET['category'] ?? '');
$dateBegin = $_GET['date_begin'] ?? '';
$dateEnd = $_GET['date_end'] ?? '';

// Requete sql
$query = "SELECT tile_id, title, description, category, tile_date
          FROM tiles 
          WHERE 1=1 ";
$params = [];

if (!$isAdmin) {
  $query .= " AND account_id = :account_id";
  $params['account_id'] = $_SESSION['account_id'];
}



if ($title !== '') {
  $query .= " AND title LIKE :title";
  $params['title'] = "%$title%";
}

if ($description !== '') {
  $query .= " AND description LIKE :description";
  $params['description'] = "%$description%";
}

if ($category !== '') {
  $query .= " AND category LIKE :category";
  $params['category'] = "%$category%";
}

if ($dateBegin !== '') {
  $query .= " AND tile_date >= :date_begin";
  $params['date_begin'] = $dateBegin;
}

if ($dateEnd !== '') {
  $query .= " AND tile_date <= :date_end";
  $params['date_end'] = $dateEnd;
}

$query .= " ORDER BY title ASC LIMIT $perPage OFFSET $offset";

$stmt = $bdd->prepare($query);
$stmt->execute($params);
$tiles = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Affichage
foreach ($tiles as $tile): ?>
  <div class="tile" data-tile-id="<?= (int)$tile['tile_id'] ?>">
    <h3><?= htmlspecialchars($tile['title']) ?></h3>
    <p><?= htmlspecialchars($tile['description']) ?></p>
    <small>
      <span><?= htmlspecialchars($tile['category']) ?></span>
      <span><?= htmlspecialchars($tile['tile_date']) ?></span>
    </small>
    <div class="tile-actions">
      <button type="button" class="btn-edit">✏️</button>
      <button type="button" class="btn-delete">🗑️</button>
    </div>
  </div>
<?php endforeach; ?>
