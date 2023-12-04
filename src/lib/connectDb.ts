import _mongoose, { connect } from 'mongoose';

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
async function connectDB() {
  const opts = {
    bufferCommands: false,
  };

  const connectDb = await connect(MONGODB_URI!, opts)
    .then((mongoose) => {
      console.log('✅ New connection established');
      return mongoose;
    })
    .catch((error) => {
      console.error('❌ Connection to database failed');
      throw error;
    });
  {
  }

  return connectDb;
}

export default connectDB;
