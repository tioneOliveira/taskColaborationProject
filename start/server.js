const { app, swaggerUi } = require("./app");
const swaggerAutogen = require("swagger-autogen")();

const PORT = process.env.LISTENING_TO_PORT || 3000;

const doc = {
  info: {
    title: "Task Collaboration API",
    description:
      "Documentação da API gerada automaticamente com swagger-autogen",
  },
  host: `localhost:${PORT}`,
  schemes: ["http"],
  tags: [
    { name: "Login", description: "Autenticação de usuários" },
    { name: "User", description: "Gerenciamento de usuários" },
    { name: "Team", description: "Gerenciamento de equipes" },
    { name: "Task", description: "Gerenciamento de tarefas" },
  ],
};

const outputFile = "../start/swagger_output.json";
const endpointsFiles = [
  "./src/routes/public/loginRoute.js",
  "./src/routes/private/byDomain/userRoutes.js",
  "./src/routes/private/byDomain/taskRoutes.js",
  "./src/routes/private/byDomain/teamRoutes.js",
];

(async () => {
  if (process.env.NODE_ENV !== "production") {
    await swaggerAutogen(outputFile, endpointsFiles, doc);
    console.log("Swagger-autogen: Success");
  }

  // SOMENTE aqui você carrega o swagger_output gerado
  const swaggerDocument = require("../start/swagger_output.json");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();
