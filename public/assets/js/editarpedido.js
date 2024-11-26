document.getElementById('formhomepage').addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlparams = new URLSearchParams(window.location.search);
    const id_pedido = urlparams.get('id_pedido');

    function getSelectedRadioValue(name) {
        const radio = document.querySelector(`input[name="${name}"]:checked`);
        return radio ? radio.value : null;
    }

    const base = getSelectedRadioValue('massas');
    const filling = getSelectedRadioValue('recheio');
    const size = getSelectedRadioValue('tamanho');
    const description = getSelectedRadioValue('decoracao');

    // Primeiro, fazemos uma requisição para obter a combinação
    const Combination = await FindCombination(base, filling, size, description);
    const combinationId = Combination.id_combinacao;
    const finalValue = parseFloat(Combination.preco);
    const data = new Date();

    try {
        const response = await fetch(`api/orders/${id_pedido}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data,finalValue, combinationId })
        });
  
        if (response.ok) {
          alert('Pedido atualizado com sucesso!');
        } else {
          alert('Erro ao atualizar pedido. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor.');
      }
});

async function FindCombination(base, filling, size, description) {
    //console.log(base, filling, size, description)
    try {
      const response = await fetch("api/combinations", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ base, filling, size, description })
      });
  
      if (response.ok) {
        return await response.json();  // Retorna o JSON da resposta
      } else {
        console.error('Erro ao buscar combinação');
        return null;
      }
    } catch (error) {
      console.error('Erro na requisição de combinação:', error);
      alert('Erro ao conectar ao servidor.');
      return null;
    }
  }
