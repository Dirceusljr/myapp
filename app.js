const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    version: "1.0.0"
  })
})

app.get('/product', (req, res, next) => {
  res.status(200)
  res.json({
    status: 200,
    data: [
      {
        nome: "Cerveja IPA",
        preco: "12.99",
        descricao: "Uma cerveja encorpada e amarga, com notas cítricas e frutadas.",
        id: 1
      },
      {
        nome: "Vinho Tinto Merlot",
        preco: "20",
        descricao: "Um vinho encorpado com notas de frutas escuras e taninos suaves.",
        id: 2
      }
    ]
  })
})

app.get('/product/:id', (req, res, next) => {
  res.status(200)
  res.json({
    status: 200,
    data: {
        nome: "Cerveja IPA",
        preco: "12.99",
        descricao: "Uma cerveja encorpada e amarga, com notas cítricas e frutadas.",
        id: 1
      }
  })
})

app.post('/product', (request, res) => {
  res.status(200).json({
    status: 200,
    data: request.body
  })
})

app.put('/product/:id', (request, res) => {
  res.status(201).json({
    status: 201,
    data: request.body
})
})

app.delete('/product/:id', (req, res, next) => {
  res.status(200)
  res.json({
    status: 200,
    data: {
        message: "Produto deletado com sucesso"
      }
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

