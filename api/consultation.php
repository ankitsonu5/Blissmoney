<?php
// Emails consultation / contact form submissions via Resend (https://resend.com).
// Settings live in api/config.php (NOT committed to git) – copy config.sample.php.

header('Content-Type: application/json; charset=utf-8');

function respond($code, $body) {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require $configFile : [];
$apiKey = $config['RESEND_API_KEY'] ?? '';
$to     = $config['TO_EMAIL'] ?? '';
$from   = $config['FROM_EMAIL'] ?? 'BlissMoney Website <onboarding@resend.dev>';
if (!$apiKey || !$to) {
    error_log('consultation: api/config.php missing RESEND_API_KEY or TO_EMAIL');
    respond(500, ['ok' => false, 'error' => 'Email service not configured']);
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) $data = $_POST;

// Honeypot: bots fill hidden fields; pretend success.
if (!empty($data['website'])) respond(200, ['ok' => true]);

$labels = [
    'name'           => 'Name',
    'first_name'     => 'First name',
    'last_name'      => 'Last name',
    'email'          => 'Email',
    'phone'          => 'Phone / WhatsApp',
    'portfolio'      => 'Portfolio / Investable assets',
    'mode'           => 'Preferred mode',
    'subject'        => 'Area of interest',
    'preferred_date' => 'Preferred date',
    'message'        => 'Message',
    'body'           => 'Message',
    'page'           => 'Submitted from',
];

$fields = [];
foreach ($labels as $key => $label) {
    if (isset($data[$key]) && is_string($data[$key]) && trim($data[$key]) !== '') {
        $fields[$key] = mb_substr(trim($data[$key]), 0, 4000);
    }
}

$name  = $fields['name'] ?? trim(($fields['first_name'] ?? '') . ' ' . ($fields['last_name'] ?? ''));
$email = $fields['email'] ?? '';
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['ok' => false, 'error' => 'Name and a valid email are required']);
}

$rows = '';
$text = '';
foreach ($fields as $key => $value) {
    $rows .= '<tr><td style="padding:6px 12px;color:#555;vertical-align:top;white-space:nowrap"><b>'
           . htmlspecialchars($labels[$key]) . '</b></td><td style="padding:6px 12px;white-space:pre-wrap">'
           . htmlspecialchars($value) . '</td></tr>';
    $text .= $labels[$key] . ': ' . $value . "\n";
}

$payload = [
    'from'     => $from,
    'to'       => array_values(array_filter(array_map('trim', explode(',', $to)))),
    'reply_to' => $email,
    'subject'  => mb_substr('New consultation request – ' . $name, 0, 200),
    'html'     => '<h2 style="font-family:sans-serif">New consultation request</h2>'
                . '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' . $rows . '</table>',
    'text'     => $text,
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS     => json_encode($payload),
]);
$resp   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err    = curl_error($ch);

if ($resp === false || $status < 200 || $status >= 300) {
    error_log('consultation: Resend error ' . $status . ' ' . ($err ?: $resp));
    respond(502, ['ok' => false, 'error' => 'Could not send email']);
}

respond(200, ['ok' => true]);
