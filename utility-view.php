<?php
/**
 * ============================================================
 * PAGE: Utility View
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__.'/includes/auth.php'; // ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Utility Details'; require __DIR__.'/includes/header.php'; $id=(int)($_GET['id']??1); $names=[1=>['Water','Metered','m³',100],2=>['Electricity','Metered','kWh',30],3=>['Garbage','Fixed','Month',500]]; $u=$names[$id]??$names[1]; ?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1><?=htmlspecialchars($u[0])?></h1><p><?=htmlspecialchars($u[1])?> utility configuration and billing rate.</p></div><section class="section"><div class="row g-4"><div class="col-lg-8"><div class="mn-card"><div class="mn-card-head"><strong>Utility Configuration</strong><a href="utility-edit.php?id=<?=$id?>" class="btn btn-primary btn-sm">Edit</a></div><div class="mn-card-body"><div class="row g-3"><div class="col-md-3"><div class="mn-kpi">Billing<strong><?=$u[1]?></strong></div></div><div class="col-md-3"><div class="mn-kpi">Unit<strong><?=$u[2]?></strong></div></div><div class="col-md-3"><div class="mn-kpi">Rate<strong><?=($u[1]==='Metered'?'KSh '.number_format($u[3],2):'KSh '.number_format($u[3],2).' / month')?></strong></div></div><div class="col-md-3"><div class="mn-kpi">Status<strong>Active</strong></div></div></div><hr><p class="mb-0">Property-specific rates can override this default rate without changing historical charges.</p></div></div></div><div class="col-lg-4"><div class="mn-card"><div class="mn-card-head"><strong>Quick Actions</strong></div><div class="mn-card-body"><a class="btn btn-outline-primary w-100 mb-2" href="property-utilities.php">Property Utility Rates</a><?php if($u[1]==='Metered'): ?><a class="btn btn-outline-primary w-100" href="utility-readings.php">Meter Readings</a><?php endif; ?></div></div></div></div></section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
