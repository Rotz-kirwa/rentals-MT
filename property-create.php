<?php
/**
 * ============================================================
 * PAGE: Property Create
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

$pageTitle = 'Add Property';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>Add Property</h1><p>Create a building, apartment block, estate or group of rental units.</p></div>
<section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Property Name</label><input class="form-control" placeholder="e.g. Green View Apartments" required></div>
<div class="col-md-3"><label class="form-label">Number of Units</label><input class="form-control" type="number" min="1" placeholder="24" required></div>
<div class="col-md-3"><label class="form-label">Property Type</label><select class="form-select"><option>Apartment Block</option><option>Estate</option><option>Flats</option><option>Townhouses</option><option>Mixed Residential</option></select></div>
<div class="col-md-6"><label class="form-label">Location</label><input class="form-control" placeholder="Ongata Rongai, Kajiado County" required></div>
<div class="col-md-6"><label class="form-label">Address / Landmark</label><input class="form-control" placeholder="Near Maasai Mall"></div>
<div class="col-12"><label class="form-label">Description</label><textarea class="form-control" rows="4" placeholder="Property description..."></textarea></div>
<div class="col-12"><button class="btn btn-primary">Save Property</button> <a href="properties.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section>
</main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
