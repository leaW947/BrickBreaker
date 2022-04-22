class SceneLoader{
    constructor(){
        this.gameplayService=null;
        this.gameState="";

        this.sceneGame=new SceneGame();
        this.sceneMenu=new SceneMenu();
    }

    load(pGameplayService){
        this.gameplayService=pGameplayService;
    }

    init(pGameState){
        this.gameState=pGameState;

        this.gameplayService.guiManager.totalDelete();

        if(this.gameState=="menu"){
            this.sceneMenu.load(this.gameplayService,this);
        }else if(this.gameState=="gameplay"){
            this.sceneGame.load(this.gameplayService,this);
        }else if(this.gameState=="gameover"){

        }
    }

    update(dt){

        if(this.gameState=="menu"){
            this.sceneMenu.update(dt);
        }else if(this.gameState=="gameplay"){
            this.sceneGame.update(dt);
        }else if(this.gameState=="gameover"){
            
        }
    }

    draw(pCtx){

        if(this.gameState=="menu"){
            this.sceneMenu.draw(pCtx);
        }else if(this.gameState=="gameplay"){
            this.sceneGame.draw(pCtx);
        }else if(this.gameState=="gameover"){
            
        }
    }

    keypressed(pKey){

        if(this.gameState=="menu"){
            this.sceneMenu.keypressed(pKey);
        }else if(this.gameState=="gameplay"){

        }else if(this.gameState=="gameover"){
            
        }
    }

    mousepressed(pBtn,pX,pY){

        if(this.gameState=="menu"){

        }else if(this.gameState=="gameplay"){
            this.sceneGame.mousepressed(pBtn,pX,pY);
        }else if(this.gameState=="gameover"){
            
        }
    }

    mousemove(pX,pY){

        if(this.gameState=="menu"){

        }else if(this.gameState=="gameplay"){
            this.sceneGame.mousemove(pX,pY);
        }else if(this.gameState=="gameover"){
            
        }

    }
}