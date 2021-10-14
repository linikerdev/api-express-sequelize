const User = require("../database/models/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          association: "cursos",
          through: {
            attributes: [],
          },
          required: false, //  caso não tenha nenhuma inscrição, ira retornar vazio
        },
      ],
    });

    if (!user) {
      res.status(400).json({ error: `Não o usuário com id ${id}` });
    }
    return res.json(user);
  },

  async store(req, res) {
    const data = req.body;
    const create = await User.create(data);
    return res.json(create);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(400).json({ error: `Não usuário com id: ${id}` });
    }
    const update = await user.update(data);
    return res.json(update);
  },

  async destroy(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(400).json({ error: `Não existe usuario com id ${id}` });
    }
    if (await user.destroy()) {
      return res.status(200).json({
        data: "Usuário deletado com sucesso",
      });
    }
  },
};
