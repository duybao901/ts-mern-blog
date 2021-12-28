// Config dotenv
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routers from './routers/index'

// Middleware
const app = express()
app.use(express.json()) // req.body 
app.use(express.urlencoded({ extended: true })) // Nó mang ý nghĩa là một đối tượng body chứa dữ liệu mà đã được parsed sẽ được đưa vào request (có thể hiểu là req.body)
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(morgan('dev'))
app.use(cookieParser()) // Get Cookies

// Connect databast
import './config/database'

// Server listening
const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT)
})

// Route
app.use('/api', routers.authRouter)
app.use('/api', routers.userRouter)


