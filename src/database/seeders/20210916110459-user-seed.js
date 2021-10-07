"use strict";

const { generateHash } = require("../../utils/helper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataArray = [
      {
        name: "Liniquer Silva",
        email: "professor@infnet.edu.br",
        password: await generateHash("12345"),
        user_type: 1,
        status: true,
        data_nascimento: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jose Maria Aluno",
        email: "aluno@infnet.edu.br",
        password: await generateHash("12345"),
        user_type: 2,
        status: true,
        data_nascimento: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return queryInterface.bulkInsert("users", dataArray);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
