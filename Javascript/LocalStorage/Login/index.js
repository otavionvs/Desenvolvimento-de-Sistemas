function cadastrar(event) {
    event.preventDefault()

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioExiste = usuarios.find(e => e.email === email)

    if (!usuarioExiste) {
        usuarios.push({
            email: email,
            senha: senha
        })

        localStorage.setItem("usuarios", JSON.stringify(usuarios))
    } else {
        alert("Usuário já existe!")
        event.target.reset()
    }
}