import express, {Request, Response} from "express"
import path from "path";
import ejs from "ejs";

const PORT = process.env.PORT || 5000
const app = express();

app.set('views', path.join(__dirname, "../views"))
app.engine("html", ejs.renderFile);
app.set('view engine', "ejs")

app.get("/", (req: Request, res: Response) => {
    res.render('index.html');
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))

