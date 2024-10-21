document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let score = 0;

    // Função que embaralha as cartas
    function shuffleCards() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
        updateScore();
        checkEndGame();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            
            resetBoard();
        }, 1600);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function updateScore() {
        score += 10;
        document.getElementById('score').textContent = score;
    }

    // Checa se o jogo terminou e reembaralha se necessário
    function checkEndGame() {
        const allFlipped = Array.from(cards).every(card => card.classList.contains('flip'));

        if (allFlipped) {
            setTimeout(() => {
                resetGame();
            }, 2000); // Pausa de 2 segundos antes de reiniciar o jogo
        }
    }

    // Reinicia o jogo, reembaralhando as cartas
    function resetGame() {
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        shuffleCards(); // Reembaralha ao reiniciar
        score = 0;
        document.getElementById('score').textContent = score;
    }

    shuffleCards(); // Embaralha as cartas ao carregar a página

    cards.forEach(card => card.addEventListener('click', flipCard));
});
