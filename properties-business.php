<?php
/**
 * ============================================================
 * PAGE: Properties Business
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

$pageTitle = 'Business Properties - My Nyumba';
require __DIR__ . '/includes/header.php';
$business=[
 ['name'=>'Roadside Retail Space','location'=>'Rongai Town','rent'=>'KES 65,000','size'=>'1,200 sq ft','status'=>'Available','image'=>'assets/img/news-1.jpg'],
 ['name'=>'Modern Office Suite','location'=>'Karen Road','rent'=>'KES 120,000','size'=>'2,100 sq ft','status'=>'Occupied','image'=>'assets/img/news-2.jpg'],
 ['name'=>'Warehouse & Yard','location'=>'Kitengela','rent'=>'KES 180,000','size'=>'5,400 sq ft','status'=>'Available','image'=>'assets/img/news-3.jpg'],
 ['name'=>'Corner Restaurant Unit','location'=>'Ngong Road','rent'=>'KES 85,000','size'=>'1,650 sq ft','status'=>'Maintenance','image'=>'assets/img/news-4.jpg']
];
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main"><div class="pagetitle"><h1>Business Properties</h1><nav><ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.php">Home</a></li><li class="breadcrumb-item">Properties</li><li class="breadcrumb-item active">Business</li></ol></nav></div><section class="section"><div class="card mb-4"><div class="card-body"><div class="row align-items-center"><div class="col-md-7"><h5 class="card-title mb-1">Commercial Portfolio</h5><p class="text-muted mb-0">Offices, shops, warehouses and other business spaces.</p></div><div class="col-md-5 text-md-end"><a href="properties-listings.php" class="btn btn-primary btn-sm"><i class="bi bi-plus-lg"></i> Add Business Property</a></div></div></div></div><div class="row g-4"><?php foreach($business as $b): $statusClass=$b['status']==='Available'?'status-available':($b['status']==='Occupied'?'status-occupied':'status-maintenance'); ?><div class="col-xl-3 col-lg-4 col-md-6"><div class="card property-card h-100 mb-0"><img src="<?= $b['image'] ?>" class="property-cover" alt="<?= htmlspecialchars($b['name']) ?>"><div class="card-body"><span class="status-pill <?= $statusClass ?>"><?= $b['status'] ?></span><h6 class="mt-3 mb-1"><?= htmlspecialchars($b['name']) ?></h6><div class="property-meta mb-2"><i class="bi bi-geo-alt"></i> <?= htmlspecialchars($b['location']) ?></div><div class="property-meta mb-3"><i class="bi bi-rulers"></i> <?= $b['size'] ?></div><div class="border-top pt-3"><div class="property-price"><?= $b['rent'] ?><small class="text-muted fw-normal"> /month</small></div></div></div></div></div><?php endforeach; ?></div></section></main>
<?php require __DIR__ . '/includes/footer.php'; ?><?php require __DIR__ . '/includes/scripts.php'; ?></body></html>
