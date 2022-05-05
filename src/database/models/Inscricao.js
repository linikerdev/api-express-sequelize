const { Model, DataTypes } = require("sequelize");

class Inscricao extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        curso_id: DataTypes.INTEGER,
      },
      {
        tableName: "curso_inscricao",
        sequelize,
        created_at: false,
        updated_at: false,
      }
    );
  }
}

module.exports = Inscricao;
