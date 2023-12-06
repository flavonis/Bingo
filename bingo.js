let cartelas = [];
let numerosSorteados = new Set(); 

function gerarCartela() {
    const cartela = {
        B: [],
        I: [],
        N: [],
        G: [],
        O: [],
    };

    const columns = ['B', 'I', 'N', 'G', 'O'];

    for (let col of columns) {
        let lowerLimit, upperLimit;

        switch (col) {
            case 'B':
                lowerLimit = 1;
                upperLimit = 15;
                break;
            case 'I':
                lowerLimit = 16;
                upperLimit = 30;
                break;
            case 'N':
                lowerLimit = 31;
                upperLimit = 45;
                break;
            case 'G':
                lowerLimit = 46;
                upperLimit = 60;
                break;
            case 'O':
                lowerLimit = 61;
                upperLimit = 75;
                break;
        }

        while (cartela[col].length < (col === 'N' ? 4 : 5)) {
            const num = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
            if (!cartela[col].includes(num)) {
                cartela[col].push(num);
            }
        }
    }

    return cartela;
}

function gerarCartelas() {
    cartelas = [];
    const totalCartelas = 2; // Altere o número de cartelas desejado

    for (let i = 0; i < totalCartelas; i++) {
        cartelas.push(gerarCartela());
    }

    mostrarCartelas();
}

function mostrarCartelas() {
    const bingoCardsDiv = document.getElementById('bingo-cards');
    bingoCardsDiv.innerHTML = '';

    cartelas.forEach((cartela, index) => {
        const cartelaDiv = document.createElement('div');
        cartelaDiv.classList.add('cartela');
        cartelaDiv.innerHTML = `<h3>Cartela ${index + 1}</h3>`;
        const columns = ['B', 'I', 'N', 'G', 'O'];

        columns.forEach(col => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');
            const numbers = cartela[col].map(num => `<div class="numero">${num !== '' ? num : ''}</div>`).join('');
            colDiv.innerHTML = `<div class="col-title">${col}</div>${numbers}`;
            cartelaDiv.appendChild(colDiv);
        });

        bingoCardsDiv.appendChild(cartelaDiv);
    });
}

function sortearNumero() {
    const numerosDisponiveis = criarNumerosDisponiveis();

    if (numerosDisponiveis.length === 0) {
        alert('Todos os números já foram sorteados!');
        return;
    }

    const numeroIndex = Math.floor(Math.random() * numerosDisponiveis.length);
    const numeroSorteado = numerosDisponiveis[numeroIndex];

    numerosSorteados.add(numeroSorteado);

    const sorteioDiv = document.getElementById('sorteio');
    sorteioDiv.textContent = `Número sorteado: ${numeroSorteado}`;

    verificarVencedor();
    atualizarCartelas();
    atualizarTabelaNumerosSorteados();
}

function criarNumerosDisponiveis() {
    const numerosDisponiveis = [];
    for (let i = 1; i <= 75; i++) {
        if (!numerosSorteados.has(i)) {
            numerosDisponiveis.push(i);
        }
    }
    return numerosDisponiveis;
}

function verificarVencedor() {
    cartelas.forEach((cartela, index) => {
        let cartelaPreenchida = true;

        const columns = ['B', 'I', 'N', 'G', 'O'];
        columns.forEach(col => {
            cartela[col].forEach(num => {
                if (!numerosSorteados.has(num)) {
                    cartelaPreenchida = false;
                }
            });
        });

        if (cartelaPreenchida) {
            alert(`Temos um vencedor! Parabéns, Jogador ${index + 1}!`);
        }
    });
}

function atualizarCartelas() {
    const numeros = document.querySelectorAll('.numero');
    numeros.forEach(numero => {
        if (numerosSorteados.has(Number(numero.textContent))) {
            numero.classList.add('sorteado');
        }
    });
}

function atualizarTabelaNumerosSorteados() {
    const numerosSorteioContainer = document.getElementById('numeros-sorteio-container');
    numerosSorteioContainer.innerHTML = '';

    const numerosOrdenados = [...numerosSorteados].sort((a, b) => a - b);

    numerosOrdenados.forEach(numero => {
        const numeroDiv = document.createElement('div');
        numeroDiv.textContent = numero;
        numeroDiv.classList.add('numero-sorteado');
        numerosSorteioContainer.appendChild(numeroDiv);
    });
}
