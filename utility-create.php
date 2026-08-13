<?php
/**
 * ============================================================
 * PAGE: Utility Create
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__.'/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Add Utility'; require __DIR__.'/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Add Utility</h1><p>Create a reusable utility and define how it is billed.</p></div><section class="section"><div class="mn-card"><div class="mn-card-body">
<form class="row g-3" method="post" action="#">
<div class="col-md-5"><label class="form-label">Utility Name</label><input name="name" class="form-control" placeholder="e.g. Water, Electricity, Security" required></div>
<div class="col-md-3"><label class="form-label">Billing Method</label><select name="billing_type" class="form-select"><option value="metered">Metered</option><option value="fixed">Fixed</option></select></div>
<div class="col-md-4"><label class="form-label">Unit</label><input name="unit_name" class="form-control" placeholder="m³, kWh, Month"></div>
<div class="col-md-4"><label class="form-label">Cost Per Unit (KSh)</label><input name="cost_per_unit" class="form-control" type="number" min="0" step="0.01" value="0"><div class="form-text">For metered utilities such as water and electricity.</div></div>
<div class="col-md-4"><label class="form-label">Standard Fixed Charge (KSh)</label><input name="standard_charge" class="form-control" type="number" min="0" step="0.01" value="0"><div class="form-text">For fixed utilities such as garbage.</div></div>
<div class="col-md-4"><label class="form-label">Status</label><select name="status" class="form-select"><option>Active</option><option>Inactive</option></select></div>
<div class="col-12"><label class="form-label">Description</label><textarea name="description" class="form-control" rows="3"></textarea></div>
<div class="col-12"><button class="btn btn-primary">Save Utility</button> <a href="utilities.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
