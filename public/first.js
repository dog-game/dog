let dog;
let dogAnimation;
let fixedChicken;
let block = [];
let chicken = [];
let gameStarted = false;
let blink = false;
let blinkText;
let badguy;
let gameOver = false;
let flag = true;
let interval;
let carOverLapFlag=false;
let badguyOverLapFlag=false;

let bgx1 = 0;
let bgx2;
let scrollSpeed = 2;


let dogObj = {
  life: 100,
  ck: 0,
  set eatChickenMethod(num) {
    this.ck += num;
  },
  set changeLife(num) {
    this.life += num;
  },
};
let sounds = {};
let keepFinalck = 0;


function preload() {
  //dog = createSprite(0,0);
  bg = loadImage("../dog/bg.png");
  sounds.bgm = createAudio("../audio/bgm.mp3");
  sounds.dog_eatchicken = createAudio("../audio/dog_eatchicken.mp3");
  sounds.dog_car = createAudio("../audio/dog_car.m4a");
  sounds.dog_badguy = createAudio("../audio/dog_badguy.mp3");
  sounds.correct = createAudio("../audio/correct.mp3");

  sounds.error = createAudio("../audio/error.wav");
  sounds.question = createAudio("../audio/question.mp3");
  sounds.hop = createAudio("../audio/hop.m4a");

  dogAnimation = loadAnimation(
    "../dog/dog-run1+3.png",
    "../dog/dog-run2.png",
    "../dog/dog-run1+3.png",
    "../dog/dog-run4.png"
  );
  car = createSprite(1000, 500);
  car.addImage("car", loadImage("../dog/car1.png"));
  smoke = createSprite(1050, 500);
  smoke.addImage("smoke", loadImage("../dog/smoke1.png"));
  block[0] = createSprite(1500, 110);
  block[0].addImage(loadImage("../dog/block.png"));
  block[1] = createSprite(1500, 300);
  block[1].addImage(loadImage("../dog/block.png"));
  block[2] = createSprite(1900, 150);
  block[2].addImage(loadImage("../dog/block.png"));
  block[3] = createSprite(1800, 200);
  block[3].addImage(loadImage("../dog/block.png"));

  chicken[0] = createSprite(1500, 80);
  chicken[0].addImage(loadImage("../dog/chicken-leg.png"));
  chicken[1] = createSprite(1500, 270);
  chicken[1].addImage(loadImage("../dog/chicken-leg.png"));
  chicken[2] = createSprite(1900, 120);
  chicken[2].addImage(loadImage("../dog/chicken-leg.png"));
  chicken[3] = createSprite(1800, 170);
  chicken[3].addImage(loadImage("../dog/chicken-leg.png"));

  q1 = createSprite(1500, 230);
  q1.addImage(loadImage("../dog/question.png"));

  q2 = createSprite(3000, 40);
  q2.addImage(loadImage("../dog/question.png"));

  q3 = createSprite(4500, 120);
  q3.addImage(loadImage("../dog/question.png"));

  fixedChicken = createSprite(1300, 40);
  fixedChicken.addImage(loadImage("../dog/chicken-leg.png"));

  badguyAnimation = loadAnimation("../dog/guy3.png","../dog/guy4.png","../dog/guy5.png");
}
function setup() {
  createCanvas(1400, 600);
  sounds.bgm.elt.controls = false;
  sounds.dog_eatchicken.elt.controls = false;
  sounds.dog_car.elt.controls = false;
  sounds.dog_badguy.elt.controls = false;
  sounds.error.elt.controls = false;

  bgx2 = width;

  dogrun = createSprite(200, 500);
  dogrun.scale = 0.1;
  dogrun.addAnimation("dog", dogAnimation);
  badguy = createSprite(1000, 500);
  badguy.scale = 0.3;
  badguy.addAnimation("badguy", badguyAnimation);
  car.scale = 0.19;
  smoke.scale = 0.14;
  block[0].scale = 0.62;
  chicken[0].scale = 0.15;
  block[1].scale = 0.62;
  chicken[1].scale = 0.15;
  // block[1].addSpeed(1.5, 180);
  block[2].scale = 0.62;
  chicken[2].scale = 0.15;
  // block[2].addSpeed(1.5, 180);
  block[3].scale = 0.62;
  chicken[3].scale = 0.15;
  // block[3].addSpeed	stroke(255, 0, 0);


  block[0].setVelocity(-2.0, 0);
  chicken[0].setVelocity(-2.0, 0);
  block[1].setVelocity(-3, 0);
  chicken[1].setVelocity(-3, 0);
  block[2].setVelocity(-6, 0);
  chicken[2].setVelocity(-6, 0);
  block[3].setVelocity(-4, 0);
  chicken[3].setVelocity(-4, 0);
  car.setVelocity(-1, 0);
  car.addSpeed(2, 180);
  smoke.addSpeed(2.8, 180);
  badguy.setVelocity(-1.4, 0);
  fixedChicken.scale = 0.1;
}

function draw() {
  sounds.bgm.play();
  q1.setVelocity(-2.5, 0);
  q1.scale = 0.2;
  q2.setVelocity(-2.5, 0);
  q2.scale = 0.2;
  q3.setVelocity(-2.5, 0);
  q3.scale = 0.2;

  image(bg, bgx1, 0, width, height);
  image(bg, bgx2, 0, width, height);
  bgx1 -= scrollSpeed;
  bgx2 -= scrollSpeed;

  if (bgx1 < -width) {
    bgx1 = width;
  }
  if (bgx2 < -width) {
    bgx2 = width;
  }

  if (!gameStarted) {
    // background(bg);

    fill("white");
    textAlign(CENTER);
    textSize(80);
    text("幫狗狗找到回家的路", 650, 200);

    if (keyWentDown("space")) {
      gameStarted = true;
      interval = setInterval(() => {
        dogObj.life -= 1;
      }, 100);
    }

    if (!blink) {
      textSize(60);
      blinkText = text("按空白鍵開始遊戲", 650, 450);
    } else {
      blinkText = "";
    }
  }
  if (gameStarted) {
    console.log(dogObj.life);
    // background(bg);
    sounds.bgm.play();
    fill("grey");
    rect(0, 550, 1420, 600);

    fill("white");
    textSize(32);
    text(dogObj.ck, 1330, 50);

    //image(dogAnimation , 100, 100, 10, 10);
    if (dogrun.position.y > 500) {
      dogrun.position.y = 500;
    }
    if (dogrun.position.x < 100) {
      dogrun.position.x = 100;
    }
    if (car.position.x <= 0) {
      car.position.x = 1900;
      smoke.position.x = 1950;
    }
    if (badguy.position.x <= 0) {
      badguy.position.x = 2900;
    }
    if (car.overlap(dogrun)) {
      // car.position.x = 1900;
      // smoke.position.x = 2200;
      dogBlink();
      sounds.dog_car.play();
      if(!carOverLapFlag) {
        dogObj.life -= 20;
        carOverLapFlag = true
      }
    } else {
      carOverLapFlag = false
    }
    if (badguy.overlap(dogrun)) {
      // badguy.position.x = 2900;
      dogBlink();
      sounds.dog_badguy.play();
      if(!badguyOverLapFlag) {
        dogObj.life -= 20;
        badguyOverLapFlag = true
      }
    } else {
      badguyOverLapFlag = false
    }
    if (q1.x <= 0) {
      block[i].position.x = 1000;
    }
    if (q2.x <= 0) {
      block[i].position.x = 1000;
    }
    if (q3.x <= 0) {
      block[i].position.x = 1000;
    }

    for (let i = 0; i < block.length; i++) {
      if (block[i].position.x <= 0) {
        block[i].position.x = 1500;
      }
      dogrun.collide(block[i]);
    }
    //eatChicken();
    for (let i = 0; i < chicken.length; i++) {
      //alert(i);
      if (chicken[i].position.x <= 0) {
        chicken[i].position.x = 1500;
      }

      if (dogrun.overlap(chicken[i])) {

        block[i].position.x = 1500;
        chicken[i].position.x = 1500;

        console.log(chicken.length);
        dogObj.eatChickenMethod = 1;
        dogObj.life += 20;
        keepFinalck++;
      }
    }

    document.getElementById("life").style.width = `${dogObj.life}%`;
    if (dogObj.life <= 0) {
      gameOver = true;
    }

    if (dogObj.life >= 100) {
      dogObj.life = 100;
    }
    drawSprites();
  }
  if (gameOver) {
    // background(bg);
    document.getElementById('life').style.width='0%';
    fill("white");
    textAlign(CENTER);
    textSize(70);
    text("- Game over -", 650, 110);
    text("總共吃到"+ keepFinalck+ "隻雞腿", 650, 300);
    if(keepFinalck>20){
      textSize(60);
      text("找到新主人!", 650, 200);

    }
    else if(keepFinalck>10){
      textSize(60);
      text("到達收容所!", 650, 200);

    }
    else{
      textSize(60);
      text("脫離危險!", 650, 200);

    }
    if (!blink) {
      blinkText = text("按R重新開始", 650, 400);
    } else {
      blinkText = "";
    }


    dogObj = {
      // life: 100,
      // ck: 0,
      // set eatChickenMethod(num) {
      //   this.ck += num;
      // },
      // set changeLife(num) {
      //   this.life += num;
      // },
    };

    clearInterval(interval);
  }
  if (keyWentDown("r") && gameOver) {
    clear();
    gameOver = false;
    gameStarted = false;
  }

  $(document).ready(function () {
    if (dogrun.overlap(q1)) {
      $("#ui-1").modal("show");
      sounds.question.play();
    }
  });

  document.getElementById("1-1").onclick = function () {
    console.log("1-1 bad");
    $("#ui-1").modal("hide");
    sounds.error.play();
    dogObj.life -=  20;
  };
  document.getElementById("1-2").onclick = function () {
    console.log("1-1 bad");
    $("#ui-1").modal("hide");
    sounds.error.play();
    dogObj.life -=  20;
  };
  document.getElementById("1-3").onclick = function () {
    console.log("1-3 good");
    $("#ui-1").modal("hide");
    dogObj.life +=  60;
    sounds.correct.play();
  };

  //UI-2
  $(document).ready(function () {
    if (dogrun.overlap(q2)) {
      $("#ui-2").modal("show");
      sounds.question.play();

    }
  });
  document.getElementById("2-1").onclick = function () {
    console.log("2-1 bad");
    sounds.error.play();
    $("#ui-2").modal("hide");
    dogObj.life -=  20;
  };
  document.getElementById("2-2").onclick = function () {
    console.log("2-2 bad");
    $("#ui-2").modal("hide");
    sounds.error.play();
    dogObj.life -=  20;
  };
  document.getElementById("2-3").onclick = function () {
    console.log("2-3 good");

    $("#ui-2").modal("hide");
    dogObj.life +=  60;
    sounds.correct.play();
  };

  //UI-3
  $(document).ready(function () {
    if (dogrun.overlap(q3)) {
      $("#ui-3").modal("show");
      sounds.question.play();
    }
  });
  document.getElementById("3-1").onclick = function () {
    console.log("3-1 good");
    $("#ui-3").modal("hide");
    dogObj.life +=  60;
    sounds.correct.play();
  };
  document.getElementById("3-2").onclick = function () {
    console.log("3-2 bad");
    sounds.error.play();
    $("#ui-3").modal("hide");
    dogObj.life -=  20;
  };
  document.getElementById("3-3").onclick = function () {
    console.log("3-3 bad");
    sounds.error.play();
    $("#ui-3").modal("hide");
    dogObj.life -=  20;
  };

}
function keyPressed() {
  dogrun.setVelocity(0, -5);
  sounds.hop.play();
}
function keyReleased() {
  dogrun.setVelocity(0, 5);
  return false; // prevent any default behavior
}
function dogBlink(){
  if(dogrun.visible === true){
    dogrun.visible = false;
  }else{
    dogrun.visible = true;
  }
}


setInterval(() => {
  blink = !blink;
}, 500);
