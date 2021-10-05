const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/helper");
module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      attributes: {
        include: ["password"],
      },
      where: { email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Usuário não existe na base de dados" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    if (!user.status) {
      return res.status(400).json({ error: "O Usuário está inválido" });
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
