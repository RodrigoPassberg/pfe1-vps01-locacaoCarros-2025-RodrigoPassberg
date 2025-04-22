document.addEventListener('DOMContentLoaded', function() {
    inicializarLocalStorage();
});

function inicializarLocalStorage() {
    if (!localStorage.getItem('carros')) {
        fetch('../assets/dados.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('carros', JSON.stringify(data));
            })
            .catch(error => {
                const carrosFallback = [
                    {
                        "id": 1,
                        "nome": "Onix LT 1.0",
                        "marca": "Chevrolet",
                        "ano": 2022,
                        "cor": "Preto",
                        "quilometragem": 15000,
                        "preco_diaria": 100.00,
                        "descricao": "Carro compacto econômico, ideal para cidade",
                        "imagem": "../assets/onix.jpg",
                        "disponivel": true
                    },
                    {
                        "id": 2,
                        "nome": "HB20 Vision",
                        "marca": "Hyundai",
                        "ano": 2023,
                        "cor": "Silver",
                        "quilometragem": 25000,
                        "preco_diaria": 120.00,
                        "descricao": "Carro compacto com ótimo custo-benefício",
                        "imagem": "../assets/hb20.jpg",
                        "disponivel": true
                    }
                ];
                
                localStorage.setItem('carros', JSON.stringify(carrosFallback));
            });
    }

    if (!localStorage.getItem('locacoes')) {
        localStorage.setItem('locacoes', JSON.stringify([]));
    }
}

function obterTodosCarros() {
    return JSON.parse(localStorage.getItem('carros')) || [];
}

function obterCarroPorId(id) {
    const carros = obterTodosCarros();
    return carros.find(carro => carro.id === id) || null;
}

function obterCarrosDisponiveis() {
    const carros = obterTodosCarros();
    return carros.filter(carro => carro.disponivel);
}

function atualizarCarro(carro) {
    const carros = obterTodosCarros();
    const index = carros.findIndex(c => c.id === carro.id);
    
    if (index !== -1) {
        carros[index] = carro;
        localStorage.setItem('carros', JSON.stringify(carros));
        return true;
    }
    
    return false;
}

function atualizarDisponibilidadeCarro(carroId, disponivel) {
    const carros = obterTodosCarros();
    const index = carros.findIndex(carro => carro.id === carroId);
    
    if (index !== -1) {
        carros[index].disponivel = disponivel;
        localStorage.setItem('carros', JSON.stringify(carros));
        return true;
    }
    
    return false;
}

function obterTodasLocacoes() {
    return JSON.parse(localStorage.getItem('locacoes')) || [];
}

function obterLocacoesPorStatus(status) {
    const locacoes = obterTodasLocacoes();
    return locacoes.filter(locacao => locacao.status === status);
}

function obterLocacoesPorCliente(cpf) {
    const locacoes = obterTodasLocacoes();
    return locacoes.filter(locacao => locacao.cpf === cpf);
}

function adicionarLocacao(locacao) {
    const locacoes = obterTodasLocacoes();
    
    if (!locacao.id) {
        locacao.id = new Date().getTime();
    }
    
    locacoes.push(locacao);
    localStorage.setItem('locacoes', JSON.stringify(locacoes));
    
    atualizarDisponibilidadeCarro(locacao.carroId, false);
    
    return locacao;
}

function atualizarStatusLocacao(locacaoId, novoStatus) {
    const locacoes = obterTodasLocacoes();
    const index = locacoes.findIndex(locacao => locacao.id === locacaoId);
    
    if (index !== -1) {
        const statusAntigo = locacoes[index].status;
        locacoes[index].status = novoStatus;
        localStorage.setItem('locacoes', JSON.stringify(locacoes));
        
        if ((statusAntigo === 'ativa') && (novoStatus === 'finalizada' || novoStatus === 'cancelada')) {
            atualizarDisponibilidadeCarro(locacoes[index].carroId, true);
        }
        
        return true;
    }
    
    return false;
}

window.localStorage = {
    ...window.localStorage,
    obterTodosCarros,
    obterCarroPorId,
    obterCarrosDisponiveis,
    atualizarCarro,
    atualizarDisponibilidadeCarro,
    obterTodasLocacoes,
    obterLocacoesPorStatus,
    obterLocacoesPorCliente,
    adicionarLocacao,
    atualizarStatusLocacao
};
