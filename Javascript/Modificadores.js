function trocaImagem(){
    let imgPrincipal = document.getElementById("imgPrincipal");

    //Modificar do elemento
    imgPrincipal.setAttribute("src", "https://receitatodahora.com.br/wp-content/uploads/2022/03/orelha-de-gato.jpg")

    // imgPrincipal.removeAttribute("src")
    // imgPrincipal.setAttribute("alt", "Imagem de cuca")

    //Modificar de classe
    imgPrincipal.classList.add('arredondar');

    //Modificador de CSS
    imgPrincipal.style.width = "200px";
    imgPrincipal.style.height = "200px";
}