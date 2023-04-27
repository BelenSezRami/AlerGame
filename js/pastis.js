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

        // this.pillImage.frames = 3
        // this.pillImage.framesIndex = 0
    }
    draw() {
        this.ctx.drawImage(
            this.pillImage,
            // this.pillImage.width / this.pillImage.frames * this.pillImage.framesIndex,
            // 0,
            // this.pillImage.width / this.pillImage.frames,
            // this.pillImage.height,        
            this.pillSpecs.pos.x,
            this.pillSpecs.pos.y,
            this.pillSpecs.size.w,
            this.pillSpecs.size.h
        )
        // this.animate(frameIndex)
    }
    // animate(frameIndex){
    //     if(frameIndex % 5 === 0){
    //         this.pillImage.framesIndex++
    //     }
    //     if(this.pillImage.framesIndex >= this.pillImage.frames){
    //         this.pillImage.framesIndex = 0
    //     }
        
        
    // }
}