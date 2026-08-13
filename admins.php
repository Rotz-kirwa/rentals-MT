<?php
/**
 * ============================================================
 * PAGE: Admins
 * DESCRIPTION: My Nyumba rental management system page.
 * ============================================================
 */

// ============================================================
// 1. AUTHENTICATION & SESSION
// ============================================================

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/permissions.php';
requirePermission('admins');
// ============================================================
// 2. PAGE CONFIGURATION
// ============================================================

$pageTitle = 'Administrators';
require __DIR__ . '/includes/header.php';
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Administrators</h1>
    <p>Manage system administrators and their access privileges.</p>
  </div>

  <section class="section">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="card-title mb-0">Admin Accounts</h5>
          <a href="admin-create.php" class="btn btn-primary"><i class="bi bi-person-plus"></i> Add Admin</a>
        </div>
        <div class="table-responsive">
          <table class="mn-table align-middle">
            <thead><tr><th>Administrator</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Action</th></tr></thead>
            <tbody>
              <tr class="status-active"><td><strong>Brian Chesa</strong></td><td>admin@mynyumba.co.ke</td><td><span class="badge bg-primary">Super Administrator</span></td><td><span class="badge bg-success">Active</span></td><td>Today, 10:42</td><td><a href="admin-edit.php?id=1">Edit</a></td></tr>
              <tr class="status-active"><td><strong>Wanjiku Kamau</strong></td><td>wanjiku@mynyumba.co.ke</td><td><span class="badge bg-info">Property Manager</span></td><td><span class="badge bg-success">Active</span></td><td>Today, 09:18</td><td><a href="admin-edit.php?id=2">Edit</a></td></tr>
              <tr class="status-active"><td><strong>Peter Mwangi</strong></td><td>peter@mynyumba.co.ke</td><td><span class="badge bg-warning text-dark">Finance Officer</span></td><td><span class="badge bg-success">Active</span></td><td>Yesterday, 16:25</td><td><a href="admin-edit.php?id=3">Edit</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
</body></html>
