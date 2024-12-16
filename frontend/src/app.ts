import express, {Request, Response} from "express"
import path from "path";
import ejs from "ejs";

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.static(path.join(__dirname, "../public")))

app.set('views', path.join(__dirname, "../views"))
app.engine("html", ejs.renderFile);
app.set('view engine', "ejs")

app.get("/register", (req: Request, res: Response) => {
    res.render('register.html');
})
app.get("/login", (req: Request, res: Response) => {
    res.render('login.html');
})
app.get("/", (req: Request, res: Response) => {
    res.render('index.html');
})


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))

