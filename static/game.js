var socket = io();

//RPS STUFF
//Function to put game events onto html page
function logGameEvents(text)
{
  var displayContainer=document.getElementById('gameEvents')
  var gameEvent= document.createElement('li');
  gameEvent.innerHTML=text;

  displayContainer.appendChild(gameEvent);
};
//Adding listeners to the choices buttons
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

//Listening for game events
socket.on('message',logGameEvents)
