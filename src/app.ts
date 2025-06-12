import express from 'express'
import { Application } from 'express'
import router from './routes/index.route'
import globalErrorHandler from './middleware/Errorhandler'

const app: Application = express()
console.log('request got here')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',router)

// global error handler
app.use(globalErrorHandler)

export default app