import Sequelize, { Model } from 'sequelize';

export default class Task extends Model {
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
      notes: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          max: {
            args: [255],
            msg: 'O campo notas tem que ter no máximo 255 caracteres.',
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
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user_fk' });
    this.belongsTo(models.Project, { foreignKey: 'id_project_fk' });
  }
}
