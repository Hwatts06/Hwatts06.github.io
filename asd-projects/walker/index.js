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

  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  /*challenge player 2*/

  var positionX2 = 390;
  var positionY2 = 390;
  var speedX2 = 0;
  var speedY2 = 0;


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
    repositionGameItem();
    redrawGameItem();
    
    
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      speedX = -5;
      console.log("left pressed");
  }
  else if (event.which === KEY.UP) {
    speedY = -5;
    console.log("up pressed");
  }

    else if (event.which === KEY.RIGHT) {
      speedX = 5;
      console.log("right pressed");
  }
  else if (event.which === KEY.DOWN) {
    speedY = 5;
    console.log("down pressed");
  }
  /*player 2*/
  if(event.which === KEY.W){
    speedY2 = -5;
    console.log("w pressed");
  }
  else if(event.which === KEY.A){
    speedX2 = -5;
    console.log("a pressed");
  }
  else if(event.which === KEY.S){
    speedY2 = 5;
    console.log("s pressed");
  }
  else if(event.which === KEY.D){
    speedX2 = 5;
    console.log("d pressed");
  }
}



function handleKeyUp(event){
  if (event.which === KEY.LEFT) {
    speedX = 0;
    console.log("left not pressed");
}
else if (event.which === KEY.UP) {
  speedY = 0;
  console.log("up not pressed");
}

  else if (event.which === KEY.RIGHT) {
    speedX = 0;
    console.log("right not pressed");
}
else if (event.which === KEY.DOWN) {
  speedY = 0;
  console.log("down not pressed");
}

/*player 2*/
if (event.which === KEY.W){
  speedY2 = 0;
  console.log("w not pressed");
}
else if(event.which === KEY.A){
  speedX2 = 0;
  console.log("a not pressed");
}
else if(event.which === KEY.S){
  speedY2 = 0;
  console.log("s not pressed");
}
else if(event.which === KEY.D){
  speedX2 = 0;
  console.log("d not pressed");
}
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
function repositionGameItem(){
  positionX += speedX;
  positionY += speedY;
 
  /*player 2 */
  positionX2 += speedX2;
  positionY2 += speedY2;
};

function redrawGameItem(){
  $("#walker").css("left", positionX);  
  $("#walker").css("top", positionY); 
  $("#player2").css("left", positionX2);  
  $("#player2").css("top", positionY2);
};
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

