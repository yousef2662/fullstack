import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const PORT = process.env.PORT || 5004

const users = {
  username: "yousef",
  password: "123123"
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"))
})

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "dashboard.html"))
})

app.post("/auth/log", (req, res) => {
  const { username, password } = req.body

  if (username === users.username) {
    if (password === users.password) {
      res.json("ok")
    } else{
      res.json("incorrect")
    }
  } else{
    res.json("not found")
  }
  
  res.sendStatus(200) 
})



app.listen(PORT, () => {console.log(`server is running on ${PORT}`)})