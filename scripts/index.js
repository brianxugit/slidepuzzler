let rows = 0;
let cols = 0;

let game;

let difficulty = 100;

window.addEventListener("resize", updateWindow); // TODO ; probably use a timer to limit frequency or based on drag and release

// hardcode sizes for now figure out scaling options later

document.getElementById("set_dimensions").addEventListener('click', setDimensions);

function setDimensions() {
    rows = document.getElementById("rows").value;
    cols = document.getElementById("cols").value;
    console.log(rows + " " + cols);
    
    initGame();
}

function initGame() {
    if (game != undefined)  {
        game.end();
    }

    game = new Game(rows, cols, difficulty);
    console.log(game);
}

function updateWindow() {
    console.log("you resized me");
    game.updateWindow();
}

function debugInit() {
    document.getElementById("rows").value = 3;
    document.getElementById("cols").value = 4;
}

debugInit();