"use strict";
const _ = require("lodash");
const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({
      attributes: {
        includes: ["id"],
      },
    });
    const tasks = users.map((user) => {
      return new Array(_.random(3, 9, false)).fill(null).map((el, i) => ({
        user_id: user.id,
        content: `task number ${i} (user id = ${user.id}) `,
        created_at: new Date(),
        updated_at: new Date(),
      }));
    }).flat(2);
    await queryInterface.bulkInsert("tasks", tasks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
