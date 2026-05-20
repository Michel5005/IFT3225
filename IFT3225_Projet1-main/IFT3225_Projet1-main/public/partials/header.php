<?php 

?>
<link rel="stylesheet" href="./assets/css/style.css">
<header>
    <nav class="navbar">
        <ul>
            <li><a href="index.php" class="logo"><img src="./assets/images/logo1.png"></a></li>
            <li><a href="user_home.php"><h2>Livres</h2></a></li>
            <li class="user-menu">
                <?php if(isset($_SESSION['account_id'])): ?>
                    <a href="user_home.php">
                        <img src="./assets/images/user.jpg" class="user-icon">
                    </a>
                <?php else: ?>
                    <img src="./assets/images/user.jpg" class="user-icon">
                <?php endif; ?>
            <div class="drop-menu">
                <?php if (isset($_SESSION['account_id'])): ?>
                <a href="logout.php">Déconnexion</a>
                <?php else: ?>
                <a href="register.php">Inscription</a>
                <a href="login.php">Connexion</a>
                <?php endif; ?>
            </div>    
        </li>
        </ul>
    </nav>
</header>