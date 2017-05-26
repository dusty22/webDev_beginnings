//singleplayer mode for testing where you are both players
var SINGLEPLAYER = false;
var ALERTS = false;

//2D array for keeping a local copy of the database board
//this is updated and then sent to the database after doing a move
var board = [[],[],[]]; 

//which player we are, if not a spectator
var Xplayer = false; 
var Oplayer = false;

//who's turn it is ('X' or 'O'); syncs with the database counterpart of the board
var turn;

//database synchronization
function startServerSyncAndListeners() {
    
    firebase.database().ref('turn').on('value', snap => document.getElementById('turn').innerHTML = snap.val());
    firebase.database().ref('numClients').on('value', snap => document.getElementById('clientNumText').innerHTML = snap.val());
    firebase.database().ref('messageBox').on('value', snap => document.getElementById('messageBox').innerHTML = snap.val());
    
    //sync turn variable
    firebase.database().ref('turn').on('value', snap => turn = snap.val());
    
    //check board spaces and keep code value, image in sync with server database
    firebase.database().ref('board/space00').on('value', function(snap) { changeValAndImage(snap.val(), 'space00')});
    firebase.database().ref('board/space01').on('value', function(snap) { changeValAndImage(snap.val(), 'space01')});
    firebase.database().ref('board/space02').on('value', function(snap) { changeValAndImage(snap.val(), 'space02')});
    firebase.database().ref('board/space10').on('value', function(snap) { changeValAndImage(snap.val(), 'space10')});
    firebase.database().ref('board/space11').on('value', function(snap) { changeValAndImage(snap.val(), 'space11')});
    firebase.database().ref('board/space12').on('value', function(snap) { changeValAndImage(snap.val(), 'space12')});
    firebase.database().ref('board/space20').on('value', function(snap) { changeValAndImage(snap.val(), 'space20')});
    firebase.database().ref('board/space21').on('value', function(snap) { changeValAndImage(snap.val(), 'space21')});
    firebase.database().ref('board/space22').on('value', function(snap) { changeValAndImage(snap.val(), 'space22')});
}

function connect() {
    //alert("onConnect");
    
    //CHECK NUMBER OF CLIENTS
    initBoardImages();
    startServerSyncAndListeners();
    
    firebase.database().ref('numClients').once('value').then(function(snapshot) {
        currNoClients = snapshot.val();
        currNoClients++;
        if (ALERTS) alert(currNoClients);
        writeToFB('numClients', currNoClients);
          
        if (SINGLEPLAYER) {
            initGame(true, true);
            Xplayer = true;
            Oplayer = true;
            document.getElementById('playerType').innerHTML = 'X and O (Single Player test mode)';
            writeToFB('messageBox', 'You are in Single Player test mode');
        }
        else if (currNoClients == 1) {
            initGame(true, false);
            Xplayer = true;
            document.getElementById('playerType').innerHTML = 'X';
            writeToFB('messageBox', 'Waiting for player 2');
        }
        else if (currNoClients == 2) {
            initGame(false, true);
            Oplayer = true;
            document.getElementById('playerType').innerHTML = 'O';
            writeToFB('messageBox', 'Game has started');
        }
        else if (currNoClients > 2) {
            document.getElementById('playerType').innerHTML = 'Spectator';
            alert("This game is full, but you can watch.");
        }
    });
}

//an example of bad code
function disconnectBad() {
    
    //Cannot save values from the database outside the "callback function"
    var currNoClients = 0; //store server value here
    firebase.database().ref('numClients').once('value', 
    /*this is the callback function*/ snap => currNoClients = snap.val());
    //You may not recognize it because it is an arrow function
    
    //currNoClients will not have a usable value
    writeToFB('numClients', --currNoClients); 
    
    if (currNoClients == 0) {
        
    }
    
    alert("Bye bye"); //client will not see this if just closed webpage
}

//Code this yourself
function disconnect() {
    
    /*
    Several things should happen here:
    
    - Check and save the current number of clients
    
    - Decrease that number of clients by 1 on the server/database
    
    - Alert other players that one player has left with a special message
    
    - Either:
        1. Allow a spectator to take over
        2. End the game with the leaving player forfeiting
        
    
    The most important thing is how to trigger this function?
    Should players press a Quit button? Or maybe there is another way to
    make sure it's always triggered?
        
    */
}

function initBoardImages() { 
    if (ALERTS) alert("initBoardImages");
    
    var x = document.getElementsByClassName("space");
    var i;
    
    for (i = 0; i < x.length; i++) {
        x[i].src = "images/space.png";
    }
    
    x = document.getElementsByClassName("vertline");
    for (i = 0; i < x.length; i++) {
        x[i].src = "images/ver.png";
    }
    
    x = document.getElementsByClassName("horzline");
    for (i = 0; i < x.length; i++) {
        x[i].src = "images/hor.png";
    }
}

//set images and code values for our local board matrix
function changeValAndImage(snap, id) {
    if (snap == 'X') {
        document.getElementById(id).src = "images/x.png";
        board[id.charAt(5)][id.charAt(6)] = 'X';
    }
    else if (snap == 'O') {
        document.getElementById(id).src = "images/o.png";
        board[id.charAt(5)][id.charAt(6)] = 'O';
    }
    else if (snap == 'empty') {
        document.getElementById(id).src = "images/space.png";
        board[id.charAt(5)][id.charAt(6)] = 'empty';
    }
}

//called when clients connect:
//depending on how many clients are currently connected
//it may just initialize the database, or start the game
function initGame(initGame, startGame) {
    if (initGame == true) {
        writeToFB('turn', '(waiting for players)');
    }
    if (startGame == true) {
        writeToFB('turn', 'X');
    }
    
    //SETUP DATABASE TICTACTOE BOARD
    var currElem, i, j;
   
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            currElem = 'space' + i.toString() + j.toString();
            
            if (initGame) {
                writeToFB('board/' + currElem, 'empty');
            }
            
            //LISTEN FOR CLICKS LOCALLY
            document.getElementById(currElem).addEventListener('click', checkClickOnSpace);
        }
    }
}

function checkClickOnSpace(){
    if(ALERTS) alert(this.id);
    
    //is it our turn?
    if(turn == 'X' && Xplayer || turn == 'O' && Oplayer) {
        //check everything locally THEN write to the server
        var valOfThisSpaceLocal = board[this.id.charAt(5)][this.id.charAt(6)];
        
        if (valOfThisSpaceLocal == 'empty') { //legal space
            var serverNodeToUpdate = 'board/space' + this.id.charAt(5) + this.id.charAt(6);
            var nextTurn;
            if (turn == 'X')
                nextTurn = 'O';
            else if (turn == 'O')
                nextTurn = 'X';
            
            //WRITE TO SERVER
            writeToFB(serverNodeToUpdate, turn); //put down an X or O depending on whose turn
                
            //CHECK LOCALLY IF WE WON
            if (checkVictory(turn, this.id.charAt(5), this.id.charAt(6))) //we may have won
            {
                if (turn == 'X') {
                    writeToFB('messageBox', 'X wins!');
                }
                if (turn == 'O') {
                    writeToFB('messageBox', 'O wins!');
                }
            }
            else {
                //write to the server that it's no longer our turn
                writeToFB('turn/', nextTurn);
            }
        }
    }
}

//turn tells us whether an X or an O was just placed
function checkVictory(turn,x,y) {
    /*pseudocode
    
    col=row=diag=rdiag=0
    winner=false
    
    for i=1 to n
      if cell[x,i]=player then col++
      if cell[i,y]=player then row++
      if cell[i,i]=player then diag++
      if cell[i,n-i+1]=player then rdiag++
    if row=n or col=n or diag=n or rdiag=n then winner=true
    
    */
   
    
    if(ALERTS) alert("checkVictory");
    
    var col = 0, row = 0, diag = 0, rdiag = 0;
    var i;
    
    for (i = 0; i < 3; i++) {
    
        if (board[x][i] == turn)
        {
            col++;
        }
        if (board[i][y] == turn)
        {
            row++;
        }
        if (board[i][i] == turn)
        {
            diag++;
        }
        if (board[i][3-i+1] == turn) 
        {
            rdiag++;
        }
    }
    
    if (ALERTS) alert(row + ', ' + col + ', ' + diag + ', ' + rdiag);
    
    if (row == 3 || col == 3 || diag == 3 || rdiag == 3) {
        return true;
    }
    else {
        return false;
    }
}

function writeToFB(node, value) { 
    console.log(firebase.database().ref(node));
    //if node doesn't exist gets created
    firebase.database().ref(node).set(value);
}

        
        