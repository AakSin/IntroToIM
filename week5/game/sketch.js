let character;
let oldAmp = 0;
let newAmp;
let planetArray = [];
function preload() {
  sound = loadSound("../assets/07. Pocky Boy.mp3");
  bg = loadImage("../assets/bg.png");
}
let healthBarFull;
let cnv;
function setup() {
  noStroke();
  cnv = createCanvas(windowWidth, windowHeight);

  fft = new p5.FFT(0.8, 256);
  frameRate(60);
  character = new Character();
  rectMode(RADIUS);
  ellipseMode(RADIUS);
  sound.amp(0.2);
  healthBarFull = character.health;
}
let oldSum = 0;
let newSum = 0;
let oldFc = -60;
let gameScene = 0;
function draw() {
  background(bg);
  fill("white");
  switch (gameScene) {
    case 0:
      fill(0, 102, 153);
      text("click to start", 100, 100);
      cnv.mouseClicked(togglePlay);
      break;
    case 1:
      newSum = 0;

      character.draw();
      character.move();

      if (sound.isPlaying()) {
        let spectrum = fft.analyze();
        if (
          sound.currentTime() < 73 ||
          (sound.currentTime() >= 103 && sound.currentTime() < 133)
        ) {
          for (let i = 60; i < 100; i++) {
            newSum += spectrum[i];
          }
          if (newSum - oldSum > 400 && frameCount - oldFc > 30) {
            let planet = new Planet();
            planetArray.push(planet);
            print("spawn");
            oldFc = frameCount;
          }
        } else if (
          (sound.currentTime() >= 73 && sound.currentTime() < 103) ||
          sound.currentTime() >= 132
        ) {
          for (let i = 0; i < 10; i++) {
            newSum += spectrum[i];
          }
          // console.log(newSum - oldSum);
          if (newSum - oldSum > 25 && frameCount - oldFc > 30) {
            let planet = new Planet();
            planetArray.push(planet);
            print("spawn");
            oldFc = frameCount;
          }
        }

        oldSum = newSum;
      }

      for (let i = planetArray.length - 1; i >= 0; i--) {
        planetArray[i].draw();
        planetArray[i].move();
        if (planetArray[i].x < -100) {
          planetArray.splice(i, 1);
          console.log("gone");
        } else {
          if (
            abs(character.x - planetArray[i].x) <=
              planetArray[i].r + character.rX &&
            abs(character.y - planetArray[i].y) <=
              planetArray[i].r + character.rY
          ) {
            character.health -= 0.5;
          }
        }
      }

      let healthBarRed = character.health;
      fill("black");
      rect(width - healthBarFull - 50, 40, healthBarFull, 10);
      fill("red");
      rect(
        width - healthBarFull - 50 - (healthBarFull - healthBarRed),
        40,
        healthBarRed,
        10
      );
      if (healthBarRed == 0) {
        alert("Stop");
      }
  }
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
  }
  gameScene = 1;
}

class Planet {
  constructor() {
    this.x = width - 20;
    this.originalY = random(0, height);
    this.y = this.originalY;
    this.r = random(50, 90);
    this.vel = -0.1;
    this.acc = -0.01;
    this.yOrientation = 1;
    this.type = 1;
  }
  draw() {
    let baseLayer = createGraphics(this.r * 2, this.r * 2);
    let circleMask = createGraphics(this.r * 2, this.r * 2);
    circleMask.fill("rgba(0, 0, 0, 1)");
    circleMask.circle(this.r, this.r, this.r * 2);
    if (this.type == 1) {
      baseLayer.background("white");
      let size = 20;
      for (let i = 0; i < baseLayer.width; i += size) {
        for (let j = 0; j < baseLayer.height; j += size) {
          let rand = floor(random(0, 2));
          if (rand == 0) {
            baseLayer.line(i, j, i + size, j + size);
          } else {
            baseLayer.line(i, j + size, i + size, j);
          }
        }
      }
    }
    let img = createImage(baseLayer.width, baseLayer.height);
    img.copy(
      baseLayer,
      0,
      0,
      baseLayer.width,
      baseLayer.height,
      0,
      0,
      baseLayer.width,
      baseLayer.height
    );
    img.mask(circleMask);
    image(img, this.x, this.y);
  }
  move() {
    this.x += this.vel;
    this.vel += this.acc;
    // let orientation = floor(random(0, 2));
    // if (orientation == 0) {
    //   this.x += noise(frameCount);
    // } else {
    //   this.x -= noise(frameCount);
    // }
    if (abs(this.y - this.originalY) > 50) {
      this.yOrientation *= -1;
    }
    this.y += this.yOrientation * noise(frameCount);
  }
}
