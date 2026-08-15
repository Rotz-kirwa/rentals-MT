"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_js_1 = require("../controllers/dashboard.controller.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
router.get('/dashboard/stats', auth_js_1.requireAuth, dashboard_controller_js_1.DashboardController.getStats);
exports.default = router;
