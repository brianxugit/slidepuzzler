class Game {
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
        let cells = [];
        
        for (let i = 0; i < rows * cols; i++) {
            const cell = new Cell({
                id: i,
            }, board, rows, cols);
            cells.push(cell);
        }
        console.log(cells);
    }

    static debug() {
        console.log(cells);
    }
}