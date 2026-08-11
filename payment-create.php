<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Record Payment';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">
<div class="pagetitle"><h1>Record Payment</h1><p>Record a rent or utility payment.</p></div><section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Tenant</label><select class="form-select"><option>Wanjiku Kamau — B12</option><option>Peter Mwangi — A04</option></select></div>
<div class="col-md-6"><label class="form-label">Property / House</label><select class="form-select"><option>My Nyumba Apartments — B12</option><option>Ngong View — A04</option></select></div>
<div class="col-md-4"><label class="form-label">Amount (KSh)</label><input class="form-control" type="number" value="18300"></div>
<div class="col-md-4"><label class="form-label">Date</label><input class="form-control" type="date" value="2026-08-11"></div>
<div class="col-md-4"><label class="form-label">Reference</label><input class="form-control" value="QHG7A1K2"></div>
<div class="col-12"><label class="form-label">Description / Notes</label><textarea class="form-control" rows="3">Monthly rent, water and garbage charges.</textarea></div>
<div class="col-12"><button class="btn btn-primary">Save Payment</button> <a href="tenants.php" class="btn btn-secondary">Back</a></div>
</form></div></div></section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
