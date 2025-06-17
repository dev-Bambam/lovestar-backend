"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const Errorhandler_1 = __importDefault(require("./middleware/Errorhandler"));
const app = (0, express_1.default)();
// ===== CORS CONFIGURATION - MUST BE FIRST =====
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin)
            return callback(null, true);
        // Allow all origins for now (you can restrict later)
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
    ],
    credentials: false,
    optionsSuccessStatus: 200,
    preflightContinue: false,
};
// Apply CORS - MUST BE BEFORE OTHER MIDDLEWARE
app.use((0, cors_1.default)(corsOptions));
// ===== OTHER MIDDLEWARE =====
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log("Headers:", req.headers);
    next();
});
// ===== HEALTH CHECK - BEFORE ROUTES =====
app.get("/health", (req, res) => {
    console.log("✅ Health check endpoint hit");
    res.status(200).json({
        status: "success",
        message: "Server is healthy and CORS is working",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        cors: "enabled",
    });
});
// Test CORS endpoint
app.get("/test-cors", (req, res) => {
    console.log("🌐 CORS test endpoint hit");
    res.status(200).json({
        message: "CORS is working!",
        origin: req.headers.origin,
        method: req.method,
    });
});
// ===== YOUR ROUTES =====
app.use("/", index_route_1.default);
// ===== ERROR HANDLER =====
app.use(Errorhandler_1.default);
// 404 handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        status: "error",
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});
exports.default = app;
