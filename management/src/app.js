import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import route from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 9999;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "../views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index.html"));
app.use("/login", route.login);
app.use("/post", route.post);

app.listen(PORT, () => console.log(`listening on http://localhost/${PORT}`));
