import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const dotenv = require('dotenv');

const dotenvResult = dotenv.config({ path: '.env.local' });
if (dotenvResult.error) {
  dotenv.config();
}

const uri= process.env.MONGODB_URI;

// ... existing connection setup ...
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
const client = new MongoClient(String(uri), options);
attachDatabasePool(client);
 module.exports = { client };