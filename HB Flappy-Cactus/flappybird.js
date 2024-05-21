// Board Varibles
let board;
let boardWidth = 360;
let boardHeight = 640;
// TODO: Decipher this
let context;

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

// Pipe Varibles
let pipeArray = [];
let pipeWidth = 64;  // width/height ratio = 384/3072  1/8
let pipeHeight = 512;
let pipeX = boardWidth;  // 360 left
let pipeY = 0;  // 0 down

// physics
let velocityX = -2; // pipes move left

// load pipe images first
let topPipeImg;
let bottomPipeImg;


window.onload = function() {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;

  // TODO research context
  context = board.getContext("2d"); // Used for drawing on the board

  // draw the bird
  // TODO hitboxes?
  context.fillStyle = "green";
  context.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Load the image
  // TODO: research image() tag
  // TODO: research new tag
  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  // gotta load the image
  birdImg.onload = function() {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  }

  // load the pipe image  // TODO image?
  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  // TODO: research
  requestAnimationFrame(update);

  // Pipe generation
  setInterval(placePipes, 1500); //every 1.5 seconds

}

// main game loop?
function update() {
  requestAnimationFrame(update);

  // clear so frames dont stack
  // TODO: really UNDERSTAND this code
  context.clearRect(0, 0, board.width, board.height);

  // redraw
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

  // redraw pipes
  for ( let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;


    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
  }
}

function placePipes() {
  
  // (0-1) * pipeHeight/2.
  // 0 -> 128  (pipeHeight/4)
  // 1 -> 128 - 256 (pipeHieght/4 - pipeHieght/2) -3/4 ()

  let randomPipeY = pipeY - pipeHeight/4  - Math.random()*(pipeHeight/2);
  let openingSpace = board.height/4;
  
  let topPipe = {
    img : topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width : pipeWidth,
    height : pipeHeight,
    passed : false
  }

  pipeArray.push(topPipe);

  let bottomPipe = {
    img : bottomPipeImg,
    x : pipeX,
    y : randomPipeY + pipeHeight + openingSpace,
    width : pipeWidth,
    height : pipeHeight,
    passed : false
  }

  pipeArray.push(bottomPipe);
}