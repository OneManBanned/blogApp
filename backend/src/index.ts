import express, { Express, Request, Response } from "express";

const port = process.env.PORT || 3000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () =>
  console.log("[server]: Server is running at http://localhost:${port}"),
);
