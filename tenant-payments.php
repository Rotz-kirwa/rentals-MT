<?php
/**
 * ============================================================
 * PAGE: Tenant Payments
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

$pageTitle = 'Tenant Payments';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>Payments — Wanjiku Kamau</h1><p>View and manage this tenant's financial records.</p></div><section class="section"><div class="mn-card"><div class="mn-card-head"><strong>Payment History</strong><a class="btn btn-primary btn-sm" href="payment-create.php?tenant=1">Record Payment</a></div><div class="mn-card-body"><table class="mn-table"><tr><th>Date</th><th>Receipt</th><th>Method</th><th>Reference</th><th>Amount</th><th>Action</th></tr><tr><td>01 Aug 2026</td><td>RCT-2026-0812</td><td>M-Pesa</td><td>QHG7A1K2</td><td>KSh 18,300</td><td><a href="receipt-view.php?id=1">Receipt</a></td></tr><tr><td>01 Jul 2026</td><td>RCT-2026-0710</td><td>M-Pesa</td><td>QFG6B2M1</td><td>KSh 18,300</td><td><a href="receipt-view.php?id=2">Receipt</a></td></tr></table></div></div></section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
