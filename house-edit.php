<?php
/**
 * ============================================================
 * PAGE: House Edit
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

$pageTitle = 'Edit House';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle"><h1>Edit House</h1><p>Update unit details, charges and occupancy information.</p></div>
<section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">House Name / Number</label><input class="form-control" value="B12"></div>
<div class="col-md-6"><label class="form-label">Property</label><select class="form-select"><option selected>My Nyumba Apartments</option><option>Ngong View</option></select></div>
<div class="col-md-4"><label class="form-label">Rent (KSh)</label><input class="form-control" value="18000"></div>
<div class="col-md-4"><label class="form-label">Deposit (KSh)</label><input class="form-control" value="18000"></div>
<div class="col-md-4"><label class="form-label">Status</label><select class="form-select"><option selected>Occupied</option><option>Vacant</option><option>Maintenance</option></select></div>
<div class="col-md-4"><label class="form-label">Water</label><input class="form-control" value="Metered"></div>
<div class="col-md-4"><label class="form-label">Garbage (KSh)</label><input class="form-control" value="300"></div>
<div class="col-md-4"><label class="form-label">Tenant</label><select class="form-select"><option selected>Wanjiku Kamau</option><option>Vacant</option></select></div>
<div class="col-12"><button class="btn btn-primary">Save Changes</button> <a href="houses.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
