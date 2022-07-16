import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import hotelsRouter from "./routes/hotels.js"
import roomsRouter from "./routes/rooms.js"

const app = express();

const connect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);    
    console.log(`Database Connected: ${db.connection.host}`);
  } catch (error) {
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  console.log(`Disonnection established!`);
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//middlewares
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

//Error handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 400;
  const errorMessage = err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack || null
  });
});

app.listen(process.env.PORT || 8080, () => {
  connect();
  console.log(`listen on port ${process.env.PORT}`);
});

