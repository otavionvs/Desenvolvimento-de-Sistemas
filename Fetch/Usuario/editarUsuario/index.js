const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")

const nome = document.getElementById("nomeUsuario")
const idade = document.getElementById("idadeUsuario")


fetch(`http://localhost:3001/usuario/${id}`)

    .then(response => response.json())

    .then(data => {
        nome.value = data.nome
        idade.value = data.idade
    })

    .catch(error => console.log(error));

function atualizarUsuario(event) {
    event.preventDefault() //Não recarregar a página

    const usuario = {
        "nome": nome.value,
        "idade": parseInt(idade.value)
    }

    fetch(`http://localhost:3001/usuario/${id}`, {
    
        method: 'PUT',
    
        headers: {
    
            'Content-Type': 'application/json'
    
        },
    
        body: JSON.stringify(usuario)
    
    })
    
        .then(response => {
            //Verificar se o status está na faixa 200
            if(response.ok){
                return response
            }
            return response.json()
        })
    
        .then(data => {
            alert("Usuário foi atualizado com Sucesso!")
            window.location.href = "../index.html"
        })
    
        .catch(error => console.log(error));

}