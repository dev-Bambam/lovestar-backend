import express from "express";
import cors from "cors";
import { Application } from "express";
import router from "./routes/index.route";
import protectRoute from "./routes/protected";
import globalErrorHandler from "./middleware/Errorhandler";

const app: Application = express();

console.log("request got here");

// CORS Configuration - MUST be before other middleware
const corsOptions = {
   origin: [
      "http://localhost:3000",
      "https://localhost:3000",
      "https://your-frontend-domain.vercel.app", // Replace with your actual frontend domain
      "https://v0.dev", // For v0 preview
      "https://preview.v0.dev", // For v0 preview
   ],
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
   credentials: false, // Set to true if you need to send cookies
   optionsSuccessStatus: 200, // For legacy browser support
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (helpful for debugging)
app.use((req, res, next) => {
   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
   console.log("Headers:", req.headers);
   if (req.body && Object.keys(req.body).length > 0) {
      console.log("Body:", req.body);
   }
   next();
});

// Add a health check endpoint BEFORE the router
app.get("/health", (req, res) => {
   console.log("Health check endpoint hit");
   res.status(200).json({
      status: "success",
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
   });
});

// Routes - AFTER health endpoint
app.use("/", router);

// Global error handler
app.use(globalErrorHandler);

export default app;
