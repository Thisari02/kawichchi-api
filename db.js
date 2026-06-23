const mongoose = require('mongoose');
const dotenv = require('dotenv');

const dotenvResult = dotenv.config({ path: '.env.local' });
if (dotenvResult.error) {
  dotenv.config();
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI in environment');
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, options)
      .then((mongooseInstance) => {
        console.log('MongoDB connected');
        cached.conn = mongooseInstance;
        return cached.conn;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        cached.promise = null;
        throw error;
      });
  }

  return cached.promise;
}

module.exports = connectDB;
