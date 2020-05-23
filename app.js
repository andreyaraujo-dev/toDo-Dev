import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database/index';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
// import csrf from 'csurf';
// import { checkCsrfError, csrfMiddleware } from './src/middlewares/checkCsrfToken';
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
    const sessionStore = new session.MemoryStore();
    this.app.use(cookieParser('secret'));
    this.app.use(session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      },
      store: sessionStore,
      saveUninitialized: true,
      resave: 'true',
      secret: 'secret',
    }));
    this.app.use(flash());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use(express.static(resolve(__dirname, 'public')));
    // this.app.use(csrf());
    // this.app.use(checkCsrfError);
    // this.app.use(csrfMiddleware);
    this.app.use((req, res, next) => {
      res.locals.errors = req.flash('errors');
      res.locals.success = req.flash('success');
      next();
    });
  }

  routes() {
    this.app.use('/dashboard/', homeRoutes);
    this.app.use('/user/', userRoutes);
    this.app.use('/login/', loginRoutes);
    this.app.use('/logout/', logoutRoutes);
    this.app.use('/projects/', projectRoutes);
    this.app.use('/tasks/', taskRoutes);
  }
}

export default new App().app;
