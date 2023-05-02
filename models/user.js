"use strict";
const { isAfter } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: "userId",
      });
      User.belongsToMany(models.Group, {
        through:'users_to_groups',
        foreignKey: "user_id"
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        field: "password_hash",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("password", "hash");
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error("check birthday!");
            }
          },
        },
      },
      isMale: {
        type: DataTypes.BOOLEAN,
        field: "is_male",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
