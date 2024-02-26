document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameActive = true;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.id);

        if (cell.textContent !== "" || !gameActive) return;

        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            announceWinner(currentPlayer);
            gameActive = false;
        } else if (checkDraw()) {
            announceDraw();
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    };

    const checkWin = (player) => {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    };

    const checkDraw = () => {
        return [...cells].every(cell => {
            return cell.textContent !== "";
        });
    };

    const announceWinner = (player) => {
        alert(`Player ${player} wins!`);
    };

    const announceDraw = () => {
        alert("It's a draw!");
    };

    const resetGame = () => {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        gameActive = true;
    };

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    resetButton.addEventListener("click", resetGame);
});
