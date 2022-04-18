let countTouching = 0;
let maxCountTouching = 1;

class Joueur
{
    constructor(x, y, diametre)
    {
        this.x = x;
        this.y = y;
        this.diametre = diametre;
    }

    display()
    {
        fill('white');
        circle(this.x, this.y, this.diametre);
    }

    updatePositionCircle()
    {
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= 5;
        }
        
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += 5;
        }
        
        if (keyIsDown(UP_ARROW)) {
            this.y -= 5;
        }
        
        if (keyIsDown(DOWN_ARROW)) {
            this.y += 5;
        }
    }

    gameScreenPlayerLimitation()
    {
        if(this.x < 0)
        {
            stroke('red');
            strokeWeight(7);
            line(0, 640, 0, 0);
        }

        if(this.x > 640)
        {
            stroke('red');
            strokeWeight(7);
            line(640, 480, 640, 0);    
        }

        if(this.y < 0)
        {
            stroke('red');
            strokeWeight(7);
            line(0, 0, 640, 0);
        }

        if(this.y > 480)
        {
            stroke('red');
            strokeWeight(7);
            line(0, 480, 640, 480);
        }   
    }
}

class Obstacle
{
    constructor(obstacleX, obstacleY, obstacleDiametre, posObstacleDx, posObstacleDy)
    {
        this.obstacleX = obstacleX;
        this.obstacleY = obstacleY;
        this.posObstacleDx = posObstacleDx;
        this.posObstacleDy = posObstacleDy;
        this.obstacleDiametre = obstacleDiametre;
    }

    display()
    {
        fill('red');
        circle(this.obstacleX, this.obstacleY, this.obstacleDiametre, this.posObstacleDx, this.posObstacleDy);
    }

    ellipseAutoMove()
    {
        if(this.obstacleX + this.posObstacleDx > 640 - this.obstacleDiametre || 
            this.obstacleX + this.posObstacleDx < this.obstacleDiametre)
            {
                this.posObstacleDx = - this.posObstacleDx;  
            }
            else
            {
                this.posObstacleDx = + this.posObstacleDx;
            }
        
        this.obstacleX+=this.posObstacleDx*2;

        if(this.obstacleY + this.posObstacleDy > 480 - this.obstacleDiametre ||
            this.obstacleY + this.posObstacleDy < this.obstacleDiametre)
            {
                this.posObstacleDy= - this.posObstacleDy;
            }
            else
            {
                this.posObstacleDy = + this.posObstacleDy;
            }
        
        this.obstacleY+=this.posObstacleDy*2;
    }
}

function setup() 
{
    createCanvas(640, 480);

    balleBlanche = new Joueur(50, 30, 60)
    ennemie = new Obstacle(30, 40, 20, 2, -2);
}
  
function draw() 
{
    background("grey");
    
    noStroke();
    balleBlanche.gameScreenPlayerLimitation();
    balleBlanche.display();
    balleBlanche.updatePositionCircle();
    
    ennemie.display();
    ennemie.ellipseAutoMove();

    text(20);
    text(countTouching, 640/2, 480-50);

    testCollision();

    collision();

    stopPlaying();
}

function testCollision()
{
    strokeWeight(1)

    fill('black');
    let d= dist(ennemie.obstacleX, ennemie.obstacleY, balleBlanche.x,balleBlanche.y);

    translate((ennemie.obstacleX + balleBlanche.x ) / 2, (ennemie.obstacleY + balleBlanche.y ) / 2);
    atan();
    text(nfc(d, 2), 0, 0);

    return d;
    // if(d<(balleBlanche.diametre+ennemie.obstacleDiametre)/2)
    // {
    //     fill('rgba(255, 72, 0, 0.7)');
    //     circle(20, 20, 60, 60);
    // }
}

function collision()
{
    if(balleBlanche.x < ennemie.obstacleX + (ennemie.obstacleDiametre/2)&&
        ennemie.obstacleX < balleBlanche.x + (balleBlanche.diametre/1)&&
        balleBlanche.y < ennemie.obstacleY + (ennemie.obstacleDiametre/2)&&
        ennemie.obstacleY < balleBlanche.y + (balleBlanche.diametre/2))
    {
        fill('red');
        countTouching = countTouching + 1;
        // stopPlaying();
    }
}

function stopPlaying()
{
    if(countTouching >= maxCountTouching)
    {
        strokeWeight(4);
        textSize(20);
        fill('white');

        // timer
        let milliSecond = millis();
        text('end game \n, time played : \n'+Math.trunc(milliSecond/1000)+' seconds', 640/4, 480/2);
        // releaseTime();
    }
}