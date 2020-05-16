import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O campo nome deve ter entre 6 e 50 caracteres.',
          },
        },
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Nome de usuário ja existe.',
        },
        validate: {
          len: {
            args: [6, 20],
            msg: 'O campo username deve ter entre 6 e 20 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      bio: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          max: {
            args: [255],
            msg: 'O campo biografia tem que ter no máximo 255 caracteres.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 20],
            msg: 'A senha tem que ter entre 6 e 20 caracteres.',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'users',
    });

    // Fazendo um hash da senha enviada pelo usuário
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  // Validação de password
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  // static associate(models) {
  //   this.hasMany(models.Task, { foreignKey: 'id_user_fk' });
  //   this.hasMany(models.Project, { foreignKey: 'user_id_fk' });
  // }
}
