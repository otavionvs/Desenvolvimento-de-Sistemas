const express = require('express')
const app = express()
const port = 3001
const db = require('./db')

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuario")
        res.json(rows)
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao buscar usuario!")
    }
})

app.get('/usuario/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).send("O id é inválido!")
    }

    try {
        const [rows] = await db.query("Select * from usuario where id = ?", [id])
        if (rows.length == 0) {
            return res.status(404).send("Usuário não encontrado!")
        }
        res.json(rows)
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao buscar usuario!")
    }

})

app.post('/usuario', async (req, res) => {
    let { nome, idade } = req.body;

    if (!nome || !idade) {
        return res.status(400).send("Nome e idade devem ser preenchidos!")
    }

    try {
        const [result] = await db.query("INSERT INTO usuario (nome, idade) VALUES (?, ?)", [nome, idade])

        //result -> retorna o id (insertId)
        const novoUsuario = { id: result.insertId, nome, idade }
        res.status(201).json(novoUsuario)
    } catch (e) {
        console.log(e)
        res.status(500).send("Erro ao criar usuário!")
    }
})

app.put("/usuario/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    let { nome, idade } = req.body;

    if (isNaN(id)) {
        return res.status(400).send("O id é inválido!")
    }

    if (!nome || !idade) {
        return res.status(400).send("Nome e idade devem ser preenchidos!")
    }

    try {
        const [rows] = await db.query("Select * from usuario where id = ?", [id])
        if (rows.length == 0) {
            return res.status(404).send("Usuário não encontrado!")
        }

        const [result] = await db.query("UPDATE usuario SET nome = ?, idade = ? where id = ?", [nome, idade, id])

        if (result.affectedRows == 0) {
            return res.status(400).send("Nenhum dado foi alterado!")
        }

        res.status(204).send()
    } catch (e) {
        console.log(e)
        res.status(500).send("Erro ao atualizar usuário!")
    }
})

app.delete("/usuario/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).send("O id é inválido!")
    }

    try {
        const [rows] = await db.query("Select * from usuario where id = ?", [id])
        if (rows.length == 0) {
            return res.status(404).send("Usuário não encontrado!")
        }

        const [result] = await db.query("DELETE FROM usuario where id = ?", [id])

        if (result.affectedRows == 0) {
            return res.status(400).send("Nenhum dado foi alterado!")
        }

        res.status(204).send()
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao deletar usuario!")
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))