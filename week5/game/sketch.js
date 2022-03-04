let character;
let oldAmp = 0;
let newAmp;
let planetArray = [];
function preload() {
  sound = loadSound("../assets/07. Pocky Boy.mp3");
}
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0.8, 256);
  frameRate(60);
  character = new Character();
  rectMode(RADIUS);
  ellipseMode(RADIUS);
  sound.amp(0.2);
}
let oldSum = 0;
let newSum = 0;
let oldFc = -60;
function draw() {
  newSum = 0;
  background(220);
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
    } else {
      if (
        abs(character.x - planetArray[i].x) <=
          planetArray[i].r + character.rX &&
        abs(character.y - planetArray[i].y) <= planetArray[i].r + character.rY
      ) {
        console.log("collision");
      }
    }
  }
  // ellipse(width / 2, height / 2, size, size);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
  }
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
  }
  draw() {
    circle(this.x, this.y, this.r);
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
