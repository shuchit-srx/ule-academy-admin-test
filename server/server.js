import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
import initSocket from './config/socket.js';
import authRoutes from './routes/authRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';

dotenv.config();
await connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

initSocket(io);
app.set('io', io);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use(notFound);
app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Admin API running on port ${process.env.PORT}`);
});
