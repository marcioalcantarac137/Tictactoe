
const celulas = document.querySelectorAll('.celula');
const statusTexto = document.getElementById('status');
const botaoReiniciar = document.getElementById('reiniciar');

let vezDoX = true;
let jogoAtivo = true;

const combinacoesVitoria = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]            
];

celulas.forEach(celula => celula.addEventListener('click', clicarCelula));
botaoReiniciar.addEventListener('click', reiniciarJogo);

function clicarCelula(e) {
    const celula = e.target;
    const indice = parseInt(celula.dataset.indice);

    if (celula.textContent !== '' || !jogoAtivo) return;
    
    celula.textContent = vezDoX ? '❌' : '⭕';

    verificarResultado();
}
function verificarResultado() {
    let vencedor = null;
    const simbolos = Array.from(celulas).map(c => c.textContent);
    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (simbolos[a] && simbolos[a] === simbolos[b] && simbolos[a] === simbolos[c]) {
            vencedor = simbolos[a];
            break;
        }
    }
    if (vencedor) {
        statusTexto.textContent = `Jogador ${vencedor} VENCEU! 🎉`;
        jogoAtivo = false;
        return;
    }
    if (!simbolos.includes('')) {
        statusTexto.textContent = 'DEU VELHA! ⚖️';
        jogoAtivo = false;
        return;
    }
    vezDoX = !vezDoX;
    statusTexto.textContent = `Vez do jogador: ${vezDoX ? '❌' : '⭕'}`;
}
function reiniciarJogo() {
    vezDoX = true;
    jogoAtivo = true;
    statusTexto.textContent = 'Vez do jogador: ❌';
    celulas.forEach(celula => celula.textContent = '');
}
