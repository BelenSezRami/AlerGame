class Enemie {

    constructor(ctx, canvasSize, enemiePosX, enemiePosY, enemieW, enemieH) {
        this.ctx = ctx
        this.enemieSpecs = {
            pos: { x: enemiePosX, y: enemiePosY },
            size: { w: enemieW, h: enemieH },
        }
        this.canvasSize = canvasSize
        this.enemieImage = undefined
        this.init()
    }
    init() {
        this.enemieImage = new Image()
        this.enemieImage.src = "./img/wachosky.png"
    }
    draw() {
        this.ctx.drawImage(
            this.enemieImage,
            this.enemieSpecs.pos.x,
            this.enemieSpecs.pos.y,
            this.enemieSpecs.size.w,
            this.enemieSpecs.size.h
        )
    }
}