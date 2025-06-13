<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$pdo = new PDO('mysql:host=localhost;dbname=journee_porte_ouverte;charset=utf8mb4', 'root', ''); // adapte le mot de passe si besoin

$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['id_jpo']) &&
    isset($data['id_utilisateur'])
) {
    // 1. Enregistre l'inscription
    $stmt = $pdo->prepare("INSERT INTO inscription (date_inscription, est_present, id_jpo, id_utilisateur) VALUES (CURDATE(), 0, ?, ?)");
    $ok = $stmt->execute([$data['id_jpo'], $data['id_utilisateur']]);

    // 2. Si inscription OK, récupère l'email utilisateur et infos JPO
    if ($ok) {
        // Récupère l'email et prénom de l'utilisateur
        $stmtUser = $pdo->prepare("SELECT email, prenom FROM utilisateur WHERE id_utilisateur = ?");
        $stmtUser->execute([$data['id_utilisateur']]);
        $user = $stmtUser->fetch(PDO::FETCH_ASSOC);

        // Récupère les infos de la JPO
        $stmtJpo = $pdo->prepare("SELECT ville, date, heure, lieu FROM jpo WHERE id_jpo = ?");
        $stmtJpo->execute([$data['id_jpo']]);
        $jpo = $stmtJpo->fetch(PDO::FETCH_ASSOC);

        if ($user && $jpo) {
            $to = $user['email'];
            $subject = "Confirmation d'inscription à la JPO de La Plateforme";
            $date = date('d/m/Y', strtotime($jpo['date']));
            $heure = substr($jpo['heure'], 0, 5);
            $message = "
            <html>
            <body>
            <h2>🎉 Merci pour votre inscription !</h2>
            <p>Bonjour {$user['prenom']},<br><br>
            Votre participation à la Journée Portes Ouvertes de La Plateforme a bien été enregistrée.</p>
            <ul>
              <li>📍 <b>Lieu :</b> {$jpo['lieu']} – {$jpo['ville']}</li>
              <li>📅 <b>Date :</b> {$date}</li>
              <li>🕒 <b>Heure :</b> {$heure}</li>
            </ul>
            <p>Un e-mail de confirmation vous a été envoyé à l'adresse que vous avez renseignée.<br>
            Vous recevrez également un rappel quelques jours avant l'événement.</p>
            <p>👉 En cas d'empêchement, vous pouvez vous désinscrire via le lien présent dans l'email.</p>
            <p>À très bientôt sur notre campus ! 👋<br><br>L’équipe de La Plateforme</p>
            </body>
            </html>
            ";
            $headers  = "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=UTF-8\r\n";
            $headers .= "From: noreply@laplateforme.io\r\n";

            mail($to, $subject, $message, $headers);
        }
    }

    echo json_encode(['success' => $ok]);
} else {
    echo json_encode(['success' => false, 'error' => 'Données manquantes']);
}