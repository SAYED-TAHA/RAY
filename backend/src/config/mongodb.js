import mongoose from 'mongoose';

const getDbName = () => {
  if (process.env.NODE_ENV === 'production') return undefined;
  return 'ray_clean';
};

const connectDB = async () => {
  try {
    const dbName = getDbName();
    const options = dbName ? { dbName } : undefined;
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
