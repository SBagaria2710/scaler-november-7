import express from "express";
import { addShow, getShowsByMovie, getShowsByTheatre, getShowDetails } from "../controllers/showController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addShow);
router.get("/get-by-movie", authMiddleware, getShowsByMovie);
router.get("/get-by-theatre", authMiddleware, getShowsByTheatre);
router.get("/:id", authMiddleware, getShowDetails);

export default router;