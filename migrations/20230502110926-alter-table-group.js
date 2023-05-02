"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("groups", "is_private", Sequelize.BOOLEAN, {
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("groups", "is_private");
  },
};
