<?php
ini_set('session.save_path', __DIR__ . '/../sessions');
session_start();

$_SESSION = [];
 
session_destroy();

header('Location: index.php');
exit;