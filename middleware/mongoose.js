import mongoose from "mongoose";

const NEXT_PUBLIC_MONGO_URL="mongodb+srv://sudhirsars:OHE0cNPLVPwaNFiD@cluster0.lgxwmoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectDb = (handler) => async (req, res) => {
  try {
    if (mongoose.connections.length > 0 && mongoose.connections[0].readyState === 1) {
      // MongoDB connection is already established
      return await handler(req);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL)

    // Call the handler function
    return await handler(req);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new Response(JSON.stringify({ error: "Failed to connect to MongoDB" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export default connectDb;