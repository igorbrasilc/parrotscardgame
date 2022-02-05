
    const qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar? (números pares de 4 a 14)"));
    const qtdCartasIguais = qtdCartas/2;
    let gifs = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif',  'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];
    let gifsQtdEscolhida = [];
    let compararCartas = [];
    let firstCard = undefined;
    let secondCard = undefined;
    let verificador = 0;
    let contador = 0;

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
}

comecarJogo();

function embaralhador() {
    return Math.random() - 0.5;
}

function colocarCartas() {
    const main = document.querySelector("main");
    let gifsEmbaralhados = gifs.sort(embaralhador);

    for (i = 0; i < qtdCartasIguais; i++) {
        gifsQtdEscolhida.push(gifsEmbaralhados[i]);
        gifsQtdEscolhida.push(gifsEmbaralhados[i]);
    }

    let gifsEmbaralhadosNovamente = gifsQtdEscolhida.sort(embaralhador);

    for(i = 0; i < qtdCartas ; i++) {

        const conteudoCarta = `
        <article class="carta carta${i}" onclick="virarCarta(this)">
            <div class="carta-frente face">
                <img src="./gifs-e-img/front.png" alt="Papagaio carta"/>
            </div>
            <div class="carta-tras face virar">
                <img src="./gifs-e-img/${gifsEmbaralhadosNovamente[i]}" alt="Papagaio gif"/>
            </div>
        </article>`;

        main.innerHTML += conteudoCarta;
    }
}

 function virarCarta(carta) {
    const cartaFrente = carta.querySelector("div:nth-child(1)");
    const cartaTras = carta.querySelector("div:nth-child(2)");
    contador++;
    compararCartas.push(carta);

    cartaFrente.classList.toggle("virar");
    cartaTras.classList.toggle("virar");

    if (compararCartas.length > 1) {
    setTimeout(() => desvirarCartas(), 1000);
    }

 }

 function desvirarCartas() {
    firstCard = compararCartas[0].querySelector(".carta-tras").innerHTML;
    secondCard = compararCartas[1].querySelector(".carta-tras").innerHTML;
    const firstCardAll = compararCartas[0];
    const secondCardAll = compararCartas[1];

    const firstCardHTMLFrente = compararCartas[0].querySelector("div:nth-child(1)");
    const firstCardHTMLTras = compararCartas[0].querySelector("div:nth-child(2)");
    const secondCardHTMLFrente = compararCartas[1].querySelector("div:nth-child(1)");
    const secondCardHTMLTras = compararCartas[1].querySelector("div:nth-child(2)");

    if (firstCard !== secondCard) {
        firstCardHTMLFrente.classList.toggle("virar");
        firstCardHTMLTras.classList.toggle("virar");
        secondCardHTMLFrente.classList.toggle("virar");
        secondCardHTMLTras.classList.toggle("virar");
     } else {
        firstCardAll.removeAttribute('onclick');
        secondCardAll.removeAttribute('onclick');
        verificador++;
     }
        encerrarJogo();
        compararCartas = [];
        firstCard = undefined;
        secondCard = undefined;

    // se a carta1 do array compararCartas for igual a carta2, não deve fazer nada
    // caso contrário, desvirar as duas cartas 
 }

 function encerrarJogo() {
    
    if (verificador === qtdCartasIguais) {
        alert(`Você ganhou em ${contador} jogadas`);
    }
 }
