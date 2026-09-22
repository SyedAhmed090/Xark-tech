<?php
/**
 * Project brief endpoint.
 *
 * A brief is not the same thing as a contact message: it is a work order. It
 * carries the package that was clicked and a variable set of answers, and it
 * is what production actually builds from — so losing one costs a sale that
 * had already decided to buy.
 *
 * Same contract as contact.php: POST JSON, receive {ok: true} or
 * {ok: false, reason}. Same guarantees too — recorded to disk before mail is
 * attempted, honeypot short-circuits, per-IP rate limit.
 */

require __DIR__ . '/config.php';

$data = read_json_body();

$package      = field($data, 'package', 200);
$packageParam = field($data, 'packageParam', 120);
$price        = field($data, 'price', 40);
$briefType    = field($data, 'briefType', 20);
$name         = field($data, 'name', 200);
$email        = field($data, 'email', 200);
$phone        = field($data, 'phone', 60);
$honeypot     = field($data, 'company', 200);

// Bots fill the hidden field. Report success and record nothing, so the bot
// doesn't learn which field rejected it.
if ($honeypot !== '') {
    respond(200, array('ok' => true));
}

/*
 * Answers arrive as [{label, value}, …] rather than a fixed set of keys,
 * because the question set differs per brief type and will keep changing as
 * the packages do. Normalising here means the endpoint never needs editing
 * when a question is added to lib/brief.ts.
 *
 * Both sides are length-capped and the count is bounded: this is attacker-
 * controlled input, and an unbounded array would let one request write an
 * arbitrarily large row into the CSV.
 */
$answers = array();
if (isset($data['answers']) && is_array($data['answers'])) {
    foreach ($data['answers'] as $entry) {
        if (count($answers) >= 40) {
            break;
        }
        if (!is_array($entry)) {
            continue;
        }
        $label = field($entry, 'label', 120);
        $value = field($entry, 'value', 4000);
        if ($label !== '' && $value !== '') {
            $answers[] = array('label' => $label, 'value' => $value);
        }
    }
}

if ($email === '' || $name === '') {
    respond(400, array('ok' => false, 'reason' => 'empty'));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, array('ok' => false, 'reason' => 'invalid-email'));
}

// A brief with no answers at all is either a misfire or a probe. The form
// marks two fields required, so a genuine submission always has something.
if (count($answers) === 0) {
    respond(400, array('ok' => false, 'reason' => 'empty'));
}

if (!rate_limit_ok()) {
    respond(429, array('ok' => false, 'reason' => 'rate-limited'));
}

$safeName = header_safe($name);
$safeEmail = header_safe($email);
$safePackage = header_safe($package);

$subject = 'Brief: ' . ($safePackage !== '' ? $safePackage : 'project')
    . ($safeName !== '' ? ' — ' . $safeName : '');

$bodyLines = array(
    'PACKAGE: ' . ($package !== '' ? $package : 'Not specified')
        . ($price !== '' ? ' (' . $price . ')' : ''),
    '',
);
foreach ($answers as $answer) {
    $bodyLines[] = $answer['label'] . ':';
    $bodyLines[] = $answer['value'];
    $bodyLines[] = '';
}
$bodyLines[] = '---';
$bodyLines[] = 'From: ' . $name . ' <' . $email . '>'
    . ($phone !== '' ? ' — ' . $phone : '');
$bodyLines[] = 'Sent from the xarktech.com brief form.';
$body = implode("\n", $bodyLines);

$headers = array(
    'From: ' . header_safe(CONTACT_FROM_NAME) . ' <' . CONTACT_FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Reply-To: ' . $safeEmail,
);

/*
 * Record BEFORE mail, for the reason set out in contact.php: mail() returning
 * true only means the local MTA accepted it, and on this host that has been
 * true while nothing arrived.
 *
 * Answers are flattened into one column rather than spread across many. The
 * question set changes per brief type and over time, so a column-per-question
 * layout would either break the header row or grow a ragged tail; one readable
 * blob keeps every historical row parseable by the same reader.
 */
$flat = array();
foreach ($answers as $answer) {
    $flat[] = $answer['label'] . ': ' . $answer['value'];
}

$stored = append_row(
    BRIEFS_FILE,
    array('received_at', 'package', 'package_param', 'price', 'brief_type', 'name', 'email', 'phone', 'answers', 'ip'),
    array(
        gmdate('c'),
        $package,
        $packageParam,
        $price,
        $briefType,
        $name,
        $email,
        $phone,
        implode("\n", $flat),
        $_SERVER['REMOTE_ADDR'] ?? '',
    )
);

$sent = send_mail(CONTACT_TO, $subject, $body, $headers);

// Only a total failure is worth telling the visitor about — if the brief is on
// disk it has arrived, whatever the mail server did with the notification.
if ($sent === false && !$stored) {
    respond(502, array('ok' => false, 'reason' => 'send-failed'));
}

respond(200, array('ok' => true));
