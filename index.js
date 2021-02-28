import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./utils/db.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
    res.json({ success: true, message: "Welcome to Inkbook API." });
});

app.listen(PORT, () => {
    console.log("Inkbook server is listening on port", PORT);
});
