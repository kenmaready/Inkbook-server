import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

userSchema.methods = {
    info: function () {
        return {
            username: this.username,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            _id: this._id,
        };
    },
};

export default mongoose.model("User", userSchema);
