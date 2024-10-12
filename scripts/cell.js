class Cell {

    isHeld = false;

    constructor(board, id, rows, cols) {
        this.board = board;
        this.rows = rows;
        this.cols = cols;
        this.id = id;
        this.createElement(board, id, rows, cols);
        //this.render();
    }

    changeProps(newProps) {
        this.props = {
            ...this.props,
            ...newProps
        };
    }
    
    // TODO remove
    // all move is handled by board calling place()
    // and detecting mouse movement
    move = (x, y) => {
        console.log(x + " " + y);
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
    mousedownHandler = (event) => {
        this.isHeld = true;
        console.log(`${this.id} is ${this.isHeld}`);
        let x = event.clientX;
        let y = event.clientY;
        this.move(x, y);
    }

    createElement(board, id, rows, cols) {
        // given possible rectangular board length 
        // square cell size = min (board length) / max( rows, col )
        // but fix board to square so just width/ max(# rows, col)
        let cellSize = Math.min(board.offsetWidth, board.offsetHeight) / Math.max(rows, cols);
        
        this.element = document.createElement('div', {
            className: "cell", //this doesnt do anything
        });
        this.element.className = "cell";
        this.element.id = id;
        this.element.addEventListener('mousedown', this.mousedownHandler);
        // mouseup needs to be handled globally

        this.element.style.width = `${cellSize}px`;
        this.element.style.height = `${cellSize}px`;
        
        this.debug();
    }

    place(x, y) {
        this.element.style.left = x;
        this.element.style.top = y;
    }

    resize(board) {
        let cellSize = Math.min(board.offsetWidth, board.offsetHeight) / Math.max(rows, cols);
        this.element.style.width = `${cellSize}px`;
        this.element.style.height = `${cellSize}px`;
    }

    debug() {
        //console.log(this.element);
        //console.log(this.board.offsetWidth);
        this.element.innerHTML = `${this.id}`;
    }
}