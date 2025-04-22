# Projeto Locadora de Carros - CarRental

Este é um projeto front-end de uma locadora de carros desenvolvido com HTML, CSS e JavaScript puro.

## Estrutura do Projeto

O projeto está organizado nas seguintes pastas:

- **assets**: Contém imagens, wireframes e o arquivo de dados JSON
- **pages**: Contém os arquivos HTML das páginas internas
- **styles**: Contém os arquivos CSS para estilização
- **scripts**: Contém os arquivos JavaScript para funcionalidades

## Funcionalidades

- Listagem de carros disponíveis para locação
- Visualização de detalhes de cada carro
- Formulário de cadastro de locação com validações
- Gerenciamento de locações ativas
- Armazenamento de dados em LocalStorage

## Requisitos

- Navegador web moderno com suporte a JavaScript e LocalStorage
- Conexão com internet para carregamento de fontes externas

## Como Executar

1. Abra o arquivo `index.html` no navegador para acessar a página inicial
2. Navegue pelo site usando os botões e links disponíveis

## Páginas

- **index.html**: Página inicial com apresentação da locadora
- **pages/home.html**: Listagem de carros disponíveis para locação
- **pages/cadastro.html**: Formulário para cadastro de locação
- **pages/carrinho.html**: Gerenciamento de locações ativas

## Validações Implementadas

- Validação de CPF (11 dígitos sem pontuação)
- Validação de datas (início e devolução)
- Verificação de disponibilidade de carros

## Armazenamento

Todos os dados são armazenados no LocalStorage do navegador:
- Carros disponíveis
- Cadastros de locação

## Responsividade

O projeto foi desenvolvido com design responsivo, adaptando-se a diferentes tamanhos de tela:
- Desktop
- Tablet
- Mobile

## Casos de Teste

- Validação da responsividade em diferentes dispositivos
- Verificação dos dados no botão "Ver Detalhes"
- Validação do armazenamento em LocalStorage
- Validação do formulário de cadastro
- Gerenciamento de locações ativas
