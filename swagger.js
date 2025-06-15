const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Task Collaboration API",
    description:
      "Documentação da API gerada automaticamente com swagger-autogen",
  },
  host: "localhost:3000",
  schemes: ["http"],
  tags: [
    { name: "Login", description: "Autenticação de usuários" },
    { name: "User", description: "Operações de usuário" },
    { name: "Team", description: "Gerenciamento de equipes" },
    { name: "Task", description: "Gerenciamento de tarefas" },
  ],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/routes/public/loginRoute.js",
  "./src/routes/private/byDomain/userRoutes.js",
  "./src/routes/private/byDomain/teamRoutes.js",
  "./src/routes/private/byDomain/taskRoutes.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
