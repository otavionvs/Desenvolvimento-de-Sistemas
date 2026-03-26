function somar(event){
    event.preventDefault()

    const num1 = document.querySelector("#num1").value;
    const num2 = document.querySelector("#num2").value;

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = parseInt(num1) + parseInt(num2);
}