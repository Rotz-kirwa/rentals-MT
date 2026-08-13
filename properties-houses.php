<?php
/**
 * ============================================================
 * PAGE: Properties Houses
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

$pageTitle = 'Houses / Units';
require __DIR__ . '/includes/header.php';
$propertyId=(int)($_GET['property_id'] ?? 0);
$properties=[1=>'My Nyumba Apartments',2=>'Ngong View',3=>'Rongai Heights'];
$houses=[
 ['id'=>'A-01','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'2 Bedroom','rent'=>'KSh 28,000','deposit'=>'KSh 28,000','status'=>'Occupied','tenant'=>'Wanjiku Kamau','start'=>'01 Jul 2026'],
 ['id'=>'A-02','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'1 Bedroom','rent'=>'KSh 20,000','deposit'=>'KSh 20,000','status'=>'Vacant','tenant'=>'—','start'=>'Available now'],
 ['id'=>'B-12','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'Bedsitter','rent'=>'KSh 15,000','deposit'=>'KSh 15,000','status'=>'Occupied','tenant'=>'Peter Otieno','start'=>'15 Jun 2026'],
 ['id'=>'C-04','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'2 Bedroom','rent'=>'KSh 25,000','deposit'=>'KSh 25,000','status'=>'Under Maintenance','tenant'=>'—','start'=>'After repairs'],
 ['id'=>'N-07','property_id'=>2,'property'=>'Ngong View','location'=>'Ngong','type'=>'1 Bedroom','rent'=>'KSh 18,000','deposit'=>'KSh 18,000','status'=>'Vacant','tenant'=>'—','start'=>'Available now'],
 ['id'=>'N-08','property_id'=>2,'property'=>'Ngong View','location'=>'Ngong','type'=>'2 Bedroom','rent'=>'KSh 25,000','deposit'=>'KSh 25,000','status'=>'Occupied','tenant'=>'Mary Njeri','start'=>'01 Aug 2026'],
 ['id'=>'R-03','property_id'=>3,'property'=>'Rongai Heights','location'=>'Kiserian','type'=>'Bedsitter','rent'=>'KSh 12,500','deposit'=>'KSh 12,500','status'=>'Occupied','tenant'=>'Brian Kiptoo','start'=>'01 May 2026'],
 ['id'=>'R-06','property_id'=>3,'property'=>'Rongai Heights','location'=>'Kiserian','type'=>'2 Bedroom','rent'=>'KSh 24,000','deposit'=>'KSh 24,000','status'=>'Under Maintenance','tenant'=>'—','start'=>'After repairs']
];
if($propertyId && isset($properties[$propertyId])) $houses=array_values(array_filter($houses,fn($h)=>$h['property_id']===$propertyId));
$total=count($houses); $occ=count(array_filter($houses,fn($h)=>$h['status']==='Occupied')); $vac=count(array_filter($houses,fn($h)=>$h['status']==='Vacant')); $maint=count(array_filter($houses,fn($h)=>$h['status']==='Under Maintenance'));
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
<div class="pagetitle"><h1>Houses / Units</h1><p><?= $propertyId && isset($properties[$propertyId]) ? htmlspecialchars($properties[$propertyId]).' — units' : 'View and manage all rental units across your properties.' ?></p></div>
<section class="section">
<div class="mn-stat-grid">
<div class="mn-stat"><div class="label">Units Displayed</div><div class="value"><?=$total?></div><div class="sub">Current selection</div></div>
<div class="mn-stat"><div class="label">Occupied</div><div class="value"><?=$occ?></div><div class="sub">With active tenants</div></div>
<div class="mn-stat"><div class="label">Vacant</div><div class="value"><?=$vac?></div><div class="sub">Ready for letting</div></div>
<div class="mn-stat"><div class="label">Maintenance</div><div class="value"><?=$maint?></div><div class="sub">Under repair</div></div>
</div>
<div class="mn-card">
<div class="mn-card-head"><div><strong>Units Register</strong><div class="text-muted small">All units with property, rent, tenant and current occupancy status.</div></div><div class="d-flex gap-2"><a class="btn btn-outline-secondary btn-sm" href="houses.php"><i class="bi bi-grid-3x3-gap"></i> All Houses</a><a class="btn btn-primary btn-sm" href="house-create.php<?= $propertyId ? '?property_id='.$propertyId : '' ?>"><i class="bi bi-plus-lg"></i> Add Unit</a></div></div>
<div class="mn-card-body">
<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
<div class="mn-status-legend"><span class="legend-label">Status:</span><span class="mn-badge mn-occupied">Occupied</span><span class="mn-badge mn-vacant">Vacant</span><span class="mn-badge mn-maint">Maintenance</span></div>
<div class="text-muted small"><?= $total ?> unit<?= $total===1?'':'s' ?> displayed</div>
</div>
<div class="table-responsive"><table class="mn-table align-middle">
<thead><tr><th>House / Unit</th><th>Property</th><th>Type</th><th>Rent</th><th>Deposit</th><th>Status</th><th>Tenant</th><th>Start / Availability</th><th>Actions</th></tr></thead>
<tbody>
<?php foreach($houses as $h): $cls=$h['status']==='Occupied'?'mn-occupied':($h['status']==='Vacant'?'mn-vacant':'mn-maint'); $view=$h['status']==='Occupied'?'house-view.php':($h['status']==='Vacant'?'house-view-vacant.php':'house-view-maintenance.php'); ?>
<tr class="mn-row-<?= $h['status']==='Occupied'?'occupied':($h['status']==='Vacant'?'vacant':'maint') ?>">
<td class="mn-number"><strong><?=$h['id']?></strong></td>
<td class="mn-property"><?=htmlspecialchars($h['property'])?><div class="mn-muted"><?=htmlspecialchars($h['location'])?></div></td>
<td><?=htmlspecialchars($h['type'])?></td><td><?=$h['rent']?></td><td><?=$h['deposit']?></td>
<td><span class="mn-badge <?=$cls?>"><?=$h['status']?></span></td><td><?=htmlspecialchars($h['tenant'])?></td><td><?=$h['start']?></td>
<td class="mn-actions"><div class="d-flex flex-wrap gap-1"><a class="btn btn-sm btn-primary" href="<?=$view?>?id=<?=urlencode($h['id'])?>">View</a><a class="btn btn-sm btn-outline-primary" href="house-edit.php?id=<?=urlencode($h['id'])?>">Edit</a></div></td>
</tr>
<?php endforeach; ?>
</tbody></table></div>
</div></div>
</section></main>

<?php
// ============================================================
// 4. FOOTER & SCRIPTS
// ============================================================

require __DIR__ . '/includes/footer.php';
require __DIR__ . '/includes/scripts.php';
?>
