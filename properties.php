<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle='Properties';
require __DIR__ . '/includes/header.php';
$properties=[
 ['id'=>1,'name'=>'My Nyumba Apartments','location'=>'Ongata Rongai, Kajiado County','type'=>'Apartment Block','units'=>62,'occupied'=>51,'vacant'=>8,'maintenance'=>3],
 ['id'=>2,'name'=>'Ngong View','location'=>'Ngong, Kajiado County','type'=>'Flats','units'=>41,'occupied'=>32,'vacant'=>7,'maintenance'=>2],
 ['id'=>3,'name'=>'Rongai Heights','location'=>'Kiserian, Kajiado County','type'=>'Mixed Residential','units'=>36,'occupied'=>28,'vacant'=>6,'maintenance'=>2]
];
$totalUnits=array_sum(array_column($properties,'units')); $occupied=array_sum(array_column($properties,'occupied')); $vacant=array_sum(array_column($properties,'vacant')); $maintenance=array_sum(array_column($properties,'maintenance'));
?>
<main id="main" class="main">
<div class="pagetitle"><h1>Property Management</h1><p>Manage apartment blocks, flats, estates and groups of rental units from one place.</p></div>
<section class="section">
<div class="mn-stat-grid">
<div class="mn-stat"><div class="label">Properties</div><div class="value"><?=count($properties)?></div><div class="sub">Managed properties</div></div>
<div class="mn-stat"><div class="label">Total Units</div><div class="value"><?=$totalUnits?></div><div class="sub">Across all properties</div></div>
<div class="mn-stat"><div class="label">Occupied</div><div class="value"><?=$occupied?></div><div class="sub">Currently occupied</div></div>
<div class="mn-stat"><div class="label">Vacant</div><div class="value"><?=$vacant?></div><div class="sub">Available units</div></div>
<div class="mn-stat"><div class="label">Maintenance</div><div class="value"><?=$maintenance?></div><div class="sub">Units under repair</div></div>
</div>
<div class="mn-card">
<div class="mn-card-head"><div><strong>Properties</strong><div class="text-muted small">Every property and its unit occupancy at a glance.</div></div><a class="btn btn-primary btn-sm" href="property-create.php"><i class="bi bi-plus-lg"></i> Add Property</a></div>
<div class="mn-card-body">
<div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
<div class="mn-status-legend"><span class="legend-label">Unit status:</span><span class="mn-badge mn-occupied">Occupied</span><span class="mn-badge mn-vacant">Vacant</span><span class="mn-badge mn-maint">Maintenance</span></div>
<div class="text-muted small"><?=count($properties)?> managed properties</div>
</div>
<div class="table-responsive"><table class="mn-table align-middle">
<thead><tr><th>Property</th><th>Location</th><th>Type</th><th>Total Units</th><th>Occupied</th><th>Vacant</th><th>Maintenance</th><th>Actions</th></tr></thead>
<tbody>
<?php foreach($properties as $p): ?>
<tr class="<?= $p['vacant']>0 ? 'mn-row-vacant' : ($p['maintenance']>0 ? 'mn-row-maint' : 'mn-row-occupied') ?>">
<td class="mn-property"><strong><?=htmlspecialchars($p['name'])?></strong><div class="text-muted small">Property #<?=$p['id']?></div></td>
<td><i class="bi bi-geo-alt"></i> <?=htmlspecialchars($p['location'])?></td>
<td><?=htmlspecialchars($p['type'])?></td>
<td><strong><?=$p['units']?></strong></td>
<td><span class="mn-badge mn-occupied"><?=$p['occupied']?></span></td><td><span class="mn-badge mn-vacant"><?=$p['vacant']?></span></td><td><span class="mn-badge mn-maint"><?=$p['maintenance']?></span></td>
<td><div class="d-flex flex-wrap gap-1"><a class="btn btn-sm btn-primary" href="property-view.php?id=<?=$p['id']?>">View</a><a class="btn btn-sm btn-outline-primary" href="property-edit.php?id=<?=$p['id']?>">Edit</a><a class="btn btn-sm btn-outline-secondary" href="properties-houses.php?property_id=<?=$p['id']?>">Units</a></div></td>
</tr>
<?php endforeach; ?>
</tbody></table></div>
</div></div>
</section></main>
<?php require __DIR__ . '/includes/footer.php'; require __DIR__ . '/includes/scripts.php'; ?>
