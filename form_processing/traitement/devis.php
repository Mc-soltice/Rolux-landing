<?php


// Autorisations CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connexion à la base de données
require_once __DIR__ . '/../utile/mailer.php';
require_once __DIR__ . "/../config/db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. 🔄 Récupération des données
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $telephone = htmlspecialchars(trim($_POST['telephone'] ?? ''));
    $entreprise = htmlspecialchars(trim($_POST['entreprise'] ?? ''));
    $description = htmlspecialchars(trim($_POST['description'] ?? ''));
    $services = $_POST['services'] ?? [];
    // Si les services sont passés en tableau (ex: services[])
    if (!is_array($services)) {
        $services = [$services]; // Forcer en tableau au cas où
    }
    $jsonServices = json_encode($services); // encodage du tableau en chaîne JSON


    // 1bis. ✅ Validation structurelle des données
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Email invalide."]);
        exit;
    }

    // 2. ✅ Validation des champs
    if (!$name || !$email) {
        http_response_code(400);
        echo json_encode(["error" => "Nom ou email sont obligatoires."]);
        exit;
    }

    // 3. 📁 Créer un dossier au nom du candidat
    $uniqueId = uniqid();
    $safeFolderName = strtolower(trim(preg_replace('/[^a-zA-Z0-9-_]/', '_', $name))) . "_$uniqueId";
    $upload = __DIR__ . "/../upload/Devis/$safeFolderName";

    if (!is_dir($upload)) {
        mkdir($upload, 0777, true); // Crée récursivement le dossier
    }

    // 5. 📄 Enregistrer les infos dans un fichier texte
    $date = date('Y-m-d H:i:s');
    $infoTxt = "Date: $date\nNom: $name\nEmail: $email\nTelephone: $telephone\nEntreprise: $entreprise\nServices: " . implode(', ', $services) . "\nDescription:\n $description";
    file_put_contents("$upload/info.txt", $infoTxt);

    // 6. 💾 Enregistrer dans la base de données
    try {
        $stmt = $pdo->prepare("INSERT INTO demande_devis(name, email, telephone, entreprise, services, description) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $telephone, $entreprise, $jsonServices, $description]);
        echo json_encode([
            "success" => true,
            "message" => "Demande de devis envoyée avec succès !"
        ]);
    } catch (PDOException $e) {
        file_put_contents(__DIR__ . '/../logs/errors.log', date('Y-m-d H:i:s') . ' - ' . $e->getMessage() . "\n", FILE_APPEND);
        http_response_code(500);
        echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
        exit;
    }

    // **********Pour éviter des failles XSS ou injection HTML */
    $name = htmlspecialchars(trim($name), ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars(trim($email), ENT_QUOTES, 'UTF-8');
    $telephone = htmlspecialchars(trim($telephone), ENT_QUOTES, 'UTF-8');
    $description = htmlspecialchars(trim($description), ENT_QUOTES, 'UTF-8');

    // **************** Envoi du mail */
    $emailParams = [
        'from' => ['sales@royalluxmeuble.com', 'Formulaire Devis'],
        'replyTo' => [$data['email'], $data['name']],
        'to' => ['sales@royalluxmeuble.com', 'Umbrella Services'],
        'subject' => "Demande de devis : {$data['entreprise']}",
        'body' => "
            <h2>Nouvelle demande de devis</h2>
            <p><strong>Nom :</strong> {$name}</p>
            <p><strong>Téléphone :</strong> {$telephone}</p>
            <p><strong>Entreprise :</strong> {$entreprise}</p>
            <p><strong>Services :</strong> " . implode(', ', $services) . "</p>
            <p><strong>Description :</strong><br>{$description}</p>
        ",
        'attachment' => $attachmentPath ?? null
    ];

    sendEmail($emailParams);

} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée."]);
}
exit;

