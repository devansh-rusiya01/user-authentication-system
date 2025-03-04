import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
