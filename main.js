function gameBoard() {
    //make factory or return a board

    const rows = 3;
    const columns = 3;
    let board = [];

    const generateBoard = () => {
        /*
        0,1,2
        rows = [[],[],[]]
        after cols board
        */
        //resets board
       board = [];
        for(let i = 0; i < rows; i++){
            //adds rows
            board[i] = [];
            for(let j = 0; j < columns; j++){
                //Adds tile can return value and change value
                board[i].push(Tile());
            }
        }
    }
    const getBoard = () => board;
    const checkRow = () => {
        /* 
        rows 0, 1, 2
        [i][1] == [i][2] == [i][3]
        */
        for(let i = 0; i < rows; i++){
            // checks values for row equal and not equal to empty acts as unless if true this statement will not run
            if(!((board[i][0].getValue() == board[i][1].getValue() == board[i][2].getValue()) & board[i][0].filled())){
                return false;
            }
        }
        return true;
    }

    const checkColumn = () => {
        /*
        [0][0], [0][1], [0][2] example column
        */
        for(let i = 0; i < columns; i++){
            // checks values for column equal and not equal to empty acts as unless if true this statement will not run
            if(!((board[0][i].getValue() == board[1][i].getValue() == board[2][i].getValue()) & board[i][0].filled())){
                return false;
            }
        }
        return true;
    }

    const checkDiagonals = () => {
        //two unless statements
        //top left to bottom right
        if(!((board[0][0].getValue() == board[1][1].getValue() == board[2][2].getValue()) & board[i][0].filled())){
            return false;
        }
         //top right to bottom left
        if(!((board[0][2].getValue() == board[1][1].getValue() == board[2][0].getValue()) & board[i][0].filled())){
            return false;
        }
        return true;
    }
    // checkRow, Col and Diagonal all true
    const checkWin = () => (checkRow & checkColumn & checkDiagonals)

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((tile) => tile.getValue()))
        console.log(boardWithValues);
    }
    //factory game board object
    return {checkWin, getBoard, generateBoard, printBoard}
}
//set tile
function setTitle(playerNum) {
    /*
    Gonna be like player (1) or player (2)
    Excepting Number
    */
    const player = playerNum
    //added symbol not var so it is still inside of function scope
    let symbol;

    switch(player){
        case 1:
            symbol = 'x';
            break;
        case 2:
            symbol = 'o';
            break;
        default:
            console.log("Symbol not working");
            symbol = "";
    }
    /*
    private variable symbol is set
    Closure is used so function just needs coordinates (row,col)
    */
    return function AddPiece(row,col){
        board[row][col].addToken(symbol)
    }
}
function Tile() {
    let value = "";
     // Accept a player's token to change the value of the cell
    const addToken = (symbol) => {
        value = symbol;
    };

    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;

    //gives false is "" gives true anything else
    const filled = () => (value = "") ? false: true;

    return {
        addToken,
        getValue,
        filled
    };
}
//closure on player
function createPlayer(num) {
    const playernum = num
    //gives them the title player one or two to make it consistent
    let title;
    switch(player){
        case 1:
            title = "Player One"
            break;
        case 2:
            title = "Player Two"
            break;
        default:
            console.log("Number not valid");
            title = "Player None"
    }

    return function Player(name){
        const playername = name
        return {title, playernum, playername, setTitle(playerNum)}
    }
    // Player {title, playernum, playername}
}

function GameController() {
    const board = gameBoard()
    const playertemplates = [createPlayer(1), createPlayer(2)]
    const players = []

}
//Incharge of moving board results onto the DOM
function displayController() {
    
}

