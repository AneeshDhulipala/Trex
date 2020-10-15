var trex,invisibleGround,ground,trexDeadAnimation,gameOver,dieSound,jumpointSound,checkpointSound
var trexAnimation,cloudsAnimation;
var obsImg1,obsImg2,obsImg3,obsImg4,obsImg5,obsImg6;
var ObsGroup,CloudGroup,Restart
var PLAY=1;//constant variables
var END=0;
var score=0
var gameState=PLAY
function preload(){
trexAnimation=loadAnimation("trex1.png","trex3.png","trex4.png") 
groundAnimation=loadImage("ground2.png")
cloudsAnimation=loadImage("cloud.png")
  obsImg1=loadImage("obstacle1.png");
  obsImg2=loadImage("obstacle2.png");
  obsImg3=loadImage("obstacle3.png");
  obsImg4=loadImage("obstacle4.png");
  obsImg5=loadImage("obstacle5.png");
  obsImg6=loadImage("obstacle6.png");
trexDeadAnimation=loadAnimation("trex_collided.png")  
RestartAnimation=loadImage("restart.png")
gameOverAnimation=loadImage("gameOver.png")
dieSound=loadSound("die.mp3")
jumpointSound=loadSound("jump.mp3")
checkpointSound=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(500, 200);
trex=createSprite(40,160)
trex.addAnimation("trex walking",trexAnimation)
trex.addAnimation("trex dead",trexDeadAnimation)
  trex.scale=0.6
  Restart=createSprite(250,120)
  Restart.addImage("restart",RestartAnimation)
  Restart.scale=0.6
  invisibleGround=createSprite(250,195,500,5)
invisibleGround.visible=false
ground=createSprite(250,190,500,5)
ground.addImage("ground",groundAnimation)
ground.velocityX = -2
gameOver=createSprite(250,100)
gameOver.addImage("gameOver",gameOverAnimation)
gameOver.scale=0.6 
  ObsGroup=new Group()
CloudGroup=new Group()
trex.debug=true
trex.setCollider("circle",0,0,30)
}






function draw() {
  //set background to white
  background("white");
  
  if(gameState===PLAY){
    score+=Math.round(getFrameRate()/60)
    ground.velocityX = -4;
    
    //kill time
    if(ObsGroup.isTouching(trex)){
      gameState=END;
      dieSound.play()
    }
    if (ground.x < 0){
   ground.x = ground.width/2;
   }
  if(keyDown("space")&& trex.y>140){
  trex.velocityY = -12 ;
  jumpointSound.play()
  }
  if (World.frameCount%60===0){
  spawnClouds()
  }
  if (World.frameCount%70===0){
  spawnObstacles() 
    
  }
  if (score%100===0&&score>0){
  checkpointSound.play()
  }
  
    Restart.visible=false
    gameOver.visible=false 
  }
  else if(gameState===END){
    ground.velocityX = 0;
  ObsGroup.setVelocityXEach(0);
  CloudGroup.setVelocityXEach(0)
  ObsGroup.setLifetimeEach(0.5)
  CloudGroup.setLifetimeEach(0.5)
  trex.changeAnimation("trex dead")
  gameOver.visible=true
  Restart.visible=true
  if (mousePressedOver(Restart)){
  gameState=PLAY
  ObsGroup.destroyEach()
  CloudGroup.destroyEach()
  trex.changeAnimation("trex walking")
  score=0
  }
  }
  
  
  text("score="+score,318,56)
  
  
 // console.log(ground.x);

  //console.log(trex.y)
  //jump when the space key is pressed
  

  
  //add gravity
  trex.velocityY = trex.velocityY + 0.6;
  //console.log(World.frameCount)
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();

}

function spawnClouds(){
var cloud=createSprite(500,120,5,4)
cloud.velocityX=-3
cloud.addImage("cloud",cloudsAnimation) 
cloud.y=random(60,80)
//console.log(cloud.y)
cloud.scale=random(0.6,1)
//console.log(cloud.scale)  
cloud.depth=trex.depth
trex.depth++
//console.log(trex.depth)
//console.log(cloud.depth)
cloud.lifetime=170          
    CloudGroup.add(cloud)
}
function spawnObstacles(){
var Obstacles=createSprite(500,175,5,4);
Obstacles.velocityX=-3
var randomNo=Math.round(random(1,6));
  console.log(randomNo);
  switch(randomNo){
    case 1: Obstacles.addImage(obsImg1);
      break;
      case 2: Obstacles.addImage(obsImg2);break;
      case 3: Obstacles.addImage(obsImg3);break;
      case 4: Obstacles.addImage(obsImg4);break;
      case 5: Obstacles.addImage(obsImg5);break;
      case 6: Obstacles.addImage(obsImg6);break;
    default: Obstacles.addImage(obsImg1);
  }
Obstacles.scale=0.5
Obstacles.lifetime=170
Obstacles.debug=true
ObsGroup.add(Obstacles);
}