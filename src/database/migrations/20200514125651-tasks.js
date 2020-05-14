module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tasks', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    delivery_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    completed: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_user_fk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    id_project_fk: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('tasks'),
};
