const palavras = [
    "DO CAMPO PARA A CIDADE",
    "AGRINHO",
    "CULTURA",
    "AGRICULTURA",
    "TECNOLOGIA",
    "RURAL",
    "CIDADE",
    "CAMPO",
    "URBANISMO",
    "EMPREENDEDORISMO",
    "DESENVOLVIMENTO"
];
let palavraAtualIndex = 0;
let tentativas = 7;
let letrasAdivinhadas = [];
let frase = palavras[palavraAtualIndex];
let fraseCompleta = "_ ".repeat(frase.length).trim();

const forcaImg = document.getElementById("forca-img");
const palavraEl = document.getElementById("palavra");
const letraInput = document.getElementById("letra");
const enviarBtn = document.getElementById("enviar");
const mensagemEl = document.getElementById("mensagem");
const proximoBtn = document.getElementById("proximo");

function atualizarPalavra() {
    let display = "";
    for (let char of frase) {
        if (letrasAdivinhadas.includes(char) || char === " ") {
            display += char + " ";
        } else {
            display += "_ ";
        }
    }
    palavraEl.textContent = display.trim();
}

function atualizarLetrasAdivinhadas() {
    const letrasEl = document.getElementById("letras-adivinhadas");
    letrasEl.textContent = `Letras adivinhadas: ${letrasAdivinhadas.join(", ")}`;
}

function verificarLetra() {
    const letra = letraInput.value.toUpperCase();
    letraInput.value = "";
    mensagemEl.textContent = "";

    if (letra.length !== 1 || !/[A-Z]/.test(letra)) {
        mensagemEl.textContent = "Por favor, digite uma única letra.";
        return;
    }

    if (letrasAdivinhadas.includes(letra)) {
        mensagemEl.textContent = `Você já adivinhou a letra ${letra}`;
        return;
    }

    letrasAdivinhadas.push(letra);
    atualizarLetrasAdivinhadas(); 

    if (frase.includes(letra)) {
        mensagemEl.textContent = `Parabéns, ${letra} está na frase!`;
    } else {
        mensagemEl.textContent = `${letra} não está na palavra.`;
        tentativas--;
        forcaImg.src = `${tentativas}.png`;
    }

    atualizarPalavra();

    if (!palavraEl.textContent.includes("_")) {
        mensagemEl.textContent = "Parabéns! Você acertou a frase completa!";
        enviarBtn.disabled = true;
        proximoBtn.style.display = "block";
    } else if (tentativas <= 0) {
        mensagemEl.textContent = "Você perdeu!";
        enviarBtn.disabled = true;
        proximoBtn.style.display = "block";
    }
}

function iniciarNovoJogo() {
    tentativas = 7;
    letrasAdivinhadas = [];
    palavraAtualIndex = (palavraAtualIndex + 1) % palavras.length;
    frase = palavras[palavraAtualIndex];
    fraseCompleta = "_ ".repeat(frase.length).trim();
    forcaImg.src = "7.png";
    mensagemEl.textContent = "";
    enviarBtn.disabled = false;
    proximoBtn.style.display = "none";
    atualizarPalavra();
    atualizarLetrasAdivinhadas(); 
}

enviarBtn.addEventListener("click", verificarLetra);
proximoBtn.addEventListener("click", iniciarNovoJogo);

atualizarPalavra();
atualizarLetrasAdivinhadas(); 
