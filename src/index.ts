import express from 'express'
import cors from 'cors'
import authRoutes from './modules/auth/auth.route.js'
import cookieParser from 'cookie-parser'
import aiRoutes from './modules/ai/ai.route.js'
import "dotenv/config"

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
