import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import routes from "./routes/index.ts"
import "../config/passport.ts";
import passport from "passport";

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(cors())
app.use(bodyParser.json())

app.use("/post",passport.authenticate("jwt", {session: false}), routes.post)
app.use("/register", routes.register)
app.use("/login", routes.login)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("HELLOO!")
    console.error(err)
    res.status(err.statusCode || 400).json({err: err.message})
})

app.listen(port, () =>
  console.log(`[server]: Server is running at http://localhost:${port}`),
);
