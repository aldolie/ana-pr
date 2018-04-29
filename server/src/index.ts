import * as express from 'express';
import * as bodyParser from "body-parser";
import { apiRouter } from './api';
import { appMiddleware, errorHandler } from './middleware';
import logger from './util/logger';
import { Sequelize } from "sequelize-typescript";
import * as expressJwt from 'express-jwt';
import * as multer from "multer";
import * as UUID from "uuid";
import * as path from "path";
import {imageRouter} from "./imageRouter";
import config from "./config/index";

let app = express();
app.use(appMiddleware(app));
app.use(bodyParser.urlencoded({'extended':true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.all('/api', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use('/api', expressJwt({ secret: 'secret'}).unless({path: 
  [  
    '/api/auth/login',
    '/api/registration',
    '/api/verification',
  ]
}), apiRouter);
app.use('/img', imageRouter);

app.use(errorHandler);

let storage = multer.diskStorage({
    destination: config.uploadPath,
    filename: (req, file, callback) => {
        let filename = UUID.v4() + path.extname(file.originalname);
        callback(null, filename);
    }
});

export default app;
export const upload = multer({ storage: storage });
export const __sequelize = new Sequelize({
    name: 'ana-pr',
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    modelPaths: [
        __dirname + '/models'
    ],
});