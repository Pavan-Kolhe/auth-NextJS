import mongoose from "mongoose";

export async function connect() {
  let isConnected = false;
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB successfully");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit();
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    isConnected = false;
    console.error("Error connecting to MongoDB:", error);
  }
}
