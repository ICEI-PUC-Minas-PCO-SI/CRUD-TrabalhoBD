function AlternarDivs(div1, div2) {
    document.getElementById(div1).style.display = 'none'; 
    document.getElementById(div2).style.display = 'block'; 

    if (div2 === 'cadastro-area') {
        document.getElementById('fundopreto').style.display = 'block';
        setTimeout(function() {
            document.getElementById('fundopreto').style.opacity = 1;
        }, 10); 
    } else {
        document.getElementById('fundopreto').style.opacity = 0;
        setTimeout(function() {
            document.getElementById('fundopreto').style.display = 'none';
        }, 500);
    }
}

  