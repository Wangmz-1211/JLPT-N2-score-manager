import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cookieRefresher from './middlewares/cookieRefresher'
import scoreRouter from './route/score'

const MONGO_URL = process.env.MONGO_URL
if (!MONGO_URL) throw new Error('MONGO_URL environment variable is necessary')
const app = express()
const port = 3000

// middlewares
app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cookieRefresher)

// route
app.use('/api', scoreRouter)

app.listen(port, () => {
	console.log('Started the service at http://localhost:' + port + '/')
})

mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((err) => {
		console.log('some error occurs during connecting to MongoDB', err)
	})
