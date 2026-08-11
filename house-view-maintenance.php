<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'House C04';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>House C04</h1><p>Unit details and rental status.</p></div>
<section class="section">
<div class="row g-4">
<div class="col-lg-8"><div class="mn-card"><div class="mn-card-head"><strong>Rongai Heights · House C04</strong><span class="mn-badge mn-maint">Maintenance</span></div>
<div class="mn-card-body"><div class="row g-3">
<div class="col-md-6"><div class="mn-kpi">Monthly Rent<strong>KSh 12,500</strong></div></div>
<div class="col-md-6"><div class="mn-kpi">House Status<strong>Maintenance</strong></div></div>
</div><hr><p><strong>Tenant:</strong> Vacant</p><p><strong>Details:</strong> Plumbing repair in progress. Unit unavailable until work is completed.</p><p><strong>Water:</strong> Metered</p><p><strong>Garbage:</strong> KSh 300</p><p><strong>Lease:</strong> 01 Aug 2026 – 31 Jul 2027</p>
<div class="mt-3"><a class="btn btn-primary" href="house-edit.php?id=C04">Edit House</a> <a class="btn btn-outline-secondary" href="houses.php">Back to Houses</a></div>
</div></div></div>
<div class="col-lg-4"><div class="mn-card"><div class="mn-card-head"><strong>Quick Actions</strong></div><div class="mn-card-body">
<a class="btn btn-outline-primary w-100 mb-2" href="tenant-view.php?id=1">View Tenant</a>
<a class="btn btn-outline-success w-100 mb-2" href="invoices.php">View Invoices</a>
<a class="btn btn-outline-info w-100 mb-2" href="receipts.php">View Receipts</a>
<a class="btn btn-outline-warning w-100" href="maintenance.php">Maintenance</a>
</div></div></div>
</div></section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
