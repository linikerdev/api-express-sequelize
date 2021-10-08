const CursoController = require("../controller/CursoController");
const { cursoSchema, cursoParams } = require("../schemas/cursoSchema");
const { inscricaoEmail, inscricao } = require("../schemas/inscricaoValidate");
const autenticated = require("../middlewares/authenticated");

module.exports = (route) => {
  route.get("/cursos", [autenticated], CursoController.index);

  route.post("/cursos", [cursoSchema], CursoController.store);
  route.get("/cursos/:id", [cursoParams], CursoController.show);
  route.delete(
    "/cursos/:id",
    [cursoParams, autenticated],
    CursoController.destroy
  );

  route.post(
    "/cursos/:id/inscricao/",
    [cursoParams, inscricao],
    CursoController.createInscricao
  );

  route.post(
    "/cursos/:id/inscricao_email/",
    [cursoParams, inscricaoEmail],
    CursoController.createInscricaoEmail
  );

  route.delete(
    "/cursos/:id/inscricoes/:user_id",
    [cursoParams],
    CursoController.deleteInscricao
  );
};
