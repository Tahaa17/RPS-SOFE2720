var socket = io();

//RPS STUFF
function logGameEvents(text)
{
  var displayContainer=document.getElementById('gameEvents')
  var gameEvent= document.createElement('li');
  gameEvent.innerHTML=text;

  displayContainer.appendChild(gameEvent);
};
function addChoices()
{
  var rockButton=document.getElementById('rock');
  var paperButton=document.getElementById('paper');
  var scissorsButton=document.getElementById('scissors');

  rockButton.addEventListener('click', function(){
    socket.emit('choice','Rock');
  });
  paperButton.addEventListener('click', function(){
    socket.emit('choice','Paper');
  });
  scissorsButton.addEventListener('click', function(){
    socket.emit('choice','Scissors');
  });
};
addChoices();
logGameEvents('PooPooPeePee');

socket.on('message',logGameEvents)
//THIS IS OLD GAME STUFF
