class Ball{

    constructor(pX,pY,pGameplayService){
        this.gameplayService=pGameplayService;

        this.x=pX;
        this.y=pY;

        this.initialX=0;
        this.initialY=0;

        this.oldX=0;
        this.oldY=0;

        this.vx=0;
        this.vy=0;

        this.maxSpeed=5;
        this.colorTrail="255,0,0";

        this.radius=10;
        this.bOnShield=false;

        this.lstTrail=[];

        this.sounds={
            colBrick:this.gameplayService.assetManager.getSound("sounds/arkanoid_brique_dure.wav"),
            lost:this.gameplayService.assetManager.getSound("sounds/arkanoid_perdu2.wav"),
            colScreen:this.gameplayService.assetManager.getSound("sounds/arkanoid_raquette.wav"),
        };

    }

    update(dt,pRacket,pRectGUI){
        this.oldX=this.x;
        this.oldY=this.y;

        this.initialX=pRacket.x+(pRacket.width/2);

        this.x+=this.vx*60*dt;
        this.y+=this.vy*60*dt;

        /////////ball on the racket//////////
        if((this.vx==0 && this.vy==0)){
            pRacket.bOnUpSpeed=false;
            this.maxSpeed=5;
            this.x=pRacket.x+(pRacket.width/2);
        }


        /////////////////collide with the screen////////////////
        let bOnPlaySndColScreen=false;

        ///left
        if(this.x-this.radius<=0){
            this.x=this.oldX;
            this.vx*=-1;
            bOnPlaySndColScreen=true;
        }

        //right
        if(this.x+this.radius>=this.gameplayService.canvas.width){
            this.x=this.oldX;
            this.vx*=-1;
            bOnPlaySndColScreen=true;
        }
    
        //up
        if(this.y-this.radius<=pRectGUI){
            this.y=this.oldY;
            this.vy*=-1;
            bOnPlaySndColScreen=true;
        }


        //down
        /////lost ball//////
        if(this.y+this.radius>this.gameplayService.canvas.height){

            if(!this.bOnShield){
                this.gameplayService.nbBall-=1;
                this.maxSpeed=5;
    
                if(this.gameplayService.nbBall>0){
                    this.vx=0;
                    this.vy=0;
    
                    this.x=this.initialX;
                    this.y=this.initialY;

                    this.sounds.lost.play();
    
                }else{
                    //////////gameover///////////////
                    this.vx=0;
                    this.vy=0;

                    this.y=this.gameplayService.canvas.height+(this.radius*3);

                    this.gameplayService.nbBall=0;
                }

            }else{
                this.y=this.oldY;
                this.vy*=-1;
                bOnPlaySndColScreen=true;
            }
          
        }

        if(bOnPlaySndColScreen){
            this.sounds.colScreen.play();
        }


        //////////////collide with the racket///////////
        if(this.vx!=0 && this.vy!=0){
            
            let bCollide=checkCollision(this.x-(this.radius/2),this.y-(this.radius/2),
                                        this.radius*2,this.radius*2,
                                        pRacket.x,pRacket.y,
                                        pRacket.width,pRacket.height);

            ////shield////
             if(pRacket.bOnShield && !this.bOnShield){
                this.bOnShield=true;
            }else{
                if(!pRacket.bOnShield){
                    this.bOnShield=false;
                }
            }


            if(bCollide){
                pRacket.alpha=0.2;

                this.x=this.oldX;
                this.y=pRacket.y-this.radius;

                let wPart=pRacket.width/6;
                let xBall=this.x-pRacket.x;

                /////speed*2///////
                if(pRacket.bOnUpSpeed && this.maxSpeed<=5){
                    this.maxSpeed=this.maxSpeed*2;
                    this.colorTrail="255,255,255";

                }else{
                    if(!pRacket.bOnUpSpeed){
                        this.maxSpeed=5;
                        this.colorTrail="255,0,0";
                    }
                }

                if(this.x<this.gameplayService.canvas.width/2){
                
                    ///part 1
                    if(xBall<=wPart){
                        this.vx=-this.maxSpeed;
                    
                    //part 2
                    }else if(xBall>wPart && xBall<=wPart*2){
                        this.vx=-(this.maxSpeed/1.5);
                    
                    //part 3
                    }else if(xBall>wPart*2 && xBall<=wPart*3){
                        this.vx=-(this.maxSpeed/this.maxSpeed);
                    }

                }else{

                    //part 4
                    if(xBall>wPart*3 && xBall<=wPart*4){
                        this.vx=(this.maxSpeed/this.maxSpeed);

                    //part 5
                    }else if(xBall>wPart*4 && xBall<=wPart*5){
                        this.vx=(this.maxSpeed/1.5);
                    
                    //part 6
                    }else if(xBall>wPart*5 && xBall<=wPart*6){
                        this.vx=this.maxSpeed;
                    }

                }

                this.vy=this.maxSpeed;
                this.vy*=-1;
            }
             
        }

        ////trail////////
        if(this.vx!=0 & this.vy!=0){
            
            let trail={
                x:this.x,
                y:this.y,
                nbLives:2,
                alpha:1
            };

            this.lstTrail.push(trail);    
        }
      
        for(let i=0;i<=this.lstTrail.length-1;i++){
            let myTrail=this.lstTrail[i];

            myTrail.nbLives-=0.1;
            myTrail.alpha=(myTrail.nbLives/2)/3;
            
            if(myTrail.nbLives<=0){
                this.lstTrail.splice(i,1)
            }
        }

    }

    draw(pCtx){

        this.lstTrail.forEach(trail=>{

            drawCircle(pCtx,trail.x,trail.y,this.radius,this.colorTrail+","+trail.alpha,
            this.colorTrail+","+trail.alpha);

        });

        drawCircle(pCtx,this.x,this.y,this.radius,"255,0,0","255,0,0");
    }

    mousepressed(pBtn,pX,pY){
        
        if(pBtn==0){

            if(this.vx==0 && this.vy==0){

                ///ball move////                
                let rndVx=Math.floor(rnd(1.5,2.5));

                if(rndVx==1){
                    this.vx=this.maxSpeed;
                }else{
                    this.vx=-this.maxSpeed;
                }
    
                this.vy=-this.maxSpeed;
            }

        }
       

    }
}