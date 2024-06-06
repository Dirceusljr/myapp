import 'dotenv/config';
import express from 'express';
import { router } from './shared/routes/index.js';
import { error } from './shared/routes/error.js';


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router, error)


app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})

