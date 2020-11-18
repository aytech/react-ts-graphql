import express from 'express'
import bodyParser from 'body-parser'
import { listings } from './listings'

const app = express()
const port = 9000

app.use(bodyParser.json())

app.get("/", (_req, res) => res.send(`Hello world!`))
app.get("/listings", (_req, res) => res.send(listings))
app.post("/listings", (_req, res) => res.send(listings))
app.delete("/listings", (req, res) => {
    const id: string = req.body.id

    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
            res.statusCode = 200
            return res.send(listings.splice(i, 1))
        }
    }

    res.statusCode = 404
    res.send('Failed to delete listing')
})

app.listen(port)

console.log(`[app]: http://localhost:${port}`);