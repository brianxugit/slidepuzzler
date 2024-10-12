class Game {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.init(this.rows, this.cols)
    }

    init(rows, cols) {
        this.board = new Board(rows, cols);
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
    clickHandler(event) {
        console.log(event);
    }

    end() {
        this.board.clear();
    }

    updateWindow() {
        this.board.resize();
    }
}