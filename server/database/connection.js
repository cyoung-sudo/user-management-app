const mongoose = require("mongoose");

// Connect app to MongoDB database
const connectDB = async () => {
  try {
    // MongoDB connection string
    const con = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB connected: ${con.connection.host}`)
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB