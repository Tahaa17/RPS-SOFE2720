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

//RPS STUFF

function gameStart(player1, player2){
    this.players=[player1,player2];
    this.playersChoices=[null,null];

    this.players.forEach((player, i) => {
      player.emit('message','Both players connected, starting game!');
        player.on('choice',function(choice){
          playerTurn(i,choice);
        });
    });

    function playerTurn(player,choice)
     {
       if(playersChoices[player]==null)
       {
         this.playersChoices[player]=choice;
         this.players[player].emit('message','You selected '+playersChoices[player]);
        }
        else {
          this.players[player].emit('message','You already selected '+playersChoices[player]+'! Please wait for the other player to make their choice.');
        }
       gameOver();
     }

     function gameOver()
     {
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

         playersChoices=[null,null];
         io.emit('message', 'Beginning next round...Make your choices!');
       }
     }
  }






var playerOne=null;
io.on('connection',function(socket){
  socket.emit('message', 'Connected to the game successfully!')
  if(playerOne!=null) {

    gameStart(playerOne, socket);
    playerOne=null;
  }
  else {
    playerOne=socket;
    playerOne.emit('message', 'Waiting for another player to connect...');
  }
}

)
