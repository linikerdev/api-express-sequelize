const { Model, DataTypes } = require("sequelize");
const { generateHash } = require("../../utils/helper");

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
          where: {
            user_type: 2,
          },
          attributes: {
            exclude: ["password", "user_type"],
          },
        },
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              user.password = await generateHash(user.password);
              user.user_type = parseInt(user.user_type);
            }
          },
          afterCreate: async (user) => {
            user.password = null;
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
