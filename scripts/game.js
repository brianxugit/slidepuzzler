class Game {
    constructor(rows, cols, shuffleCount) {
        this.rows = rows;
        this.cols = cols;
        this.shuffleCount = shuffleCount;

        this.init(this.rows, this.cols, this.shuffleCount)
    }

    init(rows, cols, shuffleCount) {
        this.board = new Board(rows, cols, shuffleCount);
        //this.board.move.bind();
        this.boardHTML = this.board.board;

        this.boardHTML.addEventListener("mouseover", this.mouseoverHandler);
        this.boardHTML.addEventListener("mouseleave", this.mouseleaveHandler);
        this.boardHTML.addEventListener("click", this.clickHandler);
    }

    mouseoverHandler(event) {
        //console.log("mouse over board");
    }
    mouseleaveHandler(event) {
        //console.log("mouse leave board");
    }
    clickHandler = (event) => {
        event.target.classList.forEach(value => {
            if (value == "movable") {
                this.board.move(event.target.id);
            }
        });
    }

    end() {
        this.board.clear();
    }

    updateWindow() {
        this.board.resize();
    }
}