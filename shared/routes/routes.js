import { Router } from "express";
import { db } from "../db/index.js";


const registerRoutes = Router();


registerRoutes.get('/', (req, res) => {
    const queryGET = 'SELECT * FROM produtos'
    db.query(queryGET, function (err, results) {
        if (err) {
            console.error('Erro ao realizar sua pesquisa: ', err)
            return res.status(404).json({ error: 'Item não encontrado.' })
        }
        res.status(200).json(results)
    });
})

registerRoutes.get('/:id', (req, res, next) => {
    res.status(200)
    const query = `SELECT * FROM produtos WHERE id = ?`;
    db.query(query, [req.params.id], function (error, results) {
        if (error) {
            console.error('Erro ao buscar os dados no banco de dados: ', error)
            return res.status(404).json({ error: 'Erro ao buscar os dados no banco de dados.' });
        }
        res.status(200).json(results)
    });

})

//Método POST by Dirceu

registerRoutes.post('/', (req, res) => {
    const { nome, preco, descricao, imagem_url } = req.body
    //Validação
    if (!nome || !preco || !descricao || !imagem_url) {
        return res.status(400).json({ error: 'Nome, preço, descrição e url da imagem são obrigatórios!' });
    }
    const queryPost = 'INSERT INTO produtos (nome, preco, descricao, imagem_url) VALUES (?, ?, ?, ?)';
    db.query(queryPost, [nome, preco, descricao, imagem_url], function (error, results) {
        if (error) {
            console.error('Erro ao inserir os dados no banco de dados: ', error)
            return res.status(500).json({ error: 'Erro ao inserir os dados no banco de dados.' })
        }
        res.status(201).json({ message: 'Dados inseridos com sucesso', id: results.id })
    })
})

registerRoutes.delete('/:id', (req, res, next) => {
    const id = req.params.id
    const queryDelete = `DELETE FROM produtos WHERE id = ${id}`;
    db.query(queryDelete, function () {
        return res.status(200).json({ message: 'Produto deletado com sucesso' })
    })
})

registerRoutes.put('/:id', (req, res) => {

    const id = req.params.id

    const { nome, descricao, imagem_url, preco } = req.body

    const queryPut = `UPDATE produtos SET nome = "${nome}", preco = "${preco}", descricao = "${descricao}", imagem_url = "${imagem_url}" WHERE id = ${id};`;
    db.query(queryPut, function (error, results) {
        if (error) {
            console.error('Erro ao editar os dados no banco de dados: ', error)
            return res.status(500).json({ error: 'Erro ao editar os dados no banco de dados.' })
        }

        console.log(results)
        res.status(200).json({ message: 'Dados editados com sucesso', id: results })
    })
})

export { registerRoutes }