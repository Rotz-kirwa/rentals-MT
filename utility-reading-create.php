<?php
/**
 * ============================================================
 * PAGE: Utility Reading Create
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__.'/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Record Meter Reading'; require __DIR__.'/includes/header.php'; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Record Meter Reading</h1><p>Record the current reading; usage and charge are calculated from the previous reading and rate.</p></div><section class="section"><div class="mn-card"><div class="mn-card-body"><form class="row g-3">
<div class="col-md-4"><label class="form-label">House / Unit</label><select class="form-select"><option>A-01 — Green View Apartments</option><option>A-02 — Green View Apartments</option></select></div><div class="col-md-4"><label class="form-label">Utility</label><select class="form-select"><option>Water (m³)</option><option>Electricity (kWh)</option></select></div><div class="col-md-4"><label class="form-label">Reading Date</label><input class="form-control" type="date" value="2026-08-13"></div>
<div class="col-md-4"><label class="form-label">Previous Reading</label><input class="form-control" type="number" step=".001" value="125"></div><div class="col-md-4"><label class="form-label">Current Reading</label><input class="form-control" type="number" step=".001" value="133"></div><div class="col-md-4"><label class="form-label">Rate Per Unit</label><input class="form-control" type="number" step=".01" value="110"></div>
<div class="col-12"><div class="mn-alert mn-alert-info">Usage = current reading − previous reading. The resulting utility charge can then be included on the tenant's invoice.</div></div><div class="col-12"><button class="btn btn-primary">Save Reading</button> <a href="utility-readings.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
