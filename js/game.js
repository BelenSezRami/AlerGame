const alerGame = {
    appName: 'AlerGame',
    authors: 'Belen Sanchez y Gustavo Gesto',
    version: '0.0.1',
    license: undefined,
    description: 'Pobre alergico lucha contra agentes alergenicos, en busca del farmaco, por el destino de su vida',
    ctx: undefined,
    FPS: 60,
    player: undefined,
    background: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    platforms: [],
    enemies: [],
    bullets: [],
    frameIndex: 0,
    isJumping: false,
    
    init() {
        this.setContext()
        this.setDimensions()
        this.start()
        this.createBackground()
        this.createPlatforms()
        this.createEnemies()
        this.createPlayer()
    },
    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },
    setDimensions() {
        this.canvasSize = {
            w: innerWidth,
            h: innerHeight
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },
    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.frameIndex++
            this.collision()
 
        }, 1000 / this.FPS)
    },
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawBackground() {
        this.background.draw()
    },
    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize, 100, (this.canvasSize.h / 1.05) - 100, 70, 100, 5, 5, this.isJumping)    
    },
    drawPlayer() {
        this.player.draw()
    },
    createPlatforms() {
        this.platforms.push(
        // Ground Floor
           new Platform(this.ctx, this.canvasSize, 0, this.canvasSize.h / 1.05, this.canvasSize.w, this.canvasSize.h / 11),
        // First Floor
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 4, this.canvasSize.h / 1.47, this.canvasSize.w / 2, this.canvasSize.h / 11),
        // Second Floor Left
           new Platform(this.ctx, this.canvasSize, 0, this.canvasSize.h / 2.1, this.canvasSize.w / 7, this.canvasSize.h / 11),
        // Island in the Middle
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 2.7, this.canvasSize.h / 2.8, this.canvasSize.w / 7, this.canvasSize.h / 11),
        // Second Floor Right
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 1.5, this.canvasSize.h / 4, this.canvasSize.w / 3, this.canvasSize.h / 11),
        // Third Floor Left
           new Platform(this.ctx, this.canvasSize, 0, this.canvasSize.h / 8, this.canvasSize.w - 1200, this.canvasSize.h / 11),
        )
    },
    drawPlatforms() {
        this.platforms.forEach((eachPlatform) => {
            eachPlatform.draw()
        })
    },
    createEnemies() {
        this.enemies.push(
            new Enemie(this.ctx, this.canvasSize, this.canvasSize.w / 3.8, this.canvasSize.h / 1.7, 60, 60),
            new Enemie(this.ctx, this.canvasSize, this.canvasSize.w / 1.1, this.canvasSize.h / 6, 60, 60),
        )
    },
    drawEnemies() {
        this.enemies.forEach((eachEnemie) => {
            eachEnemie.draw()
        })
    },
    createBullets() {
        this.bullets.push(
            new Bullets(this.ctx, this.canvasSize.w / 4.8, this.canvasSize.h / 1.7, this.canvasSize.w / 15, this.canvasSize.h / 11, 10),
            new Bullets(this.ctx, this.canvasSize.w / 1.17, this.canvasSize.h / 6, this.canvasSize.w / 15, this.canvasSize.h / 11, (-10)),
        )
    },
    drawBullets() {
        this.bullets.forEach(eachBullet => {
            eachBullet.draw()
        })
        if (this.frameIndex % 100 === 0) {
            this.createBullets()
        }
    },
    clearBullets() {
        this.bullets.filter((eachBullet) => {
            return eachBullet.bulletSpecs.pos.x < this.canvasSize.w
        })
        this.bullets.filter((eachBullet) => {
            return eachBullet.bulletSpecs.pos.x > 0
        })
    },
    drawAll() {
        this.drawBackground()
        this.drawPlatforms()
        this.drawEnemies()
        this.drawBullets()
        this.drawPlayer()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    collision() {
    //   //PLATFORM COLLISION

      if (this.player.playerSpecs.vel.y !== 0 ) {
        this.isJumping = true;
        this.platforms.forEach((eachPlatform) => {
          console.log(this.player.playerSpecs.pos.y, this.isJumping);
          if (this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h <= eachPlatform.platformSpecs.pos.y && this.player.isJumping ) {
            console.log("dentro");
            this.player.playerSpecs.pos.y = eachPlatform.platformSpecs.pos.y - this.player.playerSpecs.size.h;
            console.log(this.player.playerSpecs.pos.y);
            this.player.gravity = 0;
            this.player.isJumping = false;
          }
          // console.log("123123123123123", eachPlatform.platformSpecs.pos.y);
        });
      }
    // for (let i = 0; i < this.platforms.length; i++) {
    //         const plat = this.platforms[i]
    //         if (this.player.playerSpecs.pos.x < platformSpecs.pos.x + plat.platformSpecs.size.w &&
    //             this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > plat.platformSpecs.pos.x &&
    //             this.player.playerSpecs.pos.y < platformSpecs.pos.y + plat.platformSpecs.size.h &&
    //             this.player.playerSpecs.size.h + this.player.playerSpecs.pos.y > plat.platformSpecs.pos.y) {
                
    //             this.player.playerSpecs.vel.y = 0
    //             this.player.playerSpecs.pos.y = plat.platformSpecs.pos.y - this.player.playerSpecs.size.h
    //         }
    //     }
        

      //BULLET COLLISION


      // COIN COLLISION

      
    }
}    
