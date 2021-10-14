const CursoController = require("../controller/CursoController");
const { cursoSchema, cursoParams } = require("../schemas/cursoSchema");
const { inscricaoEmail, inscricao } = require("../schemas/inscricaoValidate");
const autenticated = require("../middlewares/authenticated");
const onlyAdmin = require("../middlewares/onlyAdmin");

module.exports = (route) => {
  // index
  route.get("/cursos", [autenticated], CursoController.index); //***

  route.post("/cursos", [onlyAdmin, cursoSchema], CursoController.store);

  route.get("/cursos/:id", [onlyAdmin, cursoParams], CursoController.show);

  route.delete(
    "/cursos/:id",
    [onlyAdmin, cursoParams],
    CursoController.destroy
  );

  route.put(
    "/cursos/:id",
    [onlyAdmin, cursoParams, cursoSchema],
    CursoController.update
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
