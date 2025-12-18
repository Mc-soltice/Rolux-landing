<?php


// Autorisations CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connexion à la base de données
// require_once __DIR__ . '/../utile/mailer.php';
require_once __DIR__ . "/../config/db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. 🔄 Récupération des données
    $name    = $_POST['name']    ?? '';
    $email   = $_POST['email']   ?? '';
    $subject   = $_POST['subject']   ?? '';
    $message = $_POST['message'] ?? '';

            // 1bis. ✅ Validation structurelle des données
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Email invalide."]);
        exit;
    }

    // 2. ✅ Validation des champs
    if (!$name || !$email) {
        http_response_code(400);
        echo json_encode(["error" => "Nom et email sont obligatoires."]);
        exit;
    }

    // 3. 📁 Créer un dossier au nom du candidat
    $uniqueId = uniqid();
    $safeFolderName = strtolower(trim(preg_replace('/[^a-zA-Z0-9-_]/', '_', $name))) . "_$uniqueId";
    $upload = __DIR__ . "/../upload/contact/$safeFolderName";

    if (!is_dir($upload)) {
        mkdir($upload, 0777, true); // Crée récursivement le dossier
    }

    // 5. 📄 Enregistrer les infos dans un fichier texte
    $date = date('Y-m-d H:i:s');
    $infoTxt = "Date: $date\nNom: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message\n";
    file_put_contents("$upload/info.txt", $infoTxt);

    // 6. 💾 Enregistrer dans la base de données
    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $subject, $message]);
        echo json_encode([
        "success" => true,
        "message" => "Nous vous repondrons dans de bref delais"
        ]);
    } catch (PDOException $e) {
        file_put_contents(__DIR__ . '/../logs/errors.log', date('Y-m-d H:i:s') . ' - ' . $e->getMessage() . "\n", FILE_APPEND);
        http_response_code(500);
        echo json_encode(["error" => "Erreur lors de l'enregistrement en base de données."]);
        exit;
    }


    // // **********Pour éviter des failles XSS ou injection HTML */
    // $name = htmlspecialchars(trim($name), ENT_QUOTES, 'UTF-8');
    // $email = htmlspecialchars(trim($email), ENT_QUOTES, 'UTF-8');
    // $subject = htmlspecialchars(trim($subject), ENT_QUOTES, 'UTF-8');
    // $message = htmlspecialchars(trim($message), ENT_QUOTES, 'UTF-8');


    // // *********envoi du mail*/
    // $emailParams = [
    //     'from' => ['support@monsite.com', 'Formulaire Contact'],
    //     'replyTo' => [$email, $name],
    //     'to' => ['support@monsite.com', 'Support Client'],
    //     'subject' => "Demande de contact de $subject",
    //     'body' => "
    //     <h3>Message de contact</h3>
    //     <p><strong>Nom :</strong> {$name}</p>
    //     <p><strong>Email :</strong> {$email}</p>
    //     <p><strong>Message :</strong><br>{$message}</p>
    //     "
    // ];
    // sendEmail($emailParams);

    exit;
}
