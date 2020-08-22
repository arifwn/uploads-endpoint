import App from './application';

import HomePageController from './controllers/homepage.controller';
import ReadinessController from './controllers/readinesscheck.controller';
import UploadController from './controllers/upload.controller';
import * as bodyParser from 'body-parser';
import loggerMiddleware from './middlewares/logger';
const multer = require('multer');


const app = new App({
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    controllers: [
        new HomePageController(),
        new ReadinessController(),
        new UploadController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        multer().array(),
        loggerMiddleware,
    ]
})

app.listen()