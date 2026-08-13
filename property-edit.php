<?php
/**
 * ============================================================
 * PAGE: Property Edit
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

$pageTitle = 'Edit Property';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>Edit Property</h1><p>Update property information and unit capacity.</p></div>
<section class="section"><div class="card"><div class="card-body"><form class="row g-3">
<div class="col-md-6"><label class="form-label">Property Name</label><input class="form-control" value="My Nyumba Apartments"></div>
<div class="col-md-3"><label class="form-label">Number of Units</label><input class="form-control" type="number" value="62"></div>
<div class="col-md-3"><label class="form-label">Property Type</label><select class="form-select"><option selected>Apartment Block</option><option>Estate</option><option>Flats</option><option>Townhouses</option></select></div>
<div class="col-md-6"><label class="form-label">Location</label><input class="form-control" value="Ongata Rongai, Kajiado County"></div>
<div class="col-md-6"><label class="form-label">Address / Landmark</label><input class="form-control" value="Near Maasai Mall"></div>
<div class="col-12"><label class="form-label">Description</label><textarea class="form-control" rows="4">Residential apartment property.</textarea></div>
<div class="col-12"><button class="btn btn-primary">Save Changes</button> <a href="properties.php" class="btn btn-secondary">Cancel</a></div>
</form></div></div></section>
</main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
