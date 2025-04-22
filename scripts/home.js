const main = document.querySelector('main');
var carros = [];

carros = JSON.parse(localStorage.getItem('carros'));
if (carros == null) {
    carros = [];
    fetch('../assets/dados.json')
        .then(response => response.json())
        .then(data => {
            carros = data;
            localStorage.setItem('carros', JSON.stringify(carros));
        }).
        then(() => {
            exibirCards();
        });
} else {
    exibirCards();
}

function exibirCards() {
    main.innerHTML = '';
    carros.forEach((carro, indice) => {
        if (carro.disponivel) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${carro.imagem}" alt="${carro.nome}" onerror="this.src='../assets/wireframe01.png'">
                <div class="card-content">
                    <h2>${carro.nome}</h2>
                    <h3>${carro.marca}</h3>
                    <p>${carro.ano}</p>
                    <div class="info">
                        <p>Cor: ${carro.cor}</p>
                        <p>Km: ${carro.quilometragem}</p>
                    </div>
                    <p>R$ ${carro.preco_diaria.toFixed(2)}/dia</p>
                    <button onclick="mostrarDetalhes(${indice})">View Details</button>
                </div>
            `;
            main.appendChild(card);
        }
    });
}

function mostrarDetalhes(indice) {
    const detalhes = document.getElementById('detalhes');
    const titulo = document.querySelector('#detalhes h2');
    const imagem = document.querySelector('#detalhes img');
    const marca = document.querySelector('#detalhes .marca p');
    const cor = document.querySelector('#detalhes .cor p');
    const quilometragem = document.querySelector('#detalhes .quilometragem p');
    const preco = document.querySelector('#detalhes .preco p');
    
    detalhes.classList.remove('oculto');
    titulo.innerHTML = carros[indice].nome;
    imagem.src = carros[indice].imagem;
    imagem.onerror = function() {
        this.src = '../assets/wireframe01.png';
    };
    marca.innerHTML = carros[indice].marca;
    cor.innerHTML = carros[indice].cor;
    quilometragem.innerHTML = `${carros[indice].quilometragem} km`;
    preco.innerHTML = `$${carros[indice].preco_diaria.toFixed(2)}`;
    
    localStorage.setItem('carroSelecionado', JSON.stringify(carros[indice]));
}

function fecharModal() {
    const detalhes = document.getElementById('detalhes');
    detalhes.classList.add('oculto');
}
