import express from "express"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors())

app.get("/api", res.json({message: 'Hello World'}))

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
