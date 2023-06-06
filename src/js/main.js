const ticTacToeBoard = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'circle';

function init() {
    render();
    addClickHandlers();
}

function render() {
    const contentDiv = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;
            cell.id = `cell-${index}`;
            renderCell(cell, index);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    contentDiv.innerHTML = '';
    contentDiv.appendChild(table);

    const winner = checkWinner();
    if (winner) {
        console.log(`Spieler ${winner} hat gewonnen!`);
        const winningCombination = getWinningCombination(winner);
        if (winningCombination) {
            drawWinningLine(winningCombination);
        }
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Nochmal spielen';
        resetButton.addEventListener('click', resetGame);
        contentDiv.appendChild(resetButton);
    }
}

function renderCell(cell, index) {
    const value = ticTacToeBoard[index];
    let symbol = '';

    if (value === 'cross') {
        symbol = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 100 100"><line x1="10" y1="10" x2="90" y2="90" stroke="white" stroke-width="5"><animate attributeName="x2" begin="0s" dur="125ms" values="10;90" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.42 0 0.58 1" /></line><line x1="90" y1="10" x2="10" y2="90" stroke="white" stroke-width="5"><animate attributeName="x2" begin="0s" dur="125ms" values="90;10" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.42 0 0.58 1" /></line></svg>';
    } else if (value === 'circle') {
        symbol = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="transparent" stroke="white" stroke-width="5"><animate attributeName="r" begin="0s" dur="125ms" values="0;40" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.42 0 0.58 1" /></circle></svg>';
    }

    cell.innerHTML = symbol;
}

function addSymbol(index) {
    if (ticTacToeBoard[index] === null) {
        ticTacToeBoard[index] = currentPlayer;
        const cell = document.getElementById(`cell-${index}`);
        renderCell(cell, index);
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

        const winner = checkWinner();
        if (winner) {
            console.log(`Spieler ${winner} hat gewonnen!`);
            const winningCombination = getWinningCombination(winner);
            if (winningCombination) {
                drawWinningLine(winningCombination);
            }
        }
    }
}

function addClickHandlers() {
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.addEventListener('click', () => {
            if (checkWinner() === null) {
                addSymbol(i);
            }
        });
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            ticTacToeBoard[a] !== null &&
            ticTacToeBoard[a] === ticTacToeBoard[b] &&
            ticTacToeBoard[b] === ticTacToeBoard[c]
        ) {
            return ticTacToeBoard[a];
        }
    }
    return null;
}

function getWinningCombination(winner) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            ticTacToeBoard[a] === winner &&
            ticTacToeBoard[a] === ticTacToeBoard[b] &&
            ticTacToeBoard[b] === ticTacToeBoard[c]
        ) {
            return combination;
        }
    }

    return null;
}

function drawWinningLine(combination) {
    const [a, b, c] = combination;
    const lineDiv = document.createElement('div');

    lineDiv.className = 'winning-line';

    const cellA = document.getElementById(`cell-${a}`);
    const cellB = document.getElementById(`cell-${b}`);
    const cellC = document.getElementById(`cell-${c}`);

    const cellSize = cellA.offsetWidth;
    const cellHalfSize = cellSize / 2;

    const startX = cellA.offsetLeft + cellHalfSize;
    const startY = cellA.offsetTop + cellHalfSize;
    const endX = cellC.offsetLeft + cellHalfSize;
    const endY = cellC.offsetTop + cellHalfSize;

    const lineLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    lineDiv.style.width = `${lineLength}px`;
    lineDiv.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
    let content = document.querySelector('table')
    content.appendChild(lineDiv);
}

function resetGame() {
    ticTacToeBoard.fill(null);
    currentPlayer = 'circle';
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    init();
}

