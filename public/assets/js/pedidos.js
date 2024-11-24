document.addEventListener('DOMContentLoaded', async ()=>{
    try{

        const response = await fetch('/api/orders',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            const pedidos = await response.json();

            const tabela = document.getElementById('tabela-pedidos');
            tabela.innerHTML="";
        
            const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            pedidos.forEach(pedido => {
                const linha = document.createElement('tr');

                linha.innerHTML = `<td>1</td>
                                    <td>${pedido.id_pedido}</td>
                                    <td>${pedido.data}</td>
                                    <td>${formatadorMoeda.format(pedido.valor_total)}</td>
                                    <td>
                                        <button class="btn btn-sm" style="background-color: #efdbd8 !important">Editar</button>
                                        <button onclick="DeletarPedido(${pedido.id_pedido})" class="btn btn-sm" style="background-color: #d9cfdc !important">Excluir</button>
                                    </td>`
                tabela.appendChild(linha);
            });
        }else{
            alert("Erro listar pedidos page Pedidos");
        } 
    }catch(erro){
        console.error("erro ao Listar pedidos na page Pedidos': " + erro.message);
    }
});

async function DeletarPedido(idpedido){
    try {

        const resposta = await fetch(`/api/orders/${idpedido}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(resposta.ok){
            alert("Delete concluido");
        }
    } catch (erro) {
        console.error("erro ao deletar imovel arquivo 'cadatroimovel.js': " + erro);
    }
}
