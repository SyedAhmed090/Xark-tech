<?php
/**
 * Newsletter signup endpoint. Replaces app/api/subscribe/route.ts.
 *
 * The old route pushed subscribers into a Resend audience. There is no
 * equivalent here, so addresses are appended to a CSV stored outside
 * public_html and a notification is mailed to the studio. Export that CSV
 * into whatever mail tool you eventually use.
 */

require __DIR__ . '/config.php';

$data = read_json_body();

$email = field($data, 'email', 200);
$honeypot = field($data, 'company', 200);

if ($honeypot !== '') {
    respond(200, array('ok' => true));
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, array('ok' => false, 'reason' => 'invalid-email'));
}

if (!rate_limit_ok()) {
    respond(429, array('ok' => false, 'reason' => 'rate-limited'));
}

$dir = dirname(SUBSCRIBERS_FILE);
if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
    respond(500, array('ok' => false, 'reason' => 'storage-unavailable'));
}

$handle = @fopen(SUBSCRIBERS_FILE, 'a');
if ($handle === false) {
    respond(500, array('ok' => false, 'reason' => 'storage-unavailable'));
}

// Exclusive lock: two simultaneous signups would otherwise interleave writes
// and corrupt a row.
if (flock($handle, LOCK_EX)) {
    if (ftell($handle) === 0) {
        fputcsv($handle, array('email', 'subscribed_at', 'ip'));
    }
    fputcsv($handle, array(
        $email,
        gmdate('c'),
        $_SERVER['REMOTE_ADDR'] ?? '',
    ));
    fflush($handle);
    flock($handle, LOCK_UN);
}
fclose($handle);
@chmod(SUBSCRIBERS_FILE, 0600);

// Best-effort notification. A failure here doesn't fail the request — the
// address is already stored, which is the part that matters.
@mail(
    CONTACT_TO,
    '=?UTF-8?B?' . base64_encode('New newsletter subscriber') . '?=',
    header_safe($email) . " subscribed via xarktech.com.\n",
    implode("\r\n", array(
        'From: ' . header_safe(CONTACT_FROM_NAME) . ' <' . CONTACT_FROM . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    )),
    '-f' . CONTACT_FROM
);

respond(200, array('ok' => true));
