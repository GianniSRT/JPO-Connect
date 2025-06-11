<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$pdo = new PDO('mysql:host=localhost;dbname=journee_porte_ouverte;charset=utf8mb4', 'root', ''); // adapte le mot de passe si besoin

$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['nom']) &&
    isset($data['prenom']) &&
    isset($data['email']) &&
    isset($data['mot_de_passe'])
) {
    // Hash du mot de passe pour la sécurité
    $hashed_password = password_hash($data['mot_de_passe'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, adresse) VALUES (?, ?, ?, ?, ?)");
    $ok = $stmt->execute([
        $data['nom'],
        $data['prenom'],
        $data['email'],
        $hashed_password,
        $data['adresse'] ?? null
    ]);

    if ($ok) {
        $id_utilisateur = $pdo->lastInsertId();
        echo json_encode(['success' => true, 'id_utilisateur' => $id_utilisateur]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erreur lors de la création']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Données manquantes']);
}