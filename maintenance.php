<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Maintenance';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Maintenance Requests</h1><p>Track repairs, contractors, costs and completion.</p></div>
<section class="section">
<div class="d-flex justify-content-between align-items-center mb-3">
<div><span class="mn-badge mn-due">4 Open</span> <span class="mn-badge mn-maint">3 In Progress</span> <span class="mn-badge mn-paid">18 Completed</span></div>
<a class="btn btn-primary" href="maintenance-create.php"><i class="bi bi-plus-lg"></i> Add Maintenance</a>
</div>
<div class="mn-card"><div class="mn-card-head"><strong>Maintenance Register</strong></div><div class="mn-card-body"><div class="table-responsive"><table class="mn-table">
<tr><th>Issue</th><th>House</th><th>Reported By</th><th>Priority</th><th>Cost</th><th>Status</th><th>Actions</th></tr>
<tr><td>Leaking kitchen pipe</td><td>C04</td><td>Peter Mwangi</td><td><span class="mn-badge mn-overdue">High</span></td><td>KSh 4,500</td><td><span class="mn-badge mn-maint">In Progress</span></td><td><a href="maintenance-edit.php?id=1">Edit</a></td></tr>
<tr><td>Broken socket</td><td>B12</td><td>Wanjiku Kamau</td><td><span class="mn-badge mn-due">Normal</span></td><td>KSh 1,200</td><td><span class="mn-badge mn-due">Open</span></td><td><a href="maintenance-edit.php?id=2">Edit</a></td></tr>
</table></div></div></div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
