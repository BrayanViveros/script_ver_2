import app from "./app.js";
import { PORT } from "./config.js";
import "./database/mibase.js";

// Aqui pongo a correr mi pagina
async function main() {
  app.listen(PORT);
  console.log("Server on port 🎉📂😁", PORT);
}

main();