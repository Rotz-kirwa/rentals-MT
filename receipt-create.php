<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Record Payment';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">
<div class="pagetitle"><h1>Record Payment</h1><p>Record a tenant payment and issue a receipt.</p></div>
<section class="section"><div class="card"><div class="card-body">
<form class="row g-3" method="post">
<div class="col-md-6"><label class="form-label">Tenant</label><select class="form-select"><option>Peter Mwangi — A04</option><option>Wanjiku Kamau — B12</option></select></div>
<div class="col-md-6"><label class="form-label">Payment Date</label><input class="form-control" type="date" value="2026-08-11"></div>
<div class="col-md-4"><label class="form-label">Amount (KSh)</label><input class="form-control" value="15500"></div>
<div class="col-md-4"><label class="form-label">Payment Method</label><select class="form-select"><option>M-Pesa</option><option>Bank</option><option>Cash</option></select></div>
<div class="col-md-4"><label class="form-label">M-Pesa / Bank Reference</label><input class="form-control" placeholder="e.g. QK71AB2L9"></div>
<div class="col-12"><button class="btn btn-primary" type="submit">Save Payment & Issue Receipt</button> <a href="receipts.php" class="btn btn-secondary">Cancel</a></div>
</form>
</div></div></section></main>
<?php require __DIR__ . '/includes/footer.php'; ?><?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-billing.css"></body></html>
