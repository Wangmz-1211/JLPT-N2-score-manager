import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

const app = express()
const port = 8082

// middlewares
app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// route

app.listen(port, () => {
	console.log('Started the service at http://localhost:' + port + '/')
})

const MONGO_URL =
	'mongodb+srv://wangmz:wangmz@service-authentication.oy7g56g.mongodb.net/?retryWrites=true&w=majority'

mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((err) => {
		console.log('some error occurs during connecting to MongoDB', err)
	})
