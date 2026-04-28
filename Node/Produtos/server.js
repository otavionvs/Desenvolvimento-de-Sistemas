const express = require('express')
const app = express()
const port = 3003

const produtos = [
    { id: 1, nome: 'Teclado Mecânico', preco: 350.00, emEstoque: true },
    { id: 2, nome: 'Mouse Gamer', preco: 180.00, emEstoque: false },
    { id: 3, nome: 'Monitor Ultrawide', preco: 1500.00, emEstoque: true }
]

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/produtos/em-estoque', (req, res) => {

    const listaProdutos = produtos.filter(e => e.emEstoque == true)

    res.send(listaProdutos)
})

app.get('/produtos/pesquisar/:nome', (req, res) => {
    const nome = req.params.nome;
    const produto = produtos.find(e => e.nome.toLowerCase().includes(nome.toLowerCase()))

  res.send(produto)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))