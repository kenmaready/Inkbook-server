import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getAll = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200);
        res.json(
            postMessages.sort((a, b) => {
                return b.createdAt - a.createdAt;
            })
        );
    } catch (err) {
        res.status(500);
        res.json({ error: true, message: err.message });
    }
};

export const create = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201);
        res.json(newPost);
    } catch (err) {}
};

export const update = async (req, res) => {
    const { postId } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(404);
        res.json({ error: true, message: "No post with that id." });
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, {
            new: true,
        });

        res.status(200);
        res.json(updatedPost);
    } catch (err) {
        res.status(500);
        res.json({ error: true, message: err.message });
    }
};

export const deleteById = async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(404);
        res.json({ error: true, message: "No post with that id." });
    }

    try {
        const deletedPost = await PostMessage.findByIdAndRemove(postId);

        res.status(200);
        res.json({ success: true, message: "Splat deleted successfully." });
    } catch (err) {
        res.status(500);
        res.json({ error: true, message: err.message });
    }
};

export const like = async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(404);
        res.json({ error: true, message: "No post with that id." });
    }

    try {
        const likedPost = await PostMessage.findByIdAndUpdate(
            postId,
            { $inc: { likeCount: 1 } },
            { new: true }
        );

        res.status(200);
        res.json(likedPost);
    } catch (err) {
        res.status(500);
        res.json({ error: true, message: err.message });
    }
};
