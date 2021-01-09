let dog;
let dogAnimation;
let fixedChicken;
let block =[];
let chicken = [];
let badguy;

let dogObj = {
    life: 100,
    ck: 0,
    set eatChickenMethod(num){
        this.ck+=num
    },
    set changeLife(num){
        this.life += num
    },

    set hungry(num){
        changeLife(num)
        console.log(this.life)
    }

};

for (;;) {
    setTimeout(dogObj.hungry, )
}


function preload() {
    //dog = createSprite(0,0);
    dogAnimation = loadAnimation('../dog/dog-run1+3.png','../dog/dog-run2.png','../dog/dog-run1+3.png','../dog/dog-run4.png');
    car = createSprite(1000,350);
    car.addImage('car', loadImage('../dog/car1.png'));
    smoke = createSprite(1050,350);
    smoke.addImage('smoke', loadImage('../dog/smoke1.png'));
    block[0] = createSprite(900,110);
    block[0].addImage(loadImage('../dog/block.png'));
    block[1] = createSprite(400,300);
    block[1].addImage(loadImage('../dog/block.png'));
    block[2] = createSprite(600,150);
    block[2].addImage(loadImage('../dog/block.png'));
    block[3] = createSprite(1200,200);
    block[3].addImage(loadImage('../dog/block.png'));

    chicken[0] = createSprite(900,90);
    chicken[0].addImage(loadImage('../dog/chicken-leg.png'));
    chicken[1] = createSprite(400,280);
    chicken[1].addImage(loadImage('../dog/chicken-leg.png'));
    chicken[2] = createSprite(600,130);
    chicken[2].addImage(loadImage('../dog/chicken-leg.png'));
    chicken[3] = createSprite(1200,180);
    chicken[3].addImage(loadImage('../dog/chicken-leg.png'));

    fixedChicken = createSprite(900,40);
    fixedChicken.addImage(loadImage('../dog/chicken-leg.png'));

    badguyAnimation = loadAnimation('../dog/guy1.png','../dog/guy2.png');

}
function setup() {
    createCanvas(1000, 480);
    bg = loadImage('../dog/bg.png')
    dogrun = createSprite(100, 350);
    dogrun.scale = .07;
    dogrun.addAnimation('dog', dogAnimation);
    badguy = createSprite(900,350);
    badguy.scale = .1;
    badguy.addAnimation('badguy', badguyAnimation);
    car.scale = .1;
    smoke.scale = .1;
    block[0].scale =.3;
    chicken[0].scale = .05;
    block[1].scale =.3;
    chicken[1].scale = .05;
    // block[1].addSpeed(1.5, 180);
    block[2].scale =.3;
    chicken[2].scale = .05;
    // block[2].addSpeed(1.5, 180);
    block[3].scale =.3;
    chicken[3].scale = .05;
    // block[3].addSpeed	stroke(255, 0, 0);
	strokeWeight(30);(1.5, 180);
    block[0].setVelocity(-1.0, 0);
    chicken[0].setVelocity(-1.0, 0);
    block[1].setVelocity(-0.6, 0);
    chicken[1].setVelocity(-0.6, 0);
    block[2].setVelocity(-1.4, 0);
    chicken[2].setVelocity(-1.4, 0);
    block[3].setVelocity(-1.8, 0);
    chicken[3].setVelocity(-1.8, 0);
    car.setVelocity(-1, 0);
    car.addSpeed(2, 180);
    smoke.addSpeed(2.8, 180);
    badguy.setVelocity(-1.4, 0);
    fixedChicken.scale = .1;

}
function draw() {
    background(bg);
    fill('white');
    text(dogObj.ck, 920, 50);

    textSize(32);
    
    //image(dogAnimation , 100, 100, 10, 10);
    if(dogrun.position.y > 350) {
        dogrun.position.y = 350;
    }
    if(dogrun.position.x < 100) {
        dogrun.position.x = 100;
    }
    if (car.overlap(dogrun)) {
        car.remove();
        smoke.remove();
    }

    for (let i = 0;i < block.length;i++) {
        if (block[i].position.x <= 0) {
            block[i].position.x = 1000;
        }
        dogrun.collide(block[i]);
    }
    eatChicken();

    drawSprites();

}
function keyPressed() {
    dogrun.setVelocity(0, -5);
}
function keyReleased() {
    dogrun.setVelocity(0, 5);
    return false; // prevent any default behavior
}

function eatChicken(){
    for(let i= 0 ; i<chicken.length; i++){
        if (chicken[i].position.x <= 0) {
            chicken[i].position.x = 1000;
        }
        if (dogrun.overlap(chicken[i])) {
            // alert("eatchicken");

            let chickenX = chicken[i].position.x;
            let chickenVelX = chicken[i].velocity.x;
            chicken[i].remove();
            //setTimeout(newChicken(chickenX,chickenY,chickenVelX,i), 10000);
            console.log(chicken.length);
            dogObj.eatChickenMethod = 1;

        }
        


    }
}
function newChicken(chickenX , chickenY , chickenVelX ,i){
    chicken[i] = createSprite(chickenX,chickenY);
    chicken[i].addImage(loadImage('../dog/chicken-leg.png'));
    chicken[i].setVelocity(chickenVelX, 0);
    chicken[i].scale = .05;
}

