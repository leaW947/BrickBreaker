class GameplayService{
    
    constructor(){
        this.canvas=null;
        this.assetManager=null;
        this.particleEmitter=null;
        this.guiManager=null;

        this.nbBall=1;
        this.score=0;
        this.currentLevel=1;
    }

    setCanvas(pCanvas){
        this.canvas=pCanvas;
    }

    setAssetManager(pAssetManager){
        this.assetManager=pAssetManager;
    }

    setParticleEmitter(pParticleEmitter){
        this.particleEmitter=pParticleEmitter;
    }

    setGuiManager(pGuiManager){
        this.guiManager=pGuiManager;
    }

}