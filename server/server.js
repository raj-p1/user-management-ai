import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

//Middleware between req.body and json request bodies
app.use(express.json());


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("Server listening on:", PORT);
    });
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
  }
}

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({
      message: "Failed to fetch users.",
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch {
    res.status(500).json({
      message: "Failed to add user.",
    });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch {
    res.status(500).json({
      message: "Failed to update user.",
    });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch {
    res.status(500).json({
      message: "Failed to delete user.",
    });
  }
});

startServer();
