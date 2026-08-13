<?php require_once __DIR__ . '/includes/auth.php'; $pageTitle='Add House'; require __DIR__ . '/includes/header.php'; ?>
<main id="main" class="main"><div class="pagetitle"><h1>Add House</h1><p>Create a rental unit with charges, property and occupancy details.</p></div><section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-12"><div class="mn-form-section">Property & House</div></div>
<div class="col-md-6"><label class="form-label">House / Unit Number</label><input class="form-control" placeholder="e.g. B12" required></div>
<div class="col-md-6"><label class="form-label">Property</label><select class="form-select"><option>My Nyumba Apartments</option><option>Ngong View</option><option>Rongai Heights</option></select></div>
<div class="col-md-4"><label class="form-label">House Type</label><select class="form-select"><option>Bedsitter</option><option>1 Bedroom</option><option>2 Bedroom</option><option>3 Bedroom</option><option>Shop</option><option>Office</option></select></div>
<div class="col-md-4"><label class="form-label">Status</label><select class="form-select"><option>Vacant</option><option>Occupied</option><option>Under Maintenance</option></select></div>
<div class="col-md-4"><label class="form-label">Available From</label><input class="form-control" type="date"></div>
<div class="col-12"><div class="mn-form-section">Charges</div></div>
<div class="col-md-3"><label class="form-label">Monthly Rent (KSh)</label><input class="form-control" type="number"></div>
<div class="col-md-3"><label class="form-label">Deposit (KSh)</label><input class="form-control" type="number"></div>
<div class="col-md-3"><label class="form-label">Water</label><input class="form-control" placeholder="Fixed / Metered"></div>
<div class="col-md-3"><label class="form-label">Garbage Fee (KSh)</label><input class="form-control" type="number"></div>
<div class="col-12"><div class="mn-form-section">Tenant / Lease (optional)</div></div>
<div class="col-md-6"><label class="form-label">Tenant</label><select class="form-select"><option>Vacant</option><option>Wanjiku Kamau</option><option>Peter Mwangi</option></select></div>
<div class="col-md-3"><label class="form-label">Lease Start</label><input class="form-control" type="date"></div>
<div class="col-md-3"><label class="form-label">Lease End</label><input class="form-control" type="date"></div>
<div class="col-12"><button class="btn btn-primary">Save House</button></div></form></div></div></section></main>
<?php require __DIR__ . '/includes/footer.php'; require __DIR__ . '/includes/scripts.php'; ?><link rel="stylesheet" href="assets/css/my-nyumba-system.css"></body></html>