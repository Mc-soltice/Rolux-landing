<?php
// config/db.php

$host = 'localhost';
$dbname = 'umbrella_industrial_services';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    file_put_contents(__DIR__ . '/../logs/error.log', date('Y-m-d H:i:s') . ' - DB ERROR: ' . $e->getMessage() . "\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(["error" => "Connexion échouée : " . $e->getMessage()]);
    exit;
}
