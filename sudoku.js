document.addEventListener('DOMContentLoaded', startGame)

var board = {}
var boardDimension = 9;

// Main entry point for the game
function startGame() {

    generateBoard(boardDimension);
    initBoard();

}

function generateBoard(dimension) {

    board.cells = []; // Reset cells

    // layout cells
    for (let row = 0; row < dimension; row++) {
        for (let col = 0; col < dimension; col++) {
            let group = Math.floor(row / 3) * 3 + Math.floor(col / 3);
            let cell = {
                "row": row,
                "col": col,
                "group": group
            }
            board.cells.push(cell);
        }
    }

}

function initBoard() {

    displayMessage("Let\'s play!")
    board.cells.sort(cellCompare)
    var boardNode = document.getElementsByClassName('board')[0]
    drawBoard(boardNode)
    //addListeners(boardNode)
    return true
}

function displayMessage(msg, id) {
    document.getElementById(id || 'message').innerHTML = '<p>' + msg + '</p>'
}


function cellCompare (a, b) {
    if (a.row < b.row) {
      return -1
    } else if (a.row > b.row) {
      return 1
    }
    if (a.col < b.col) {
      return -1
    } else if (a.col > b.col) {
      return 1
    }
    return 0
  }

// Draw board based on number of cells and an assumption about how much 
// space should be allowed for each cell.
function drawBoard(boardNode) {
    boardNode.style.width = Math.sqrt(board.cells.length) * 55 + 'px'
    board.cells.reduce(cellsToNodes, boardNode)
}

function cellsToNodes(boardNode, cell) {
    var node = document.createElement('div')
    node.classList.add('row-' + cell.row)
    node.classList.add('col-' + cell.col)
    node.classList.add('group-' + cell.group)
    node.innerHTML = cell.group
    boardNode.appendChild(node)
    return boardNode
}