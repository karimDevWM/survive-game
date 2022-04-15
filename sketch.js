function setup()
{
    createCanvas(640, 480);
    // millis(10);
}

let posX = 200;
let posY = 300;
let dimaetreballeblanche = 50;

let posObstacleX = 10;
let posObstacleY = 150;
let posObstacleZ = 100;
let ballRadius = 10;
let posObstacleDx = 2;
let posObstacleDy = -2;

let timer = 20;

function draw()
{
    background(195);

    createTimer();
    let getTime = time();

    fill(255,255,255);
    circle(posX, posY, dimaetreballeblanche);
    fill(255,0,0);
    noStroke();
    ellipse(posObstacleX, posObstacleY, posObstacleZ);
    ellipseAutoMove();
    updatePositionCircle();
    limitGameScreen();
    testCollision();
}

function updatePositionCircle()
{
    if (keyIsDown(LEFT_ARROW)) {
        posX -= 5;
      }
    
      if (keyIsDown(RIGHT_ARROW)) {
        posX += 5;
      }
    
      if (keyIsDown(UP_ARROW)) {
        posY -= 5;
      }
    
      if (keyIsDown(DOWN_ARROW)) {
        posY += 5;
      }
}

function ellipseAutoMove()
{
    if(posObstacleX + posObstacleDx > 640 - ballRadius || 
        posObstacleX + posObstacleDx < ballRadius)
        {
          posObstacleDx = -posObstacleDx;  
        }
        else
        {
            posObstacleDx = +posObstacleDx;
        }
    
    posObstacleX+=posObstacleDx*2;


    if(posObstacleY + posObstacleDy > 480 - ballRadius ||
        posObstacleY + posObstacleDy < ballRadius)
        {
            posObstacleDy= -posObstacleDy;
        }
        else
        {
            posObstacleDy = +posObstacleDy;
        }
    
    posObstacleY+=posObstacleDy*2;
}

function limitGameScreen()
{
    if(posX < 0)
    {
        stroke('red');
        line(0, 640, 0, 0);
    }

    if(posX > 640)
    {
        stroke('red');
        line(640, 480, 640, 0);    
    }

    if(posY < 0)
    {
        stroke('red');
        line(0, 0, 640, 0);
    }

    if(posY > 480)
    {
        stroke('red')
        line(0, 480, 640, 480);
    }
}

function testCollision()
{
    strokeWeight(1)

    fill('black');
    let d= dist(posObstacleX, posObstacleY,posX,posY);

    translate((posObstacleX + posX ) / 2, (posObstacleY + posY ) / 2);
    atan();
    text(nfc(d, 2), 0, 0);

    if(d<(dimaetreballeblanche+ballRadius)/2)
    {
        fill('rgba(255, 72, 0, 0.7)');
        circle(20, 20, 60, 60);
        posObstacleDx = 0;
        posObstacleDy = 0;
    }
}

function createTimer()
{
    textAlign(CENTER, CENTER);
    textSize(20);
    text(timer, width/2, height/2);
}

function time()
{
    if (frameCount % 60 == 0 && timer > 0) 
    { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer --;
    }
    if (timer == 0) 
    {
        text("GAME OVER", width/2, height*0.7);
    }

    return timer;
}