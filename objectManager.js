class Bullet{
    
    constructor(pX,pY){
        this.x=pX;
        this.y=pY;

        this.vx=0;
        this.vy=5;

        this.width=5;
        this.height=20;
    }

    update(dt){
        this.y-=this.vy*60*dt;
    }

    draw(pCtx){
        drawTriangle(pCtx,this.x+(this.width/2),this.y,this.x+this.width,
                    this.y+this.height,this.x,this.y+this.height,"255,170,0");
    }
 
}


class Object{
    
    constructor(pX,pY,pId){
        this.x=pX;
        this.y=pY;

        this.id=pId+1;

        this.width=32;
        this.height=32;

        this.timerSpeed=rnd(30,60);
        this.timerSpeed*=this.id;

        this.timer=this.timerSpeed;

        this.bOnMove=false;
        this.bIsVisible=false;

        this.image=null;
        
        this.type="";
    }

    update(dt){

        if(!this.bOnMove){

            this.timer-=0.1;

            if(this.timer<=0){
                this.bOnMove=true;
                this.bIsVisible=true;
            }

        }else{
            this.y+=2;
        }
     

    }

    draw(pCtx){

        if(this.bIsVisible){
            pCtx.drawImage(this.image,this.x,this.y);
        }
      
    }

}


class ObjectManager{
    
    constructor(pGameplayService){
        this.gameplayService=pGameplayService;

        this.lstTypeObject=[];
        this.lstTypeObject[0]="extend";
        this.lstTypeObject[1]="bullet";
        this.lstTypeObject[2]="upScore";
        this.lstTypeObject[3]="upSpeed";
        this.lstTypeObject[4]="upLives";
        this.lstTypeObject[5]="shield";

        this.lstObjects=[];
        this.lstBullet=[];
        this.bag=[];

        this.sndScore=this.gameplayService.assetManager.getSound("sounds/sfx_coin_double1.wav");
        this.sndHeart=this.gameplayService.assetManager.getSound("sounds/sfx_coin_double2.wav");

        this.initBag();
    }

    initBag(){
        this.bag=[];

        for(let i=0;i<this.lstTypeObject.length;i++){
            this.bag.push(i);
            this.bag.push(i);
        }
    }

    addObject(pNbObjects,pMaxX){
    
        for(let i=0;i<=pNbObjects;i++){
            let rndX=rnd(0+(this.gameplayService.canvas.width/8),pMaxX-(this.gameplayService.canvas.width/8));

            let myObject=new Object(rndX,rnd(0,0+this.gameplayService.canvas.height/10),i);
            
            /////bag////
            let nBag=Math.floor(rnd(0,(this.bag.length-1+0.5)));
            let rndType=this.bag[nBag];

            this.bag.splice(nBag,1);

            if(this.bag.length==0){
                this.initBag();
            }
        
            myObject.type=this.lstTypeObject[rndType];

            ////images
            if(myObject.type=="extend"){
                myObject.image=this.gameplayService.assetManager.getImage("images/objects/upWidthRacket.png");

            }else if(myObject.type=="bullet"){

                myObject.image=this.gameplayService.assetManager.getImage("images/objects/bullet.png");
            }else if(myObject.type=="upScore"){

                myObject.image=this.gameplayService.assetManager.getImage("images/objects/score.png");
            }else if(myObject.type=="upSpeed"){

                myObject.image=this.gameplayService.assetManager.getImage("images/objects/flash.png");
            }else if(myObject.type=="upLives"){

                myObject.image=this.gameplayService.assetManager.getImage("images/objects/heart.png");

            }else if(myObject.type=="shield"){

                myObject.image=this.gameplayService.assetManager.getImage("images/objects/shield.png");
            }

            this.lstObjects.push(myObject);
        }
     
    }

    update(dt,pRacket){

        for(let i=this.lstObjects.length-1;i>=0;i--){
            let myObject=this.lstObjects[i];

            myObject.update(dt);

            if(myObject.y>=this.gameplayService.canvas.height){
                this.lstObjects.splice(i,1);
            }

            //////collision with the racket///////
            let bCollide=checkCollision(myObject.x,myObject.y,myObject.width,myObject.height,
                                    pRacket.x,pRacket.y,pRacket.width,pRacket.height);

            if(bCollide){

                let colorParticle="";

                switch(myObject.type){
                    ////extends racket///
                    case "extend":

                        if(pRacket.width<150){
                            pRacket.width+=20;
                        }
                        
                        colorParticle="83,255,140";
                        pRacket.sndColObject.play();
                        break;
                    

                    ////bullet///
                    case "bullet":

                        this.lstBullet.push(new Bullet(pRacket.x,pRacket.y));
                        this.lstBullet.push(new Bullet(pRacket.x+pRacket.width,pRacket.y));

                        colorParticle="249,224,82";
                        pRacket.sndColObject.play();
                    
                        break;
                    
                    //score+=10/////
                    case "upScore":
                        this.sndScore.play();
                        this.gameplayService.score+=10;
                        colorParticle="250,255,41";

                        break;
                

                    ///speed ball *2//////
                    case "upSpeed":

                        pRacket.bOnUpSpeed=true;
                        colorParticle="126,184,205";
                        pRacket.sndColObject.play();

                        break;

                        
                    ///nbBall+=1///////
                    case "upLives":
                        this.sndHeart.play();
                        this.gameplayService.nbBall+=1;
                        colorParticle="219,4,4";

                        break;

                    ///ball collision with edge(down) of the screen///////
                     case "shield":
                        
                        pRacket.bOnShield=true;
                        colorParticle="111,0,186";
                        pRacket.sndColObject.play();

                        break;

                    default:
                        break;
                }


                /////animation particles//////////
                this.gameplayService.particleEmitter.x=myObject.x+(myObject.width/2);
                this.gameplayService.particleEmitter.y=myObject.y+(myObject.height/2);

                this.gameplayService.particleEmitter.addParticles(20,"circle",colorParticle);
            

                this.lstObjects.splice(i,1);

            }
        }


        ////////////bullet///////////////
        for(let i=this.lstBullet.length-1;i>=0;i--){
            let bullet=this.lstBullet[i];

            bullet.update(dt);

            if(bullet.y<=0){
                this.lstBullet.splice(i,1);
            }
        }

    }

    draw(pCtx){

        ///////objects////////
        this.lstObjects.forEach(myObject=>{
            myObject.draw(pCtx);
        });


        ///bullet//////
        this.lstBullet.forEach(bullet=>{
            bullet.draw(pCtx);
        });

    }

}