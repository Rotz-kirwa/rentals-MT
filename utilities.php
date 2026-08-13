<?php
/**
 * ============================================================
 * PAGE: Utilities
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__.'/includes/auth.php';
// ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Utilities';
require __DIR__.'/includes/header.php';
$utilities=[
 ['id'=>1,'name'=>'Water','type'=>'Metered','unit'=>'m³','rate'=>100,'fixed'=>0,'properties'=>6,'status'=>'Active'],
 ['id'=>2,'name'=>'Electricity','type'=>'Metered','unit'=>'kWh','rate'=>30,'fixed'=>0,'properties'=>6,'status'=>'Active'],
 ['id'=>3,'name'=>'Garbage','type'=>'Fixed','unit'=>'Month','rate'=>0,'fixed'=>500,'properties'=>6,'status'=>'Active'],
 ['id'=>4,'name'=>'Security','type'=>'Fixed','unit'=>'Month','rate'=>0,'fixed'=>300,'properties'=>2,'status'=>'Active'],
];
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>Utilities</h1><p>Manage water, electricity, garbage and any other property utility.</p></div>
<section class="section">
<div class="mn-stat-grid">
 <div class="mn-stat"><div class="label">Utilities</div><div class="value"><?=count($utilities)?></div><div class="sub">Configured services</div></div>
 <div class="mn-stat"><div class="label">Metered</div><div class="value"><?=count(array_filter($utilities,fn($u)=>$u['type']==='Metered'))?></div><div class="sub">Usage based</div></div>
 <div class="mn-stat"><div class="label">Fixed</div><div class="value"><?=count(array_filter($utilities,fn($u)=>$u['type']==='Fixed'))?></div><div class="sub">Standard charges</div></div>
 <div class="mn-stat"><div class="label">Active</div><div class="value"><?=count(array_filter($utilities,fn($u)=>$u['status']==='Active'))?></div><div class="sub">Currently billed</div></div>
</div>
<div class="mn-card">
 <div class="mn-card-head"><div><strong>Utility Register</strong><div class="text-muted small">Rates can be overridden for individual properties.</div></div><div class="d-flex gap-2"><a class="btn btn-outline-primary btn-sm" href="utility-readings.php"><i class="bi bi-speedometer2"></i> Meter Readings</a><a class="btn btn-primary btn-sm" href="utility-create.php"><i class="bi bi-plus-lg"></i> Add Utility</a></div></div>
 <div class="mn-card-body"><div class="table-responsive"><table class="mn-table align-middle">
 <thead><tr><th>Utility</th><th>Billing</th><th>Unit</th><th>Cost / Unit</th><th>Fixed Charge</th><th>Properties</th><th>Status</th><th>Actions</th></tr></thead>
 <tbody><?php foreach($utilities as $u): $metered=$u['type']==='Metered'; ?>
 <tr class="<?= $u['status'] === 'Active' ? 'mn-row-occupied' : 'mn-row-maint' ?>">
  <td><strong><?=htmlspecialchars($u['name'])?></strong></td><td><?=$u['type']?></td><td><?=htmlspecialchars($u['unit'])?></td>
  <td><?=$metered?'KSh '.number_format($u['rate'],2).' / '.$u['unit']:'—'?></td>
  <td><?=$metered?'—':'KSh '.number_format($u['fixed'],2).' / month'?></td><td><?=$u['properties']?></td>
  <td><span class="mn-badge mn-occupied"><?=$u['status']?></span></td>
  <td class="mn-actions"><a class="btn btn-sm btn-light" href="utility-view.php?id=<?=$u['id']?>">View</a> <a class="btn btn-sm btn-outline-primary" href="utility-edit.php?id=<?=$u['id']?>">Edit</a></td>
 </tr><?php endforeach; ?></tbody>
 </table></div></div>
</div>
</section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
