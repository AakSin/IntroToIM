let character;
let oldAmp = 0;
let newAmp;
let planetArray = [];
let fullHealth;
let healthBarFull;
let cnv;
let bbox;
let isPaused = false;
let gameTitle = "Glitch Princess";
let menuScreen =
  "click to start \n click in game to pause \n arrow keys to move";

function preload() {
  sound = loadSound("../assets/07. Pocky Boy.mp3");

  bg = loadImage("../assets/bg.png");

  yeule = loadImage("../assets/pxArt.png");

  font = loadFont("../assets/loveglitch.ttf");

  asteroid = loadImage("../assets/asteroid.png");
  earth = loadImage("../assets/earth.png");
  mars = loadImage("../assets/mars.png");
  ice = loadImage("../assets/ice.png");
  star = loadImage("../assets/star.png");
  galaxy = loadImage("../assets/galaxy.png");
}

function setup() {
  noStroke();
  textFont(font);
  textAlign(CENTER);

  bbox = font.textBounds(gameTitle, 0, 0, 100);

  cnv = createCanvas(windowWidth, windowHeight);

  fft = new p5.FFT(0.8, 256);
  character = new Character();
  sound.amp(0.2);

  // set up for background nebula
  numDivs = 1500;
  radius = 10;
  sizes = [];
  speed = [];
  radi = [];
  // TAU = PI * 2
  for (a = 0; a < TAU; a += TAU / numDivs) {
    sizes.push(random(0.1, 1.1));
    speed.push(random(2, 5));
    radi.push(random());
  }
  FPS = 60;
  frameRate(FPS);

  // setup for health bar
  fullHealth = character.health;
  healthBarFull = width - width / 2;
}

// variables going to be used in draw, here for quick access
let oldSum = 0;
let newSum = 0;
//  Fc = frame count
let oldFc = -60;
let gameScene = 0;
let spinner = 3;

function draw() {
  background(0, 40);
  push();
  translate(width / 2, height / 2);

  t = frameCount / FPS / spinner;
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

  fill("white");
  switch (gameScene) {
    case 0:
      fill("white");
      textSize(100);
      text(gameTitle, 0, 0 - bbox.h / 2);
      textSize(50);
      text(menuScreen, 0, bbox.h);
      cnv.mouseClicked(togglePlay);
      break;
    case 1:
      pop();
      newSum = 0;
      if (sound.isPlaying()) {
        let spectrum = fft.analyze();
        // synth part of song
        if (
          sound.currentTime() < 73 ||
          (sound.currentTime() >= 103 && sound.currentTime() < 133)
        ) {
          // frequencies between 60 and 100
          for (let i = 60; i < 100; i++) {
            newSum += spectrum[i];
          }
          // if their sum is more than 400 and the events happened 30 frames apart
          if (newSum - oldSum > 400 && frameCount - oldFc > 30) {
            let planet = new Planet();
            planet.setup();
            planetArray.push(planet);
            print("spawn");
            oldFc = frameCount;
          }
        }
        // drum part of song
        else if (
          (sound.currentTime() >= 73 && sound.currentTime() < 103) ||
          sound.currentTime() >= 132
        ) {
          // frequencies between 0 and 10
          for (let i = 0; i < 10; i++) {
            newSum += spectrum[i];
          }
          // if their sum is more than 25 and the events happened 30 frames apart
          if (newSum - oldSum > 25 && frameCount - oldFc > 30) {
            let planet = new Planet();
            planet.setup();
            planetArray.push(planet);
            print("spawn");
            oldFc = frameCount;
          }
        }
        spinner = (oldSum - newSum) / 5 || 3;
        numDivs = (oldSum - newSum) * 5 || 1500;
        oldSum = newSum;
      }

      if (!isPaused) {
        for (let i = planetArray.length - 1; i >= 0; i--) {
          planetArray[i].draw();
          planetArray[i].move();
          if (planetArray[i].x < -100) {
            planetArray.splice(i, 1);
            console.log("gone");
          } else {
            // checking distance between sprite and planet
            if (
              abs(character.x - planetArray[i].x) <= character.w &&
              abs(character.y - planetArray[i].y) <= character.h
            ) {
              character.health -= 0.5;
            }
          }
        }
        character.draw();
        character.move();
      }
      stroke(255, 230, 230);
      strokeWeight(2);
      let healthBarRed = map(
        character.health,
        0,
        fullHealth,
        0,
        healthBarFull - 10
      );
      fill(26, 26, 26);
      rect(width / 2 - healthBarFull / 2, 40, healthBarFull, 20);
      noStroke();
      fill(237, 57, 57);
      rect(width / 2 - healthBarFull / 2 + 5, 40 + 5, healthBarRed, 10);

      if (healthBarRed == 0) {
        gameScene = 2;
      }
      if (sound.currentTime() > 240) {
        gameScene = 3;
      }
      break;
    case 2:
      reset();
      text("Game Over \n click to start again", 0, 0);
      break;
    case 3:
      reset();
      text("You won the game! \n click to start again", 0, 0);
      break;
  }
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
    isPaused = true;
  } else {
    sound.play();
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
    isPaused = false;
  }
  gameScene = 1;
}

function reset() {
  sound.stop();
  character.x = 200;
  character.y = 200;
  character.health = fullHealth;
  planetArray = [];
}
