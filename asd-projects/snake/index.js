/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 30;
  var FRAMES_PER_SECOND_INTERVAL = 100 / FRAME_RATE;
  var BASE_SPEED = 8;


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
    "R": 82,
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
  var scoreBoard = GameItem("#scoreBoard");
  var snakeBody = [head];







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
    hitsBorder();
    speedOfSnakeCursor();
    appleMove(apple, head);
    redrawGameItem(apple);
    scoreKeep();
    moveBody();
    update();

  }

  $("#refreshButton").on("click", refresh);

  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      head.speedX = -5;
      console.log("left pressed");
      newApplePosition();
    }
    else if (event.which === KEY.UP) {
      head.speedY = -5;
      console.log("up pressed");
      appleMove(apple, head);
    }

    else if (event.which === KEY.RIGHT) {
      head.speedX = 5;
      console.log("right pressed");
    }
    else if (event.which === KEY.DOWN) {
      head.speedY = 5;
      console.log("down pressed");
    }
    else if (event.which === KEY.R) {
      document.location.reload()
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

    var distance = Math.sqrt(Math.pow(offsetX, 2), Math.pow(offsetY, 2));

    if (distance > actualSpeed) {
      head.speedX = actualSpeed * Math.cos(angle);
      head.speedY = actualSpeed * Math.sin(angle);
    }
    else {
      head.speedX = distance / actualSpeed * Math.cos(angle);
      head.speedY = distance / actualSpeed * Math.sin(angle);
    }
  }
  function update() {
    for (var i = 0; i < snakeBody.length; i++) {
      redrawGameItem(snakeBody[i]);
    }
  }
    ////creating game item////
    function redrawGameItem(piece) {
      $(piece.id).css("left", piece.x);
      $(piece.id).css("top", piece.y);
    };

    ///repostion///
    function updateposition(i) {
      if (i === 0) {
        head.x += head.speedX;
        head.y += head.speedY;
      }
      else {
        snakeBody[i].x = snakeBody[i - 1].x;
        snakeBody[i].y = snakeBody[i - 1].y;
      }
    };




    ////// collision /////
    function createBody(id) {
      $("<div>").attr("id", id)
        .addClass("brick")
        .appendTo("#board");
    }
    function addBody() {
      var nextId = "snek" + snakeBody.length;

      createBody(nextId);

      var newObject = GameItem("#" + nextId);

      snakeBody.push(newObject);
    }

    function appleMove(a, b) {
      // $("#board").css("color", "white")
      //            .text(`${a.x}, ${a.y}, ${a.width}, ${a.height},\n${b.x}, ${b.y}, ${b.width}, ${b.height}`);

      if ((a.y + a.height) > (b.y) &&
        a.y < (b.y + b.height) &&
        (a.x + a.width) > b.x &&
        a.x < (b.x + b.width)) {
        //  $("#head").text("HERE");
        newApplePosition();
        score = score + 1;
        $("h2").text(score);
        addBody();


      }
    }



    ////score board////
    var score = 0;
    var scoreboard = $("#score");
    function scoreKeep() {

    }



    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    function moveBody() {
      for (var i = snakeBody.length - 1; i >= 0; i--) {
        updateposition(i);
      }
    }


    //////random values of pixels//////
    function newApplePosition() {
      apple.x = Math.random() * 1140;
      apple.y = Math.random() * 400;
      $("#apple").css("left", apple.x);
      $("#apple").css("top", apple.y);
    }



    function refresh() {
      document.location.reload();
    }

    function gameOverBox() {
      head.speedX = 0;
      head.speedY = 0;
      $("#gameOverBox").show();


    }
























    function endGame() {
      // stop the interval timer
      clearInterval(interval);

      // turn off event handlers
      $(document).off();
    }

  }


