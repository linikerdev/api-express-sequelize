"use strict";

module.exports = {
  up: async (queryInterface) => {
    const dataArray = [
      {
        name: "Curso de Java Script",
        coordinator: "Elberth",
        description: "teste description",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Curso de Java",
        coordinator: "Elberth",
        description: "teste description",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Curso de C#",
        coordinator: "Elberth",
        description: "teste description",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Curso de Python",
        coordinator: "Elberth",
        description: "teste description",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return await queryInterface.bulkInsert("cursos", dataArray);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("cursos", null, {});
  },
};
