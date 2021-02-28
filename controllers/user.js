import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            res.status(404);
            return res.json({
                error: true,
                message: "No user found with that email.",
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            res.status(400);
            res.json({ error: true, message: "Login credentials incvalid." });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200);
        res.json({ result: user.info(), token });
    } catch (err) {
        res.status(500);
        res.json({ error: true, message: err.message });
    }
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        console.log("searched for existing user...");

        if (existingUser) {
            res.status(409);
            return res.json({
                error: true,
                message:
                    "There is already an existing user with that email address.",
            });
        }

        console.log("encrypting password...");
        const encryptedPassword = await bcrypt.hash(password, 12);
        console.log("creating new user...");
        const user = await User.create({
            username,
            email,
            password: encryptedPassword,
        });
        console.log("creating token...");
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200);
        res.json({ result: user.info(), token });
    } catch (err) {
        res.status(500);
        res.json({ error: true, message: err.message });
    }
};
