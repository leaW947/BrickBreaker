class SceneMenu{
    
    constructor(){
        this.gameplayService=null;
        this.sceneLoader=null;

        this.title=null;
        this.textPressed=null;

    }

    load(pGameplayService,pSceneLoader){
        this.gameplayService=pGameplayService;
        this.sceneLoader=pSceneLoader;

        this.title=this.gameplayService.guiManager.createText(this.gameplayService.canvas.width/4,
        this.gameplayService.canvas.height/4,
        "Brick Breaker","90px papernotes","255,255,255");

        this.textPressed=this.gameplayService.guiManager.createText(this.gameplayService.canvas.width/4,
        this.gameplayService.canvas.height/1.7,
        "Presse Enter","30px papernotes","255,255,255");

        //////cursor//////////
        this.gameplayService.canvas.style.cursor="pointer";

    }

    update(dt){

    }

    draw(pCtx){
        this.title.draw(pCtx);
        this.textPressed.draw(pCtx);
    }

    keypressed(pKey){

        if(pKey=="Enter"){
            this.sceneLoader.init("gameplay");
        }
    }

}
