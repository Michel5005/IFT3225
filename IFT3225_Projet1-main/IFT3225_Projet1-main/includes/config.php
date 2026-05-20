<?php
// Configuration Base de Donnees pour MAMP / DIRO

if (file_exists(__DIR__ . '/pwd_prod.php')) {
    require __DIR__ . '/pwd_prod.php';
} else {
    // Local (MAMP)
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'ift3225_projet_tuiles');
    define('DB_USER', 'root');
    define('DB_PASS', 'root');
}

define('DB_CHARSET', 'utf8mb4');
