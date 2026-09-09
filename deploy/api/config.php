<?php
/**
 * Shared configuration for the contact and subscribe endpoints.
 *
 * These files are deployed to public_html/api/ alongside the static export.
 * Nothing secret lives here: mail is handed to the local MTA on the same
 * cPanel account that receives it, so there is no API key or SMTP password to
 * protect. If you later switch to authenticated SMTP, move credentials into a
 * file OUTSIDE public_html and require() it instead.
 */

// Where contact-form submissions are delivered.
const CONTACT_TO = 'hello@xarktech.com';

/**
 * Envelope sender. MUST be an address on this domain, or the server's own
 * SPF record won't cover it and the mail lands in spam. This is not a mailbox
 * anyone reads — replies go to the visitor via Reply-To.
 */
const CONTACT_FROM = 'website@xarktech.com';
const CONTACT_FROM_NAME = 'Xark website';

/**
 * Newsletter signups are appended here. This path is resolved relative to
 * this file and points ABOVE public_html on a standard cPanel layout, so the
 * list is never web-readable. Verify it lands outside your document root:
 * a subscriber list served over HTTP is a data breach.
 */
const SUBSCRIBERS_FILE = __DIR__ . '/../../xark-data/subscribers.csv';

/** Rate-limit state. Also kept outside the document root. */
const RATE_LIMIT_DIR = __DIR__ . '/../../xark-data/ratelimit';

/** Max submissions per IP per window, and the window in seconds. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600;

/** Reject bodies larger than this before doing any parsing. */
const MAX_BODY_BYTES = 20000;

/** Send a JSON response and stop. */
function respond($status, array $payload)
{
    http_response_code($status);
    header('Content-Type: application/json');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload);
    exit;
}

/**
 * Strip CR/LF and NUL from any value interpolated into a mail header.
 * Without this, a newline in the name or email field lets a submitter append
 * their own headers and use the form as an open relay. This is the single
 * most important line in these scripts.
 */
function header_safe($value)
{
    return trim(str_replace(array("\r", "\n", "\0", '%0a', '%0d'), '', $value));
}

/** Read and decode the JSON request body, enforcing POST and a size cap. */
function read_json_body()
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        respond(405, array('ok' => false, 'reason' => 'method-not-allowed'));
    }

    $raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
    if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
        respond(413, array('ok' => false, 'reason' => 'too-large'));
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        respond(400, array('ok' => false, 'reason' => 'bad-request'));
    }
    return $data;
}

/** Trim a submitted field to a maximum length, coercing missing keys to ''. */
function field(array $data, $key, $max)
{
    $value = isset($data[$key]) && is_scalar($data[$key]) ? (string) $data[$key] : '';
    // mb_substr keeps multi-byte characters intact; substr would split them.
    return function_exists('mb_substr')
        ? mb_substr(trim($value), 0, $max)
        : substr(trim($value), 0, $max);
}

/**
 * Simple per-IP file rate limit. Returns false when the caller is over quota.
 * Not bulletproof against a distributed flood, but it stops the single-script
 * abuse these endpoints actually attract.
 */
function rate_limit_ok()
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!is_dir(RATE_LIMIT_DIR) && !@mkdir(RATE_LIMIT_DIR, 0700, true)) {
        // Can't track state — fail open rather than break a working form.
        return true;
    }

    $file = RATE_LIMIT_DIR . '/' . sha1($ip) . '.txt';
    $now = time();
    $hits = array();

    if (is_readable($file)) {
        $existing = @file_get_contents($file);
        if ($existing !== false && $existing !== '') {
            foreach (explode("\n", trim($existing)) as $line) {
                $ts = (int) $line;
                if ($ts > $now - RATE_LIMIT_WINDOW) {
                    $hits[] = $ts;
                }
            }
        }
    }

    if (count($hits) >= RATE_LIMIT_MAX) {
        return false;
    }

    $hits[] = $now;
    @file_put_contents($file, implode("\n", $hits), LOCK_EX);
    return true;
}
