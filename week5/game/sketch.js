function preload() {
  sound = loadSound("../assets/11. An Angel Held Me Like a Child.mp3");
}
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  amplitude = new p5.Amplitude();
}
let oldAmp = 0;
let newAmp;
let planetArray = [];
function draw() {
  background(220);
  let level = amplitude.getLevel();
  newAmp = level * 1000;
  if (abs(newAmp - oldAmp) > 150) {
    let planet = new Planet();
    planetArray.push(planet);
    print("spawn");
  }
  textSize(20);
  text(level, 100, 100);
  let size = map(level, 0, 1, 0, width / 2);
  text(size, 200, 200);
  text(newAmp - oldAmp, 400, 200);
  oldAmp = newAmp;
  for (let i = 0; i < planetArray.length; i++) {
    planetArray[i].draw();
    planetArray[i].move();
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
    this.r = random(100, 180);
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
