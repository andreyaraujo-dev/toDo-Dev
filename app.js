import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database/index';
import bodyParser from 'body-parser';
import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import loginRoutes from './src/routes/auth/loginRoutes';
import logoutRoutes from './src/routes/auth/logoutRoutes';
import projectRoutes from './src/routes/projectRoutes';
import taskRoutes from './src/routes/taskRoutes';

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
    this.app.use('/user/', userRoutes);
    this.app.use('/login/', loginRoutes);
    this.app.use('/logout/', logoutRoutes);
    this.app.use('/projects/', projectRoutes);
    this.app.use('/tasks/', taskRoutes);
  }
}

export default new App().app;
