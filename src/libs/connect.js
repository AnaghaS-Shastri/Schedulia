import mongoose from 'mongoose';

async function connect() {
  try {
    
    if (mongoose.connection.readyState === 1) {
      console.log("Mongoose is already connected to MongoDB");
    } else {
      console.log("Mongoose is not connected. Connecting now...");
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB using Mongoose");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the connect function
connect();