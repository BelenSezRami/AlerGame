const Game = {
    appName: 'AlerGame',
    authors: 'Belen Sanchez y Gustavo Gesto',
    version: '0.0.1',
    license: undefined,
    description: 'Pobre alergico lucha contra agentes alergenicos, en busca del farmaco, por el destino de su vida',
    ctx: undefined,
    FPS: 60,
    player: undefined,
    door: undefined,
    background: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    platforms: [],
    enemies: [],
    bullets: [],
    pills: [],
    // door: [],
    frameIndex: 0,
    isJumping: false,
    count: 0,
    pillCounter: 0,
    
    init() {
        this.setContext()
        this.setDimensions()
        this.start()
        this.createBackground()
        this.createPlatforms()
        this.createEnemies()
        this.createPills()
        this.createDoor()
        this.createPlayer()
        this.playMusic()
    },
    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },
    setDimensions() {
        this.canvasSize = {
            w: innerWidth -5,
            h: innerHeight -5 
        }
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },
    start() {
        setInterval(() => {
            this.clearAll()
            if (this.frameIndex % 100 === 0) {
                this.createBullets()
            }   
            this.clearBullets()
            this.drawAll()
            this.frameIndex++
            this.platformCollision()
            this.bulletCollision()
            this.pillCollision()
            this.enemieCollision()
            this.doorCollision()
 
        }, 1000 / this.FPS)
    },
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawBackground() {
        this.background.draw()
    },
    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize, 100, (this.canvasSize.h / 1.05) - 100, 70, 90, 5, 5, this.isJumping)    
    },
    drawPlayer() {
        this.player.draw(this.frameIndex)
    },
    createPlatforms() {
        this.platforms.push(
        // Ground Floor
           new Platform(this.ctx, this.canvasSize, 0, this.canvasSize.h / 1.05, this.canvasSize.w, 80),
        // First Floor
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 2.008, this.canvasSize.h / 1.47, this.canvasSize.w / 4, 80),
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 4, this.canvasSize.h / 1.47, this.canvasSize.w / 4, 80),
        // Second Floor Left
           new Platform(this.ctx, this.canvasSize, 0, this.canvasSize.h / 2.1, this.canvasSize.w / 7, 80),
        // Island in the Middle
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 2.7, this.canvasSize.h / 2.8, this.canvasSize.w / 7, 80),
        // Third Floor Right
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 1.5, this.canvasSize.h / 3.5, this.canvasSize.w / 3, 80),
        // Third Floor Left
           new Platform(this.ctx, this.canvasSize, this.canvasSize.w / 7.35, this.canvasSize.h / 6.5, this.canvasSize.w / 6, 80),
           new Platform(this.ctx, this.canvasSize, 0, this.canvasSize.h / 6.5, this.canvasSize.w / 6, 80),
        )
    },
    drawPlatforms() {
        this.platforms.forEach((eachPlatform) => {
            eachPlatform.draw()
        })
    },
    createEnemies() {
        this.enemies.push(
            new Enemie(this.ctx, this.canvasSize, this.canvasSize.w / 3.8, this.canvasSize.h / 1.67, 70, 70),
            new Enemie(this.ctx, this.canvasSize, this.canvasSize.w / 1.2, this.canvasSize.h / 4.9, 70, 70),
        )
    },
    drawEnemies() {
        this.enemies.forEach((eachEnemie) => {
            eachEnemie.draw()
        })
    },
    createDoor() {
        this.door = new Door(this.ctx,this.canvasSize, 7, 0, 100, 118)
    },
    drawDoor() {
        this.door.draw()
    },
    createBullets() {
        this.bullets.push(
            new Bullets(this.ctx, this.canvasSize.w / 4.8, this.canvasSize.h / 1.65, this.canvasSize.w / 15, this.canvasSize.h / 11, 10, 10, 10),
            new Bullets(this.ctx, this.canvasSize.w / 1.27, this.canvasSize.h / 4.7, this.canvasSize.w / 15, this.canvasSize.h / 11, 10, 10, (-10)),
        )
        // console.log(this.bullets)
    },
    drawBullets() {
        this.bullets.forEach(eachBullet => {
            eachBullet.draw()
        })
    },
    clearBullets() {
        this.bullets = this.bullets.filter((eachBullet) => {
            return eachBullet.bulletSpecs.pos.x < this.canvasSize.w
        })
        this.bullets = this.bullets.filter((eachBullet) => {
            return eachBullet.bulletSpecs.pos.x > 0
        })
    },
    createPills() {
        this.pills.push(
            // Ground Floor
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 2, this.canvasSize.h / 1.15, 35, 35),
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 1.5, this.canvasSize.h / 1.15, 35, 35),
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 1.1, this.canvasSize.h / 1.15, 35, 35),
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 3.4, this.canvasSize.h / 1.15, 35, 35),

            // First Floor
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 2.8, this.canvasSize.h / 1.65, 35, 35),
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 1.7, this.canvasSize.h / 1.65, 35, 35),

            // Second Floor Left
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 20, this.canvasSize.h / 2.5, 35, 35),

            // Island in the Middle
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 2.3, this.canvasSize.h / 3.6, 35, 35),

            // Third Floor Right
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 1.09, this.canvasSize.h / 6, 35, 35),
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 1.4, this.canvasSize.h / 6, 35, 35),

            // Third Floor Right
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 4, this.canvasSize.h / 20, 35, 35),

            //Flying
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 1.15, this.canvasSize.h / 2.25, 35, 35),
            new Pills(this.ctx, this.canvasSize, this.canvasSize.w / 6, this.canvasSize.h / 1.65, 35, 35),

        )
    },
    drawPills() {
        this.pills.forEach((eachPill) => {
            eachPill.draw()
        })
    },
    drawAll() {
        this.drawBackground()
        this.drawPlatforms()
        this.drawEnemies()
        this.drawBullets()
        this.drawPills()
        this.drawDoor()
        this.drawPlayer()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    platformCollision() {
    for (let i = 0; i < this.platforms.length; i++) {
            if (this.player.playerSpecs.pos.x < this.platforms[i].platformSpecs.pos.x + this.platforms[i].platformSpecs.size.w &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > this.platforms[i].platformSpecs.pos.x &&
                this.player.playerSpecs.pos.y - this.player.playerSpecs.size.h < this.platforms[i].platformSpecs.pos.y - this.platforms[i].platformSpecs.size.h - 80 &&
                this.player.playerSpecs.size.h + this.player.playerSpecs.pos.y > this.platforms[i].platformSpecs.pos.y ) {

                    // pte colision cabeza-culo plataforma
             
                this.player.playerSpecs.vel.y = 0
                this.player.playerSpecs.pos.y = this.platforms[i].platformSpecs.pos.y - this.player.playerSpecs.size.h
            }
        }
    },
    bulletCollision() {
        
        this.bullets.forEach((eachBullet, i) => {

            if (
                // eje x
                this.player.playerSpecs.pos.x <= eachBullet.bulletSpecs.pos.x + eachBullet.bulletSpecs.size.w &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > eachBullet.bulletSpecs.pos.x &&

                // eje y
                this.player.playerSpecs.pos.y < eachBullet.bulletSpecs.pos.y + eachBullet.bulletSpecs.size.h &&
                this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h > eachBullet.bulletSpecs.pos.y
            ) {
                this.count++
                // console.log(this.count)
                if(this.count ===1)document.getElementById('heart1').style.visibility = 'hidden'
                if(this.count ===2)document.getElementById('heart2').style.visibility = 'hidden'
                if(this.count ===3)document.getElementById('heart3').style.visibility = 'hidden'

                if(this.count ===3)document.getElementById('gameover').style.visibility = 'visible'

                // filter para que la bala no atraviese
                this.bullets = this.bullets.filter(b => b !== this.bullets[i])
                
                
            }
        })
    },
    pillCollision(){
        this.pills.forEach((eachPill, i) => {

            if (
                // eje x
                this.player.playerSpecs.pos.x <= eachPill.pillSpecs.pos.x + eachPill.pillSpecs.size.w &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > eachPill.pillSpecs.pos.x &&

                // eje y
                this.player.playerSpecs.pos.y < eachPill.pillSpecs.pos.y + eachPill.pillSpecs.size.h &&
                this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h > eachPill.pillSpecs.pos.y
            ) {
                // filter para que jale tosti
                this.pillCounter++
                this.pills = this.pills.filter(p => p !== this.pills[i])
                console.log(this.pillCounter)
            }
        })

    },
    enemieCollision(){

        // CHEQUEA COLISION ok, IF COLISION -> MUELTE

        this.enemies.forEach((eachEnemie, i) => {

            if (
                // eje x
                this.player.playerSpecs.pos.x <= eachEnemie.enemieSpecs.pos.x + eachEnemie.enemieSpecs.size.w &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > eachEnemie.enemieSpecs.pos.x &&

                // eje y
                this.player.playerSpecs.pos.y < eachEnemie.enemieSpecs.pos.y + eachEnemie.enemieSpecs.size.h &&
                this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h > eachEnemie.enemieSpecs.pos.y
            ) {
            this.count = 3
               document.getElementById('heart1').style.visibility = 'hidden'
               document.getElementById('heart2').style.visibility = 'hidden'
               document.getElementById('heart3').style.visibility = 'hidden'
               if(this.count === 3)document.getElementById('gameover').style.visibility = 'visible'
            }
        })

    },
    doorCollision(){
        if(this.pillCounter === 13){
            document.getElementById('closedDoor').style.visibility = 'hidden'
            if(// eje x
            this.player.playerSpecs.pos.x <= this.door.doorSpecs.pos.x + this.door.doorSpecs.size.w &&
            this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > this.door.doorSpecs.pos.x &&

            // eje y
            this.player.playerSpecs.pos.y < this.door.doorSpecs.pos.y + this.door.doorSpecs.size.h &&
            this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h > this.door.doorSpecs.pos.y) { 
            
            if( document.getElementById('closedDoor').style.visibility = 'hidden')document.getElementById('you-win').style.visibility = 'visible'
            
            } 
        }
    },
    
}    
