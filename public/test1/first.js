let ghost;
let x = 0;
let r = 0;
let tank;
let dog;
let dogAnimation;
let box;
let block =[];


function preload() {
    //dog = createSprite(0,0);
    dogAnimation = loadAnimation('../assets/dog/dog1.png','../assets/dog/dog2.png');
    car = createSprite(1000,350);
    car.addImage('car', loadImage('../assets/dog/car1.png'));
    car.addImage('explode', loadImage('../assets/explode.png'));
    smoke = createSprite(1050,350);
    smoke.addImage('smoke', loadImage('../assets/dog/smoke1.png'));
    block[0] = createSprite(900,100);
    block[0].addImage(loadImage('../assets/dog/block.png'));
    block[1] = createSprite(400,300);
    block[1].addImage(loadImage('../assets/dog/block.png'));
    block[2] = createSprite(600,150);
    block[2].addImage(loadImage('../assets/dog/block.png'));
    block[3] = createSprite(1200,200);
    block[3].addImage(loadImage('../assets/dog/block.png'));


}
function setup() {
    createCanvas(1000, 480);

    dogrun = createSprite(90, 350);
    dogrun.scale = .1;
    dogrun.addAnimation('dog', dogAnimation);
    car.scale = .1;
    smoke.scale = .1;
    block[0].scale =.3;
    // block[0].addSpeed(1.5, 180);
    block[1].scale =.3;
    // block[1].addSpeed(1.5, 180);
    block[2].scale =.3;
    // block[2].addSpeed(1.5, 180);
    block[3].scale =.3;
    // block[3].addSpeed(1.5, 180);
    block[0].setVelocity(-0.6, 0);
    block[1].setVelocity(-0.9, 0);
    block[2].setVelocity(-1.4, 0);
    block[3].setVelocity(-1.8, 0);
    car.setVelocity(-1, 0);
    car.addSpeed(2, 180);
    smoke.addSpeed(2.8, 180);

}
function draw() {
    background('gray');
    line(0, 380, 1000, 380);
    //image(dogAnimation , 100, 100, 10, 10);
    if(dogrun.position.y > 350) {
        dogrun.position.y = 350;
    }
    if (car.overlap(dogrun)) {
        car.remove();
        smoke.remove();
    }
    else {
        car.changeImage('car');
    }
    for (let i = 0;i < block.length;i++) {
        // Step 5: add code here to detect (add adjust) the mountains positions
        if (block[i].position.x <= 0) {
            block[i].position.x = 1000;
        }
    }
    drawSprites();
    //else if (keyIsDown(RIGHT_ARROW)){
    //     tank.setVelocity(2, 0);
    // } else if (keyIsDown(UP_ARROW)) {
    //     tank.setVelocity(0, -2);
    // } else if (keyIsDown(DOWN_ARROW)) {
    //     tank.setVelocity(0, 2);
    // } else if(keyWentDown(32)){  // no key press ‐> stand still
    //    let s = createSprite(tank.position.x +70 , tank.position.y-25 , 10 , 10);
    //     s.setVelocity(5,0);
    //     s.addImage('tank' , loadImage('../assets/tank.png'));
    //     s.scale = 0.32;
    //     s.life = 40;
    // } else{
    //     tank.setVelocity(0, 0);
    // }
    // //tank.collide(box);
    // //tank.displace(box);
    // if(tank.overlap(box)){
    //     tank.changeImage('explode');
    // }else{
    //     tank.changeImage('tank');
    // }
    //drawSprites();
    //img.width = img.width *0.25;
    //image(img ,0,0);

    //讓foot-ghost 跟著鼠標移動
    //animation(foot_ghost, mouseX, mouseY);
    // ghostSprite.setVelocity(1, 1);
    // if(ghostSprite.position.x > width || ghostSprite.position.y > height){
    //     ghostSprite.setVelocity(-1,-1);
    // }
    // if(ghostSprite.position.x <= 0 || ghostSprite.position.y <= 0){
    //     ghostSprite.setVelocity(1,1);
    // }
    //drawSprites();
    // if(x === width) x=0;
    // else {
    //     x += 5;
    // }
    // foot_ghost.draw(x, 100);
    // if(r === 360) r=0;
    // else {
    //     r += 5;
    // }
    // foot_ghost.draw(x, 100,r);
}
function keyPressed() {
    dogrun.setVelocity(0, -5);
}
function keyReleased() {
    dogrun.setVelocity(0, 5);
    return false; // prevent any default behavior
}

// function mousePressed(){
//     tank.scale = 0.25;
// }
// function mouseReleased() {
//     tank.scale = 1;
// }