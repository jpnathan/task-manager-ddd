const taskModel = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'task',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      list: DataTypes.STRING,
    },
    {
      timestamps: false
    },
  )

  return Task;
};

export default taskModel;
