function preload() {
  sound = loadSound("../assets/11. An Angel Held Me Like a Child.mp3");
}
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  amplitude = new p5.Amplitude();
}

function draw() {
  background(220);
  let level = amplitude.getLevel();
  textSize(20);
  text(level, 100, 100);
  let size = map(level, 0, 1, 0, width / 2);
  text(size, 200, 200);
  ellipse(width / 2, height / 2, size, size);
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
