"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = adminOnly;
const Custom_err_1 = require("../utils/error/Custom.err");
function adminOnly(req, res, next) {
    const user = req.user;
    if (!user || user.role !== "admin") {
        throw new Custom_err_1.ForbiddenError();
    }
    next();
}
