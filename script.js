document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset-button");
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let modal = document.createElement("div");
    modal.id = "modal";
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.appendChild(modalContent);

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
                return boardState[a];
            }
        }

        if (boardState.every(cell => cell !== "")) {
            return "draw";
        }

        return null;
    }

    function handleCellClick(event) {
        const cellIndex = parseInt(event.target.dataset.index);

        if (boardState[cellIndex] === "" && !checkWinner()) {
            boardState[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            const winner = checkWinner();
            if (winner) {
                showModal(winner === "draw" ? "It's a draw!" : `${winner} wins!`);
            }
        }
    }

    function showModal(message) {
        modalContent.textContent = message;
        modal.style.display = "flex";
    }

    function hideModal() {
        modal.style.display = "none";
        resetGame();
    }

    function resetGame() {
        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
        modalContent.textContent = "";
    }

    resetButton.addEventListener("click", resetGame);

    modal.addEventListener("click", hideModal);

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    document.body.appendChild(modal);
});
