<?php
/**
 * ============================================================
 * PAGE: Invoice Create
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

$pageTitle = 'Create Invoice';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>Create Invoice</h1><p>Create a tenant rental invoice.</p></div><section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Tenant</label><select class="form-select"><option>Wanjiku Kamau — B12</option><option>Peter Mwangi — A04</option></select></div>
<div class="col-md-6"><label class="form-label">Property / House</label><select class="form-select"><option>My Nyumba Apartments — B12</option><option>Ngong View — A04</option></select></div>
<div class="col-md-4"><label class="form-label">Amount (KSh)</label><input class="form-control" type="number" value="18300"></div>
<div class="col-md-4"><label class="form-label">Date</label><input class="form-control" type="date" value="2026-08-11"></div>
<div class="col-md-4"><label class="form-label">Reference</label><input class="form-control" value="QHG7A1K2"></div>
<div class="col-12"><label class="form-label">Description / Notes</label><textarea class="form-control" rows="3">Monthly rent, water and garbage charges.</textarea></div>
<div class="col-12"><button class="btn btn-primary">Save Invoice</button> <a href="tenants.php" class="btn btn-secondary">Back</a></div>
</form></div></div></section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
