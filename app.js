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

//Método POST by Dirceu

app.post('/product', (req, res) => {
  const { nome, preco, descricao, imagem_url } = req.body
  //Validação
  if(!nome || !preco || !descricao || !imagem_url ) {
    return res.status(400).json({error: 'Nome, preço, descrição e url da imagem são obrigatórios!'});
  }
  const queryPost = 'INSERT INTO produtos (nome, preco, descricao, imagem_url) VALUES (?, ?, ?, ?)';
  connection.query(queryPost, [nome, preco, descricao, imagem_url], function (error, results) {
    if(error) {
      console.error('Erro ao inserir os dados no banco de dados: ', error)
      return res.status(500).json({error: 'Erro ao inserir os dados no banco de dados.'})
    }
    res.status(201).json({message: 'Dados inseridos com sucesso', id: results.id})
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


//Método PUT by André

app.put('/product/:id', (req, res) => {

  const id = req.params.id

  const { nome, descricao, imagem_url, preco } = req.body

  const queryPut = `UPDATE produtos SET nome = "${nome}", preco = "${preco}", descricao = "${descricao}", imagem_url = "${imagem_url}" WHERE id = ${id};`;
  connection.query(queryPut, function (error, results) {
    if(error) {
      console.error('Erro ao editar os dados no banco de dados: ', error)
      return res.status(500).json({error: 'Erro ao editar os dados no banco de dados.'})
    }

    console.log(results)
    res.status(200).json({message: 'Dados editados com sucesso', id: results})
  })
})


app.listen(port, '0.0.0.0',() => {
  console.log(`Example app listening on port ${port}`)
})

