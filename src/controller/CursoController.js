const ErrorHandler = require("../config/ErrorHandler");
const Curso = require("../database/models/Curso");
const User = require("../database/models/User");
const { inscricaoService } = require("../service/inscricao");
const { generateHash } = require("../utils/helper");

module.exports = {
  async index(req, res) {
    const cursos = await Curso.findAll();
    return res.json(cursos);
  },
  async store(req, res) {
    const data = req.body;
    const create = await Curso.create(data);
    return res.json(create);
  },
  async show(req, res) {
    const { id } = req.params;

    const curso = await Curso.findByPk(id, {
      include: [
        {
          association: "alunos",
          attributes: ["name", "email"],
          order: [["name", "desc"]],
          through: {
            attributes: [],
          },
          required: false //  caso não tenha nenhuma inscrição, ira retornar vazio
        },
      ],
    });

    if (!curso) {
      res
        .status(400)
        .json({ error: `Não existe na base um curso com id ${id}` });
    }
    return res.json(curso);
  },
  async destroy(req, res) {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);
    if (!curso) {
      res
        .status(400)
        .json({ error: `Não existe na base um curso com id ${id}` });
    }

    if (await curso.destroy()) {
      return res.status(200).json({
        data: "curso deletado com sucesso",
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    const curso = await Curso.findByPk(id);
    if (!curso) {
      res
        .status(400)
        .json({ error: `Não existe na base um curso com id ${id}` });
    }

    const update = await curso.update(data);
    return res.json(update);
  },

  async createInscricao(req, res) {
    const { id } = req.params;
    const { name, email, data_nascimento, password, user_id, status } =
      req.body;

    const user = await User.create({
      name,
      email,
      data_nascimento,
      password: await generateHash(password),
      user_type: user_id || 2,
      status: status || true,
    });

    inscricaoService(user.id, id)
      .then(() => res.status(200).json("Inscricao feita com sucesso"))
      .catch(() => res.status(400).json("Erro ao processar inscricao"));
  },
  async createInscricaoEmail(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    const emailValid = await User.findOne({
      where: { email: email, user_type: 2 },
    });

    if (!emailValid) {
      res.status(422).json({ error: "O email não existe no sistema" });
    }
    inscricaoService(emailValid.id, id)
      .then(() => res.status(200).json("Inscricao feita com sucesso"))
      .catch(() => res.status(400).json("Erro ao processar inscricao"));
  },

  async deleteInscricao(req, res) {
    const params = req.params;

    const incricao = await Inscricao.findOne({
      where: {
        user_id: parseInt(params.user_id),
        curso_id: parseInt(params.id),
      },
    });

    incricao.destroy();

    res.json("Inscrição destruida com sucersso");
  },
};
