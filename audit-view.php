<?php
/**
 * ============================================================
 * PAGE: Audit View
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

$pageTitle = 'Audit Event';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle"><h1>Audit Event</h1><p>Detailed system activity record.</p></div>
<section class="section"><div class="mn-card"><div class="mn-card-body">
<p><strong>Event:</strong> Created Expense</p><p><strong>User:</strong> Brian Admin</p><p><strong>Date:</strong> 11 Aug 2026 10:22</p><p><strong>Module:</strong> Expenses</p><p><strong>Record:</strong> EXP-2026-001</p><p><strong>IP Address:</strong> 192.168.1.20</p><p><strong>Details:</strong> Added plumbing repair expense of KSh 4,500 for Rongai Heights, House C04.</p>
<a href="audit-logs.php" class="btn btn-secondary">Back to Audit Logs</a>
</div></div></section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
