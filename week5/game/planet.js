class Planet {
  constructor() {
    this.x = width - 50;
    this.originalY = random(50, height - 50);
    this.y = this.originalY;
    this.r = random(70, 120);
    this.vel = random(-5, -10);
    this.acc = random(-0.05, -0.1);
    this.travelDist = random(50, 100);
    this.yOrientation = 1;
    this.type = floor(random(1, 10));
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
    // sprite planet set up
    this.sprites = [];
  }
  setup() {
    // non sprite planets
    if (this.type < 4) {
      this.circleMask.fill("rgba(0, 0, 0, 1)");
      this.circleMask.circle(this.r, this.r, this.r * 2);
    }
    // my hand drawn planet with 15 frames
    else if (this.type == 4) {
      let sprite = asteroid;
      let spriteXNo = 5;
      let spriteYNo = 3;
      let w = sprite.width / spriteXNo;
      let h = sprite.height / spriteYNo;
      for (let i = 0; i < spriteYNo; i++) {
        for (let j = 0; j < spriteXNo; j++) {
          let spriteSmall = sprite.get(j * w, i * h, w, h);
          this.sprites.push(spriteSmall);
        }
      }
    }
    // assets from the internet with 60 frames
    else {
      let sprite;
      if (this.type == 5) {
        sprite = earth;
      } else if (this.type == 6) {
        sprite = mars;
      } else if (this.type == 7) {
        sprite = galaxy;
      } else if (this.type == 8) {
        sprite = star;
      } else if (this.type == 9) {
        sprite = ice;
      }
      let spriteXNo = 10;
      let spriteYNo = 6;
      let w = sprite.width / spriteXNo;
      let h = sprite.height / spriteYNo;
      for (let i = 0; i < spriteYNo; i++) {
        for (let j = 0; j < spriteXNo; j++) {
          let spriteSmall = sprite.get(j * w, i * h, w, h);
          this.sprites.push(spriteSmall);
        }
      }
    }
  }
  draw() {
    if (this.type < 4) {
      // 10print planet
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
        // this part of the code is necessary to generate the smoke that will make it look as if the planet is rotating
        for (let i = 0; i < this.baseLayer.width; i += this.smokeSize) {
          for (let j = 0; j < this.baseLayer.height; j += this.smokeSize) {
            this.baseLayer.fill(
              noise((i + frameCount) / 100, (j + frameCount) / 100) * 100,
              200
            );
            this.baseLayer.rect(i, j, this.smokeSize);
          }
        }
      }
      // smoke planet
      else if (this.type == 2) {
        this.baseLayer.noStroke();
        for (let i = 0; i < this.baseLayer.width; i += this.smokeSize) {
          for (let j = 0; j < this.baseLayer.height; j += this.smokeSize) {
            this.baseLayer.fill(
              noise((i + frameCount) / 100, (j + frameCount) / 100) * this.red,
              noise((i + frameCount) / 100, (j + frameCount) / 100) *
                this.green,
              noise((i + frameCount) / 100, (j + frameCount) / 100) * this.blue,
              50
            );
            this.baseLayer.rect(i, j, this.smokeSize);
          }
        }
      }
      // glitch planet
      else if (this.type == 3) {
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
      // copying graphic to image, because masks only work on images
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
    } else {
      push();
      // tinting the sprite planets with a random color each time
      tint(this.tenPbackground);
      image(
        this.sprites[frameCount % this.sprites.length],
        this.x,
        this.y,
        this.r * 2,
        this.r * 2
      );
      pop();
    }
  }
  move() {
    this.x += this.vel;
    this.vel += this.acc;
    // flip if it exceeds travel distance
    if (abs(this.y - this.originalY) > this.travelDist) {
      this.yOrientation *= -1;
    }
    // gentle bobbing motion
    this.y += this.yOrientation * noise(frameCount) * 3;
  }
}
