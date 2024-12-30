import mongoose from "mongoose";

const mongoDBURI = "mongodb://localhost:27017/realestate";

async function createDbConnection() {
  try {
    await mongoose.connect(mongoDBURI);
    console.log("MongoDB Connected: localhost");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
}

export default createDbConnection;
