<?php

require_once __DIR__ . '/../includes/db.php';

ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();

$error_msg = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST["username"];
    $password = $_POST["password"];

    $query_name = $bdd->prepare("SELECT COUNT(*)
                                 FROM accounts 
                                 WHERE account_name = :name"
    );
    $query_name->execute(['name' => $name]);
    $name_exists = $query_name->fetchColumn(); // combien de fois je la vois dans la colonne "email" -> 0 si existe pas, 1 si existe

    $query = $bdd->prepare(
        "SELECT account_id, account_name, account_passwd
         FROM accounts 
         WHERE account_name = :name"
    );

    $query->execute(["name" => $name]);
    $user = $query->fetch();

    if ($user && password_verify($password, $user["account_passwd"])) { // enregistre le username et id dans $_SESSION
        $_SESSION['account_id'] = $user['account_id'];
        $_SESSION['account_name'] = $user['account_name'];

        header('Location: user_home.php');
        exit;
    } else {
        $error_msg = "Identifiants incorrects.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./assets/css/style.css">
    <title>Accueil</title>
</head>

<body>
    <?php require("./partials/header.php"); ?>
    <div class="form-center">
        <h2>Connexion</h2>
        <form method="POST" action="login.php">

            <label>Identifiant</label>
            <input id="username" name="username" type="text" placeholder="nom d'utilisateur" required>

            <label>Mot de passe</label>
            <input id="password" name="password" type="password" placeholder="mot de passe" required>

            <button type="submit">Se connecter</button>
        </form>
        <p><a href="register.php">Pas de compte?</a></p>
    </div>
    <?php if ($error_msg): ?>
        <p class="error"><?= htmlspecialchars($error_msg) ?></p>
    <?php endif; ?>
    <?php require("./partials/footer.php"); ?>
</body>

</html>
