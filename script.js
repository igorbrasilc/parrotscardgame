
    let qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar? (números pares de 4 a 14)"));
    let gifs = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif',  'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

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
    const cartaTras = `
    <div class="carta">
        <div class="carta-frente face">
            <img src="gifs-e-img/front.png" alt="Papagaio carta"/>
        </div>
        <div class="carta-tras face">
            <img src="gifs-e-img/${gifs[0]}" alt="Papagaio gif"/>
        </div>
    </div>`;

    for(i = 0; i < qtdCartas ; i++) {
        main.innerHTML = main.innerHTML + cartaTras;
    }
}

function virarCarta() {}