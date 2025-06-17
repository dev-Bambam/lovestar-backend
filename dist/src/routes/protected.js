"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onlyAdmin_1 = require("../middleware/onlyAdmin");
const auth_1 = require("../middleware/auth");
const admin_route_1 = __importDefault(require("./route/admin.route"));
const protectRoute = (0, express_1.Router)();
protectRoute.use('/', auth_1.authenticate, onlyAdmin_1.adminOnly, admin_route_1.default);
exports.default = protectRoute;
