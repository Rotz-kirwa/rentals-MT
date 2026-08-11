<?php
// My Nyumba role-based access control.
// Replace this demo session data with database-backed roles when MySQL is connected.

$roles = [
    'super_admin' => [
        'label' => 'Super Administrator',
        'permissions' => ['dashboard','houses','tenants','leases','finance','invoices','receipts','maintenance','messages','reports','admins','settings']
    ],
    'property_manager' => [
        'label' => 'Property Manager',
        'permissions' => ['dashboard','houses','tenants','leases','maintenance','messages','reports']
    ],
    'finance' => [
        'label' => 'Finance Officer',
        'permissions' => ['dashboard','finance','invoices','receipts','reports']
    ],
    'caretaker' => [
        'label' => 'Caretaker',
        'permissions' => ['dashboard','houses','maintenance','messages']
    ],
    'viewer' => [
        'label' => 'Viewer',
        'permissions' => ['dashboard','houses','reports']
    ],
];

function currentUserRole(): string {
    return $_SESSION['admin_role'] ?? 'super_admin';
}

function hasPermission(string $permission): bool {
    global $roles;
    $role = currentUserRole();
    return isset($roles[$role]) && in_array($permission, $roles[$role]['permissions'], true);
}

function requirePermission(string $permission): void {
    if (!hasPermission($permission)) {
        http_response_code(403);
        exit('Access denied. You do not have permission to access this page.');
    }
}
