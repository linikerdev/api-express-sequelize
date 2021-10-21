"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "curso_inscricao",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        curso_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: "cursos", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "unique_tag",
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          unique: "unique_tag",
        },
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["curso_id", "user_id"],
          },
        },
      },
    );
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable("curso_inscricao");
  },
};
