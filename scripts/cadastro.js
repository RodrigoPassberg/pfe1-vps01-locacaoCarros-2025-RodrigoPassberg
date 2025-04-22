document.addEventListener('DOMContentLoaded', function() {
    const formLocacao = document.getElementById('formLocacao');
    const selectCarro = document.getElementById('carro');
    const cpfInput = document.getElementById('cpf');
    const dataInicioInput = document.getElementById('dataInicio');
    const dataDevolucaoInput = document.getElementById('dataDevolucao');
    
    const hoje = new Date().toISOString().split('T')[0];
    dataInicioInput.min = hoje;
    dataDevolucaoInput.min = hoje;
    
    carregarCarros();
    
    const carroSelecionado = JSON.parse(localStorage.getItem('carroSelecionado'));
    if (carroSelecionado) {
        setTimeout(() => {
            selectCarro.value = carroSelecionado.id;
        }, 100);
    }
    
    cpfInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length !== 11) {
            document.getElementById('erro-cpf').style.display = 'block';
        } else {
            document.getElementById('erro-cpf').style.display = 'none';
        }
    });
    
    dataDevolucaoInput.addEventListener('change', function() {
        const dataInicio = new Date(dataInicioInput.value);
        const dataDevolucao = new Date(this.value);
        
        if (dataDevolucao <= dataInicio) {
            document.getElementById('erro-data-devolucao').style.display = 'block';
        } else {
            document.getElementById('erro-data-devolucao').style.display = 'none';
        }
    });
    
    dataInicioInput.addEventListener('change', function() {
        const dataInicio = new Date(this.value);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        if (dataInicio < hoje) {
            document.getElementById('erro-data-inicio').style.display = 'block';
        } else {
            document.getElementById('erro-data-inicio').style.display = 'none';
            
            const proximoDia = new Date(dataInicio);
            proximoDia.setDate(proximoDia.getDate() + 1);
            dataDevolucaoInput.min = proximoDia.toISOString().split('T')[0];
            
            if (new Date(dataDevolucaoInput.value) < proximoDia) {
                dataDevolucaoInput.value = proximoDia.toISOString().split('T')[0];
            }
        }
    });
    
    formLocacao.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let valido = true;
        
        if (document.getElementById('nomeCliente').value.trim() === '') {
            document.getElementById('erro-nome').style.display = 'block';
            valido = false;
        } else {
            document.getElementById('erro-nome').style.display = 'none';
        }
        
        if (cpfInput.value.length !== 11) {
            document.getElementById('erro-cpf').style.display = 'block';
            valido = false;
        }
        
        if (dataInicioInput.value === '') {
            document.getElementById('erro-data-inicio').style.display = 'block';
            valido = false;
        }
        
        if (dataDevolucaoInput.value === '') {
            document.getElementById('erro-data-devolucao').style.display = 'block';
            valido = false;
        } else if (new Date(dataDevolucaoInput.value) <= new Date(dataInicioInput.value)) {
            document.getElementById('erro-data-devolucao').style.display = 'block';
            valido = false;
        }
        
        if (selectCarro.value === '') {
            document.getElementById('erro-carro').style.display = 'block';
            valido = false;
        } else {
            document.getElementById('erro-carro').style.display = 'none';
        }
        
        if (valido) {
            const locacao = {
                id: new Date().getTime(),
                nomeCliente: document.getElementById('nomeCliente').value,
                cpf: cpfInput.value,
                dataInicio: dataInicioInput.value,
                dataDevolucao: dataDevolucaoInput.value,
                carroId: parseInt(selectCarro.value),
                status: 'ativa'
            };
            
            salvarLocacao(locacao);
            
            atualizarDisponibilidadeCarro(parseInt(selectCarro.value), false);
            
            alert('Locação cadastrada com sucesso!');
            window.location.href = '../index.html';
        }
    });
});

function carregarCarros() {
    const selectCarro = document.getElementById('carro');
    
    const carros = JSON.parse(localStorage.getItem('carros'));
    
    if (carros && carros.length > 0) {
        selectCarro.innerHTML = '<option value="">Selecione um carro</option>';
        
        carros.forEach(carro => {
            if (carro.disponivel) {
                const option = document.createElement('option');
                option.value = carro.id;
                option.textContent = `${carro.marca} ${carro.nome} (${carro.ano}) - R$ ${carro.preco_diaria.toFixed(2)}/dia`;
                selectCarro.appendChild(option);
            }
        });
    }
}

function salvarLocacao(locacao) {
    let locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    
    locacoes.push(locacao);
    
    localStorage.setItem('locacoes', JSON.stringify(locacoes));
}

function atualizarDisponibilidadeCarro(carroId, disponivel) {
    let carros = JSON.parse(localStorage.getItem('carros'));
    
    if (carros && carros.length > 0) {
        const carroIndex = carros.findIndex(carro => carro.id === carroId);
        
        if (carroIndex !== -1) {
            carros[carroIndex].disponivel = disponivel;
            
            localStorage.setItem('carros', JSON.stringify(carros));
        }
    }
}
