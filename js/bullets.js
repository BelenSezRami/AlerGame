class Bullets {

  constructor(ctx, enemiePosX, enemiePosY, enemieW, enemieH, bulletSpeedX) {

    this.ctx = ctx;

    this.enemieSpecs = {
      pos: { x: enemiePosX, y: enemiePosY },
      size: { w: enemieW, h: enemieH },
    }

    this.bulletSpecs = {
      pos: { x: enemiePosX + enemieW, y: enemiePosY + enemieH / 2 },
      speed: bulletSpeedX
    }
  }
  draw() {
    this.move()
    
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.bulletSpecs.pos.x, this.bulletSpecs.pos.y, 10, 10)
  }
  move() {
    this.bulletSpecs.pos.x += this.bulletSpecs.speed
  }

}