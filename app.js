import express from 'express';
import { router } from './shared/routes/index.js';
import { error } from './shared/routes/error.js';


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(error)

app.listen(port, '0.0.0.0',() => {
  console.log(`Example app listening on port ${port}`)
})

