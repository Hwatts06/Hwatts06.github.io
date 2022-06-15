/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
  }

  function GameItem(elementId){
    var gameItem = {};
gameItem.id = elementId;
gameItem.x = parseFloat($(elementId).css('left'));
gameItem.y = parseFloat($(elementId).css('top'));;
gameItem.width = $(elementId).width();
gameItem.height = $(elementId).height();
 gameItem.speedX = 0;
gameItem.speedY = 0;
return gameItem
 }

 var head = GameItem("#head")

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
   redrawGameItem();
   updatePositionBody();
   updateposition();
   redrawPiece();
  }
  

  /* 
  Called in response to events.
  */
  
    function handleKeyDown(event) {
      if (event.which === KEY.LEFT) {
        headspeedX = -5;
        console.log("left pressed");
    }
    else if (event.which === KEY.UP) {
      head.speedY = -5;
      console.log("up pressed");
    }
  
      else if (event.which === KEY.RIGHT) {
        head.speedX = 5;
        console.log("right pressed");
    }
    else if (event.which === KEY.DOWN) {
      head.speedY = 5;
      console.log("down pressed");
    }
  }
  
  
  
  function handleKeyUp(event){
    if (event.which === KEY.LEFT) {
      head.speedX = 0;
      console.log("left not pressed");
  }
  else if (event.which === KEY.UP) {
    head.speedY = 0;
    console.log("up not pressed");
  }
  
    else if (event.which === KEY.RIGHT) {
      head.speedX = 0;
      console.log("right not pressed");
  }
  else if (event.which === KEY.DOWN) {
    head.speedY = 0;
    console.log("down not pressed");
  }
  
  
  
  }


////creating game item////
function redrawGameItem(piece){
  $(piece.id).css("left", piece.positionX);  
  $(piece.id).css("top", piece.positionY); 
};

///repostion///
function updateposition(piece){
piece.x += piece.speedX;

};

function updatePositionBody(){

}

function redrawPiece(piece){
  $(piece.id).css("left", piece.x)
}

var head = {
  id: "#head",
  x: 0,
  y: 0,
  speedX: 0,
  speedY: 0,
};

head.x += head.speedX;








  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  























  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

