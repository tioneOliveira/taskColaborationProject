const app = require("./app");
const listeningToPort = process.env.LISTENING_TO_PORT;
app.listen(listeningToPort, () => {
  console.log(`Servidor rodando na porta ${listeningToPort}`);
});
