class Planet {
  constructor() {
    this.x = width - 50;
    this.originalY = random(0, height);
    this.y = this.originalY;
    this.r = random(50, 90);
    this.vel = -5;
    this.acc = -0.03;
    this.yOrientation = 1;
    this.type = floor(random(1, 4));
    this.baseLayer = createGraphics(this.r * 2, this.r * 2);
    this.circleMask = createGraphics(this.r * 2, this.r * 2);
    // 10 print set up
    this.tenPbackground = color(random(0, 255), random(0, 255), random(0, 255));
    this.tenPsize = random(10, 15);
    // smoke planet set up
    this.smokeSize = random(4, 8);
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    // glitch planet set up
  }
  setup() {
    this.circleMask.fill("rgba(0, 0, 0, 1)");
    this.circleMask.circle(this.r, this.r, this.r * 2);
  }
  draw() {
    if (this.type == 1) {
      this.baseLayer.background(this.tenPbackground);
      this.baseLayer.stroke("white");
      this.baseLayer.strokeWeight(1.5);
      for (let i = 0; i < this.baseLayer.width; i += this.tenPsize) {
        for (let j = 0; j < this.baseLayer.height; j += this.tenPsize) {
          //   this.baseLayer.stroke(random(0, 255), random(0, 255), random(0, 255));

          let rand = floor(random(0, 2));
          if (rand == 0) {
            this.baseLayer.line(i, j, i + this.tenPsize, j + this.tenPsize);
          } else {
            this.baseLayer.line(i, j + this.tenPsize, i + this.tenPsize, j);
          }
        }
      }
      this.baseLayer.noStroke();
      for (let i = 0; i < this.baseLayer.width; i += this.smokeSize) {
        for (let j = 0; j < this.baseLayer.height; j += this.smokeSize) {
          this.baseLayer.fill(
            noise((i + frameCount) / 100, (j + frameCount) / 100) * 100,
            200
          );
          this.baseLayer.rect(i, j, this.smokeSize);
        }
      }
    } else if (this.type == 2) {
      this.baseLayer.noStroke();
      for (let i = 0; i < this.baseLayer.width; i += this.smokeSize) {
        for (let j = 0; j < this.baseLayer.height; j += this.smokeSize) {
          this.baseLayer.fill(
            noise((i + frameCount) / 100, (j + frameCount) / 100) * this.red,
            noise((i + frameCount) / 100, (j + frameCount) / 100) * this.green,
            noise((i + frameCount) / 100, (j + frameCount) / 100) * this.blue,
            50
          );
          this.baseLayer.rect(i, j, this.smokeSize);
        }
      }
    } else if (this.type == 3) {
      this.baseLayer.noStroke();
      for (let i = 0; i < this.baseLayer.width; i += this.smokeSize) {
        for (let j = 0; j < this.baseLayer.height; j += this.smokeSize) {
          this.baseLayer.fill(
            noise((i + frameCount) / 100, (j + frameCount) / 100) *
              random(0, 255),
            noise((i + frameCount) / 100, (j + frameCount) / 100) *
              random(0, 255),
            noise((i + frameCount) / 100, (j + frameCount) / 100) *
              random(0, 255)
          );
          this.baseLayer.rect(i, j, this.smokeSize);
        }
      }
    }
    let img = createImage(this.baseLayer.width, this.baseLayer.height);
    img.copy(
      this.baseLayer,
      0,
      0,
      this.baseLayer.width,
      this.baseLayer.height,
      0,
      0,
      this.baseLayer.width,
      this.baseLayer.height
    );
    img.mask(this.circleMask);
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
    if (abs(this.y - this.originalY) > 75) {
      this.yOrientation *= -1;
    }
    this.y += this.yOrientation * noise(frameCount) * 3;
  }
}
