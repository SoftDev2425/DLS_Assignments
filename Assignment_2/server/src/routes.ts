import { Express, Request, Response } from "express";
import UsersRouter from "./routes/users.routes";
import TaskRouter from "./routes/tickets.routes";
import JobRouter from "./routes/jobs.routes";

import path from "path";

function routes(app: Express) {
  //   const assignmentNumber = path.basename(process.cwd()).split("_")[1];

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register API routes
  app.use("/api/users", UsersRouter);
  app.use("/api/tickets", TaskRouter);
  app.use("/api/jobs", JobRouter);

  // Register root route
  app.get("/", (req: Request, res: Response) => {
    function print(path: string[], layer: any): string {
      let route = "";

      if (layer.route) {
        // Handle routes
        layer.route.stack.forEach((subLayer: any) => {
          route += print(path.concat(split(layer.route.path)), subLayer);
        });
      } else if (layer.name === "router" && layer.handle.stack) {
        // Handle nested routers
        layer.handle.stack.forEach((subLayer: any) => {
          route += print(path.concat(split(layer.regexp)), subLayer);
        });
      } else if (layer.method) {
        // Log route
        const formattedPath = path.concat(split(layer.regexp)).filter(Boolean).join("/");
        route += `<li>${layer.method.toUpperCase()} /${formattedPath}</li>`;
      }

      return route;
    }

    function split(thing: any): string[] {
      if (typeof thing === "string") {
        return thing.split("/");
      } else if (thing.fast_slash) {
        return [""];
      } else {
        const match = thing
          .toString()
          .replace("\\/?", "")
          .replace("(?=\\/|$)", "$")
          .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match ? match[1].replace(/\\(.)/g, "$1").split("/") : [`<complex:${thing.toString()}>`];
      }
    }

    // Gather all routes
    let routesHtml = "<ul>";
    app._router.stack.forEach((layer: any) => {
      routesHtml += print([], layer);
    });
    routesHtml += "</ul>";

    // Send response
    res.send(`
      <html>
        <head><title>Routes</title></head>
        <body>
          <h1>Hello from Assignment 2 in Development of Large Scale Systems!</h1>
            <h2>By Andreas & Owais</h2>
            <h3>Routes</h3>
          ${routesHtml}
        </body>
      </html>
    `);
  });

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
}

export default routes;
