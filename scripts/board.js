class Board {

    cells = []
    grid = []

    fixedWidth;

    constructor(rows, cols) {
        this.board = document.querySelector('.board');
        this.rows = rows;
        this.cols = cols;

        this.init(this.board, this.rows, this.cols)
    }

    init(board, rows, cols) {
        // create the board as 2d array of cells defined for a m x n board as
        // [0, 0] [1, 0] ... [m-1, 0]          [1] [2] ... [m-1]
        // [0, 1]  ...                  ==>>   [m] [m+1] ... [m+m-1]
        //  ...          ...   
        // [n-1, 0]          [m-1, n-1]
        // cells are initialized in a solved state and retain their "placement" as id
        // for an m x n board, cells have IDs {1...m*n-1}
        // s.t. for a given board m x n in dimension, a cell(x,y) has ID = x + y*(m-1) + 1
        
        //let cells = [rows][cols];
        // or do it with a single array using modulo to read coords

        // another terrible idea is to never move cells but instead define position as a property of the cell, not the array
        // thats awful

        this.board.style.width = "30vw";
        this.fixedWidth = this.board.offsetWidth;
        this.board.style.height = `${this.fixedWidth}px`;
        //this.board.style.padding = `${0.05 * width}px`; this fucks with using offset width for cell sizes
        
        for (let i = 0; i < rows * cols; i++) {
            let cell = new Cell(board, i, rows, cols);
            this.cells.push(cell);
            //console.log(`created cell #${i}: ${cell.id}`);
        }
        this.cells.forEach(cell => {this.board.append(cell.element);});

        this.calculateGridPositions();
        this.placeCells();
    }

    calculateGridPositions() { 

        let cellSize = 100 / Math.max(this.rows, this.cols);
        let aspectRatio = this.board.offsetWidth / this.board.offsetHeight;

        let horizontalStretch = 1;
        let verticalStretch = 1;

        if (aspectRatio > 1) horizontalStretch = aspectRatio;
        else if (aspectRatio < 1) verticalStretch = aspectRatio;

        let horizontalPadding = (100 - (cellSize * this.cols)) / 2;
        let verticalPadding = (100 - (cellSize * this.rows)) / 2;

        let horizontalDelta = (100 - (2 * horizontalPadding)) / this.cols;
        let verticalDelta = (100 - (2 * verticalPadding)) / this.rows;

        for (let i = 0; i < this.rows * this.cols; i++) {

            let x = (i % this.cols) * horizontalDelta + horizontalPadding;
            let y = (Math.floor(i / this.cols) % this.rows) * verticalDelta + verticalPadding;
            let xClamp = Math.max(0, Math.min(x, 100));
            let yClamp = Math.max(0, Math.min(y, 100));

            this.grid[i] = {
                x: `${xClamp}%`,
                y: `${yClamp}%`
            };
        }
        console.log(this.grid);
    }

    placeCells() {
        for (let i = 0; i < this.rows * this.cols; i++) {
            this.cells[i].place(this.grid[i].x, this.grid[i].y);
        }
    }

    moveCell(cell, x, y) {
        
    }

    resize() {
        this.board.style.width = `${this.fixedWidth}px`;
        this.board.style.height = `${this.fixedWidth}px`;

        this.calculateGridPositions();
        this.placeCells();
        this.cells.forEach(cell => {cell.resize(this.board)});
    }

    clear() {
        this.cells.forEach(cell => {cell.element.remove()});
        this.cells = [];
    }
    static debug() {
        console.log(cells);
    }
}