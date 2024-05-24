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
let velocityY = 0; // bird jump speed
let gravity = 0.4; // gravity

// gameflow
gameover = false;
let score = 0;

// sfx
let ScoreUp = new Audio("./SFX/ScoreUp.mp3");
// preload the audio file
ScoreUp.load;

let Death = new Audio("./SFX/Death.mp3");
Death.load;

let Flap = new Audio("./SFX/Flap.mp3");
Flap.load;

// Audio pool
const POOL_SIZE = 5;
let audioPool = [];
let currentIndex = 0;

// Preload the audio instances
for( let i = 0 ; i < POOL_SIZE ; i++){
  let audio = new Audio("./SFX/Flap.mp3");
  audioPool.push(audio);
}

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

  // listen for Keydown
  document.addEventListener("keydown", moveBird);

}

// main game loop?
function update() {
  requestAnimationFrame(update);

  if (gameover){
    return;
  }

  // clear so frames dont stack
  // TODO: really UNDERSTAND this code
  context.clearRect(0, 0, board.width, board.height);

  // apply acceleration
  velocityY += gravity;
  // apply velocity
  // TODO max and min
  bird.y = Math.max( bird.y + velocityY, 0);
  // redraw
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
  
  // check if bird fell off
  if (bird.y > board.height){
    gameover = true;
  }


  // redraw pipes
  for ( let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;

    // check for passed
    if (!pipe.passed && bird.x > pipe.x + pipe.width){
      // since pipes always come in pairs
      score += 0.5
      pipe.passed = true;
      ScoreUp.play();
    }

    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (detectCollsion(bird, pipe)) {
      Death.play();
      gameover = true; 
    }
  }

  //score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  // should update bird if it passed

  // clearing pipes
  // TODO move above context?
  while ( pipeArray.length > 0 && pipeArray[0].x < 0  - pipeWidth){
    pipeArray.shift();
  }

  if (gameover){
    context.fillText("GAME OVER", 5, 90)
  }
}

function placePipes() {

  if (gameover){
    return;
  }
  
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

// TODO: research E
function moveBird(e) {
  // Multiple choices
  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
    //jump 
    velocityY = -6;


    let currentFlap = audioPool[currentIndex];
    currentFlap.currentTime = 0; // Rewind
    currentFlap.play();

    // increment
    currentIndex = (currentIndex + 1) % POOL_SIZE;
  }

  if (e.code == "Space" && gameover){
    bird.y = birdY
    pipeArray = [];
    score = 0;
    gameover = false;
  }
}

function detectCollsion( a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
  }