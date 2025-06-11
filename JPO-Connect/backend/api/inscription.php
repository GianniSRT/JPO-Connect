<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Pour le développement local
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$pdo = new PDO('mysql:host=localhost;dbname=journee_porte_ouverte;charset=utf8mb4', 'root', ''); // adapte le mot de passe si besoin

$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['id_jpo']) &&
    isset($data['id_utilisateur'])
) {
    $stmt = $pdo->prepare("INSERT INTO inscription (date_inscription, est_present, id_jpo, id_utilisateur) VALUES (CURDATE(), 0, ?, ?)");
    $ok = $stmt->execute([$data['id_jpo'], $data['id_utilisateur']]);
    echo json_encode(['success' => $ok]);
} else {
    echo json_encode(['success' => false, 'error' => 'Données manquantes']);
}