import express from "express";
import * as posts from "../controllers/posts.js";

const router = express.Router();

router.get("/", posts.getAll);
router.post("/", posts.create);
router.patch("/:postId", posts.update);
router.delete("/:postId", posts.deleteById);
router.post("/like/:postId", posts.like);

export default router;
