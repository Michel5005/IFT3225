<?php

    require_once __DIR__ . '/../includes/db.php';

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET; // dsn = data source name, pour connection PDO
            
    try {
        $bdd = new PDO($dsn, DB_USER, DB_PASS);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // info supp pour identifier bd, juste le copier-coller.

    } catch (PDOException $e) {
        die("PDO error: " . $e->getMessage());
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $name = $_POST["username"];
        $password = $_POST["password"];

        $query_name = $bdd->prepare("SELECT COUNT(*) FROM accounts WHERE account_name = :name");
        $query_name->execute(['name' => $name]);
        $name_exists = $query_name->fetchColumn(); // combien de fois je la vois dans la colonne "email" -> 0 si existe pas, 1 si existe

        if ($name_exists > 0) {
            $error_msg = "Ce courriel est deja utilisé!";
        } else {
            try {
                $query = $bdd->prepare(
                    "INSERT INTO accounts (account_name, account_passwd, account_reg_time)
                    VALUES (:name, :password, NOW())"
                );
                $query->execute([
                    "name" => $name,
                    "password" => password_hash($password, PASSWORD_DEFAULT),
                ]);
                $success_msg = "Inscription reussie! Vous pouvez desormais vous connecter";
            } catch (PDOException $e) {
                $error_msg = "Erreur lors de l'inscription : " . $e->getMessage();
            }
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

<h2>Confirmation d'inscription</h2> <!-- ici on traite les cas -->

<?php if (isset($error_msg)) : ?>
    <p class="error"><?= htmlspecialchars($error_msg, ENT_QUOTES, 'UTF-8') ?></p>
    <p><a href="login.php">Se connecter</a></p>

<?php elseif (isset($success_msg)) : ?>
    <p class="success"><?= htmlspecialchars($success_msg, ENT_QUOTES, 'UTF-8') ?></p>
    <p><a href="login.php">Se connecter</a></p>

<?php endif; ?>

</body>
</html>
