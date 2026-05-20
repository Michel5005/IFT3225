<?php

ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();

?>

<!DOCTYPE html>
<html lang="fr">

<head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="./assets/css/style.css">
        <title>Accueil</title>
</head>

<body>
        <?php include('./partials/header.php'); ?>
        <h2>Accueil</h2>
        <?php if (!isset($_SESSION['account_id'])): ?>
                <a href="./register.php" class="btn">Inscription</a>
                <a href="./login.php" class="btn">Connexion</a>
        <?php else: ?> Vous êtes connecté.
        <?php endif; ?>
        <?php include('./partials/footer.php'); ?>
</body>

</html>