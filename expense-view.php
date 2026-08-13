<?php
/**
 * ============================================================
 * PAGE: Expense View
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

$pageTitle = 'Expense Details';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle"><h1>Expense Details</h1><p>Expense EXP-2026-001.</p></div>
<section class="section">
<div class="row g-4">
<div class="col-lg-8"><div class="mn-card"><div class="mn-card-head"><strong>Plumbing Repair</strong><span class="mn-badge mn-paid">Paid</span></div><div class="mn-card-body">
<div class="row g-3">
<div class="col-md-4"><div class="mn-kpi">Amount<strong>KSh 4,500</strong></div></div>
<div class="col-md-4"><div class="mn-kpi">Date<strong>11 Aug 2026</strong></div></div>
<div class="col-md-4"><div class="mn-kpi">Category<strong>Maintenance</strong></div></div>
</div><hr>
<p><strong>Property:</strong> Rongai Heights</p>
<p><strong>House:</strong> C04</p>
<p><strong>Supplier:</strong> Otieno Plumbing Services</p>
<p><strong>Payment Method:</strong> M-Pesa</p>
<p><strong>Reference:</strong> QHG7A1K2</p>
<p><strong>Description:</strong> Repair of leaking kitchen pipe.</p>
<div class="mt-3"><a class="btn btn-primary" href="expense-edit.php?id=1">Edit Expense</a> <a class="btn btn-secondary" href="expenses.php">Back</a></div>
</div></div></div>
<div class="col-lg-4"><div class="mn-card"><div class="mn-card-head"><strong>Attachment</strong></div><div class="mn-card-body"><i class="bi bi-file-earmark-pdf fs-1"></i><p class="mt-2">supplier-receipt.pdf</p><a href="#" class="btn btn-outline-primary btn-sm">View Document</a></div></div></div>
</div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
