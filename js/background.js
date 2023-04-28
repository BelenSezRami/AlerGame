class Background {

    constructor(ctx, canvasSize, backgroundPosX, backgroundPosY, backgroundW, backgroundH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.backgroundSpecs = {
            pos: { x: backgroundPosX, y: backgroundPosY },
            size: { w: backgroundW, h: backgroundH }
        }
        this.backgroundImage = undefined
        this.init()

    }
    init() {
        this.backgroundImage = new Image()
        this.backgroundImage.src = "./img/forest48.png"

        this.playMusic()
    }
    draw() {
        this.ctx.drawImage(
            this.backgroundImage,
            this.backgroundSpecs.pos.x,
            this.backgroundSpecs.pos.y,
            this.backgroundSpecs.size.w,
            this.backgroundSpecs.size.h
        )
    }
    playMusic() {
        this.backgroundSound = new Audio()
        this.backgroundSound.src = "./audio/backgroundmusic.mp3"
        this.backgroundSound.volume = 0.2
        this.backgroundSound.play()
    }
}