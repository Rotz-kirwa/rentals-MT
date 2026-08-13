<?php
/**
 * ============================================================
 * PAGE: Admin Edit
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

$pageTitle = 'Edit Administrator';
require __DIR__ . '/includes/header.php';

$permissionGroups = [
  'Property' => ['dashboard'=>'Dashboard','houses'=>'Houses','tenants'=>'Tenants','leases'=>'Leases','maintenance'=>'Maintenance'],
  'Finance' => ['finance'=>'Finance','invoices'=>'Invoices','receipts'=>'Receipts'],
  'Communication' => ['messages'=>'Messages'],
  'Administration' => ['reports'=>'Reports','admins'=>'Administrators','settings'=>'Settings'],
];
?>

<!-- ============================================================
     3. PAGE CONTENT
     ============================================================ -->

<main id="main" class="main">
  <div class="pagetitle"><h1>Edit Administrator</h1><p>Create an admin account and assign exactly what the user can access.</p></div>
  <section class="section">
    <div class="card">
      <div class="card-body">
        <form method="post" action="#" class="row g-4">
          <div class="col-md-6">
            <label class="form-label">Full Name</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. Grace Wanjiku" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Email Address</label>
            <input type="email" name="email" class="form-control" placeholder="grace@mynyumba.co.ke" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Phone Number</label>
            <input type="tel" name="phone" class="form-control" placeholder="0712 345 678">
          </div>
          <div class="col-md-6">
            <label class="form-label">Role Preset</label>
            <select name="role" id="rolePreset" class="form-select">
              <option value="property_manager" selected>Property Manager</option>
              <option value="finance">Finance Officer</option>
              <option value="caretaker">Caretaker</option>
              <option value="viewer">Viewer</option>
              <option value="super_admin">Super Administrator</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Password</label>
            <input type="password" name="password" class="form-control" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Confirm Password</label>
            <input type="password" name="password_confirmation" class="form-control" required>
          </div>

          <div class="col-12">
            <h5 class="card-title">Privileges</h5>
            <p class="text-muted">Select the modules this administrator may access.</p>
            <div class="row">
            <?php foreach ($permissionGroups as $group => $permissions): ?>
              <div class="col-lg-3 col-md-6 mb-3">
                <div class="border rounded p-3 h-100">
                  <strong><?= htmlspecialchars($group) ?></strong>
                  <?php foreach ($permissions as $key => $label): ?>
                    <div class="form-check mt-2">
                      <input class="form-check-input privilege" type="checkbox" name="permissions[]" value="<?= $key ?>" id="p_<?= $key ?>">
                      <label class="form-check-label" for="p_<?= $key ?>"><?= htmlspecialchars($label) ?></label>
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            <?php endforeach; ?>
            </div>
          </div>

          <div class="col-12">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" name="active" id="active" checked>
              <label class="form-check-label" for="active">Account active</label>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary"><i class="bi bi-person-plus"></i> Save Changes</button>
            <a href="admins.php" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  </section>
</main>
<script>
const presets = <?= json_encode(array_map(fn($r) => $r['permissions'], $roles)) ?>;
document.getElementById('rolePreset').addEventListener('change', function(){
  const allowed = presets[this.value] || [];
  document.querySelectorAll('.privilege').forEach(cb => cb.checked = allowed.includes(cb.value));
});
document.getElementById('rolePreset').dispatchEvent(new Event('change'));
</script>
<?php require __DIR__ . '/includes/footer.php'; ?>
<?php require __DIR__ . '/includes/scripts.php'; ?>
</body></html>
