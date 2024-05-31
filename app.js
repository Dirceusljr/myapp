import express from 'express';
import { router } from './shared/routes/index.js';


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(router)

app.use((err, res, next) => {
  if (err && res.status(404)) {
    console.error('Erro de requisitação!')
    return res.status(404).send('Página não encontrada!')
  }
  next()
})

app.listen(port, '0.0.0.0',() => {
  console.log(`Example app listening on port ${port}`)
})

