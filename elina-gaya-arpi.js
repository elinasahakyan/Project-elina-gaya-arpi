var canvas;
var canvasContext;
var ballX = 40;
var ballY = 40
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250; //position of the paddle
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10


function calculateMousePos(evt){ //evt=event data
  var rect = canvas.getBoundingClientRect(); //the green area
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft; //when u scroll the X and Y corners will always be within the playable space
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
        x:mouseX,
        y:mouseY
  };
}

	function handleMouseClick(evt){
    if(showingWinScreen){
      player1Score = 0;
      player2Score = 0;
      showingWinScreen = false;
    }
  }

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

var framesPerSecond = 30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);
  canvas.addEventListener('mousemove',
      function(evt){
          var mousePos = calculateMousePos(evt);
          paddle1Y = mousePos.y-(PADDLE_HEIGHT/2); //control the paddle
      } );
}

function ballReset(){  //Reset ball from the center
  if(player1Score >= WINNING_SCORE ||
      player2Score >= WINNING_SCORE){
        
          showingWinScreen = true;
        }
        
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement(){
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }

}

function moveEverything(){
  if(showingWinScreen){
    return;
  }
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX < 0) {
    if(ballY > paddle1Y && 
       ballY < paddle1Y+PADDLE_HEIGHT)  {
         ballSpeedX = -ballSpeedX;
         
         var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
         ballSpeedY = deltaY * 0.35;

       } else {
           player2Score++; // before ball reset to work as a condition for not reseting in case of win
          ballReset();
        
       }
  }

  if(ballX > canvas.width) {
    if(ballY > paddle2Y && 
       ballY < paddle2Y+PADDLE_HEIGHT){
         ballSpeedX = -ballSpeedX;
          var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
         ballSpeedY = deltaY * 0.35;
       } else {
         player1Score++; // before ball reset
          ballReset();
           
       }
    
  }
  if(ballY < 0) {
    ballSpeedY= - ballSpeedY;
  }
  if(ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}


 function drawNet(){
    for (var i=0; i <canvas.height; i+=30){
      colorRect(canvas.width/2-1, i, 2, 20, 'grey')
    }
  }


  function drawEverything(){
    
    colorRect(0,0,canvas.width,canvas.height,"green");

    if(showingWinScreen){
      canvasContext.fillStyle = 'white';
      canvasContext.font = "26pt calibri";
        
        if(player1Score >= WINNING_SCORE){
            canvasContext.fillText ("You Won!!!", canvas.width/6, canvas.height/4);
   
     }else if(player2Score >= WINNING_SCORE){
       canvasContext.fillText ("Computer Won!!!", canvas.width*4/6, canvas.height/4);
     }
       canvasContext.fillStyle = 'grey';
       canvasContext.font = "20pt calibri";
       canvasContext.fillText ("Click to Continue!", canvas.width/2.25, canvas.height*3/4);
       
   return;
    };


    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"yellow"); // left player's paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"grey"); // right comupter paddle
    colorCircle(ballX, ballY, 8, 'yellow')
    colorRect(canvas.width/2-30, 70, 60, 45,"red")
    drawNet();


    canvasContext.fillStyle = "yellow"
    canvasContext.font = "20pt calibri"
    canvasContext.fillText( player1Score, canvas.width/2-24, 100,); //hor, vrt position
    canvasContext.fillStyle = "grey"
    canvasContext.fillText( player2Score, canvas.width/2+8, 100,);
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
