const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Curso = require("./models/Curso");
const User = require("./models/User");
const Inscricao = require("./models/Inscricao");
const ErrorHandler = require("../config/ErrorHandler");

const connection = new Sequelize(dbConfig["development"]);

connection.authenticate().then(
  function () {
    User.init(connection);
    Curso.init(connection);
    Inscricao.init(connection);

    User.associate(connection.models);
    Curso.associate(connection.models);
  }, // callback
  function () {
    throw new ErrorHandler(
      502,
      "Aconteceu um erro ao tentar conectar a base de dados",
      "ERROR_DB"
    );
  } // catch
);

module.exports = connection;
