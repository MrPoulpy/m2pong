/* *****************************************************************************
                                TOOLS
***************************************************************************** */
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

/* *****************************************************************************
                                pongGame()
***************************************************************************** */
var PongGame = function(params){
  
  //Constructeur
  this.constructor = PongGame;
  //Config par défaut
  this.config = {
    ball : {
      xSpeed : 5,
      ySpeed : 5,
      gfxLoaded : 0
    },
    //Sprites par défaut
    sprites : {
      bg : { src : 'sprites/bg.png', id : 'bg' },
      main : { src : 'sprites/main.png', id : 'main' },
      startB : { src : 'sprites/startB.png', id : 'startB' },
      creditsB : { src : 'sprites/creditsB.png', id : 'creditsB' },
      creditsView : { src : 'sprites/credits.png', id : 'credits' },
      player : { src : 'sprites/paddle.png', id : 'paddle' },
      ball : { src : 'sprites/ball.png', id : 'ball' },
      win : { src : 'sprites/win.png', id : 'win' },
      lose : { src : 'sprites/lose.png', id : 'lose' }
    },
    //Frames per second
    fps : 30
  }

  //Définition des variables utiles
  this.stage;
  this.canvas;
  this.manifest;
  this.tkr;

  this.resLoaded = 0;

  this.bgImg = new Image();
  this.bg = {x:0, y:0};

  this.mainImg = new Image();
  this.main = {x:0, y:0};

  this.startBImg = new Image();
  this.startB = {x:0, y:0};

  this.creditsBImg = new Image();
  this.creditsB = {x:0, y:0}

  this.TitleView = new createjs.Container();

  this.creditsViewImg = new Image();
  this.credits = {x:0, y:0};

  this.playerImg = new Image();
  this.player = {x:0, y:0};

  this.ballImg = new Image();
  this.ball = {x:0, y:0};

  this.winImg = new Image();
  this.win = {x:0, y:0};

  this.loseImg = new Image();
  this.lose = {x:0, y:0};

  this.playerScores = new Array();

  //Merge les paramètres de partie avec la config de base
  jQuery.extend(params, this.config);

/* *****************************************************************************
                       launch() -> initialisation jeu
***************************************************************************** */
  this.launch = function(){
    console.log('PongGame working =D');

    //Récupération du canvas
    this.canvas = document.getElementById('canvasPong');
    this.stage = new createjs.Stage(this.canvas);
    this.stage.mouseEventsEnabled = true;

    //Chargement des sprites
    this.loadGfx();

    //Lancement du défilement de frames
    this.setTicker();
  }

/* *****************************************************************************
                       setTicker() -> initialisation fps
***************************************************************************** */
  this.setTicker = function(){
    createjs.Ticker.setFPS(this.config.fps);
    createjs.Ticker.addEventListener(this.stage);
  }

/* *****************************************************************************
                        loadGfx() -> preloading des sprites
***************************************************************************** */
  this.loadGfx = function(){
    var s = this.config.sprites;
    this.manifest = [s.bg, s.main, s.startB, s.creditsB, s.creditsView, s.player, s.ball, s.win, s.lose];

    this.queue = new createjs.LoadQueue();
    this.queue.on("progress", this.handleProgress, this);
    this.queue.on("complete", this.handleComplete, this);
    this.queue.on("fileload", this.handleFileLoad, this);

    this.queue.loadManifest(this.manifest);
  }

/* *****************************************************************************
      handleProgress(), handleComplete(), ... -> Préchargement Sprites
***************************************************************************** */
  //handleProgress -> event.loaded = percentage loading
  this.handleProgress = function(event){
  }

  //handlecomplete() -> fired when loading is complete
  this.handleComplete = function(event){
    
  }

  //handleFileLoad() -> fired when each upload is processing
  this.handleFileLoad = function(event){
    if(event.item.type == createjs.LoadQueue.IMAGE){
      var img = new createjs.Bitmap();
      img.src = event.src;
      img.onload = this.handleLoadComplete;
      window[event.id] = new createjs.Bitmap(img);
      this.handleLoadComplete();
    }
  }

  //handleLoadComplete -> fired when each upload is finished
  this.handleLoadComplete = function(event){
    this.resLoaded++;
    if(this.manifest.length == this.resLoaded){
      //Téléchargement de l'ensemble des données complété
      this.addTitleView();
    }
  }

/* *****************************************************************************
                addTitleView() ->  Affichage de l'écran titre
***************************************************************************** */
  this.addTitleView = function(){
    var that = this;
    console.log("addtitle");
    this.startB.x = 0;
    this.startB.y = 0;
    this.startB.name = 'startB';

    this.creditsB.x = 0;
    this.creditsB.y = 0;

    createjs.EventDispatcher.initialize(this.TitleView);
    this.TitleView.addChild(this.main, this.startB, this.creditsB);

    this.stage.addChild(this.bg, this.TitleView);
    this.stage.update();

    // Ecouteurs boutons Menu
    this.startB.onPress = this.tweenTitleView;
    this.creditsB.onPress = this.addCreditsView;
  }

  this.addCreditsView = function(){
    this.credits.x = 480;

    this.stage.addChild(this.credits);
    this.stage.update();
    createjs.Tween.get(this.credits).to({x:0}, 300);
    this.credits.onPress = this.hideCredits;
  }

  this.removeCreditsView = function(){
    createjs.Tween.get(this.credits).to({x:480}, 300).call(this.rmvCredits);
  }

  this.rmvCredits = function(){
    this.stage.removeChild(this.credits);
  }

  this.tweenTitleView = function(){
    createjs.Tween.get(this.TitleView).to({y:-320}, 300).call(this.addGameView);
  }

  this.addGameView = function(){
    // Enlever le Menu & Credits si présents
    this.stage.removeChild(this.TitleView);
    this.TitleView = null;
    this.credits = null;

    // Ajout des positions
    this.player.x = 2;
    this.player.y = 160 - 37.5;
    this.player2.x = 2;
    this.player2.y = 612 -100;
    this.ball.x = 240 - 15;
    this.ball.y = 160 - 15;

    // Score
    this.playerScore = new Text('0', 'bold 20px Arial', '#A3FF24');
    this.playerScore.x = 211;
    this.playerScore.y = 20;

    this.player2Score = new Text('0', 'bold 20px Arial', '#A3FF24');
    this.player2Score.x = 262;
    this.player2Score.y = 20;

    // Handle Events
    this.bg.onPress = this.startGame;
  }

  this.startGame = function(e){
    this.bg.onPress = null;
    this.stage.onMouseMove = this.movePaddle;

    createjs.Ticker.addListener(this.tkr, false);
    this.tkr.tick = update;
  }

  this.movePaddle = function(e){
    this.player.y = e.stageY;
  }

  this.reset = function(){
    this.ball.x = 240 - 15;
    this.ball.y = 160 - 15;
    this.player.y = 160 - 37.5;
    this.player2.y = 160 - 37.5;

    this.stage.onMouseMove = null;
    createjs.Ticker.removeListener(this.tkr);
    this.bg.onPress = this.startGame;
  }

  this.alertScreen = function(e){
    createjs.Ticker.removeListener(this.tkr);
    this.stage.onMouseMove = null;
    this.bg.onPress = null;

    if(e == 'win'){
      this.win.x = 140;
      this.win.y = -90;

      this.stage.addchild(this.win);
      createjs.Tween.get(this.win).to({y:115}, 300);
    }else{
      this.lose.x = 140;
      this.lose.y = -90;

      this.stage.addChild(this.lose);
      createjs.Tween.get(this.lose).to({y:115}, 300);
    }
  }

  this.update = function(){
    var cb = this.config.ball;
    var xSpeed = cb.xSpeed;
    var ySpeed = cb.ySpeed;

    // Ball movement
    this.ball.x = this.ball.x + xSpeed;
    this.ball.y = this.ball.y + ySpeed;

    // Wall Collision 
    //Up
    if((this.ball.y) < 0) { ySpeed = -ySpeed }; 
    //Down
    if((this.ball.y + (30)) > 320) { ySpeed = -ySpeed }; 
     
    /* Player Score */
    if((this.ball.x + (30)) > 480){
        xSpeed = -xSpeed;
        this.playerScore.text = parseInt(this.playerScore.text + 1);
        reset();
    }
     
    /* Cpu collision */
    if(ball.x + 30 > cpu.x && ball.x + 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75){
        xSpeed *= -1;
    }
     
    /* Player collision */
    if(ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75){
        xSpeed *= -1;
    }
     
    /* Stop Paddle from going out of canvas */
    if(player.y >= 249){
        player.y = 249;
    }
     
    /* Check for Win */
    if(playerScore.text == '10'){
        alert('win');
    }
     
    /* Check for Game Over */
    if(cpuScore.text == '10'){
        alert('lose');
    }
  
  }
};