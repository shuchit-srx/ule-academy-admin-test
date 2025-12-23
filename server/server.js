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

const allowedOrigins = [
    process.env.CLIENT_URL
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error('CORS blocked'), false)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }
    next()
})

app.use('/api/auth', authRoutes)
app.use('/api/assessments', assessmentRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
