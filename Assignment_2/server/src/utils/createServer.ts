import express from "express";
import routes from "../routes";
import cors from "cors";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  routes(app);

  return app;
}

export default createServer;
