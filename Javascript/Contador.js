if(!localStorage.getItem("contador")){
    localStorage.setItem("contador", "0");
}

document.querySelector("h1").innerHTML = parseInt(localStorage.getItem("contador"));

function contar() {
    let contador = parseInt(localStorage.getItem("contador"));

    contador++;

    //alert(contador);
    //textContent - Altera apenas texto
    document.querySelector("h1").innerHTML = contador;
    localStorage.setItem("contador", contador)
}

//Pegar elemento por ID
//document.getElementById("contar").onclick = contar;
document.getElementById("contar").addEventListener("click", contar)