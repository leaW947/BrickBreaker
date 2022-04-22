class SceneGame{
    constructor(){
        this.gameplayService=null;
        this.sceneLoader=null;

        this.racket=null;
        this.ball=null;
        this.brickManager=null;

        this.objectManager=null;
        this.particleEmitter=null;

        this.textScore=null;
        this.textNbBall=null;
        this.textLost=null;
        this.imgHeart=null;

        this.tweeningLost={
            time:0,
            duration:0,
            distance:0,
            begin:0
        };

        this.timerSpeed=10;
        this.timerSpeedLost=20;

        this.timer=this.timerSpeed;
        this.timerLost=this.timerSpeedLost;

        this.rectGUI={
            x:0,
            y:0,
            width:0,
            height:0
        };

        this.bOnStartLevelAnim=false;
    }

    initGame(){
        this.bOnStartLevelAnim=true;

        //////GUI///////
        this.textScore=this.gameplayService.guiManager.createText(10,30,
            "Score : 0","30px papernotes","255,255,255");

        this.textNbBall=this.gameplayService.guiManager.createText(
            this.gameplayService.canvas.width-30,30,
            "nbBall : 0","30px papernotes","255,255,255");

        this.textLost=this.gameplayService.guiManager.createText(0-200,this.gameplayService.canvas.height/2,
            "PERDU :(","50px papernotes","255,255,255");
        
        this.tweeningLost={
            time:0,
            duration:3,
            distance:(this.gameplayService.canvas.width/2)+150,
            begin:this.textLost.x
        };
    

        this.imgHeart=this.gameplayService.assetManager.getImage("images/objects/heart.png");
        
        this.rectGUI={
            x:0,
            y:0,
            width:this.gameplayService.canvas.width,
            height:this.gameplayService.canvas.height/14
        };


        //racket//
        this.racket=new Racket(this.gameplayService.canvas.width/2,this.gameplayService.canvas.height,
                                this.gameplayService);

        this.racket.x-=(this.racket.width/2);
        this.racket.y-=(this.racket.height*3);


        //ball///
        this.ball=new Ball(0,0,this.gameplayService);

        this.ball.x=this.racket.x+(this.racket.width/2);
        this.ball.y=this.racket.y-this.ball.radius;

        this.ball.initialY=this.ball.y;


        //bricks
        if(this.gameplayService.currentLevel<=2){
            this.brickManager=new BrickManager(6*2,this.gameplayService);

        }else if(this.gameplayService.currentLevel<=4 && this.gameplayService.currentLevel>2){
            this.brickManager=new BrickManager(6*3,this.gameplayService);

        }else if(this.gameplayService.currentLevel<=6 && this.gameplayService.currentLevel>4){

            this.brickManager=new BrickManager(6*4,this.gameplayService);
        }
        

        //objects
        this.objectManager=new ObjectManager(this.gameplayService);
        this.objectManager.addObject(5,this.gameplayService.canvas.width);

        this.particleEmitter=new ParticleEmitter(0,0);
        this.gameplayService.setParticleEmitter(this.particleEmitter);
      
        this.gameplayService.nbBall=1;

    }

    load(pGameplayService,pSceneLoader){
        this.gameplayService=pGameplayService;
        this.sceneLoader=pSceneLoader;

        this.gameplayService.score=0;

        this.initGame();
    }

    update(dt){

        /////text////////
        this.textScore.text="Score : "+this.gameplayService.score;
        this.textNbBall.text=this.gameplayService.nbBall;

        ///gameover
        if(this.gameplayService.nbBall<=0){
            this.timerLost-=0.1;

            //////tweening lost Text////////////
            this.textLost.x=easeOutSine(this.tweeningLost.time,this.tweeningLost.begin,
                this.tweeningLost.distance,this.tweeningLost.duration);

            this.tweeningLost.time+=0.1;

            if(this.tweeningLost.time>=this.tweeningLost.duration){
                this.tweeningLost.time=this.tweeningLost.duration;
            }

            /////return menu///
            if(this.timerLost<=0){
                this.timerLost=this.timerSpeedLost;
                this.gameplayService.currentLevel=1;
                this.sceneLoader.init("menu");
            }
        }

        ////level change////
        if(this.brickManager.lstBrick.length<=0 && this.gameplayService.nbBall>0){
            this.timer-=0.1;

            this.ball.vx=0;
            this.ball.vy=0;

            this.ball.x=this.ball.initialX;
            this.ball.y=this.ball.initialY;

            if(this.timer<=0){
                this.timer=this.timerSpeed;
                this.gameplayService.currentLevel+=1;
                this.initGame();
            }
        }

        if(!this.bOnStartLevelAnim && this.gameplayService.nbBall>0){
            this.gameplayService.canvas.style.cursor="none";

            ////add objects////
            if(this.objectManager.lstObjects.length==0){
                this.objectManager.addObject(5,this.gameplayService.canvas.width);
            }


            this.racket.update(dt);
            this.ball.update(dt,this.racket,this.rectGUI.height);

            this.objectManager.update(dt,this.racket);
            this.brickManager.update(dt,this.ball,this.objectManager.lstBullet);

            this.gameplayService.particleEmitter.update(dt);

        }else{

            ////////animation start Game////////
            this.gameplayService.canvas.style.cursor="pointer";
            this.brickManager.updateTweening(dt);

            if(this.brickManager.bIsTweenFinish){
                this.bOnStartLevelAnim=false;
            }
        }
      

    }

    draw(pCtx){

        this.racket.draw(pCtx);
        this.ball.draw(pCtx);
        
        this.brickManager.draw(pCtx);
        this.objectManager.draw(pCtx);

        if(this.racket.bOnShield){
            pCtx.fillStyle="rgba(255,255,255,0.5)";
            pCtx.fillRect(0,this.gameplayService.canvas.height-5,this.gameplayService.canvas.width,5);
        }

        this.gameplayService.particleEmitter.draw(pCtx);  

        if(!this.bOnStartLevelAnim){

            pCtx.fillStyle="rgba(255,255,255,0.05)";
            pCtx.fillRect(this.rectGUI.x,this.rectGUI.y,this.rectGUI.width,this.rectGUI.height);

            ////heart//
            pCtx.drawImage(this.imgHeart,this.textNbBall.x-40,this.textNbBall.y-25)

            this.textNbBall.draw(pCtx);
            this.textScore.draw(pCtx);

            if(this.tweeningLost.time==this.tweeningLost.duration){

                pCtx.fillStyle="rgba(0,0,0,0.8)";
                pCtx.fillRect(0,0,this.gameplayService.canvas.width,this.gameplayService.canvas.height);
            
            }
          
            this.textLost.draw(pCtx);
            
        }
      
       
    }

    mousemove(pX,pY){
        
        if(!this.bOnStartLevelAnim && this.gameplayService.nbBall>0){
            this.racket.mousemove(pX,pY); 
        }       

    }

    mousepressed(pBtn,pX,pY){

        if(!this.bOnStartLevelAnim && this.gameplayService.nbBall>0){
            this.ball.mousepressed(pBtn,pX,pY);
        }
        
    }
    
}