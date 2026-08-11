<?php
require_once __DIR__ . '/includes/auth.php';
$pageTitle = 'Audit Logs';
require __DIR__ . '/includes/header.php';
?>
<main id="main" class="main">

<div class="pagetitle"><h1>Audit Logs</h1><p>Track important actions performed by administrators and staff.</p></div>
<section class="section">
<div class="d-flex justify-content-between mb-3"><div><span class="mn-badge mn-paid">Today: 18 Events</span></div><button class="btn btn-outline-secondary btn-sm"><i class="bi bi-download"></i> Export Logs</button></div>
<div class="mn-card"><div class="mn-card-head"><strong>System Activity</strong><div class="d-flex gap-2"><select class="form-select form-select-sm" style="width:150px"><option>All Users</option><option>Admin</option><option>Property Manager</option></select><select class="form-select form-select-sm" style="width:140px"><option>All Actions</option><option>Create</option><option>Update</option><option>Delete</option><option>Login</option></select></div></div>
<div class="mn-card-body"><div class="table-responsive"><table class="mn-table">
<thead><tr><th>Date & Time</th><th>User</th><th>Action</th><th>Module</th><th>Record</th><th>IP Address</th><th>Action</th></tr></thead>
<tbody>
<tr><td>11 Aug 2026 10:22</td><td>Brian Admin</td><td><span class="mn-badge mn-paid">Created</span></td><td>Expenses</td><td>EXP-2026-001</td><td>192.168.1.20</td><td><a href="audit-view.php?id=1">View</a></td></tr>
<tr><td>11 Aug 2026 09:58</td><td>Jane Wanjiru</td><td><span class="mn-badge mn-due">Updated</span></td><td>Applications</td><td>APP-2026-001</td><td>192.168.1.24</td><td><a href="audit-view.php?id=2">View</a></td></tr>
<tr><td>11 Aug 2026 09:31</td><td>Brian Admin</td><td><span class="mn-badge mn-paid">Created</span></td><td>Tenant</td><td>Wanjiku Kamau</td><td>192.168.1.20</td><td><a href="audit-view.php?id=3">View</a></td></tr>
<tr><td>11 Aug 2026 08:44</td><td>Brian Admin</td><td><span class="mn-badge mn-maint">Login</span></td><td>Authentication</td><td>Successful login</td><td>192.168.1.20</td><td><a href="audit-view.php?id=4">View</a></td></tr>
</tbody></table></div></div></div>
</section>

</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
<link rel="stylesheet" href="assets/css/my-nyumba-system.css">
</body></html>
