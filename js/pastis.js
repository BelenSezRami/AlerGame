class Pills {

    constructor(ctx, canvasSize, pillPosX, pillPosY, pillW, pillH) {
        this.ctx = ctx
        this.pillSpecs = {
            pos: { x: pillPosX, y: pillPosY },
            size: { w: pillW, h: pillH },
        }
        this.canvasSize = canvasSize
        this.pillImage = undefined
        this.init()
    }
    init() {
        this.pillImage = new Image()
        this.pillImage.src = "./img/pasti.png"
    }
    draw() {
        this.ctx.drawImage(
            this.pillImage,
            this.pillSpecs.pos.x,
            this.pillSpecs.pos.y,
            this.pillSpecs.size.w,
            this.pillSpecs.size.h
        )
    }
}