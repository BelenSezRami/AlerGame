class Player {

    constructor(ctx, canvasSize, playerPosX, playerPosY, playerW, playerH, playerVelX, playerVelY) {
        this.ctx = ctx
        this.playerSpecs = {
            pos: { x: playerPosX, y: playerPosY },
            size: { w: playerW, h: playerH },
            vel: { x: playerVelX, y: playerVelY }
        }
        this.canvasSize = canvasSize
        this.gravity = 0.5
        this.playerImage = undefined
        this.playerImage2 = undefined
        this.playerImage3 = undefined
        this.isMovingLeft = false
        this.isMovingRight = false
        this.isMovingUp = false
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
        this.playerImage.src = "./img/adventurer_talk.png"
        this.playerImage2 = new Image()
        this.playerImage2.src = "./img/adventurer_walk.png"
        this.playerImage3 = new Image()
        this.playerImage3.src = "./img/adventurer_jump.png"
        //sprite
        this.playerImage.frames = 3
        this.playerImage.framesIndex = 0

        this.setEventListeners()
    }
    draw(frameIndex) {
        if(this.isMoving && this.isMovingRight){
            this.ctx.drawImage(
            this.playerImage,
            this.playerImage.width / this.playerImage.frames * this.playerImage.framesIndex,
            0,
            this.playerImage.width / this.playerImage.frames,
            this.playerImage.height,        
            this.playerSpecs.pos.x,
            this.playerSpecs.pos.y,
            this.playerSpecs.size.w,
            this.playerSpecs.size.h,
            )
            this.animate(frameIndex)

        }
        if(this.isMoving && this.isMovingLeft){
            this.ctx.drawImage(
            this.playerImage2,
            this.playerImage2.width / this.playerImage.frames * this.playerImage.framesIndex,
            0,
            this.playerImage2.width / this.playerImage.frames,
            this.playerImage2.height,        
            this.playerSpecs.pos.x,
            this.playerSpecs.pos.y,
            this.playerSpecs.size.w,
            this.playerSpecs.size.h,
            )
            this.animate(frameIndex)

        }
        if(this.isMoving && this.isMovingUp){
            this.ctx.drawImage(
            this.playerImage3,
            this.playerImage3.width / this.playerImage.frames * this.playerImage.framesIndex,
            0,
            this.playerImage3.width / this.playerImage.frames,
            this.playerImage3.height,        
            this.playerSpecs.pos.x,
            this.playerSpecs.pos.y,
            this.playerSpecs.size.w,
            this.playerSpecs.size.h,
            )
            this.animate(frameIndex)
        }
        if(!this.isMoving){
            this.ctx.drawImage(
                this.playerImage,
                this.playerImage.width / this.playerImage.frames * this.playerImage.framesIndex,
                0,
                this.playerImage.width / this.playerImage.frames,
                this.playerImage.height,        
                this.playerSpecs.pos.x,
                this.playerSpecs.pos.y,
                this.playerSpecs.size.w,
                this.playerSpecs.size.h,
            )
        }
        
        // if (this.isMoving && this.isMovingRight)this.animateRight(frameIndex)
        // if (this.isMoving && this.isMovingLeft)this.animateLeft(frameIndex)
        // //     

        this.move()
    }
    animate(frameIndex){
        if(frameIndex % 3 === 0){
            this.playerImage.framesIndex++
        }
        if(this.playerImage.framesIndex >= this.playerImage.frames){
            this.playerImage.framesIndex = 0
        }
        
        
    }
    // animateLeft(frameIndex){
    //     if(frameIndex % 3 === 0){
    //         this.playerImage.framesIndex++
    //     }
    //     if(this.playerImage.framesIndex >= this.playerImage.frames){
    //         this.playerImage.framesIndex=0
    //     }
        
        
    // }
    // animateUp(frameIndex){
    //     if(frameIndex % 3 === 0){
    //         this.playerImage.framesIndex++
    //     }
    //     if(this.playerImage.framesIndex >= this.playerImage.frames){
    //         this.playerImage.framesIndex=0
    //     }
        
        
    // }
    setEventListeners() {
        addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowRight': 
                this.key.ArrowRight.pressed = true
                this.isMoving = true
                this.isMovingRight = true
                break

                case 'ArrowLeft': 
                this.key.ArrowLeft.pressed = true
                this.isMoving = true
                this.isMovingLeft = true
                break

                case 'ArrowUp':
                this.key.ArrowUp.pressed = true
                this.isMoving = true
                this.isMovingUp = true
                this.jump()
                this.sneeze()
                break
            } 
        })
        addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowRight': this.key.ArrowRight.pressed = false
                this.isMoving = false
                this.isMovingRight = false
                break

                case 'ArrowLeft': this.key.ArrowLeft.pressed = false
                this.isMoving = false
                this.isMovingLeft = false
                break

                case 'ArrowUp' : this.key.ArrowUp.pressed = false
                this.isMoving = false
                this.isMovingUp = false

            }
        })
        
    }
    move() {
        
        this.playerSpecs.pos.y += this.playerSpecs.vel.y
        this.playerSpecs.vel.y += this.gravity

        if(this.key.ArrowRight.pressed === true) {

            this.playerSpecs.pos.x += this.playerSpecs.vel.x;

            
            if(this.playerSpecs.pos.x + this.playerSpecs.size.w > this.canvasSize.w){
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
        
        //Esto comprueba que si el jugador esta por debajo del canvas y lo coloca en el suelo (pero no de las plataformas)
        if(this.playerSpecs.pos.y + this.playerSpecs.size.h > this.canvasSize.h){
            this.playerSpecs.pos.y = this.canvasSize.h - this.playerSpecs.size.h
            this.playerSpecs.vel.y = 0
        }

    }
    jump() {
        this.playerSpecs.vel.y = -10
        
        if(this.playerSpecs.pos.y <= 0 ){
            this.playerSpecs.vel.y *= -1;
        }else{
            this.playerSpecs.vel.y= -10
        }

        ////////////////////////////////////////////////
        // ESTO HACE QUE SOLO PUEDA SALTAR 3 VECES :) //
        ////////////////////////////////////////////////
    }
    sneeze() {
        this.sneezeSound = new Audio()
        this.sneezeSound.src = "./audio/Male Sneeze.mp3"
        this.sneezeSound.volume = 1
        this.sneezeSound.play()
    }
}