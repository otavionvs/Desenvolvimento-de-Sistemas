const express = require('express')

const app = express()

const port = 3001

//Para api saber que está trabalhando com JSON
app.use(express.json())

const usuarios = [
    { id: 1, nome: "Otavio Neves", idade: 21 },
    { id: 2, nome: "Davi", idade: 18 }
]

let nextId = 3;

app.get("/", (req, res) => {
    res.send("Hello World!")
})

//Get ALL
app.get("/usuario", (req, res) => {
    res.send(usuarios)
})

//Get by id
app.get("/usuario/:id", (req, res) => {
    //Por padrão uma string
    const id = parseInt(req.params.id)

    const usuario = usuarios.find(e => e.id === id)

    if (!usuario) {
        return res.status(404).send("Usuário não Encontrado!")
    }

    return res.send(usuario)
})

app.post("/usuario", (req, res) => {
    let usuario = req.body
    usuario.id = nextId
    usuarios.push(usuario)
    nextId ++
    res.status(201).send("Usuário Cadastrado com Sucesso!")
})

app.put("/usuario/:id", (req, res) => {
    let novoUsuario = req.body;
    const id = parseInt(req.params.id)
    
    novoUsuario.id = id;

    const index = usuarios.findIndex(e => e.id === id);

    usuarios[index] = novoUsuario;

    res.status(204).send("Usuário Atualizado!")
})

app.delete("/usuario/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const index = usuarios.findIndex(e => e.id === id);
    usuarios.splice(index, 1)

    res.status(204).send()
})

app.listen(port, () => {
    console.log(`Está rodando em http://localhost:${port}`)
})