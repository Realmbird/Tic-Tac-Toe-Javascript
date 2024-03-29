const gameBoard = (() => {
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
      
        if(board[row][col].filled()){
            console.log("Error Tile already filled")
            console.log(`Tile at row ${row}, col ${col} is already filled with:`, board[row][col].getValue());
            return true
        }else {
            board[row][col].addToken(symbol)
            return false
        }
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
    //getting values in board
    const getValues = () => {
        const boardWithValues = board.map((row) => row.map((tile) => tile.getValue()))
        return boardWithValues
    }
    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((tile) => tile.getValue()))
        console.log(boardWithValues);
        
        //console.log("Debug:")
        //debugBoard()
    }
    // debug to fix win code not working
    const debugBoard = () => {
        const boardWithValues = board.map((row) => row.map((tile) => tile.filled()))
        console.log(boardWithValues);
    }
    //factory game board object
    return {checkWin, getBoard, generateBoard, printBoard, setTile, checkTie, debugWin, getValues}
})()
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
function Player(name, num, url) {
    this.name = name
    this.num = num
    this.setName = function(newName) {
        this.name = newName
    }
    // return function AddPiece(row,col)
    //this.setTile = setTile(num, board)
}


const GameController = (() => {
    //const board = gameBoard()
    const players = [new Player("Player One", 1), new Player("Player Two", 2)]
    
    //debug only
    const gameSetup = () => {
        //creates resets board
        gameBoard.generateBoard()
        //prints board
        printNewRound()
        //console.log("works")
    }
    const start = () => {
        //creates resets board
        gameBoard.generateBoard()
        //prints board
        printNewRound()
        //Start game
        playGame()
    }
    const checkend = () => {
        tie = gameBoard.checkTie()

        if(tie){
            console.log("Tie has occured")
            return true
        }
        win = gameBoard.checkWin()
        //win works properly checked
        //console.log(win)
        if(win){
            console.log(`${getActivePlayer().name} has won`)
            const dialog = document.querySelector("dialog");
            const dialogText = document.querySelector("dialog p")
            dialogText.textContent = `${getActivePlayer().name} has won`
            dialog.showModal();
            return true
        }
        return false
    }
    //end code
    const end = () => {
        gameBoard.debugWin()
    }
    
    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        //? is a if else if active player is 0 go to 1 if not go to 0
        //console.log(activePlayer)
        console.log("switch")
        
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        //console.log(activePlayer)
    };

    const getActivePlayer = () => activePlayer;

    
    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
    const consoleInput = () => {
        let row, col, error;
        do {
            row = parseInt(prompt("Row"), 10);
            col = parseInt(prompt("Col"), 10);
            const isValidRow = row >= 0 && row < 3;
            const isValidCol = col >= 0 && col < 3;
            
            if (isValidRow && isValidCol) {
                error = gameBoard.setTile(getActivePlayer().num, row, col);
            } else {
                console.log("Invalid input. Please enter row and column numbers between 0 and 2.");
                error = true;
            }
        } while(error);
        // removed changed to add settile to board not player activePlayer.setTile(row, col)
    }
    const domInput = (number) => {
        // float removes .
        let ended = false
        if(ended){

        }else{
            
            const row = Math.floor(number / 3);
            const col = number % 3;
            /*
            row and col work from i
            console.log(row)
            console.log(col)
            */
            error = gameBoard.setTile(getActivePlayer().num, row, col)
            if(!error){
                 /*prints board
                printNewRound()
                */
                printNewRound()
                ended = checkend()
                //goes to other player
                switchPlayerTurn()
            }else {
                console.log("error")
            }
        }
        
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
    const setPlayerName = (index,name) => {
        player = players[index] 
        player.setName(name)
        console.log(player.name)
    }
    return {
        playRound,
        getActivePlayer,
        start,
        printNewRound,
        playGame,
        gameSetup,
        domInput,
        setPlayerName
    }

})()
//Incharge of moving board results onto the DOM
const displayController = (() => {
    //outside to prevent the creation of multiple event listeners
    const grid = document.querySelector(".grid")
    grid.addEventListener('click', (event) => {
        //console.log(event.target)
        GameController.domInput(event.target.id)
        reload()
    }     )

    const reload = () => {
        const board = gameBoard.getValues()
        grid.innerHTML = ""
        //For each so that each board value gets added to DOM
        let i = 0;
        board.forEach((row) => row.forEach((item) => {
            const section = document.createElement('div')
            const button = document.createElement('button')
            button.classList.add('tile');
            button.setAttribute('id', i);
            const textContent = item
            
            //item is x or o

            
            section.appendChild(button);
            grid.appendChild(section)

            switch(textContent){
                case 'x':
                    button.innerHTML = `<img src="images/cockatoo.png" alt="cockatoo">`
                    break;
                case 'o':
                    button.innerHTML = `<img src="images/crow.png" alt="crow">`
                    break;
                default:
                    
            }

            i++
        }))
    }

    //event listners for name change
    // Select the input elements
    const firstNameInput = document.querySelector('#first_name');
    const secondNameInput = document.querySelector('#two_name');

    // Add an event listener for the 'input' event to the first player's name input
    firstNameInput.addEventListener('input', (event) => {
        GameController.setPlayerName(0,event.target.value);
        let playerOneName = event.target.value
        console.log('Player One Name:', playerOneName); // for demonstration
    });

    // Add an event listener for the 'input' event to the second player's name input
    secondNameInput.addEventListener('input', (event) => {
        GameController.setPlayerName(1,event.target.value);
        let playerTwoName = event.target.value
        console.log('Player Two Name:', playerTwoName); // for demonstration
    });

    //reset
    const startBut = document.querySelector('#start');
    const resetBut = document.querySelector('#reset');

    startBut.addEventListener("click", (event) => {
        reset()
    })
    resetBut.addEventListener("click", (event) => {
       reset() 
    })
    const reset = () => {
        GameController.gameSetup()
        displayController.reload()
    }

    /*
    dialog and modal
    Shows results of the game
    */
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");

    // "Close" button closes the dialog
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

   return {reload}
})()

GameController.gameSetup()
displayController.reload()

