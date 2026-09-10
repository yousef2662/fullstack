import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from "dotenv"
import { prisma, connectDB, disconnectDB } from './config/db.js';
import bcrypt from 'bcrypt'


config();
connectDB();

const app = express()
const PORT = process.env.PORT || 5004

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

app.post("/auth/sign", async (req, res) => {
  const { username, password } = req.body
  const userExists = await prisma.user.findUnique({
    where: {
      username: username 
    }
  })

  if (userExists) {

    res.json("exist");
    return;

  }
  
  
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword
    }
  })
  
  res.status(201).json("ok")
})

app.post("/auth/log", async (req, res) => {
  const { username, password } = req.body


  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) {
    return res.json("not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  
  if (!isPasswordValid) {
    return res.json("incorrect");
  }

  res.json("ok")

})



app.listen(PORT, () => {console.log(`server is running on ${PORT}`)})

process.on("unhandledRejecion", (err) => {
  console.error("unhandled rejecion:", err)
  server.close(async () => {
    await disconnectDB()
    process.exit(1)
  })
})

process.on("uncaughtException", async (err) => {
  console.error("uncaught exception:", err)
  await disconnectDB()
  process.exit(1)
})

process.on("SIGTERM", async (err) => {
  console.error("SIGTERM recived, shutting down gracefully", err)
  server.close(async () => {
    await disconnectDB()
    process.exit(0)
  })
})