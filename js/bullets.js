class Bullets {

  constructor(ctx, enemiePosX, enemiePosY, enemieW, enemieH, bulletW, bulletH, bulletSpeedX) {

    this.ctx = ctx;

    this.enemieSpecs = {
      pos: { x: enemiePosX, y: enemiePosY },
      size: { w: enemieW, h: enemieH },
    }

    this.bulletSpecs = {
      pos: { x: enemiePosX + enemieW, y: enemiePosY + enemieH / 2 },
      size: { w: bulletW, h: bulletH },
      speed: bulletSpeedX
    }
  }
  draw() {
    this.move()
    
    this.ctx.fillStyle = "orange";
    this.ctx.fillRect(this.bulletSpecs.pos.x, this.bulletSpecs.pos.y, 10, 10)
  }
  move() {
    this.bulletSpecs.pos.x += this.bulletSpecs.speed
  }
}