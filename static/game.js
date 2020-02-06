var socket = io();

//RPS STUFF
function logGameEvents(text)
{
  var parent=document.getElementById('gameEvents')
  var eventItem= document.createElement('li');
  eventItem.innerHTML=text;

  parent.appendChild(eventItem);
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
