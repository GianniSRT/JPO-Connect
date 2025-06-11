<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$pdo = new PDO('mysql:host=localhost;dbname=journee_porte_ouverte;charset=utf8mb4', 'root', '');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['mot_de_passe'])) {
    $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE email = ?");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['mot_de_passe'], $user['mot_de_passe'])) {
        echo json_encode(['success' => true, 'id_utilisateur' => $user['id_utilisateur'], 'nom' => $user['nom']]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Identifiants invalides']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Données manquantes']);
}