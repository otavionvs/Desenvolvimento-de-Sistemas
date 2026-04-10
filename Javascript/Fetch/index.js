function buscarCEP(event){
    event.preventDefault() //Não recarregar a página 
    // event.target.reset() -> Serve para apagar os dados dos inputs 

    // getElementById("id") -> pega o elemento do html
    // .value -> pega o valor do input
    let cep = document.getElementById("cep").value
    
    //Serve para consultar uma api
    //fetch(url)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    //Converte a respota para json
    .then(response => response.json())
    //Usa o dado se der certo
    .then(data => {
        console.log(data)
        let rua = document.getElementById("rua")
        //innerHTML -> Preencher HTML
        //innerText ou TextContent -> Preencher TEXTO
        rua.innerHTML = data.logradouro
    })
    //Trata o erro = Roda quando der erro
    .catch(error => {
        console.log(error)
        alert("Precisa ser um CEP valido!")
    });
}
