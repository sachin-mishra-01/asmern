// config/db.js
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set in .env");

  mongoose.set("strictQuery", false);
  await mongoose.connect(uri, { dbName: undefined }); // dbname in URI or default
  console.log("MongoDB connected");
  return mongoose;
}

module.exports = { connectDB };
