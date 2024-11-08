const TicTacToe = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let player1, player2;
    
    const createPlayer = (name, symbol) => {
        return { name, symbol };
    };
    
    const startGame = () => {
        player1 = createPlayer(document.getElementById("player1").value || "Player 1", "X");
        player2 = createPlayer(document.getElementById("player2").value || "Player 2", "O");
        currentPlayer = player1.symbol;
        document.getElementById("turnDisplay").textContent = `${player1.name}'s Turn`;
        document.getElementById("player-input").style.display = "none";
        document.getElementById("gameBoard").style.display = "block";
    };
    
    const renderBoard = () => {
        board.forEach((mark, index) => {
        document.querySelector(`.cell[data-index="${index}"]`).textContent = mark;
        });
    };
    
    const handleClick = (index) => {
        if (board[index] === "" && !checkWinner()) {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            document.getElementById("turnDisplay").textContent = `${getCurrentPlayer().name} Wins!`;
        } else if (!board.includes("")) {
            document.getElementById("turnDisplay").textContent = "It's a Tie!";
        } else {
            switchPlayer();
            document.getElementById("turnDisplay").textContent = `${getCurrentPlayer().name}'s Turn`;
        }
        }
    };
    
    const getCurrentPlayer = () => (currentPlayer === player1.symbol ? player1 : player2);
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1.symbol ? player2.symbol : player1.symbol;
    };
    
    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === currentPlayer)
        );
    };
    
    const resetGame = () => {
        board.fill("");
        currentPlayer = player1.symbol;
        document.getElementById("turnDisplay").textContent = `${player1.name}'s Turn`;
        renderBoard();
    };
    
    document.getElementById("startGame").addEventListener("click", startGame);
    document.getElementById("restartGame").addEventListener("click", resetGame);
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", () => handleClick(cell.dataset.index));
    });

    return { startGame, resetGame };
})();
