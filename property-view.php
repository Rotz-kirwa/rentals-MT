<?php
/**
 * ============================================================
 * PAGE: Property View
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

$pageTitle = 'Property Details';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>My Nyumba Apartments</h1><p>Property details and units.</p></div>
<section class="section">
<div class="row g-4">
<div class="col-lg-8"><div class="mn-card"><div class="mn-card-head"><strong>Property Information</strong><a class="btn btn-primary btn-sm" href="property-edit.php?id=1">Edit Property</a></div><div class="mn-card-body">
<div class="row g-3"><div class="col-md-4"><div class="mn-kpi">Total Units<strong>62</strong></div></div><div class="col-md-4"><div class="mn-kpi">Occupied<strong>51</strong></div></div><div class="col-md-4"><div class="mn-kpi">Vacant<strong>8</strong></div></div></div>
<hr><p><strong>Location:</strong> Ongata Rongai, Kajiado County</p><p><strong>Type:</strong> Apartment Block</p><p><strong>Address:</strong> Near Maasai Mall</p><p><strong>Description:</strong> Residential apartment property.</p>
<a class="btn btn-outline-primary" href="properties-houses.php?property_id=1">View Houses / Units</a>
</div></div></div>
<div class="col-lg-4"><div class="mn-card"><div class="mn-card-head"><strong>Unit Summary</strong></div><div class="mn-card-body"><p>Occupied <strong class="float-end">51</strong></p><p>Vacant <strong class="float-end">8</strong></p><p>Maintenance <strong class="float-end">3</strong></p><hr><p>Total <strong class="float-end">62</strong></p><a class="btn btn-primary w-100" href="house-create.php?property_id=1">+ Add Unit to Property</a></div></div></div>
</div></section>
</main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
