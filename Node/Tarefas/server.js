const express = require('express')
const app = express()
const port = 3002

app.use(express.json())

let tarefas = [
    { id: 1, titulo: 'Estudar Express', concluida: false },
    { id: 2, titulo: 'Fazer exercícios', concluida: false }
];

let nextId = 3

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/tarefa', (req, res) => {
    res.status(200).send(tarefas)
})

app.get('/tarefa/:id', (req, res) => {
    const id = parseInt(req.params.id);

    let tarefa = tarefas.find(e => e.id === id)

    if (!tarefa) {
        return res.status(404).send("A tarefa: " + id + " não foi encontrada!")
    }

    res.send(tarefa)
})

app.post('/tarefa', (req, res) => {
    let novaTarefa = req.body
    console.log(novaTarefa)

    novaTarefa.id = nextId

    tarefas.push(novaTarefa)
    nextId++

    res.status(201).send(novaTarefa)
})

app.put('/tarefa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let novaTarefa = req.body;

    const index = tarefas.findIndex(e => e.id === id)

    if (index == -1) {
        return res.status(404).send("Tarefa não encontrada!")
    }

    tarefas[index] = { ...tarefas[index], ...novaTarefa };
    res.status(204).send()
})

app.delete('/tarefa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(e => e.id === id)

    if (index == -1) {
        return res.status(404).send("Tarefa não encontrada!")
    }

    tarefas.splice(index, 1)

    res.status(204).send()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))