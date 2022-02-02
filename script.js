
    let qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar? (números pares de 4 a 14)"));

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

function colocarCartas() {
    const main = document.querySelector("main");
    const cartaTras = `<div class="carta-tras">
    <img src="gifs-e-img/front.png" alt="Papagaio Carta"/>
    </div>`;

    for(i = 0; i < qtdCartas ; i++) {
        main.innerHTML = main.innerHTML + cartaTras;
    }
}