
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('carros')) {
        fetch('../assets/dados.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('carros', JSON.stringify(data));
                console.log('Dados de carros carregados no LocalStorage com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao carregar dados de carros:', error);
            });
    }

    if (!localStorage.getItem('locacoes')) {
        localStorage.setItem('locacoes', JSON.stringify([]));
    }
});
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) {
        return false;
    }
    
    return true;
}

function validarData(data) {
    const dataObj = new Date(data);
    return !isNaN(dataObj.getTime());
}

function calcularDiasLocacao(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffTime = Math.abs(fim - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function formatarData(data) {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR');
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function obterCarrosDisponiveis() {
    const carros = JSON.parse(localStorage.getItem('carros')) || [];
    return carros.filter(carro => carro.disponivel);
}

function obterLocacoesAtivas() {
    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    return locacoes.filter(locacao => locacao.status === 'ativa');
}

function atualizarDisponibilidadeCarro(carroId, disponivel) {
    let carros = JSON.parse(localStorage.getItem('carros')) || [];
    const index = carros.findIndex(carro => carro.id === carroId);
    
    if (index !== -1) {
        carros[index].disponivel = disponivel;
        localStorage.setItem('carros', JSON.stringify(carros));
        return true;
    }
    
    return false;
}
