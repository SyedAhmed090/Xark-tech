<?php
/**
 * TEMPORARY DIAGNOSTIC — delete from the server once the form works.
 *
 * Deliberately kept in tools/ rather than deploy/, so scripts/prepare-deploy.mjs
 * never copies it into a build. It triggers mail on request and reports host
 * configuration, so it must be uploaded by hand when needed and removed after —
 * it should never be part of a routine deploy.
 *
 * Upload to public_html/api/ (it reads config.php from whatever directory it
 * sits in) and open in a browser:
 *   https://xarktech.com/api/mailtest.php?key=xark-diag
 *
 * Reports what PHP can actually do on this host and tries two sends: one with
 * the -f envelope flag the contact form uses, one without. Some shared hosts
 * refuse -f from non-trusted users, which makes mail() return false with no
 * visible reason — that is exactly the failure this distinguishes.
 *
 * The key is here only to stop a passer-by triggering mail, not as real
 * security. Delete the file when you're done.
 */

const DIAG_KEY = 'xark-diag';

header('Content-Type: text/plain; charset=UTF-8');

if (($_GET['key'] ?? '') !== DIAG_KEY) {
    http_response_code(403);
    echo "Add ?key=" . DIAG_KEY . " to the URL.\n";
    exit;
}

require __DIR__ . '/config.php';

function line($label, $value)
{
    printf("%-28s %s\n", $label . ':', $value);
}

echo "=== Environment ===\n";
line('PHP version', PHP_VERSION);
line('Server', $_SERVER['SERVER_SOFTWARE'] ?? 'unknown');
line('Script owner (uid)', function_exists('posix_getuid') ? posix_getuid() : 'n/a');
line('CONTACT_TO', CONTACT_TO);
line('CONTACT_FROM', CONTACT_FROM);

echo "\n=== Can PHP send mail at all? ===\n";
$disabled = array_map('trim', explode(',', (string) ini_get('disable_functions')));
line('mail() exists', function_exists('mail') ? 'yes' : 'NO');
line('mail() in disable_functions', in_array('mail', $disabled, true) ? 'YES — blocked by host' : 'no');
line('sendmail_path', ini_get('sendmail_path') ?: '(empty)');
line('SMTP ini (Windows only)', ini_get('SMTP') ?: '(unset — normal on Linux)');

if (!function_exists('mail') || in_array('mail', $disabled, true)) {
    echo "\nRESULT: mail() is disabled on this plan. The contact form cannot work\n";
    echo "as written — it needs authenticated SMTP instead. Send this output back.\n";
    exit;
}

$headers = implode("\r\n", array(
    'From: ' . CONTACT_FROM_NAME . ' <' . CONTACT_FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
));

echo "\n=== Test 1: with -f envelope flag (what the form does) ===\n";
$err = null;
set_error_handler(function ($no, $str) use (&$err) { $err = $str; return true; });
$ok1 = mail(
    CONTACT_TO,
    'Xark mailtest 1 (with -f)',
    "Test 1: sent with the -f envelope flag.\nTime: " . gmdate('c') . "\n",
    $headers,
    '-f' . CONTACT_FROM
);
restore_error_handler();
line('mail() returned', $ok1 ? 'true' : 'FALSE');
line('error', $err ?: '(none reported)');

echo "\n=== Test 2: without -f ===\n";
$err = null;
set_error_handler(function ($no, $str) use (&$err) { $err = $str; return true; });
$ok2 = mail(
    CONTACT_TO,
    'Xark mailtest 2 (no -f)',
    "Test 2: sent without the -f envelope flag.\nTime: " . gmdate('c') . "\n",
    $headers
);
restore_error_handler();
line('mail() returned', $ok2 ? 'true' : 'FALSE');
line('error', $err ?: '(none reported)');

echo "\n=== What this means ===\n";
if ($ok1 && $ok2) {
    echo "PHP handed both messages to the mail server successfully.\n";
    echo "So the problem is DELIVERY, not the code. Check, in order:\n";
    echo "  1. The spam folder for " . CONTACT_TO . "\n";
    echo "  2. cPanel > Email > Track Delivery — search for " . CONTACT_TO . "\n";
    echo "     It will show whether the message was delivered, deferred or rejected.\n";
    echo "  3. cPanel > Email Routing for xarktech.com. If it is set to\n";
    echo "     'Remote Mail Exchanger' (because MX points at Google/Microsoft),\n";
    echo "     local mail is being delivered into a mailbox on this server that\n";
    echo "     nobody reads, instead of being sent out to the real one.\n";
} elseif (!$ok1 && $ok2) {
    echo "The -f envelope flag is the problem — this host refuses it.\n";
    echo "Fix: remove the 5th argument from the mail() call in contact.php\n";
    echo "and subscribe.php. Send this output back and I'll ship the change.\n";
} else {
    echo "mail() is failing outright. The host is either blocking it or the\n";
    echo "local mail server is not accepting messages from PHP.\n";
    echo "Fix: switch to authenticated SMTP. Send this output back.\n";
}

echo "\nCheck the inbox AND spam folder for " . CONTACT_TO . " now —\n";
echo "you should have up to two messages titled 'Xark mailtest'.\n";
echo "\nDelete this file from the server when you're finished.\n";
