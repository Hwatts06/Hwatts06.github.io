/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BASE_SPEED = 10;
  

  // Game Item Objects
  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
  };

  var MOUSE = {
    "LEFT_CLICK": 0,
  };

  function GameItem(elementId) {
    var gameItem = {};
    gameItem.id = elementId;
    gameItem.x = parseFloat($(elementId).css("left"));
    gameItem.y = parseFloat($(elementId).css("top"));;
    gameItem.width = $(elementId).width();
    gameItem.height = $(elementId).height();
    gameItem.speedX = 0;
    gameItem.speedY = 0;

    return gameItem
  }
  var board = GameItem("#board");
  var head = GameItem("#head");
  var apple = GameItem("#apple");
  var mouseX = head.x;
  var mouseY = head.y;
  var gameOverID = "#gameOverBox";
  var actualSpeed = BASE_SPEED;


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  $("#board").on("mousemove", MouseMove);
  $(document).on("mousedown", mouseButtonClicked);
  $(document).on("mouseup", mouseButtonReleased);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  
  function newFrame() {
    redrawGameItem(head);
    updatePositionBody();
    updateposition(head);
    hitsBorder();
    speedOfSnakeCursor();
    if (head.x <= apple.x && head.y === apple.y) {
      spawnApple(apple);

    }
  }



  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      head.speedX = -5;
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



  function handleKeyUp(event) {
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
  function MouseMove(event) {
    mouseX = event.pageX
    mouseY = event.pageY

  }
  ////////////mouse click function to speed up snake///////////////////
  function mouseButtonClicked(event) {
    //////if clicked/////
    if (event.button === MOUSE.LEFT_CLICK) {
      actualSpeed = BASE_SPEED * 2
    }
  };



  ////if realeased//////
  function mouseButtonReleased(event) {
    if (event.button === MOUSE.LEFT_CLICK) {
      actualSpeed = BASE_SPEED;
    }

  };


  //hits border
  function hitsBorder() {
    if (head.x >= board.width) {
      gameOverBox();
    }
    if (head.y >= board.height) {
      gameOverBox();
    }
  }





  /////////////////////spped////////////////////
  function speedOfSnakeCursor() {
    var offsetX = mouseX - head.x;
    var offsetY = mouseY - head.y;

    var angle = Math.atan2(offsetY, offsetX);

    // you will need to make two more events for click and release of mouse;
    // those events should change the "speed" variable

    head.speedX = actualSpeed * Math.cos(angle);
    head.speedY = actualSpeed * Math.sin(angle);

  }


  ////creating game item////
  function redrawGameItem(piece) {
    $(piece.id).css("left", piece.x);
    $(piece.id).css("top", piece.y);
  };

  ///repostion///
  function updateposition(piece) {
    piece.x += piece.speedX;
    piece.y += piece.speedY

  };

  function updatePositionBody() {

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


  function gameOverBox() {
    head.speedX = 0;
    head.speedY = 0;
    $("#gameOverBox").show();


  }





















  function randomGrid(maxPixel) {
    return Math.floor(Math.random() * (maxPixel / GRID_SIZE)) * GRID_SIZE;
  }
  function spawnApple(piece) {
    piece.x = randomGrid(1240);
    piece.y = randomGrid(500);
    $(piece.id).css("left", piece.x);
    $(piece.id).css("top", piece.y);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}


