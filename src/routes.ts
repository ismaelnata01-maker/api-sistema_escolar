import { Router } from "express";
import alunoController from "./controllers/aluno";
import cursoController from "./controllers/curso";
import matriculaController from "./controllers/matricula";
import funcionarioController from "./controllers/funcionario";
import { authentication } from "./middlewares/authentication";

//Inicializa o router
const routes = Router();


//Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello World!" });
});

//Rotas de alunos
routes.get("/alunos", authentication, alunoController.list);
routes.get("/alunos/:id", authentication, alunoController.getById);
routes.post("/alunos", authentication, alunoController.create);
routes.put("/alunos/:id", authentication, alunoController.update);
routes.delete("/alunos/:id", authentication, alunoController.delete);

//Rotas de cursos
routes.get("/cursos", authentication, cursoController.list);
routes.get("/cursos/:id", authentication, cursoController.getById);
routes.post("/cursos", authentication, cursoController.create);
routes.put("/cursos/:id", authentication, cursoController.update);
routes.delete("/cursos/:id", authentication, cursoController.delete);

// Rotas de matriculas
routes.post("/matriculas/:id", authentication, matriculaController.create);
routes.delete("/matriculas/:id", authentication, matriculaController.delete);

//Rotas de funcionarios
routes.post("/login", funcionarioController.login)

routes.get("/funcionarios", authentication, alunoController.list);
routes.get("/funcionarios/:id", authentication, alunoController.getById);
routes.post("/funcionarios", authentication, alunoController.create);
routes.put("/funcionarios/:id", authentication, alunoController.update);
routes.delete("/funcionarios/:id", authentication, alunoController.delete);

export default routes;
