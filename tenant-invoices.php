<?php
/**
 * ============================================================
 * PAGE: Tenant Invoices
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

$pageTitle = 'Tenant Invoices';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>Invoices — Wanjiku Kamau</h1><p>View and manage this tenant's financial records.</p></div><section class="section"><div class="mn-card"><div class="mn-card-head"><strong>Tenant Invoices</strong><a class="btn btn-primary btn-sm" href="invoice-create.php?tenant=1">Create Invoice</a></div><div class="mn-card-body"><table class="mn-table"><tr><th>Invoice</th><th>Period</th><th>Amount</th><th>Status</th><th>Action</th></tr><tr><td>INV-2026-0812</td><td>August 2026</td><td>KSh 18,300</td><td><span class="mn-badge mn-overdue">Overdue</span></td><td><a href="invoice-view.php?id=1">View</a></td></tr><tr><td>INV-2026-0712</td><td>July 2026</td><td>KSh 18,300</td><td><span class="mn-badge mn-paid">Paid</span></td><td><a href="invoice-view.php?id=2">View</a></td></tr></table></div></div></section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
