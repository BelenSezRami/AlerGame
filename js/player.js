class Player {

    constructor(ctx, canvasSize, playerPosX, playerPosY, playerW, playerH, playerVelX, playerVelY, isJumping) {
        this.ctx = ctx
        this.playerSpecs = {
            pos: { x: playerPosX, y: playerPosY },
            size: { w: playerW, h: playerH },
            vel: { x: playerVelX, y: playerVelY }
        }
        this.canvasSize = canvasSize
        this.gravity = 0.5
        this.playerImage = undefined
        this.key = {
            ArrowRight: {
                pressed: false,
            },
            ArrowLeft: {
                pressed: false,
            },
            ArrowUp: {
                pressed: false,
            },

        },
        // this.isJumping = isJumping
        this.init()

    }
    
    init() {
        this.playerImage = new Image()
        this.playerImage.src = "./img/playerboy.png"
        this.setEventListeners()
    }
    draw() {
        this.ctx.drawImage(
            this.playerImage,
            this.playerSpecs.pos.x,
            this.playerSpecs.pos.y,
            this.playerSpecs.size.w,
            this.playerSpecs.size.h,
        )
        this.move()
    }
    setEventListeners() {
        addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowRight': 
                this.key.ArrowRight.pressed = true 
                break

                case 'ArrowLeft': 
                this.key.ArrowLeft.pressed = true 
                break

                case 'ArrowUp':
                this.key.ArrowUp.pressed = true 
                this.jump()
                break
            } 
        })
        addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowRight': this.key.ArrowRight.pressed = false
                break

                case 'ArrowLeft': this.key.ArrowLeft.pressed = false
                break

                case 'ArrowUp' : this.key.ArrowUp.pressed = false
            }
        })
        
    }
    move() {
        
        this.playerSpecs.pos.y += this.playerSpecs.vel.y
        this.playerSpecs.vel.y += this.gravity

        if(this.key.ArrowRight.pressed === true) {
            this.playerSpecs.pos.x += this.playerSpecs.vel.x;

            
            if(this.playerSpecs.pos.x + this.playerSpecs.size.w > this.canvasSize.w ){
                this.playerSpecs.vel.x *= -1
            }else{
                this.playerSpecs.vel.x = 5;
            }

        }
        else if (this.key.ArrowLeft.pressed === true) {
            this.playerSpecs.pos.x -= this.playerSpecs.vel.x;


            if(this.playerSpecs.pos.x < 0){
                this.playerSpecs.vel.x *= -1
            }else{
                this.playerSpecs.vel.x = 5
            }

        }

    }
    jump() {
        // // console.log('ANTES DE SALTAR',this.isJumping, this.playerSpecs.pos.y )
        // if(this.playerSpecs.pos.y < this.canvasSize.h / 1.05 - this.playerSpecs.size.h) {
        //     this.playerSpecs.pos.y += 10
        //     this.isJumping = true
        //     // console.log("SALTANDO", this.isJumping, this.playerSpecs.pos.y);
        // }
        // // this.isJumping = false
        // // console.log("Final", this.isJumping, this.playerSpecs.pos.y);
        // if (Math.floor(this.playerSpecs.pos.y) == Math.floor(this.canvasSize.h / 1.05 - this.playerSpecs.size.h)){

        //     this.isJumping = false
        // }
        console.log('jumping')
        this.playerSpecs.vel.y = -10
    }
}