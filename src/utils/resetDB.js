const fs = require("fs");
const path = require("path");
const db = require("../database/connection.js");

async function runSqlFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const sql = fs.readFileSync(absolutePath, "utf8");

    const queries = sql
      .split(";")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    for (const query of queries) {
      await db.raw(query);
    }

    await db.destroy();
  } catch (err) {
    console.error("❌ Erro ao executar SQL:", err);
    process.exit(1);
  }
}

runSqlFile("scripts/sqlScripts/createTables.sql");
