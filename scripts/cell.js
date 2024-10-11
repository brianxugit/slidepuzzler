class Cell {
    constructor(board, rows, cols) {
        this.board = board;
        this.rows = rows;
        this.cols = cols;
        this.createElement(board, rows, cols);
        //this.render();
    }

    changeProps(newProps) {
        this.props = {
            ...this.props,
            ...newProps
        };
        this.render();
    }
    clickHander(event) {
        
    }

    createElement(board, rows, cols) {
        // given possible rectangular board length 
        // square cell size = min (board length) / max( rows, col )
        // but fix board to square so just width/ max(# rows, col)
        let cellSize = board.offsetWidth / Math.max(rows, cols);
        
        this.element = document.createElement('div', {
            className: 'cell',
        }, rows, cols);
        //this.element.addEventListener('click', this.clickHandler.bind(this));

        this.element.style.width = `${cellSize}%`;
        this.element.style.height = `${cellSize}%`;
    }
}