class Enemie {

    constructor(ctx, canvasSize, enemiePosX, enemiePosY, enemieW, enemieH) {
        this.ctx = ctx
        this.playerSpecs = {
            pos: { x: enemiePosX, y: enemiePosY },
            size: { w: enemieW, h: enemieH },
        }
        this.canvasSize = canvasSize
        this.playerImage = undefined
        this.init()
    }
    init() {
        this.playerImage = new Image()
        this.playerImage.src = "./img/wachosky.png"
    }
    draw() {
        this.ctx.drawImage(
            this.playerImage,
            this.playerSpecs.pos.x,
            this.playerSpecs.pos.y,
            this.playerSpecs.size.w,
            this.playerSpecs.size.h
        )
    }
}