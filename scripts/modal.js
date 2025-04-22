function mostrarDetalhes(indice) {
    const carros = JSON.parse(localStorage.getItem('carros')) || [];
    
    if (!carros || carros.length === 0 || !carros[indice]) {
        alert('Erro ao carregar detalhes do carro.');
        return;
    }
    
    const carro = carros[indice];
    const detalhes = document.getElementById('detalhes');
    const titulo = document.querySelector('#detalhes h2');
    const imagem = document.querySelector('#detalhes img');
    const marca = document.querySelector('#detalhes .marca p');
    const cor = document.querySelector('#detalhes .cor p');
    const quilometragem = document.querySelector('#detalhes .quilometragem p');
    const preco = document.querySelector('#detalhes .preco p');
    
    detalhes.classList.remove('oculto');
    titulo.innerHTML = carro.nome;
    imagem.src = carro.imagem;
    imagem.onerror = function() {
        this.src = '../assets/wireframe01.png';
    };
    marca.innerHTML = carro.marca;
    cor.innerHTML = carro.cor;
    quilometragem.innerHTML = `${carro.quilometragem} km`;
    preco.innerHTML = `R$ ${carro.preco_diaria.toFixed(2)}`;
    
    localStorage.setItem('carroSelecionado', JSON.stringify(carro));
}

function fecharModal() {
    const detalhes = document.getElementById('detalhes');
    detalhes.classList.add('oculto');
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }
});

document.addEventListener('click', function(event) {
    const modal = document.getElementById('detalhes');
    const janela = document.querySelector('.janela');
    
    if (event.target === modal && !modal.classList.contains('oculto')) {
        fecharModal();
    }
});
