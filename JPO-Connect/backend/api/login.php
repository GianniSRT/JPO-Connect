<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Connexion à la base de données
    $pdo = new PDO('mysql:host=localhost;dbname=journee_porte_ouverte;charset=utf8mb4', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des données JSON envoyées en POST
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérification des champs attendus
    if (isset($data['email']) && isset($data['mot_de_passe'])) {
        // Recherche de l'utilisateur par email
        $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Vérification du mot de passe
        if ($user && password_verify($data['mot_de_passe'], $user['mot_de_passe'])) {
            echo json_encode([
                'success' => true,
                'id_utilisateur' => $user['id_utilisateur'],
                'nom' => $user['nom'],
                'email' => $user['email']
            ]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Identifiants invalides']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Données manquantes']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}