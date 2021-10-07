const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/helper");
const ErrorHandler = require("../config/ErrorHandler");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      attributes: {
        include: ["password", "user_type"],
      },
      where: { email: email },
    });

    if (!user) {
      throw new ErrorHandler(400, "Usuário não existe na base de dados");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ErrorHandler(400, "Senha inválida");
    }

    if (!user.status) {
      throw new ErrorHandler(400, "O Usuário está desativado");
    }

    const payloadToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
    };

    const token = generateToken(payloadToken);

    return res.json({
      //   user: payloadToken,
      ...token,
    });
  },

  async register(req, res) {
    const bodyPayload = req.body;
    const user = await User.create(bodyPayload);
    res.json(user);
  },
};
