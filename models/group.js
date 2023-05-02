"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: "users_to_groups",
        foreignKey: "group_id",
      });
    }
  }
  Group.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      description: DataTypes.STRING,
      imagePath: { type: DataTypes.TEXT, field: "image_path" },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        field: "is_private",
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
      underscored: true,
    }
  );
  return Group;
};
