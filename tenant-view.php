<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Tenant Profile';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Tenant Profile</h1><p>Complete tenant account, lease and payment overview.</p></div>
<section class="section">
<div class="row g-4">
<div class="col-lg-4"><div class="card"><div class="card-body text-center"><div class="rounded-circle bg-light d-inline-flex p-4 mb-3"><i class="bi bi-person fs-1"></i></div><h4>Wanjiku Kamau</h4><p class="text-muted">Tenant · House B12</p><a class="btn btn-primary" href="tenant-edit.php?id=1"><i class="bi bi-pencil"></i> Edit Tenant</a></div></div></div>
<div class="col-lg-8"><div class="mn-card"><div class="mn-card-head"><strong>Rental Summary</strong><a href="invoices.php">Invoices</a></div><div class="mn-card-body"><div class="row g-3"><div class="col-md-4"><div class="mn-kpi">Rent<strong>KSh 18,000</strong></div></div><div class="col-md-4"><div class="mn-kpi">Balance<strong>KSh 18,300</strong></div></div><div class="col-md-4"><div class="mn-kpi">Lease<strong>31 Jul 2027</strong></div></div></div><hr><p><strong>Property:</strong> My Nyumba Apartments</p><p><strong>House:</strong> B12</p><p><strong>Water:</strong> Metered</p><p><strong>Garbage:</strong> KSh 300</p><p><strong>Phone:</strong> 0712 345 678</p><p><strong>Email:</strong> wanjiku@example.com</p></div></div></div>
</div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
