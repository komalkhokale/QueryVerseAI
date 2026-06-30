import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import http from "http"
import { initSocket } from "./src/sockets/server.scoket.js";
// import { testAi } from "./src/services/ai.service.js";

const httpServer = http.createServer(app)
initSocket(httpServer)

connectDB();
// testAi();

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
})