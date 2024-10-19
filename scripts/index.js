let rows = 0;
let cols = 0;

let game;

let difficulty = 100;

let min = 2;
let max = 24;

window.addEventListener("resize", updateWindow); // TODO ; probably use a timer to limit frequency or based on drag and release

// hardcode sizes for now figure out scaling options later

document.getElementById("set_dimensions").addEventListener('click', setDimensions);

function setDimensions() {
    
    rows = document.getElementById("rows").value;
    cols = document.getElementById("cols").value;

    if (rows < min || cols < min || rows > max || cols > max) {
        openPopup('setup');
        return;
    }
    
    initGame();
}

function resetGame() {
    game.end();
    closePopup();
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
// god
function openPopup(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('popup-open');
}
function closePopup() {
    document.querySelector('.popup.open').classList.remove('open');
    document.body.classList.remove('popup-open');
}

debugInit();