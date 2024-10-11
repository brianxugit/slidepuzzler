let rows = 0;
let cols = 0;

document.getElementById("set_dimensions").addEventListener('click', setDimensions);

function setDimensions() {
    rows = document.getElementById("rows").value;
    cols = document.getElementById("cols").value;
    console.log(rows + " " + cols);
    
    initGame();
}

function initGame() {
    let game = new Game(rows, cols);
    console.log(game);
}