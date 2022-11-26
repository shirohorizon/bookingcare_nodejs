import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv'
import cors from 'cors'

import viewEngine from './config/viewEngine'
import initWebRouters from './route/web'
import connectDB from './config/connectDB';

dotEnv.config()

let app = express()

app.use(cors())

// config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRouters(app)
connectDB()

let port = process.env.PORT || 6969

app.listen(port, () => {
    console.log(`back end nodejs is running on the port: ${port}`)
})
