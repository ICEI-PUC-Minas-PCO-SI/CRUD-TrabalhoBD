function ProtegerPagina() {

    if (!localStorage.hasOwnProperty("usuario_logado")) {
        location.href = "index.html";
        console.log(`Usuário não efetuou o login!`);
    }
}

ProtegerPagina();