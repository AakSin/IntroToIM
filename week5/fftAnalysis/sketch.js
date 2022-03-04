function preload() {
  sound = loadSound("../assets/07. Pocky Boy.mp3");
}
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0.8, 256);
  sound.amp(0.2);
  frameRate(60);
}
let oldSum = 0;
let newSum = 0;
let oldFc = -60;
function draw() {
  newSum = 0;
  background(220);
  if (sound.isPlaying()) {
    let spectrum = fft.analyze();
    noStroke();
    fill(255, 0, 255);
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      textWrap(WORD);
      textSize(10);
      text(floor(spectrum[i]), 100 + i * 20, 20);
      rect(x, height, width / spectrum.length, h);
    }
    if (
      sound.currentTime() < 73 ||
      (sound.currentTime() >= 103 && sound.currentTime() < 133)
    ) {
      sound.jump(75);
      for (let i = 60; i < 100; i++) {
        newSum += spectrum[i];
      }
      if (newSum - oldSum > 400 && frameCount - oldFc > 120) {
        console.log("spawn");
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
      if (newSum - oldSum > 25 && frameCount - oldFc > 60) {
        console.log("spawn");
        oldFc = frameCount;
      }
    }

    oldSum = newSum;
  }
  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    text(
      (Math.round(waveform[i] * 100) / 100).toFixed(2) + ",",
      10 + i * 22,
      40
    );
    vertex(x, y);
  }
  endShape();
  text("tap to play", 20, 20);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
