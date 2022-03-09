class Character {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.w = 247;
    this.h = 190.75;
    this.health = 10;
  }
  draw() {
    // rect(this.x, this.y, this.rX, this.rY);
    image(sprite, this.x, this.y, this.w, this.h);
  }
  move() {
    if (-this.w / 2 < this.x && this.x < width - this.w / 2) {
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= 5;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.x += 5;
      }
    } else {
      if (this.x < -this.w / 2) {
        this.x = width - this.w / 2 - 1;
      } else {
        this.x = -this.w / 2 + 1;
      }
    }

    if (-this.h / 2 < this.y && this.y < height - this.h / 2) {
      if (keyIsDown(UP_ARROW)) {
        this.y -= 5;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.y += 5;
      }
    } else {
      if (this.y < -this.h / 2) {
        this.y = height - this.h / 2 - 1;
      } else {
        this.y = -this.h / 2 + 1;
      }
    }
  }
}
