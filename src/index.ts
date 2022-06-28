const tiles = document.querySelectorAll(".tile");
const PLAYER_X: string = 'X';
const PLAYER_O: string = 'O';
let turn: string = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

// Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
(playAgain as HTMLElement).addEventListener("click", startNewGame);

// Sounds



tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText(){
   //remove all hover text
   tiles.forEach((tile) =>{
       tile.classList.remove("x-hover");
       tile.classList.remove("o-hover");
   });

   const hoverClass = `${turn.toLowerCase()}-hover`;

   tiles.forEach((tile)=>{
       if((tile as HTMLElement).innerText =="") {
           tile.classList.add(hoverClass);
       }
   });
}

setHoverText();

function tileClick(event: Event) {
    if((gameOverArea as HTMLElement).classList.contains('visible')){
        return;
    }
    const tile = event.target;
    const tileNumber = (tile as HTMLElement).dataset.index;
    let tn = parseInt(tileNumber as string)
    if((tile as HTMLElement).innerText !=""){
        return;
    }
    if(turn === PLAYER_X){
        (tile as HTMLElement).innerText = PLAYER_X;
        boardState[tn - 1] = PLAYER_X;
        turn = PLAYER_O;
    } else{
        (tile as HTMLElement).innerText = PLAYER_O;
        boardState[tn - 1] = PLAYER_O;
        turn = PLAYER_X;
    }
    
//  clickSound.play();
setHoverText();
checkWinner();

}
// Winner
function checkWinner() {
    for(const winningCombination of winningCombinations){
        const {combo, strikeClass} = winningCombination;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if(
            tileValue1 != null && 
            tileValue1 === tileValue2 && 
            tileValue1 === tileValue3
            ) {
           (strike as HTMLElement).classList.add(strikeClass);
           gameOverScreen(tileValue1); 
           return;
        }
    }   
// Draw
const allTileFilledIn = boardState.every((tile) => tile !== null);
if(allTileFilledIn) {
    gameOverScreen(null);
 }
}


function gameOverScreen(winnerText: string | null){
    let text = "Draw";
    if (winnerText !=null){
        text = `Winner is ${winnerText}!`;
    }
    (gameOverArea as HTMLElement).className = "visible";
    (gameOverText as HTMLElement).innerText = text;
}

function startNewGame(){
    (strike as HTMLElement).className = "strike";
    (gameOverArea as HTMLElement).className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile as HTMLElement).innerText ="");
    turn = PLAYER_X;
    setHoverText();
}


const winningCombinations = [
    //rows
    {combo:[1,2,3], strikeClass: "strike-row-1" },
    {combo:[4,5,6], strikeClass: "strike-row-2" },
    {combo:[7,8,9], strikeClass: "strike-row-3" },
    // columns
    {combo:[1,4,7], strikeClass: "strike-column-1" },
    {combo:[2,5,8], strikeClass: "strike-column-2" },
    {combo:[3,6,9], strikeClass: "strike-column-3" },
    // Diagonals
    {combo:[1,5,9], strikeClass: "strike-diagonal-1" },
    {combo:[3,5,7], strikeClass: "strike-diagonal-1" },
];
