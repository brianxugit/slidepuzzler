class Board {

    cells = []
    grid = []
    moves = []

    shuffleCount;

    fixedWidth;

    constructor(rows, cols, shuffleCount) {
        this.board = document.querySelector('.board');
        this.rows = rows;
        this.cols = cols;
        this.shuffleCount = shuffleCount;

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
        
        for (let i = 0; i < (rows * cols) - 1; i++) {
            let cell = new Cell(board, i, rows, cols);
            this.cells.push(cell);
        }
        let holeCell = new Cell(board, "hole", rows, cols);
        this.hole = holeCell;
        this.cells.push(holeCell);
        this.cells.forEach(cell => {this.board.append(cell.element);});

        this.calculateGridPositions();
        this.getValidMoves();
        this.shuffle(this.shuffleCount);
        this.placeCells();

        this.debug_pos();
        //this.debug();
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
        //console.log(this.grid);
    }

    placeCells() {
        for (let i = 0; i < this.rows * this.cols; i++) {
            if(this.cells[i] == undefined) continue;
            this.cells[i].put(this.grid[i].x, this.grid[i].y);
        }
    }

    // places a cell at grid position coordinate x, y
    placeCell(cell, x, y) {
        console.log(`move cell: ${cell.id} to position (${x}, ${y})`);
        // TODO: checks
        // x = cols
        // y = rows
        // supposed a 4x3 board,
        // 0 | 1 | 2 | 3
        // 4 | 5 | 6 | 7
        // 8 | 9 |10 |11
        // and we want to move a cell to index 6 by inputting x,y coordinates (2, 1)
        // y = 1 tells us to add 1 * 4(cols)
        // x = 2 tells us to add 2
        let xPos, yPos, xIndex, yIndex;
        xIndex = x;
        yIndex = y * this.cols;

        xPos = this.grid[xIndex].x;
        yPos = this.grid[yIndex].y;

        cell.put(xPos, yPos);
    }

    // swapCells(cell1, cell2) {
    //     let index1 = this.cells.indexOf(cell1);
    //     let index2 = this.cells.indexOf(cell2);
    //     let tempCell = cell1;

    //     this.cells[index1] = cell2;
    //     this.cells[index2] = tempCell;
    // }

    // calculates cell position based on array index
    getCellPos(cell) {
        let x, y;
        let index = this.cells.indexOf(cell);

        x = index % this.cols;
        y = Math.floor(index / this.cols) % this.rows;
        
        return [x,y];
    }

    getCellAt(x, y) {
        let index = x + (y * this.cols);
        // console.log(`index of ${index} gets ${this.cells[index]}`);
        return this.cells[index];
    }

    getValidMoves() {
        // placeCell indexes coordinates with a 0,0 axis
        // given holeCell at (hx, hy), the only valid cells are those with coordinates (x, hy) and (hx, y) for any x,y =/= hx, hy within row, col bounds
        if (this.moves != null) this.moves.forEach(cell => {cell.element.className = "cell"});
        this.moves = [];
        let hole_pos = this.getCellPos(this.hole);
        let hx = hole_pos[0];
        let hy = hole_pos[1];
        for (let x = 0; x < this.cols; x++) {
            if (x == hx) continue;
            let movableCell = this.getCellAt(x, hy);
            this.moves.push(movableCell);
        }
        for (let y = 0; y < this.rows; y++) {
            if (y == hy) continue;
            let movableCell = this.getCellAt(hx, y);
            this.moves.push(movableCell);
        }

        this.moves.forEach(cell => {cell.element.className = "cell movable"});
        console.log("valid moves are:")
        this.moves.forEach(cell => {console.log(cell.id)});
        return this.moves;
    }

    move(id) {
        let cellToMove;
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].id == id) {
                cellToMove = this.cells[i];
                break;
            }
        }

        this.moveCell(cellToMove, this.hole);
        this.placeCells();
        this.getValidMoves();

        if (this.checkWin()) {
            console.log("win");
            this.win();
        }
        else {
            console.log("not winning");
        }
        this.debug_pos();
    }

    moveCell(cell, hole) {
        // performs a valid move based on selected cell and hole
        // essentially, move every cell between the selected cell and hole towards the hole, then swap hole to selected cell position
        let hx, hy, cx, cy;
        let holePos = this.getCellPos(hole);
        let cellPos = this.getCellPos(cell);
        //console.log(`what is cellpos: ${cellPos}`);
        hx = holePos[0];
        hy = holePos[1];
        cx = cellPos[0];
        cy = cellPos[1];

        //console.log(`hx, hy: (${hx}, ${hy})\ncx, cy: (${cx}, ${cy})`);

        let holeIndex = this.cells.indexOf(hole);
        let cellIndex = this.cells.indexOf(cell);

        // to be a valid move, one of the axis are aligned, so we know which way it moves based on that
        // we start from the hole and move adjacent cells in our path until we reach the selected cell
        if (hx == cx) {
            let dir = Math.sign(hy - cy); // direction is defined as the change in index we need to apply; essentially, interval
            
            // why call all those stupid functions when i can just do math
            for (let y = 0; y < Math.abs(hy - cy); y++) {
                //console.log(y);
                //console.log(`moving ${holeIndex - (dir * this.cols * (y + 1))} to ${holeIndex - (dir * y)}`);
                this.cells[holeIndex - (dir * this.cols * y)] = this.cells[holeIndex - (dir * this.cols * (y + 1))];
            }
        }
        else if (hy == cy) {
            let dir = Math.sign(hx - cx);

            for (let x = 0; x < Math.abs(hx - cx); x++) {
                this.cells[holeIndex - (dir * x)] = this.cells[holeIndex - (dir * (x + 1))];
            }
        }

        this.cells[cellIndex] = this.hole;
    }

    resize() {
        this.board.style.width = `${this.fixedWidth}px`;
        this.board.style.height = `${this.fixedWidth}px`;

        this.calculateGridPositions();
        this.placeCells();
        this.cells.forEach(cell => {cell.resize(this.board)});
    }

    shuffle(iterations) {
        for (let i = 0; i < iterations; i++) {
            let moves = this.getValidMoves();
            let move = moves[Math.floor(Math.random() * moves.length)];
            this.moveCell(move, this.hole);
        }
        this.getValidMoves();

        // final check just in case shuffle results in a finished board which should be possible on 2x2
        if (this.checkWin()) this.shuffle(1);
    }

    checkWin() {
        if (this.cells[this.cells.length - 1] != this.hole) return false;
        for (let i = 0; i < this.cells.length - 1; i++) {
            if (this.cells[i].id != i) return false;
        }
        return true;
    }

    openPopup(id) {
        document.getElementById(id).classList.add('open');
        document.body.classList.add('popup-open');
    }

    win() {
        this.openPopup('win');
    }

    clear() {
        this.cells.forEach(cell => {cell.element.remove()});
        this.cells = [];
    }
    debug() {
        console.log("debug:");
        console.log(this.cells);
        //this.placeCell(this.cells[0], this.cols - 1, this.rows - 1);
        //console.log(this.getCellPos(this.cells[4]));

        this.moveCell(this.cells[3], this.hole);
        console.log(this.cells);
        this.moveCell(this.cells[0], this.hole);
        console.log(this.cells);
        this.cells.forEach(cell => {this.debug_pos(cell)});
        this.placeCells();

        this.getValidMoves();

        console.log("SHUFFLE DEBUG");

        this.shuffle(100);
        this.getValidMoves();
        this.cells.forEach(cell => {this.debug_pos(cell)});
        this.placeCells();
    }
    debug_pos() {
        this.cells.forEach(cell => {
            let pos = this.getCellPos(cell);
            cell.debug_pos(pos[0], pos[1]);
        })
    }
}