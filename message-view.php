<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'View Message';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Message</h1><p>Conversation with Wanjiku Kamau.</p></div>
<section class="section"><div class="mn-card"><div class="mn-card-head"><strong>Rent Payment Confirmation</strong><div><a class="btn btn-primary btn-sm" href="message-create.php?reply=1">Reply</a> <a class="btn btn-outline-danger btn-sm" href="messages.php">Delete</a></div></div><div class="mn-card-body"><div class="mn-message-row"><span class="mn-avatar-icon"><i class="bi bi-person-fill"></i></span><div><strong>Wanjiku Kamau</strong><p class="text-muted mb-3">Today, 9:42 AM</p><p>Hello, I have made the rent payment. Kindly confirm.</p></div></div></div></div></section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
