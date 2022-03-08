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
  character = new Character();
  rectMode(RADIUS);
  ellipseMode(RADIUS);
  sound.amp(0.2);
  numDivs = 1500;
  radius = 10;

  sizes = [];
  speed = [];
  radi = [];
  for (a = 0; a < TAU; a += TAU / numDivs) {
    sizes.push(random(0.1, 1.1));
    speed.push(random(2, 5));
    radi.push(random());
  }

  FPS = 60;
  frameRate(FPS);

  healthBarFull = character.health;
}
let oldSum = 0;
let newSum = 0;
let oldFc = -60;
let gameScene = 0;
function draw() {
  background(0, 40);
  push();
  translate(width / 2, height / 2);

  t = frameCount / FPS / 3;

  for (n = 0; n < numDivs; n++) {
    a = (TAU / numDivs) * n + t / speed[n];

    r = radius + radi[n] * 1000;
    x = r * sin(a);
    y = r * cos(a) + (r * sin(a)) / 500;

    d = dist(0, 0, x, y);

    strokeWeight(sin(d / 20 + t + a) * 2 + 2 + sizes[n]);
    stroke(
      127.5 + 127.5 * sin(x / 2 + y / 2),
      127.5 + 127.5 * cos(x / 2 + y / 2),
      127.5
    );

    x = r * sin(d / 10 + a);
    y = r * cos(d / 10 + a) + (r * sin(a)) / 500;

    point(x, y);
  }
  pop();
  fill("white");
  switch (gameScene) {
    case 0:
      fill(0, 102, 153);
      text("click to start", 100, 100);
      cnv.mouseClicked(togglePlay);
      break;
    case 1:
      newSum = 0;
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
            planet.setup();
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
            planet.setup();
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
            abs(character.x - planetArray[i].x - planetArray[i].r) <=
              planetArray[i].r + character.rX &&
            abs(character.y - planetArray[i].y - planetArray[i].r) <=
              planetArray[i].r + character.rY
          ) {
            character.health -= 0.5;
          }
        }
      }
      character.draw();
      character.move();
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
    sound.play();
    // sound.jump(70);
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
  }
  gameScene = 1;
}
