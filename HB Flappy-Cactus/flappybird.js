// Board Varibles
let board;
let boardWidth = 360;
let boardHeight = 640;
let context; //?

// Bird Varibles
let birdWidth = 34;  // width/height = 408 / 228 = 17/12
let birdHeight = 24;

// to displat bird in correct location for flappy bird
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

// make bird varible
let bird = {
  x : birdX,
  y : birdY,
  width : birdWidth,
  height : birdHeight
}


window.onload = function() {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  // TODO research context
  context = board.getContext("2d"); // Used for drawing on the board

  // draw the bird
  // TODO hitboxes?
  /*context.fillStyle = "green";
  context.fillRect(bird.x, bird.y, bird.width, bird.height)*/

  // Load the image
  // TODO: research image() tag
  // TODO: research new tag
  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  // gotta load the image
  birdImg.onload = function() {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  }

  // TODO: research
  requestAnimationFrame(update);

}

// main game loop?
function update() {
  requestAnimationFrame(update);

  // clear so frames dont stack
  // TODO: really UNDERSTAND this code
  context.clearRect(0, 0, board.width, board.height);
}