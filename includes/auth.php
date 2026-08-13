<?php
/**
 * ============================================================
 * PAGE: Auth
 * DESCRIPTION: Authentication and session protection.
 * ============================================================
 */

require_once __DIR__ . '/config.php';

// Protect admin pages. Set $_SESSION["user"] after a successful login.
if (empty($_SESSION['user'])) {
    header('Location: pages-login.php');
    exit;
}

function currentUser(): array {
    return is_array($_SESSION['user'] ?? null) ? $_SESSION['user'] : [];
}

// Demo role; replace with the role stored for the authenticated user.
if (!isset($_SESSION['admin_role'])) { $_SESSION['admin_role'] = 'super_admin'; }
