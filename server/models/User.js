import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: [ "admin", "moderator", "user"],
        default: "admin",
    },
});

const User = mongoose.model("User", userSchema);

export default User;