import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database/index';
import bodyParser from 'body-parser';
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    // setando pasta das views
    this.app.set('views', resolve(__dirname, 'src', 'views'));
    this.app.set('view engine', 'ejs');
  }

  middlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app;
