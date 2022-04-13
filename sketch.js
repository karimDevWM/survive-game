function setup(){
    createCanvas(640, 480);
}

let posX = 200;
let posY = 300;

let posObstacleX = 10;
let posObstacleY = 150;
let posObstacleZ = 20;
let ballRadius = 10;
let posObstacleDx = 2;

// let direction = 0;

function draw(){
    background(195);
    fill(255,255,255);
    circle(posX, posY, 50);
    fill(255,0,0);
    noStroke();
    ellipse(posObstacleX, posObstacleY, posObstacleZ);
    ellipseAutoMove();
    updatePositionCircle();
    limitGameScreen();
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
        posObstacleX+=posObstacleDx;
}

function limitGameScreen()
{
    // if(posX < 0 || posX > 480)
    // {
    //     line(0, 0, 0, 0);
    //     stroke('red');
    // }
    // else if(posY < 0 || posY > 640)
    // {
    //     stroke('red');
        // let borderTop=document.getElementsByClassName('p5canvas');
        // borderTop.className('border-Top: red');
    //     line(640, 0, 0, 0);
    // }

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