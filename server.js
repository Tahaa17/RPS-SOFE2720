// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

//Variables to hold players and choices
var players=[null,null];
var playerChoices=[null,null]
var playerOne=null;

//Connection Logic
function connectionMade(socket){
  socket.emit('message', 'Connected to the game successfully!');
  //Checking if there is already a waiting player, if not assigning the new socket to be waiting player
  if(playerOne==null) {
    playerOne=socket;
    playerOne.emit('message', 'Waiting for another player to connect...');

  }
  else {
    gameStart(playerOne, socket);
    playerOne=null;
  }
};

//Starting listener for connection
io.on('connection',connectionMade);

//RPS STUFF
//Main Game Logic
function gameStart(player1, player2){
  players=[player1,player2];
  playersChoices=[null,null];

  //Listening for each players choices
  players.forEach((player, i) => {
    player.emit('message','Both players connected, starting game!');
    player.on('choice',function(choice){
      //Checking if an existing choice has already been made
      if(playersChoices[i]==null)
      {
        playersChoices[i]=choice;
        player.emit('message','You selected '+playersChoices[i]);
      }
      else {
        player.emit('message','You already selected '+playersChoices[i]+'! Please wait for the other player to make their choice.');
      }
      //Running gameOver function everytime a choice has been made
      gameOver();
    });
  });
}

//Conditionals for end game
function gameOver()
{
  //If both players made a choice, test who wins and end game
  if (playersChoices[0]!=null&&playersChoices[1]!=null)
  {
    io.emit('message', 'Game Over!!')
    io.emit('message','Player 1 chose: '+playersChoices[0]+'! and Player 2 chose: '+playersChoices[1]+'!')

    if(playersChoices[0]==playersChoices[1])
    {
      io.emit('message', 'The game is a draw!!')
    }
    else if (playersChoices[0]=='Rock'&&playersChoices[1]=='Scissors') {
      io.emit('message', 'Player One Wins!!!!')
    }
    else if (playersChoices[0]=='Paper'&&playersChoices[1]=='Rock') {
      io.emit('message', 'Player One Wins!!!!')
    }
    else if (playersChoices[0]=='Scissors'&&playersChoices[1]=='Paper') {
      io.emit('message', 'Player One Wins!!!!')
    }
    else {
      io.emit('message', 'Player Two Wins!!!!')
    }

    //Resetting game
    playersChoices=[null,null];
    io.emit('message', 'Beginning next round...Make your choices!');
  }
};
