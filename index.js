let tiles = document.querySelectorAll(".tile");
let PLAYER_X = 'X';
let PLAYER_O = 'O';
let turn = PLAYER_X;

let boardState = Array(tiles.legnth);
boardState.fill(null);

//Frosting
const strike = document.getElementById("strike")
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");

tiles.forEach(tile => tile.addEventListener("click", tileClick);
function tileClick(event) {
    if(gameOverArea.classList.contains('visible')){
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != ""){
        return;
    }
    if(turn === PLAYER_X){
        tile.innerText = PLAYER_X;
        boardState[tileNumber - 1] = PLAYER_x;
        turn = PLAYER_O;
    }
    else{
        tile.innerText = PLAYER_O;
        boardState[tileNumber - 1] = PLAYER_O;
        turn = PLAYER_X;
    }
}