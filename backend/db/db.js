import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
     
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default connectToDatabase;
