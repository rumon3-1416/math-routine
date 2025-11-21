import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error('Missing MONGO_URI env var');

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

const connect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connect;
