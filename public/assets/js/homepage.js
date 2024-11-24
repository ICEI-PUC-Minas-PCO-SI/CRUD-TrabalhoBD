document.getElementById('formhomepage').addEventListener('submit', async (e)=>{

  e.preventDefault();

  function getSelectedRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`); 
    return radio ? radio.value : null; 
  }
  
  const massa = getSelectedRadioValue('massas');
  const recheio = getSelectedRadioValue('recheio');
  const tamanho = getSelectedRadioValue('tamanho');
  const decoracao = getSelectedRadioValue('decoracao');

  console.log(10);
  console.log(`${massa}, ${recheio}, ${tamanho}, ${decoracao}`);
})
