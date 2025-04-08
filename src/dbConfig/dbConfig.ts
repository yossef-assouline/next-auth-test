import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants";

export const connectDB = async () => {
  try {
    const baseUri = process.env.MONGODB_URI?.split('?')[0] || '';
    await mongoose.connect(
        baseUri,
        {
          dbName: DB_NAME,
          retryWrites: true,
          w: 'majority'
        }
      );
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(`Connected to MongoDB - Database: ${DB_NAME}`);
    });
    connection.on("error", (error) => {
      console.log("Error connecting to MongoDB:", error);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error connecting to MongoDB:", error.message);
    } else {
      console.log("Error connecting to MongoDB:", "An unknown error occurred");
    }
  }
};

