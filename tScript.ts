const nodeList = document.getElementsByClassName("boxValue");
const playerX = document.getElementById("X");
const playerO = document.getElementById("O");
const gameController = document.getElementById('gameController')

playerX?.addEventListener('click', () => {
    activePlayer = "X"
    playerX.className = "hidden"
    if(playerO){
        playerO.className = "hidden"
    }
    if(gameController){
        gameController.textContent = "Go!"
    }
    
})

playerO?.addEventListener('click', () => {
    activePlayer = "O"
    playerO.className = "hidden"
    if(playerX && gameController){
        playerX.className = "hidden"
    }
    if(gameController){
        gameController.textContent = "Go!"
    }
})


let activePlayer:string = ""


let winnerAnnouncer = (x:string) => {
    if(gameController){
        gameController.textContent = `Player ${x} Wins!`
    }
}

let findWinner = (player:string ) => {
    
    if(moveTracker.get('topLeft') === player && moveTracker.get('midLeft') === player && moveTracker.get('botLeft') === player){
        winnerAnnouncer(player)
        // Winning condition for left column
    }else if(moveTracker.get('topCenter') === player && moveTracker.get('midCenter') === player && moveTracker.get('botCenter') === player){
        winnerAnnouncer(player)
        // Winning condition for center column
    }else if(moveTracker.get('topRight') === player && moveTracker.get('midRight') === player && moveTracker.get('botRight') === player){
        winnerAnnouncer(player)
        // Winning condition for right column
    }else if(moveTracker.get('topLeft') === player && moveTracker.get('topCenter') === player && moveTracker.get('topRight') === player){
        winnerAnnouncer(player)
        // Winning condition for top row
    }else if(moveTracker.get('midLeft') === player && moveTracker.get('midCenter') === player && moveTracker.get('midRight') === player){
        winnerAnnouncer(player)
        // Winning condition for middle row
    }else if(moveTracker.get('botLeft') === player && moveTracker.get('botCenter') === player && moveTracker.get('botRight') === player){
        winnerAnnouncer(player)
        // Winning condition for bottom row
    }else if(moveTracker.get('topLeft') === player && moveTracker.get('midCenter') === player && moveTracker.get('botRight') === player){
        winnerAnnouncer(player)
        // Winning condition for left-right diagonal
    }else if(moveTracker.get('topRight') === player && moveTracker.get('midCenter') === player && moveTracker.get('botLeft') === player){
        winnerAnnouncer(player)
        // Winning condition for right-left diagonal
    }
}

const moveTracker = new Map()
let playerOrder:string[] = [] 

let changePlayer = () => {
    if(playerOrder.length){
        if(playerOrder[playerOrder.length - 1] === "X"){
            activePlayer = 'O';
        }else if(playerOrder[playerOrder.length - 1] === "O"){
            activePlayer = 'X';
        }
    }
}


Array.from(nodeList).forEach((element) => {
    element.addEventListener('click', () => {
        if(moveTracker.has(element.id)){
           element.textContent = moveTracker.get(element.id)
        }else{
            element.textContent = activePlayer;
            moveTracker.set(element.id, activePlayer);
            playerOrder.push(activePlayer);
            findWinner(activePlayer);
            changePlayer()
        }
        })
})
