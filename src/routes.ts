import { Router } from "express";

//Inicializa o router
const routes = Router();


//Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello World!" });
});

routes.get("/rng", (request, response) => {
    const number = Math.floor(Math.random() * 10) + 1;
        console.log(number);
    return response.status(200).json(number);
});

routes.get("/fibonacci/:quantidade", (request, response) => {
  const { quantidade } = request.params;

  const numero = Number(quantidade);

  let a = 0;
  let b = 1;
  const fibonacci: number[] = [];

  for (let i = 0; i < numero; i++) {
    fibonacci.push(a);

    const proximo = a + b;
    a = b;
    b = proximo;
  }

  return response.status(200).json(fibonacci);
});

routes.get("/fatorial/:quantidade", (request, response) => {
  const { quantidade } = request.params;

  const numero = Number(quantidade);

  let fatorial = 1;

  for (let i = 1; i <= numero; i++) {
    fatorial = fatorial * i;
  }

  return response.status(200).json(fatorial);
});

export default routes;
