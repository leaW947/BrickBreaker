class Particle{
    constructor(pX,pY,pType,pColor){
        this.x=pX;
        this.y=pY;

        this.color=pColor;

        if(pType=="square"){
            this.width=rnd(5,20);
            this.height=this.width;

        }else if(pType=="circle"){
            this.radius=rnd(2,5);
        }
        this.type=pType;

        let angle=rnd(0,2*Math.PI);

        this.vx=(rnd(50,200)/100)*Math.cos(angle);
        this.vy=(rnd(50,200)/100)*Math.sin(angle);

        this.nbLives=rnd(2,6);
        this.maxLives=this.nbLives;
        this.alpha=1;
    }

    update(dt){
        let ratio=this.nbLives/this.maxLives;
        this.alpha=ratio;

        this.x+=this.vx*60*dt;
        this.y+=this.vy*60*dt;

        this.nbLives-=0.1;
    }

    draw(pCtx){

        if(this.type=="square"){
            
            pCtx.fillStyle="rgba("+this.color+","+this.alpha+")";
            pCtx.fillRect(this.x,this.y,this.width,this.height);

        }else if(this.type=="circle"){

            drawCircle(pCtx,this.x,this.y,this.radius,this.color+","+this.alpha,this.color+","+this.alpha);
        }
    
    }
}

class ParticleEmitter{
    
    constructor(pX,pY){
        this.x=pX;
        this.y=pY;

        this.lstParticle=[];
    }

    addParticles(pNbParticles,pType,pColor){

        for(let i=0;i<=pNbParticles;i++){
            let particle=new Particle(rnd(this.x-5,this.x+5),rnd(this.y-5,this.y+5),pType,pColor);
            this.lstParticle.push(particle);
        }
       
    }

    update(dt){

        for(let i=this.lstParticle.length-1;i>=0;i--){
            let particle=this.lstParticle[i];

            particle.update(dt);

            if(particle.nbLives<=0){
                this.lstParticle.splice(i,1);
            }
        }

    }

    draw(pCtx){
        this.lstParticle.forEach(particle=>{
            particle.draw(pCtx);
        });
    }

}