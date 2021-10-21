const { Model, DataTypes } = require("sequelize");
const { generateHash } = require("../../utils/helper");
const ErrorHandler = require("../../config/ErrorHandler.js");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        data_nascimento: DataTypes.DATE,
        user_type: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "users",
        defaultScope: {
          where: {},
          attributes: {
            exclude: ["password"],
          },
        },
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              user.password = await generateHash(user.password);
              user.user_type = parseInt(user.user_type);
            }
            if (await this.findOne({ where: { email: user.email } })) {
              throw new ErrorHandler(
                409,
                "Ja existe um e-mail cadastrado no banco"
              );
            }
          },
          afterCreate: async (user) => {
            delete user.dataValues.password;
          },
        },
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Curso, {
      foreignKey: "user_id",
      through: "curso_inscricao",
      as: "cursos",
    });
  }
}

module.exports = User;
