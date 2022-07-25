'use strict'

const cell = document.querySelectorAll('.cell'); //все ячейки
const btnRestart = document.querySelector('.game--restart'); //кнопка сброса
const gameStatus = document.querySelector('.game--status'); //статус игры

let currentUser = 'X'; //текущий пользователь
let activeGame = true; //активность игры
let gameState = ["", "", "", "", "", "", "", "", ""]; // массив значений ячеек

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//находим нового активного пользователя
function handlePlayerChange() {
    currentUser === 'X' ? currentUser = '0' : currentUser = 'X';
    gameStatus.textContent = `It's ${currentUser}'s turn`;
}

//Заполнение поля при клике
function handleCellClick(event) {
    let dataCellIndex = event.target.dataset.cellIndex; //индекс ячейки
    if (!activeGame || gameState[dataCellIndex] != '') {
        return;
    } else {
        gameState[dataCellIndex] = currentUser;
        event.target.textContent = `${currentUser}`;
    }
    handleResultValidation();
}


//Проверка ячеек
function handleResultValidation() {
    for (let i = 0; i <= winningLines.length - 1; i++) {
        const winLine = winningLines[i]; //какая строка массива winningLines, т.е. выигрышная линия
        const a = gameState[winLine[0]];
        const b = gameState[winLine[1]];
        const c = gameState[winLine[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameStatus.textContent = `Player ${currentUser} has won!`;
            activeGame = false;
            return;
        }
    }
    
    handlePlayerChange();

    if (!gameState.includes('', 0)) {
        gameStatus.textContent = 'Game ended in a draw!';
        activeGame = false;
    }
}


//Заполнение поля Х и 0 по очереди
cell.forEach(item => {
    item.addEventListener('click', handleCellClick);
});


//Очищение поля при нажатии кнопки "Restart Game"
btnRestart.addEventListener('click', function(e) {
    e.preventDefault();
    activeGame = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentUser = 'X';
    gameStatus.textContent = `It's ${currentUser}'s turn`;
    cell.forEach(element => {
        element.textContent = '';
    });
});