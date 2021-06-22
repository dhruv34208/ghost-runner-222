var ghost,ghost_standing,ghostImage,ghostS;
var door,doorImage;
var climber,climberImage;
var ivisible;
var score=0;
var edges;
var PLAY=1;
var END = 0;
var gameState = PLAY
var bground,backgroundImage;
var gameSound
function preload(){
  ghostImage = loadImage("ghost-jumping.png");
  ghostS=loadImage("ghost-standing.png");
  doorImage=loadImage("door.png");
  backgroundImage=loadImage("tower.png")
  climberImage=loadImage("climber.png");
  gameSound=loadSound("spooky.wav")
}
 



function setup() {
  createCanvas(600, 600);
  bground=createSprite(300,300,600,600);
  bground.addImage("bground",backgroundImage); 
  
  ghost=createSprite(180,300,10,30);
  ghost.scale=0.25
  ghost.addImage("ghost", ghostImage);
  ghost.addImage("ghostS",ghostS)
  ghost.setVelocity(0,-5);
 
  doorG = new Group();
  climberG = new Group();
  ivisibleG = new Group()
  
  
}

function draw() {
  background(0);
 
  
  edges=createEdgeSprites();

  if (gameState === END) {
      background("red")
    text("gameOver",300,300)
    
  }
  if(gameState === PLAY){
    gameSound.play()
    bground.velocityY=-2

  if (bground.y < 0) {
    bground.y=bground.width/2
  }

  if(keyDown("space")){
    ghost.velocityY = ghost.velocityY - 0.8;
    ghost.changeAnimation("ghost", ghostImage)
  }
  ghost.velocityY=ghost.velocityY+0.25
  if(keyDown("left")){
    ghost.velocityX=ghost.velocityX-0.8;
    ghost.changeAnimation("ghost", ghostImage)
  }  
  if(keyDown("right")){
    ghost.velocityX = ghost.velocityX + 0.8;
    ghost.changeAnimation("ghost", ghostImage)
  }
  
  if(ghost.isTouching(climberG)){
    ghost.velocityY = 0
    ghost.velocityX = 0
    ghost.changeAnimation("ghostS",ghostS);
  }     
  if(ghost.y> 600 || ghost.isTouching(ivisibleG)){
    gameState=END;
  }
  ghost.collide(edges[0]);
  ghost.collide(edges[1]);
  ghost.collide(edges[2]);
  spawningDoors();
  drawSprites();
    score = score + Math.round(getFrameRate() / 60);
}
  fill("black")
  text("score:"+score,150,50);
 
  
}
function spawningDoors(){
  if(frameCount%100==0){
    door=createSprite(Math.round(random(0,500)),-50,20,20);
    door.velocityY=2
    door.addImage("door",doorImage);
    door.lifetime=300;
    doorG.add(door);
    climber=createSprite(Math.round(random(100,500)),0,20,20);
    climber.x=door.x
    climber.velocityY=2
    climber.addImage("climber",climberImage);
    climber.lifetime=300;
    climberG.add(climber);
    ivisible=createSprite(climber.x,10,climber.width,5);
    ivisible.velocityY=climber.velocityY;
    ivisible.lifetime=300;
    ivisible.visible = false;
    ivisibleG.add(ivisible)
    ghost.depth = door.depth;
    ghost.depth += 1;

  }}


  


