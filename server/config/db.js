import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        const uri = process.env.MONGO_URI
            .replace('<db_user>', process.env.DB_USER)
            .replace('<db_password>', encodeURIComponent(process.env.DB_PASSWORD));

        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('DB connection failed');
        process.exit(1);
    }
}