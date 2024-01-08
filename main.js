function gameBoard() {
    //make factory or return a board

    const rows = 3;
    const columns = 3;
    let board = [];
    const setTile = (playerNum, row, col) => {
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
        board[row][col].addToken(symbol)
        
    }
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
            //check row works
            if ((board[i][0].getValue() == board[i][1].getValue() && board[i][1].getValue() == board[i][2].getValue() && board[i][0].filled())){
                return true;
            }
        }
        return false;
    }

    const checkColumn = () => {
        /*
        [0][0], [0][1], [0][2] example column
        */
        for(let i = 0; i < columns; i++){
            // checks values for column equal and not equal to empty acts as unless if true this statement will not run
            if(((board[0][i].getValue() == board[1][i].getValue() && board[1][i].getValue() == board[2][i].getValue()) && board[0][i].filled())){
                //column works
                //console.log(`Col that won ${i}`)
                return true;
            }
        }
        return false;
    }

    const checkDiagonals = () => {
        //works l
        //two unless statements
        //top left to bottom right
        if(((board[0][0].getValue() == board[1][1].getValue() && board[1][1].getValue() == board[2][2].getValue()) && board[0][0].filled())){
            return true;
        }
         //top right to bottom left
        if(((board[0][2].getValue() == board[1][1].getValue() && board[1][1].getValue() == board[2][0].getValue()) && board[2][0].filled())){
            return true;
        }
        return false;
    }
    // checkRow, Col and Diagonal all true
    const checkWin = () => (checkRow() || checkColumn() || checkDiagonals()) ? true : false
    const debugWin = () => {
        console.log(checkRow())
        console.log(checkColumn())
        console.log(checkDiagonals())
    }
    const checkTie = () => {
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                // empty tile
                if(!(board[i][j].filled())){
                    return false
                }
            }
        }
        return true
    }
    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((tile) => tile.getValue()))
        console.log(boardWithValues);
        
        console.log("Debug:")
        debugBoard()
    }
    // debug to fix win code not working
    const debugBoard = () => {
        const boardWithValues = board.map((row) => row.map((tile) => tile.filled()))
        console.log(boardWithValues);
    }
    //factory game board object
    return {checkWin, getBoard, generateBoard, printBoard, setTile, checkTie, debugWin}
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
    const filled = () => (value == "") ? false : true;

    return {
        addToken,
        getValue,
        filled
    };
}
//closure on player
//console only
function Player(name, num) {
    this.name = name
    this.num = num
    // return function AddPiece(row,col)
    //this.setTile = setTile(num, board)
}


function GameController() {
    const board = gameBoard()
    const players = [new Player("Player One", 1), new Player("Player Two", 2)]
    
    const start = () => {
        //creates resets board
        board.generateBoard()
        //prints board
        printNewRound()
    }
    const checkend = () => {
        tie = board.checkTie()

        if(tie){
            console.log("Tie has occured")
            return true
        }
        win = board.checkWin()
        console.log(win)
        if(win){
            console.log(`${getActivePlayer().name} has won`)
            return true
        }
        return false
    }
    const end = () => {
        board.debugWin()
        return true
    }
    
    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        //? is a if else if active player is 0 go to 1 if not go to 0
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
    const consoleInput = () => {
        const row = prompt("Row")
        const col = prompt("Col")
        //setTile = (playerNum, row, col) 
        board.setTile(getActivePlayer().num, row, col)
        // removed changed to add settile to board not player activePlayer.setTile(row, col)
    }
    const playGame = () => {
        let ended = false
        do {
            playRound()
            //checks if game won
            ended = checkend()
            /*
            check var ended
            console.log(`ended ${ended}`)
            console.log(`condition ${!ended}`)
            */
        } while(!ended);
        console.log("Game Ended")
    }
    const playRound = () => {
        //console input
        consoleInput()
        //prints board
        printNewRound()
        //goes to other player
        switchPlayerTurn()
    }
    return {
        playRound,
        getActivePlayer,
        start,
        printNewRound,
        playGame
    }

}
//Incharge of moving board results onto the DOM
function displayController() {
    
}

