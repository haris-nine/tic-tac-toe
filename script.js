const TicTacToe = (function() {
    // Game Board State
    let board = ["", "", "", "", "", "", "", "", ""];
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    // Player Setup
    let player1 = {
        name: "",
        symbol: "X"
    };
    
    let player2 = {
        name: "",
        symbol: "O"
    };
    
    let currentPlayer = player1;

    // HTML Elements
    const cells = document.getElementsByClassName('cell');
    const turnDisplay = document.getElementById("turnDisplay");

    // Helper Functions
    function updateTurnMessage() {
        turnDisplay.textContent = `${currentPlayer.name}'s turn`;
    }
    
    function renderBoard() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = board[i];
        }
    }
    
    function disableBoard() {
        for (let cell of cells) {
            cell.removeEventListener('click', mark);
        }
    }

    // Game Logic
    function checkWinner() {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                turnDisplay.textContent = `${currentPlayer.name} wins!`;
                disableBoard();
                return true;
            }
        }
        return false;
    }
    
    function checkTie() {
        if (board.every(cell => cell !== "")) {
            turnDisplay.textContent = "It's a tie!";
            disableBoard();
            return true;
        }
        return false;
    }

    // Event Handlers
    function mark() {
        if (this.innerHTML === '') {
            board[this.dataset.index] = currentPlayer.symbol;
            renderBoard();
            if (checkWinner() || checkTie()) return;

        // Switch Player and Update Turn Message
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            updateTurnMessage();
        }
    }

    // Initialize Game
    function initializeGame() {
        player1.name = document.getElementById('player1').value || "Player 1";
        player2.name = document.getElementById('player2').value || "Player 2";
        renderBoard();
        updateTurnMessage();
        
        for (let cell of cells) {
        cell.addEventListener('click', mark);
        }

        document.getElementById('player-input').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
    }

    // Public API
    return {
        start: initializeGame,
        restart: () => window.location.reload()
    };
})();

  // Usage
document.getElementById('startGame').addEventListener('click', TicTacToe.start);
document.getElementById('restartGame').addEventListener('click', TicTacToe.restart);