class Racket{
    
    constructor(pX,pY,pGameplayService){
        this.gameplayService=pGameplayService;

        this.x=pX;
        this.y=pY;

        this.width=70;
        this.height=20;

        this.bOnUpSpeed=false;
        this.bOnShield=false;

        this.timerSpeed=1;
        this.timerAlpha=this.timerSpeed;

        this.color="255,255,255";
        this.alpha=1;

        this.sndColObject=this.gameplayService.assetManager.getSound("sounds/brickCollision.wav");

    }

    update(dt){

        //////alpha change////////
        if(this.alpha<1){
            this.timerAlpha-=0.1;

            if(this.timerAlpha<=0){
                this.timerAlpha=this.timerSpeed;
                this.alpha=1;
            }
        }
    }   

    draw(pCtx){
        pCtx.fillStyle="rgba("+this.color+","+this.alpha+")";
        pCtx.fillRect(this.x,this.y,this.width,this.height);
    }

    mousemove(pX,pY){
        this.x=pX-(this.width/2);

        if(this.x<=0){
            this.x=0;
        }else if(this.x+this.width>=this.gameplayService.canvas.width){
            this.x=this.gameplayService.canvas.width-this.width;
        }
    }

}