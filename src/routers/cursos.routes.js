const CursoController = require("../controller/CursoController");
const { cursoSchema, cursoParams } = require("../schemas/cursoSchema");
const { inscricaoEmail, inscricao } = require("../schemas/inscricaoValidate");
const authenticated = require("../middlewares/authenticated");
const onlyAdmin = require("../middlewares/onlyAdmin");

module.exports = (route) => {
  // index
  route.get("/cursos", [authenticated], CursoController.index); //***

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
    [cursoParams],
    CursoController.createInscricao
  );

  route.delete(
    "/cursos/:id/inscricao/",
    [cursoParams],
    CursoController.deleteInscricao
  );
};
