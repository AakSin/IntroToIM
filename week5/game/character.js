class Character {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.rX = 100;
    this.rY = 35;
  }
  draw() {
    rect(this.x, this.y, this.rX, this.rY);
  }
  move() {
    if (0 < this.x - this.rX && this.x - this.rX < width) {
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= 5;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.x += 5;
      }
    } else {
      this.x = this.rX + 1;
    }

    if (0 < this.y - this.rY && this.y - this.rY < height) {
      if (keyIsDown(UP_ARROW)) {
        this.y -= 5;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.y += 5;
      }
    } else {
      this.y = this.rY + 1;
    }
  }
}
