import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// Routes
import userRoutes from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import theatreRouter from "./routes/theatreRoutes.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();


const app = express();
app.use(helmet());
app.disable("x-powered-by");

// Custom Content Security Policy (CSP) configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com", "scaler.com"], // Allow scripts from 'self' and example.com
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
      imgSrc: ["'self'", "data:", "example.com"], // Allow images from 'self', data URLs, and example.com
      connectSrc: ["'self'", "api.example.com"], // Allow connections to 'self' and api.example.com
      fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
      objectSrc: ["'none'"], // Disallow object, embed, and applet elements
      upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
    },
  })
);

// Sanitize user input to prevent Mongo Operator Injection
app.use(mongoSanitize());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Rate Limiter Config
const apiLimiter = rateLimit({
    windowMs: 15* 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes.",
});
app.use("/api", apiLimiter);


app.use("/api/user", userRoutes);
app.use("/api/movie", movieRouter);
app.use("/api/theatre", theatreRouter);
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);

app.get("/health", (req, res) => {
    res.send("Server is running!");
});

const PORT = process.env.PORT || 5001;
app.listen(5001, () => {
    console.log(`Server running on port ${PORT}`);
});