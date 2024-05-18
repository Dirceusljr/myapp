const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'database',
  user     : 'myapp',
  password : 'myapp',
  database: 'myapp'
});

app.get('/product', (req, res, next) => { 
  connection.query('SELECT * FROM produtos', function(err, rows, fields) {
  if (err) throw err;
  res.json({
    status: 200,
    data: rows,
  })
});
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


app.listen(port, '0.0.0.0',() => {
  console.log(`Example app listening on port ${port}`)
})

