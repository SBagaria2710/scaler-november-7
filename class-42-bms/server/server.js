import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import theatreRouter from "./routes/theatreRoutes.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

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