import express from "express";
import * as posts from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", posts.getAll);
router.post("/", auth, posts.create);
router.patch("/:postId", auth, posts.update);
router.delete("/:postId", auth, posts.deleteById);
router.post("/like/:postId", auth, posts.like);

export default router;
