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
        })
        // Trata a resposta
        if (response.ok) {
            const res = await response.json();

            const idUsuario = res.id_usuario;
            localStorage.setItem('usuario_logado', JSON.stringify(idUsuario));

            window.location.href = "homepage.html";
        } else {
            alert('Erro ao logar usuário. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor');
    }
});



document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('cadastronome').value;
    const password = document.getElementById('cadastrosenha').value;
    const password_confirme = document.getElementById('confirmarsenha').value;
    const email = document.getElementById('cadastroemail').value;
    const address = document.getElementById('cadastroendereco').value;

    if (name.trim() === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!senhaRegex.test(password)) {
        alert('A senha deve ter no mínimo 8 caracteres, incluir pelo menos uma letra maiúscula, um número e um caractere especial.');
        return;
    }

    if (password !== password_confirme) {
        alert('As senhas não coincidem. Tente novamente.');
        return;
    }

    if (address.trim() === '') {
        alert('Por favor, insira um endereço válido.');
        return;
    }

    try {
        const response = await fetch("api/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, address })
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            AlternarDivs('cadastro-area', 'login-area');
        } else {
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor. Tente novamente.');
    }
});
