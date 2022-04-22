let gameplayService=new GameplayService();
let sceneLoader=new SceneLoader();
let assetManager=new AssetManager();
let guiManager=new GUIManager();

let bGameReady=false;

function keyDown(t){
    t.preventDefault();
    sceneLoader.keypressed(t.code);
}

function mouseDown(e){
    sceneLoader.mousepressed(e.button,e.offsetX,e.offsetY);
}

function mouseMove(e){
    sceneLoader.mousemove(e.offsetX,e.offsetY);
}

function load(){
    document.addEventListener("keydown",keyDown,false);

    document.addEventListener("mousedown",mouseDown,false);
    document.addEventListener("mousemove",mouseMove,false);
    
    //add images and sounds
    assetManager.addImage("images/objects/bullet.png");
    assetManager.addImage("images/objects/flash.png");
    assetManager.addImage("images/objects/heart.png");
    assetManager.addImage("images/objects/score.png");
    assetManager.addImage("images/objects/upWidthRacket.png");
    assetManager.addImage("images/objects/shield.png");

    assetManager.addSound("sounds/arkanoid_brique_dure.wav");
    assetManager.addSound("sounds/arkanoid_perdu2.wav");
    assetManager.addSound("sounds/arkanoid_raquette.wav");
    assetManager.addSound("sounds/brickCollision.wav");
    assetManager.addSound("sounds/sfx_coin_double1.wav");
    assetManager.addSound("sounds/sfx_coin_double2.wav");


    assetManager.start(startGame);

}

function startGame(){

    gameplayService.setCanvas(canvas);
    gameplayService.setAssetManager(assetManager);
    gameplayService.setGuiManager(guiManager);

    sceneLoader.load(gameplayService);
    sceneLoader.init("menu");
    
    bGameReady=true;
}

function update(dt){

    if(!bGameReady){
        return;
    }

    sceneLoader.update(dt);
}

function draw(pCtx){
    
    if(!bGameReady){
        return;
    }

    sceneLoader.draw(pCtx);

}