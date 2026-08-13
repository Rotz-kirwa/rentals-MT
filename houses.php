<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Houses / Units';
require __DIR__ . '/includes/header.php';

$propertyId = (int)($_GET['property_id'] ?? 0);
$properties = [
    1 => ['name'=>'My Nyumba Apartments','location'=>'Ongata Rongai'],
    2 => ['name'=>'Ngong View','location'=>'Ngong'],
    3 => ['name'=>'Rongai Heights','location'=>'Kiserian'],
];

/* Demo records retained from the existing Houses / Units module. */
$houses = [
    ['id'=>'A-01','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'2 Bedroom','rent'=>'KSh 28,000','deposit'=>'KSh 28,000','status'=>'Occupied','tenant'=>'Wanjiku Kamau','phone'=>'0712 456 789','start'=>'01 Jul 2026'],
    ['id'=>'A-02','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'1 Bedroom','rent'=>'KSh 20,000','deposit'=>'KSh 20,000','status'=>'Vacant','tenant'=>'—','phone'=>'—','start'=>'Available now'],
    ['id'=>'B-12','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'Bedsitter','rent'=>'KSh 15,000','deposit'=>'KSh 15,000','status'=>'Occupied','tenant'=>'Peter Otieno','phone'=>'0722 345 678','start'=>'15 Jun 2026'],
    ['id'=>'C-04','property_id'=>1,'property'=>'My Nyumba Apartments','location'=>'Ongata Rongai','type'=>'2 Bedroom','rent'=>'KSh 25,000','deposit'=>'KSh 25,000','status'=>'Under Maintenance','tenant'=>'—','phone'=>'—','start'=>'After repairs'],
    ['id'=>'N-07','property_id'=>2,'property'=>'Ngong View','location'=>'Ngong','type'=>'1 Bedroom','rent'=>'KSh 18,000','deposit'=>'KSh 18,000','status'=>'Vacant','tenant'=>'—','phone'=>'—','start'=>'Available now'],
    ['id'=>'N-08','property_id'=>2,'property'=>'Ngong View','location'=>'Ngong','type'=>'2 Bedroom','rent'=>'KSh 25,000','deposit'=>'KSh 25,000','status'=>'Occupied','tenant'=>'Mary Njeri','phone'=>'0798 123 456','start'=>'01 Aug 2026'],
    ['id'=>'R-03','property_id'=>3,'property'=>'Rongai Heights','location'=>'Kiserian','type'=>'Bedsitter','rent'=>'KSh 12,500','deposit'=>'KSh 12,500','status'=>'Occupied','tenant'=>'Brian Kiptoo','phone'=>'0701 234 567','start'=>'01 May 2026'],
    ['id'=>'R-06','property_id'=>3,'property'=>'Rongai Heights','location'=>'Kiserian','type'=>'2 Bedroom','rent'=>'KSh 24,000','deposit'=>'KSh 24,000','status'=>'Under Maintenance','tenant'=>'—','phone'=>'—','start'=>'After repairs'],
];

if ($propertyId && isset($properties[$propertyId])) {
    $houses = array_values(array_filter($houses, fn($h) => $h['property_id'] === $propertyId));
}

$total = count($houses);
$occ = count(array_filter($houses, fn($h) => $h['status'] === 'Occupied'));
$vac = count(array_filter($houses, fn($h) => $h['status'] === 'Vacant'));
$maint = count(array_filter($houses, fn($h) => $h['status'] === 'Under Maintenance'));
?>
<main id="main" class="main">
<div class="pagetitle">
    <h1>Houses / Units</h1>
    <p><?= $propertyId && isset($properties[$propertyId]) ? htmlspecialchars($properties[$propertyId]['name']).' — units' : 'View and manage all rental houses and units.' ?></p>
</div>

<section class="section">
    <div class="mn-stat-grid">
        <div class="mn-stat"><div class="label">Units</div><div class="value"><?= $total ?></div><div class="sub">Units displayed</div></div>
        <div class="mn-stat"><div class="label">Occupied</div><div class="value"><?= $occ ?></div><div class="sub">With active tenants</div></div>
        <div class="mn-stat"><div class="label">Vacant</div><div class="value"><?= $vac ?></div><div class="sub">Available for letting</div></div>
        <div class="mn-stat"><div class="label">Maintenance</div><div class="value"><?= $maint ?></div><div class="sub">Under repair</div></div>
    </div>

    <div class="mn-card">
        <div class="mn-card-head">
            <div>
                <strong>Houses / Units Register</strong>
                <div class="text-muted small">All units, property assignments, rent, tenants and current status.</div>
            </div>
            <div class="d-flex gap-2 flex-wrap">
                <a class="btn btn-outline-secondary btn-sm" href="properties.php"><i class="bi bi-buildings"></i> Properties</a>
                <a class="btn btn-primary btn-sm" href="house-create.php<?= $propertyId ? '?property_id='.$propertyId : '' ?>"><i class="bi bi-plus-lg"></i> Add House</a>
            </div>
        </div>

        <div class="mn-card-body">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div class="mn-status-legend">
                    <span class="legend-label">Status:</span>
                    <span class="mn-badge mn-occupied">Occupied</span>
                    <span class="mn-badge mn-vacant">Vacant</span>
                    <span class="mn-badge mn-maint">Maintenance</span>
                </div>
                <div class="text-muted small"><?= $total ?> unit<?= $total === 1 ? '' : 's' ?> displayed</div>
            </div>

            <div class="table-responsive">
                <table class="mn-table align-middle houses-register-table">
                    <thead>
                        <tr>
                            <th>House / Unit</th>
                            <th>Property</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Rent</th>
                            <th>Deposit</th>
                            <th>Status</th>
                            <th>Tenant</th>
                            <th>Phone</th>
                            <th>Start / Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($houses as $h):
                        $statusKey = $h['status'] === 'Occupied' ? 'occupied' : ($h['status'] === 'Vacant' ? 'vacant' : 'maint');
                        $badge = $h['status'] === 'Occupied' ? 'mn-occupied' : ($h['status'] === 'Vacant' ? 'mn-vacant' : 'mn-maint');
                        $view = $h['status'] === 'Occupied' ? 'house-view.php' : ($h['status'] === 'Vacant' ? 'house-view-vacant.php' : 'house-view-maintenance.php');
                    ?>
                        <tr class="mn-row-<?= $statusKey ?>">
                            <td class="mn-number"><strong><?= htmlspecialchars($h['id']) ?></strong></td>
                            <td class="mn-property"><strong><?= htmlspecialchars($h['property']) ?></strong></td>
                            <td class="mn-muted"><?= htmlspecialchars($h['location']) ?></td>
                            <td><?= htmlspecialchars($h['type']) ?></td>
                            <td><strong><?= htmlspecialchars($h['rent']) ?></strong></td>
                            <td><?= htmlspecialchars($h['deposit']) ?></td>
                            <td><span class="mn-badge <?= $badge ?>"><?= htmlspecialchars($h['status']) ?></span></td>
                            <td><?= htmlspecialchars($h['tenant']) ?></td>
                            <td><?= htmlspecialchars($h['phone']) ?></td>
                            <td><?= htmlspecialchars($h['start']) ?></td>
                            <td class="mn-actions">
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><a class="dropdown-item" href="<?= $view ?>?id=<?= urlencode($h['id']) ?>"><i class="bi bi-eye me-2"></i>View House</a></li>
                                        <li><a class="dropdown-item" href="house-edit.php?id=<?= urlencode($h['id']) ?>"><i class="bi bi-pencil me-2"></i>Edit House</a></li>
                                        <?php if ($h['status'] === 'Occupied'): ?>
                                            <li><a class="dropdown-item" href="tenant-view.php?id=1"><i class="bi bi-person me-2"></i>View Tenant</a></li>
                                            <li><a class="dropdown-item" href="tenant-payments.php?tenant=1"><i class="bi bi-wallet2 me-2"></i>Payments</a></li>
                                            <li><a class="dropdown-item" href="tenant-invoices.php?tenant=1"><i class="bi bi-receipt me-2"></i>Invoices</a></li>
                                        <?php elseif ($h['status'] === 'Vacant'): ?>
                                            <li><a class="dropdown-item" href="listings.php"><i class="bi bi-megaphone me-2"></i>List House</a></li>
                                            <li><a class="dropdown-item" href="house-view-vacant.php?id=<?= urlencode($h['id']) ?>"><i class="bi bi-door-open me-2"></i>View Vacancy</a></li>
                                        <?php else: ?>
                                            <li><a class="dropdown-item" href="maintenance.php"><i class="bi bi-tools me-2"></i>Manage Maintenance</a></li>
                                            <li><a class="dropdown-item" href="maintenance-create.php"><i class="bi bi-plus-circle me-2"></i>Add Maintenance</a></li>
                                        <?php endif; ?>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
</main>
<?php require __DIR__ . '/includes/footer.php'; require __DIR__ . '/includes/scripts.php'; ?>
