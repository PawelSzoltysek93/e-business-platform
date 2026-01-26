import mongoose from "mongoose";

const uri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MongoDB URI is missing. Check environment variables.");
    }

    await mongoose.connect(uri as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(
    "Mongo URI used:",
    uri?.includes("mongodb+srv") ? "ATLAS" : "LOCAL",
  );
};
