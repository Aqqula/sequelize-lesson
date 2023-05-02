"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users_to_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "user_id",
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "group_id",
        references: {
          model: {
            tableName: "groups",
          },
          key: "id",
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users_to_groups");
  },
};
