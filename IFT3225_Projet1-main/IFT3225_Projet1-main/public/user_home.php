<?php
ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();

if (!isset($_SESSION['account_id'])) {
        header('Location: login.php');
        exit;
}

require_once __DIR__ . '/../includes/db.php';

/* Verifie si utilisateur = admin */
$query_admin = $bdd->prepare("
        SELECT admin
        FROM accounts
        WHERE account_id = :account_id
        ");
$query_admin->execute(['account_id' => $_SESSION['account_id']]);
$isAdmin = (bool)$query_admin->fetchColumn();

/* Compte le nombre de tuile correspondant au user ou toutes les tuiles si admin */
if ($isAdmin) {
    $query_count = $bdd->prepare("SELECT COUNT(*) FROM tiles");
    $query_count->execute();
} else {
    $query_count = $bdd->prepare("SELECT COUNT(*) FROM tiles WHERE account_id = :account_id");
    $query_count->execute(['account_id' => $_SESSION['account_id']]);
}

/* Gestion du nombre de tuiles par pages */
$perPage = 15;
$page = max(1, (int)($_GET['page'] ?? 1)); /* trouve le # de page specifie dans le url de la requete ou page 1 si absent */
$offset = ($page -1) * $perPage;
$total_tiles = (int)$query_count->fetchColumn();
$total_pages = (int)ceil($total_tiles / $perPage);

/* Requete pour le fetch des tuiles */
$sql = "SELECT tile_id, title, tile_date, category, description
        FROM tiles ";

if (!$isAdmin) {
        $sql .= "WHERE account_id = :account_id ";
}

$sql .= "ORDER BY title ASC
         LIMIT $perPage OFFSET $offset";

$query = $bdd->prepare($sql);

if (!$isAdmin) {$query->execute(['account_id' => $_SESSION['account_id']]);}
else {$query->execute();}

$tiles = $query->fetchAll(PDO::FETCH_ASSOC);
?>
        
<!DOCTYPE html>
<html lang="fr">
<head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="./assets/css/style.css">
        <!-- Pour le script ci-dessous, pas certain si on a vu "defer" dans le cours, mais l'ajout de tuiles fonctionnait pas sans -->
        <!-- Ca faisait un GET normal, alors que je voulais pouvoir ajouter les tuiles en asynchrone -->
        <script src="tile_filtering.js" defer></script>
        <title>Accueil</title>
</head>
<body>
        <?php include('./partials/header.php'); ?>
<h2>Bienvenue, <?=  ($_SESSION['account_name']) ?></h2>
<div class="container">
        <div class="tile">
                <form>
                        <h3>Filtres</h3>
                        <input type="text" id="title_f" placeholder="Titre" onkeyup="filterTiles()">
                        <input type="text" id="description_f" placeholder="Description" onkeyup="filterTiles()">
                        <input type="text" id="category_f" placeholder="Categorie" onkeyup="filterTiles()">
                        <label>Tuile créée après le</label><input type="date" id="date_begin_f" placeholder="Date création" onchange="filterTiles()">
                        <label>mais avant le</label><input type="date" id="date_end_f" onchange="filterTiles()">
                </form>
        </div>
        <div class="tile">
                <form id="tile_form">
                        <h3>Créer/modifier</h3>
                        <!-- tile_id hidden, utile pour requete DB mais utilisateur en a pas besoin-->
                        <input type="hidden" id="tile_id_m" name="tile_id" value="">
                        <input type="text" id="title_m" name="title" placeholder="Titre*" required>
                        <textarea id="description_m" name="description" placeholder="Description" rows="3"
                                oninput="this.style.height='';this.style.height=this.scrollHeight+'px'"></textarea>
                        <input type="text" id="category_m" name="category" placeholder="Categorie*" required></input>
                        <input type="date" id="date_m" name="tile_date" required></input>
                        <div class="tile-actions">
                                <button type="button" id="btn-cancel-edit">Annuler</button>
                                <button type="submit">Confirmer</button>
                        </div>
                </form>
        </div>

        <div id="tiles_result">
                <?php foreach ($tiles as $tile): ?>
                        <!-- data-tile-id nécessaire pour faire fonctionner les boutons dans les tuiles -->
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
        </div>
</div>
<nav class="pagination">
        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <?php if ($i === $page): ?>
                        <strong><?= $i ?></strong>
                <?php else: ?>
                        <a href="?page=<?= $i ?>"><?= $i ?></a>
                <?php endif; ?>
        <?php endfor; ?>
</nav>


<?php include('./partials/footer.php'); ?>
</body></html>
