
    //Definindo variáveis globais
    let qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar? (números pares de 4 a 14)"));
    let qtdCartasIguais = qtdCartas/2; //número de pares de carta de acordo com a qtd escolhida
    let gifs = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif',  'metalparrot.gif', 
    'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];
    let gifsQtdEscolhida = [];
    let compararCartas = [];
    let firstCard = undefined;
    let secondCard = undefined;
    let verificador = 0;
    let contador = 0;

    //variáveis para o relógio:
    let contadorRelogio = 0;
    let intervalo;

    // função para aplicar o prompt até que o usuario coloque uma resposta correta
function comecarJogo() {
    let condicao = 0;

    while(condicao === 0) {
        if (qtdCartas < 4 || qtdCartas > 14 || (qtdCartas % 2) === 1) {
        qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar? (números pares de 4 a 14)"));
        condicao = 0;
        } else {
            condicao = 1;
        }
    }

    colocarCartas();
    intervalo = setInterval(relogio, 1000);
}

comecarJogo(); // para rodar o jogo inicialmente

// para embaralhar elementos:
function embaralhador() {
    return Math.random() - 0.5;
}

//colocando as cartas dinamicamente no HTML:
function colocarCartas() {
    const main = document.querySelector("main");
    let gifsEmbaralhados = gifs.sort(embaralhador); //embaralha pela primeira vez

    // coloca dois pares iguais da array de gifs embaralhada
    for (i = 0; i < qtdCartasIguais; i++) {
        gifsQtdEscolhida.push(gifsEmbaralhados[i]);
        gifsQtdEscolhida.push(gifsEmbaralhados[i]);
    } 
    //embaralha novamente para aplicar a array adequada para a qtd de cartas escolhida:
    let gifsEmbaralhadosNovamente = gifsQtdEscolhida.sort(embaralhador);

    for(i = 0; i < qtdCartas ; i++) {

        const conteudoCarta = `
        <article class="carta carta${i}" onclick="virarCarta(this)" data-identifier="card">
            <div class="carta-frente face" data-identifier="back-face">
                <img src="./gifs-e-img/front.png" alt="Papagaio carta"/>
            </div>
            <div class="carta-tras face virar" data-identifier="front-face">
                <img src="./gifs-e-img/${gifsEmbaralhadosNovamente[i]}" alt="Papagaio gif"/>
            </div>
        </article>`;

        main.innerHTML += conteudoCarta;
    }
}

// função para virar a carta ao ser clicada, recebe como parâmetro o this:
 function virarCarta(carta) {
    const cartaFrente = carta.querySelector("div:nth-child(1)");
    const cartaTras = carta.querySelector("div:nth-child(2)");
    contador++; //para cada clique, o contador soma 1
    compararCartas.push(carta); //aplica esta carta especifica na array que compara as cartas 
    //posteriormente

    // Adiciona e remove a classe virar, que é responsável por aplicar o efeito do CSS transition
    cartaFrente.classList.toggle("virar");
    cartaTras.classList.toggle("virar");

    desativarSelecao();
    setTimeout(ativarSelecao, 1000);
    // se houver mais de uma carta escolhida, a função desvirarCartas é ativada, caso contrário nada 
    //acontece
    if (compararCartas.length > 1) {
    setTimeout(() => desvirarCartas(), 1000);
    }

 }

 function desvirarCartas() {
     // salva em variáveis as especificações de cada uma das cartas que foram clicadas
    firstCard = compararCartas[0].querySelector(".carta-tras").innerHTML;
    secondCard = compararCartas[1].querySelector(".carta-tras").innerHTML;
    const firstCardAll = compararCartas[0];
    const secondCardAll = compararCartas[1];

    const firstCardClasslist = compararCartas[0].classList;
    const secondCardClasslist = compararCartas[1].classList;

    const firstCardHTMLFrente = compararCartas[0].querySelector("div:nth-child(1)");
    const firstCardHTMLTras = compararCartas[0].querySelector("div:nth-child(2)");
    const secondCardHTMLFrente = compararCartas[1].querySelector("div:nth-child(1)");
    const secondCardHTMLTras = compararCartas[1].querySelector("div:nth-child(2)");

    if (firstCard !== secondCard) {
        // se as cartas forem diferentes, a classe virar é adicionada ou removida das faces para retornar 
        //a posição original:
        firstCardHTMLFrente.classList.toggle("virar");
        firstCardHTMLTras.classList.toggle("virar");
        secondCardHTMLFrente.classList.toggle("virar");
        secondCardHTMLTras.classList.toggle("virar");
     } else if (firstCardClasslist === secondCardClasslist) {
         // esse vai evitar um bug, pois se uma mesma carta for clicada duas vezes, o código iria entender 
         //que a carta 1 é igual a carta 2. Assim, se o clique for na mesma carta na segunda vez, a condição
         // remove do array de comparação o ultimo elemento
        compararCartas.splice();
    } else { 
         // se as cartas forem iguais, o atributo onclick é removido das cartas especificas para que 
         //não possam ser mais selecionadas
        firstCardAll.removeAttribute('onclick');
        secondCardAll.removeAttribute('onclick');
        verificador++; //ao mesmo tempo, é somado 1 ao verificador para ver se pode encerrar o jogo 
        //posteriormente   
     }

        compararCartas = []; //retorna a array de comparação a ser vazia, assim como as variaveis 
        //firstcard e secondcard
        firstCard = undefined;
        secondCard = undefined;
        encerrarJogo();
 }

 function encerrarJogo() {
     // se o verificador for igual a metade da qtd de cartas escolhidas, encerra o jogo
    if (verificador === qtdCartasIguais) {
        clearInterval(intervalo);
        alert(`Você ganhou em ${contador} jogadas e ${contadorRelogio} segundos`);
        const reiniciar = (prompt("Quer jogar novamente?")).toUpperCase();
        
        if (reiniciar === "SIM" || reiniciar === "S") {
            alert("Então vai ter que atualizar a página, pq eu não implementei o reinicio")
        } else {
            alert("vc quem sabe")
        }
    }
 }

 function relogio() {
    contadorRelogio++;
 }

// Para impedir bugs de clicar rapidamente, as funções desativam o atributo onclick das cartas
 function desativarSelecao() {
    const cartasAll = document.querySelectorAll("article");

    for (let i = 0; i < qtdCartas; i++) {
        cartasAll[i].removeAttribute('onclick');
    }
 }

 function ativarSelecao() {
    const cartasAll = document.querySelectorAll("article");

    for (let i = 0; i < qtdCartas; i++) {
        cartasAll[i].setAttribute('onclick', 'virarCarta(this)');
    }
 }
