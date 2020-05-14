import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Task from '../models/Task';
import Project from '../models/Project';

const models = [User, Task, Project];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
