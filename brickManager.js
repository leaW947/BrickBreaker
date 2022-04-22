class Brick{
    
    constructor(pX,pY,pNum){
        this.x=pX;
        this.y=pY;

        this.width=100;
        this.height=40;

        this.num=pNum;
        this.nbLives=0;

        this.type="";
        this.color="255,255,255";
        this.alpha=1;

        this.tweening={
            time:0,
            duration:0.2*this.num,
            begin:0-this.y,
            distance:this.y*2
        };
    }

    initType(){
    
        if(this.type=="normal"){
            this.nbLives=1;
            this.alpha=0.2;

        }else if(this.type=="2Lives"){
            this.nbLives=2;
            this.alpha=0.6;

        }else if(this.type=="3Lives"){
            this.nbLives=3;
            this.alpha=1;
        }

    }

    update(dt){
        
    }

    draw(pCtx){
        pCtx.fillStyle="rgba("+this.color+","+this.alpha+")";
        pCtx.fillRect(this.x+1,this.y+1,this.width-1,this.height-1);
    }

}


class BrickManager{

    constructor(pNbBrick,pGameplayService){
        this.gameplayService=pGameplayService;
        this.lstBrick=[];

        this.bIsTweenFinish=false;

        let x=this.gameplayService.canvas.width/8;
        let y=this.gameplayService.canvas.height/5;

        for(let i=pNbBrick;i>0;i--){
            let myBrick=new Brick(x,y,i+1);

            ///init type/////
            let rndType=Math.floor(rnd(1.5,3.5));
            
            if(rndType==1){
                myBrick.type="normal";
            }else if(rndType==2){
                myBrick.type="2Lives";
            }else if(rndType==3){
                myBrick.type="3Lives";
            }

            myBrick.initType();
            this.lstBrick.push(myBrick);

            x+=myBrick.width;

            if(x>=this.gameplayService.canvas.width-(this.gameplayService.canvas.width/8)){
                x=this.gameplayService.canvas.width/8;
                y+=myBrick.height;
            }
        }

    }

    addBrickParticle(pNbParticles,pBrick){
        this.gameplayService.particleEmitter.x=pBrick.x+(pBrick.width/2);
        this.gameplayService.particleEmitter.y=pBrick.y+(pBrick.height/2);

        this.gameplayService.particleEmitter.addParticles(pNbParticles,"square","255,255,255");
    }


    updateTweening(dt){
        let nbTweenFinish=0;

        for(let i=this.lstBrick.length-1;i>=0;i--){
            let myBrick=this.lstBrick[i];

            /////////////////////////tweening vertical////////////
            myBrick.y=easeOutSine(myBrick.tweening.time,myBrick.tweening.begin,myBrick.tweening.distance,
                myBrick.tweening.duration);

            myBrick.tweening.time+=0.02;

            if(myBrick.tweening.time>=myBrick.tweening.duration){
                myBrick.tweening.time=myBrick.tweening.duration;
                nbTweenFinish+=1;
            }

        }

        if(nbTweenFinish==this.lstBrick.length){
            this.bIsTweenFinish=true;
        }

    }   


    update(dt,pBall,pLstBullet){

        for(let i=this.lstBrick.length-1;i>=0;i--){
            let myBrick=this.lstBrick[i];

            myBrick.update(dt);

            ///////////////collide with the ball/////////////
            let bCollideWithBall=checkCollision(pBall.x-(pBall.radius),pBall.y-(pBall.radius),
                                    pBall.radius*2,pBall.radius*2,
                                    myBrick.x,myBrick.y,
                                    myBrick.width,myBrick.height);

            if(bCollideWithBall){
                pBall.sounds.colBrick.play();

                pBall.x=pBall.oldX;
                pBall.y=pBall.oldY;

                pBall.vx*=-1;
                pBall.vy*=-1;
                
                myBrick.nbLives-=1;
                myBrick.alpha-=0.4;

                this.addBrickParticle(20,myBrick);
            }

            //////////////collide with the bullet////////////////
            let bCollideWithBullet=null;

            for(let n=pLstBullet.length-1;n>=0;n--){
                let bullet=pLstBullet[n];

                bCollideWithBullet=checkCollision(bullet.x,bullet.y,bullet.width,bullet.height,
                                                    myBrick.x,myBrick.y,myBrick.width,myBrick.height);

                if(bCollideWithBullet){
                    pLstBullet.splice(n,1);

                    myBrick.nbLives-=1;
                    myBrick.alpha-=0.4;

                    this.addBrickParticle(20,myBrick);
                }

            }
                    

            ///delete brick///
            if(myBrick.nbLives<=0){
                this.lstBrick.splice(i,1);
                this.gameplayService.score+=10;

                this.addBrickParticle(50,myBrick);
            }

        }

    }

    draw(pCtx){

        this.lstBrick.forEach(myBrick=>{
            myBrick.draw(pCtx);
        });

    }
}