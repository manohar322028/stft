import bcryptjs from "bcryptjs";

import User from "./api/models/user.model.js";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then((x) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

const addAdmin = async (email, password) => {
  const hashedPassword = bcryptjs.hashSync("Stft@321", 10);
  const admin = {
    username: "stftnepal",
    email: "stftnepal19@gmail.com",
    password: hashedPassword,
    type: "admin",
  };
  const newAdmin = new User(admin);
  await newAdmin.save();
  console.log("Admin added successfully");
};

addAdmin();
