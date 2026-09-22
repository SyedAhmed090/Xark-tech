<?php
/**
 * Contact form endpoint. Replaces the Next.js route handler at
 * app/api/contact/route.ts, which cannot exist in a static export.
 *
 * Mail is handed to the local MTA, which is the same cPanel account that
 * receives CONTACT_TO — so delivery is a local handoff and SPF/DKIM already
 * pass for this domain. No external service, no API key.
 *
 * Contract is unchanged from the old route so the React form didn't need
 * rewriting: POST JSON, receive {ok: true} or {ok: false, reason}.
 */

require __DIR__ . '/config.php';

$data = read_json_body();

$name    = field($data, 'name', 200);
$email   = field($data, 'email', 200);
$message = field($data, 'message', 5000);
$budget  = field($data, 'budget', 50);
$honeypot = field($data, 'company', 200);

// Bots fill the hidden field. Report success and send nothing, so the bot
// doesn't learn the field is what rejected it.
if ($honeypot !== '') {
    respond(200, array('ok' => true));
}

if ($message === '' && $email === '') {
    respond(400, array('ok' => false, 'reason' => 'empty'));
}

// A malformed address is worth rejecting outright: it would be unusable as a
// Reply-To anyway, and it's the field most often used to attempt injection.
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, array('ok' => false, 'reason' => 'invalid-email'));
}

if (!rate_limit_ok()) {
    respond(429, array('ok' => false, 'reason' => 'rate-limited'));
}

$safeName = header_safe($name);
$safeEmail = header_safe($email);

$subject = 'Project inquiry' . ($safeName !== '' ? ' from ' . $safeName : '');

$bodyLines = array($message);
if ($budget !== '') {
    $bodyLines[] = '';
    $bodyLines[] = 'Budget: ' . $budget;
}
$bodyLines[] = '';
$bodyLines[] = '— ' . ($safeName !== '' ? $safeName : 'No name given')
    . ($safeEmail !== '' ? ' (' . $safeEmail . ')' : '');
$bodyLines[] = 'Sent from the xarktech.com contact form.';
$body = implode("\n", $bodyLines);

$headers = array(
    'From: ' . header_safe(CONTACT_FROM_NAME) . ' <' . CONTACT_FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
);
// Only set Reply-To when the address passed validation, so a rejected value
// can never reach the header block.
if ($safeEmail !== '') {
    $headers[] = 'Reply-To: ' . $safeEmail;
}

/*
 * Record the inquiry BEFORE attempting mail.
 *
 * mail() returning true only means the local mail server accepted the message;
 * it can still be discarded afterwards — a mailbox that no longer exists, mail
 * routing pointed elsewhere, a spam filter. That failure is invisible from
 * here, and an inquiry lost that way is lost permanently. Writing it down
 * first means the worst case is a delayed reply rather than a lost client.
 */
$stored = append_row(
    INQUIRIES_FILE,
    array('received_at', 'name', 'email', 'budget', 'message', 'ip'),
    array(
        gmdate('c'),
        $name,
        $email,
        $budget,
        $message,
        $_SERVER['REMOTE_ADDR'] ?? '',
    )
);

// Retries without the -f envelope flag if this host refuses it. See config.php.
$sent = send_mail(CONTACT_TO, $subject, $body, $headers);

// Only a total failure — neither stored nor sent — is worth telling the
// visitor about, because only then has their message genuinely not arrived.
if ($sent === false && !$stored) {
    respond(502, array('ok' => false, 'reason' => 'send-failed'));
}

respond(200, array('ok' => true));
