"use strict";
const { tr } = require("date-fns/locale");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User,{
        foreignKey:'userId',
      })
    }
  }
  Task.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        field: "is_done",
        allowNull: false,
        defaultValue: false,
      },
      deadline: {
        type: DataTypes.DATE,
        field: "dead_line",
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error("check deadline!");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      underscored: true,
    }
  );
  return Task;
};
