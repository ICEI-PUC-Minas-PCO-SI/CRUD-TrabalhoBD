function AlternarDivs(div1, div2) {
    document.getElementById(div1).style.display = 'none';
    document.getElementById(div2).style.display = 'block';

    if (div2 === 'cadastro-area') {
        document.getElementById('fundopreto').style.display = 'block';
        setTimeout(function () {
            document.getElementById('fundopreto').style.opacity = 1;
        }, 10);
    } else {
        document.getElementById('fundopreto').style.opacity = 0;
        setTimeout(function () {
            document.getElementById('fundopreto').style.display = 'none';
        }, 500);
    }
}

document.getElementById('formlogar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    try {
        const response = await fetch("api/loginUsers", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        // Trata a resposta
        if (response.ok) { 
           window.location.href = "homepage.html";
        } else {
            alert('Erro ao logar usuário. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor.blabla');
    }
});



document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('cadastronome').value;
    const password = document.getElementById('cadastrosenha').value;
    const password_confirme = document.getElementById('confirmarsenha').value;
    const email = document.getElementById('cadastroemail').value;
    const address = document.getElementById('cadastroendereco').value;

    if (password == password_confirme) {
        try {
            const response = await fetch("api/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, address })
            });
            // Trata a resposta
            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                // Opcional: Limpar os campos do formulário
                AlternarDivs('cadastro-area', 'login-area');
            } else {
                alert('Erro ao cadastrar usuário. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao conectar ao servidor.blabla');
        }
    }
})  