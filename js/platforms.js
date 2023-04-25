class Platform {
    constructor(ctx, canvasSize, ptfX, ptfY, ptfW, ptfH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformSpecs = {
            pos: { x: ptfX, y: ptfY },
            size: { w: ptfW, h: ptfH }
        }
        this.platformImage = undefined
        this.init()
    }
    init() {
        this.platformImage = new Image()
        this.platformImage.src = "./img/ptf.png"
    }
    draw() {
        this.ctx.drawImage(
            this.platformImage,
            this.platformSpecs.pos.x,
            this.platformSpecs.pos.y,
            this.platformSpecs.size.w,
            this.platformSpecs.size.h
        )
    }
}