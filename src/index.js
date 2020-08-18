import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan'

import routes from './routes/index.js';

const app = express()
var port = process.env.PORT || 8000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('env'))


app.use('/routes', routes);

app.listen(port, () => {
    console.log("App running at... ", port);
})