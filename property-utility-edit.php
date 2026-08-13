<?php
/**
 * ============================================================
 * PAGE: Property Utility Edit
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__.'/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Edit Property Utility'; require __DIR__.'/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Edit Property Utility</h1><p>Set the utility rate used by this property.</p></div><section class="section"><div class="mn-card"><div class="mn-card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Property</label><select class="form-select"><option>Green View Apartments</option><option>Ngong View</option><option>Rongai Heights</option></select></div>
<div class="col-md-6"><label class="form-label">Utility</label><select class="form-select"><option>Water</option><option>Electricity</option><option>Garbage</option></select></div>
<div class="col-md-4"><label class="form-label">Cost Per Unit (KSh)</label><input class="form-control" type="number" step=".01" value="110"></div>
<div class="col-md-4"><label class="form-label">Fixed Charge (KSh)</label><input class="form-control" type="number" step=".01" value="600"></div>
<div class="col-md-4"><label class="form-label">Status</label><select class="form-select"><option>Active</option><option>Inactive</option></select></div>
<div class="col-12"><button class="btn btn-primary">Save Changes</button> <a href="property-utilities.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
