const ErrorHandler = require("../config/ErrorHandler");
const Curso = require("../database/models/Curso");
const User = require("../database/models/User");
const { inscricaoService } = require("../service/inscricao");
const { generateHash } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const Inscricao = require("../database/models/Inscricao");

module.exports = {
  async index(req, res) {
    const cursos = await Curso.findAll({
      include: [
        {
          association: "alunos",
          attributes: ["name", "email"],
          order: [["name", "desc"]],
          through: {
            attributes: [],
          },
          required: false, //  caso não tenha nenhuma inscrição, ira retornar vazio
        },
      ],
    });
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
          required: false, //  caso não tenha nenhuma inscrição, ira retornar vazio
        },
      ],
    });

    if (!curso) {
      throw new ErrorHandler(400, `Não existe na base um curso com id ${id}`);
    }
    return res.json(curso);
  },
  async destroy(req, res) {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);

    if (!curso) {
      throw new ErrorHandler(400, `Não existe na base um curso com id ${id}`);
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
      throw new ErrorHandler(400, `Não existe na base um curso com id ${id}`);
    }

    const update = await curso.update(data);
    return res.json(update);
  },

  async createInscricao(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const dataToken = jwt.decode(token);

    inscricaoService(dataToken.id, id)
      .then(() => res.status(200).json("Inscricao feita com sucesso"))
      .catch((err) => {
        const errorResponse = err.errors.map((item) => item.path);
        res.status(400).json(`As tabelas ${errorResponse} devem ser unicas`);
      });
  },

  async deleteInscricao(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const dataToken = jwt.decode(token);

    const incricao = await Inscricao.findOne({
      where: {
        user_id: dataToken.id,
        curso_id: parseInt(id),
      },
    });
    if (!incricao) {
      throw new ErrorHandler(400, `Não existe a inscricao`);

    }


    if (incricao.destroy()) {
      res.json("Inscrição destruida com sucesso");
    }
  },
};
