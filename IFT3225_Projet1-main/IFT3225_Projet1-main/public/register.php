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
        <h2>Inscription</h2>

        <form method="POST" action="validation.php">

            <label>Identifiant</label>
            <input id="username" name="username" type="email" placeholder="adresse courriel" required>

            <label>Mot de passe</label>
            <input id="password" name="password" type="password" placeholder="mot de passe" required>

            <button type="submit">Créer un compte</button>
        </form>
        <p><a href="login.php">Déjà un compte?</a></p>
    </div>
    <?php require("./partials/footer.php"); ?>
</body>

</html>
