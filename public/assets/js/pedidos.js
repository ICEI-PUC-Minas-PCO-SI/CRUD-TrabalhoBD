async function CarregarPedidos() {
    try {
        const usuario_logado = JSON.parse(localStorage.getItem('usuario_logado'));
        //console.log(usuario_logado);
        if (usuario_logado == 2) {
            response = await fetch('/api/orders', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            response = await fetch(`/api/orders/${usuario_logado}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        if (response.ok) {
            const pedidos = await response.json();

            const tabela = document.getElementById('tabela-pedidos');
            tabela.innerHTML = "";

            const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            pedidos.forEach(pedido => {
                const linha = document.createElement('tr');

                // PUXANDO a data atual pra fica bunitin kkk
                const datanaoformat = new Date(pedido.data);
                const dia = String(datanaoformat.getDate()).padStart(2, '0');
                const mes = String(datanaoformat.getMonth() + 1).padStart(2, '0');
                const ano = String(datanaoformat.getFullYear());
                const data = `${dia}/${mes}/${ano}`;

                linha.innerHTML = `<td>${pedido.id_pedido}</td>
                                    <td>${pedido.id_usuario}</td>
                                    <td>${data}</td>
                                    <td>${formatadorMoeda.format(pedido.valor_total)}</td>
                                    <td class="d-flex gap-3">
                                        <a href="/editarpedido?id_pedido=${pedido.id_pedido}">
                                            <button class="btn btn-sm" style="background-color: #efdbd8 !important" type="submit">Editar</button>
                                        </a>
                                        <button onclick="DeletarPedido(${pedido.id_pedido})" class="btn btn-sm" style="background-color: #d9cfdc !important">Excluir</button>
                                    </td>`
                tabela.appendChild(linha);
            });
        } else {
            alert("Erro listar pedidos page Pedidos");
        }
    } catch (erro) {
        console.error("erro ao Listar pedidos na page Pedidos': " + erro.message);
    }
};

document.addEventListener('DOMContentLoaded', CarregarPedidos);

async function DeletarPedido(idpedido) {
    try {

        const resposta = await fetch(`http://localhost:8000/api/orders/${idpedido}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resposta.ok) {
            alert("Delete concluido");
            await CarregarPedidos();
        } else {
            console.error(`Erro ao deletar pedido. Status: ${resposta.status}`);
        }
    } catch (erro) {
        console.error(`Erro ao deletar pedido: ${erro.message}`);
    }
};