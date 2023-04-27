class Door {

    constructor(ctx, canvasSize, doorPosX, doorPosY, doorW, doorH) {
        this.ctx = ctx
        this.doorSpecs = {
            pos: { x: doorPosX, y: doorPosY },
            size: { w: doorW, h: doorH },
        }
        this.canvasSize = canvasSize
        this.doorImage = undefined
        this.init()
    }
    init() {
        this.doorImage = new Image()
        this.doorImage.src = "./img/puertaAbierta-removebg-preview.png"
    }
    draw() {
        this.ctx.drawImage(
            this.doorImage,
            this.doorSpecs.pos.x,
            this.doorSpecs.pos.y,
            this.doorSpecs.size.w,
            this.doorSpecs.size.h
        )
    }
}