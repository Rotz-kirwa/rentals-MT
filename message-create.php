<?php
/**
 * ============================================================
 * PAGE: Message Create
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__ . '/includes/auth.php';
// ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'New Message';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle"><h1>New Message</h1><p>Send a message to a tenant or property contact.</p></div>
<section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Recipient</label><select class="form-select"><option>Wanjiku Kamau</option><option>Peter Mwangi</option><option>Amina Hassan</option><option>Mary Njeri</option></select></div>
<div class="col-md-6"><label class="form-label">Channel</label><select class="form-select"><option>In-App Message</option><option>SMS</option><option>Email</option></select></div>
<div class="col-12"><label class="form-label">Subject</label><input class="form-control" value="Rent Payment Confirmation"></div>
<div class="col-12"><label class="form-label">Message</label><textarea class="form-control" rows="6">Hello Wanjiku, we have received your message. We will confirm your rent payment shortly.</textarea></div>
<div class="col-12"><button class="btn btn-primary"><i class="bi bi-send"></i> Send Message</button> <a href="messages.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
