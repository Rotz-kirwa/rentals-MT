<?php
/**
 * ============================================================
 * PAGE: Config
 * DESCRIPTION: Shared application configuration.
 * ============================================================
 */

// Shared application configuration.
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

if (!defined("APP_NAME")) {
    define("APP_NAME", "My Nyumba");
}
