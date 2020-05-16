import Sequelize, { Model } from 'sequelize';

export default class Project extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O campo titulo deve ter entre 6 e 50 caracteres.',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          max: {
            args: [150],
            msg: 'O campo descrição tem que ter no máximo 150 caracteres.',
          },
        },
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          max: {
            args: [10],
            msg: 'O campo cor tem que ter no máximo 10 caracteres.',
          },
        },
      },
      delivery_date: {
        type: Sequelize.DATE,
        defaultValue: '',
        validate: {
          isDate: {
            msg: 'O campo date de entrega precisa de uma data válida',
          },
        },
      },
      completed: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'O campo concluido precisa ser inteiro',
          },
        },
      },
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id_fk' });
    this.hasMany(models.Task, { foreignKey: 'id_project_fk' });
  }
}
