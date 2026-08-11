<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Add Expense';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Add Expense</h1><p>Record a new property expense.</p></div>
<section class="section">
<div class="card"><div class="card-body">
<form class="row g-3">
<div class="col-md-6"><label class="form-label">Property</label><select class="form-select"><option>My Nyumba Apartments</option><option>Ngong View</option><option>Rongai Heights</option></select></div>
<div class="col-md-6"><label class="form-label">House / Unit <small class="text-muted">(optional)</small></label><select class="form-select"><option>Property-wide expense</option><option>B12</option><option>A09</option><option>C04</option></select></div>
<div class="col-md-4"><label class="form-label">Expense Date</label><input class="form-control" type="date" value="2026-08-11"></div>
<div class="col-md-4"><label class="form-label">Category</label><select class="form-select"><option>Maintenance</option><option>Utilities</option><option>Security</option><option>Cleaning</option><option>Renovation</option><option>Insurance</option><option>Other</option></select></div>
<div class="col-md-4"><label class="form-label">Amount (KSh)</label><input class="form-control" type="number" value="4500"></div>
<div class="col-md-6"><label class="form-label">Expense / Description</label><input class="form-control" value="Plumbing repair"></div>
<div class="col-md-6"><label class="form-label">Paid To / Supplier</label><input class="form-control" value="Otieno Plumbing Services"></div>
<div class="col-md-4"><label class="form-label">Payment Method</label><select class="form-select"><option>M-Pesa</option><option>Bank</option><option>Cash</option><option>Cheque</option></select></div>
<div class="col-md-4"><label class="form-label">Reference</label><input class="form-control" placeholder="Receipt / transaction number"></div>
<div class="col-md-4"><label class="form-label">Status</label><select class="form-select"><option>Paid</option><option>Pending</option><option>Approved</option><option>Cancelled</option></select></div>
<div class="col-md-6"><label class="form-label">Receipt / Invoice</label><input class="form-control" type="file"></div>
<div class="col-md-6"><label class="form-label">Notes</label><textarea class="form-control" rows="2" placeholder="Additional details"></textarea></div>
<div class="col-12"><button class="btn btn-primary"><i class="bi bi-check-lg"></i> Save Expense</button> <a href="expenses.php" class="btn btn-secondary">Cancel</a></div>
</form>
</div></div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
