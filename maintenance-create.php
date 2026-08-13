<?php
/**
 * ============================================================
 * PAGE: Maintenance Create
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

$pageTitle = 'Add Maintenance';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">

<div class="pagetitle"><h1>Add Maintenance Request</h1><p>Log a repair or maintenance job against a property or house.</p></div>
<section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Property</label><select class="form-select"><option>My Nyumba Apartments</option><option>Ngong View</option><option>Rongai Heights</option></select></div>
<div class="col-md-6"><label class="form-label">House / Unit</label><select class="form-select"><option>B12</option><option>A09</option><option>C04</option></select></div>
<div class="col-md-4"><label class="form-label">Issue Category</label><select class="form-select"><option>Plumbing</option><option>Electrical</option><option>Painting</option><option>Security</option><option>Appliance</option><option>Other</option></select></div>
<div class="col-md-4"><label class="form-label">Priority</label><select class="form-select"><option>Low</option><option selected>Normal</option><option>High</option><option>Emergency</option></select></div>
<div class="col-md-4"><label class="form-label">Reported Date</label><input class="form-control" type="date" value="2026-08-11"></div>
<div class="col-md-6"><label class="form-label">Reported By</label><input class="form-control" value="Wanjiku Kamau"></div>
<div class="col-md-6"><label class="form-label">Assigned To</label><input class="form-control" placeholder="Technician / contractor"></div>
<div class="col-12"><label class="form-label">Issue Description</label><textarea class="form-control" rows="4" placeholder="Describe the problem..."></textarea></div>
<div class="col-md-4"><label class="form-label">Estimated Cost (KSh)</label><input class="form-control" type="number"></div>
<div class="col-md-4"><label class="form-label">Status</label><select class="form-select"><option>Open</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select></div>
<div class="col-md-4"><label class="form-label">Expected Completion</label><input class="form-control" type="date"></div>
<div class="col-12"><label class="form-label">Attachments</label><input class="form-control" type="file" multiple></div>
<div class="col-12"><button class="btn btn-primary"><i class="bi bi-tools"></i> Save Maintenance Request</button> <a href="maintenance.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
