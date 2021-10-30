const statusDisplay = document.querySelector(".game--status");

let gameActive = true;

let currentPlayer = "X"

let gameState = new Array(9).fill("")

const winningMessage = () => `Player ${currentPlayer} has won!`
const drawMessage = () => `The game has ended in a draw`
const currentPlayerTurn = () => `It is ${currentPlayer}'s turn`

statusDisplay.innerHTML = currentPlayerTurn()

function handleCellClick(e){
    const cellClicked = e.target
    const cellClickedIndex = parseInt(cellClicked.getAttribute("data-cell-index"))

    if(gameState[cellClickedIndex] !== "" || !gameActive){
        return
    }
 
    handleCellPlayed(cellClicked,cellClickedIndex)
    handleResultValidation()
}

function handleCellPlayed(cellClicked,cellClickedIndex){
    gameState[cellClickedIndex] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;

}

function handleResultValidation(){
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false

    for(let i=0; i<= 7; i++){
        let winningCondition = winningConditions[i]

        let a = gameState[winningCondition[0]]
        let b = gameState[winningCondition[1]]
        let c = gameState[winningCondition[2]]

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if(a===b && b===c){
            roundWon = true
            break
        }

    }

if(roundWon){
    statusDisplay.innerHTML = winningMessage()
    gameActive = false
    return
}

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange()    
}

function handlePlayerChange(){
    if(currentPlayer === "X"){
        currentPlayer = "O"
    }else{
        currentPlayer = "X"
    }

    statusDisplay.innerHTML = currentPlayerTurn()
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = new Array(9).fill("")
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);