import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import routes from "./routes/index.ts"
import "../config/passport.ts";

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(cors())
app.use(bodyParser.json())

app.use("/post", routes.post)
app.use("/register", routes.register)
app.use("/login", routes.login)

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () =>
  console.log(`[server]: Server is running at http://localhost:${port}`),
);
