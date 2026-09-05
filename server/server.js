import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;

//Cors : Frontend->Backend
app.use(cors());

//Middleware between req.body and json request bodies
app.use(express.json());

//from router file
app.use("/api/users", userRoutes);

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

startServer();
