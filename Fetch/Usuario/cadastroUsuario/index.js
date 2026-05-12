function cadastrarUsuario(event) {
    event.preventDefault() //Não recarregar a página

    const nome = document.getElementById("nomeUsuario").value
    const idade = document.getElementById("idadeUsuario").value

    const usuario = {
        "nome": nome,
        "idade": parseInt(idade)
    }

    fetch('http://localhost:3001/usuario', {
    
        method: 'POST',
    
        headers: {
    
            'Content-Type': 'application/json'
    
        },
    
        body: JSON.stringify(usuario)
    
    })
    
        .then(response => response.json())
    
        .then(data => {
            alert("Usuário foi cadastrado com Sucesso!")
            window.location.href = "../index.html"
        })
    
        .catch(error => console.log(error));

}