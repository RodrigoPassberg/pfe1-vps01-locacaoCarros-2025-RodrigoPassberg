document.addEventListener('DOMContentLoaded', function() {
    const tabelaLocacoes = document.getElementById('tabela-locacoes');
    const valorTotalSpan = document.getElementById('valor-total');
    
    carregarLocacoes();
    
    function carregarLocacoes() {
        const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
        const carros = JSON.parse(localStorage.getItem('carros')) || [];
        
        tabelaLocacoes.innerHTML = '';
        
        if (locacoes.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td colspan="7" style="text-align: center;">Nenhuma locação encontrada</td>
            `;
            tabelaLocacoes.appendChild(tr);
            valorTotalSpan.textContent = '0.00';
            return;
        }
        
        let valorTotal = 0;
        
        locacoes.forEach(locacao => {
            const carro = carros.find(c => c.id === locacao.carroId);
            
            if (carro) {
                const dataInicio = new Date(locacao.dataInicio);
                const dataDevolucao = new Date(locacao.dataDevolucao);
                const diffTime = Math.abs(dataDevolucao - dataInicio);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                const valorLocacao = diffDays * carro.preco_diaria;
                
                if (locacao.status === 'ativa') {
                    valorTotal += valorLocacao;
                }
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${locacao.id}</td>
                    <td>${locacao.nomeCliente}<br><small>CPF: ${formatarCPF(locacao.cpf)}</small></td>
                    <td>${carro.marca} ${carro.nome}</td>
                    <td>${formatarData(locacao.dataInicio)} a ${formatarData(locacao.dataDevolucao)}<br><small>${diffDays} dia(s)</small></td>
                    <td>R$ ${valorLocacao.toFixed(2)}</td>
                    <td>${locacao.status === 'ativa' ? '<span style="color: green;">Ativa</span>' : '<span style="color: gray;">Finalizada</span>'}</td>
                    <td>
                        ${locacao.status === 'ativa' ? 
                            `<button onclick="cancelarLocacao(${locacao.id})">Cancelar</button>` : 
                            '<button disabled>Finalizada</button>'}
                    </td>
                `;
                tabelaLocacoes.appendChild(tr);
            }
        });
        
        valorTotalSpan.textContent = valorTotal.toFixed(2);
    }
    
    window.formatarCPF = function(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    window.formatarData = function(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    }
    
    window.cancelarLocacao = function(locacaoId) {
        if (confirm('Tem certeza que deseja cancelar esta locação?')) {
            let locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
            let carros = JSON.parse(localStorage.getItem('carros')) || [];
            
            const locacaoIndex = locacoes.findIndex(l => l.id === locacaoId);
            
            if (locacaoIndex !== -1) {
                const carroId = locacoes[locacaoIndex].carroId;
                
                locacoes[locacaoIndex].status = 'finalizada';
                
                const carroIndex = carros.findIndex(c => c.id === carroId);
                if (carroIndex !== -1) {
                    carros[carroIndex].disponivel = true;
                }
                
                localStorage.setItem('locacoes', JSON.stringify(locacoes));
                localStorage.setItem('carros', JSON.stringify(carros));
                
                carregarLocacoes();
                
                alert('Locação cancelada com sucesso!');
            }
        }
    }
    
    window.finalizarLocacoes = function() {
        const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
        
        const locacoesAtivas = locacoes.filter(l => l.status === 'ativa');
        
        if (locacoesAtivas.length === 0) {
            alert('Não há locações ativas para finalizar.');
            return;
        }
        
        if (confirm(`Tem certeza que deseja finalizar ${locacoesAtivas.length} locação(ões)?`)) {
            const valorTotal = parseFloat(valorTotalSpan.textContent);
            
            alert(`Locações finalizadas com sucesso!\nValor total: R$ ${valorTotal.toFixed(2)}\nObrigado por escolher a CarRental!`);
            
            window.location.href = '../index.html';
        }
    }
});
