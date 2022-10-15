import express from 'express';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv'

import viewEngine from './config/viewEngine'
import initWebRouters from './route/web'

dotEnv.config()

let app = express();

// config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRouters(app)

let port = process.env.PORT || 6969

app.listen(port, () => {
    console.log(`back end nodejs is running on the port: ${port}`);
})
