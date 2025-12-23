import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import assessmentRoutes from './routes/assessmentRoutes.js'
import { errorHandler, notFound } from './middleware/error.js'

dotenv.config()
await connectDB()

const app = express()

app.use(helmet())
app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/assessments', assessmentRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
