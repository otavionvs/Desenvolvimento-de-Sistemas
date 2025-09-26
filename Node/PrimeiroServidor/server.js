const express = require('express');
const app = express();
const port = 3000;

//Usa o formato json nas requisições - middleware
app.use(express.json());

let usuarios = [
    //Objetos no formato JSON
    {id: 1, nome: "Rodrigo", idade: 19},
    {id: 2, nome: "Gabriel", idade: 20}
]

//O proximo id de usuário
let nextId = 3;

//Opcional
app.get("/", (req, res) => {
    res.send("Hello World!")
})

//Get ALL - Buscar todos os usuários
app.get("/usuarios", (req, res) =>{
    res.send(usuarios);
})

//GET BY ID - Buscar usuário por id
app.get("/usuarios/:id", (req, res) => {
    //Pega o id na requisição
    const id = parseInt(req.params.id);
    //Usa o find para encontrar o usuário pelo id
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        res.status(404).send("Usuário não encontrado!")
    }
    res.status(200).send(usuario);
});

//POST - Criar Usuário
app.post("/usuarios", (req, res) =>{
    let novoUsuario = req.body;

    if (!novoUsuario.nome || novoUsuario.idade <= 0) {
        res.status(400).send("É necessario preencher idade e nome!");
    }

    novoUsuario.id = nextId;
    //Troca para o proximo id
    nextId ++;

    usuarios.push(novoUsuario);

    res.status(201).send(novoUsuario);
})

//PUT - Atualizar usuário
app.put("/usuarios/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    let novosDados = req.body;

    if (!novosDados.nome || novosDados.idade <= 0) {
        res.status(400).send("É necessario preencher idade e nome!");
    }

    novosDados.id = id;
    const index = usuarios.findIndex(u => u.id === id);

    if (index == -1) {
        res.status(404).send("Usuário não encontrado!");
    }

    usuarios[index] = novosDados;

    res.status(204).send();
})

//DELETE - Remover usuário
app.delete("/usuarios/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id == id);

    if(index == -1) {
        res.status(404).send("Usuário não encontrado!")
    }

    usuarios.splice(index, 1);
    res.status(204).send();
})

app.listen(port, () => {
    console.log("O servidor está rodando em http://localhost:" + port);
});
