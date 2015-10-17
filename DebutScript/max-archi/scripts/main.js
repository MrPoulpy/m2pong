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
      bg : { src : 'sprites/map.png', id : 'bg' },
      main : { src : 'sprites/main.png', id : 'main' },
      startB : { src : 'sprites/startB.png', id : 'startB' },
      creditsB : { src : 'sprites/creditsB.png', id : 'creditsB' },
      creditsView : { src : 'sprites/credits.png', id : 'credits' },
      paddleLeft : { src : 'sprites/paddle_left.png', id : 'paddle_left' },
      paddleRight : { src : 'sprites/paddle_right.png', id : 'paddle_right' },
      paddleCenter : { src : 'sprites/paddle_center.png', id : 'paddle_center' },
      ball : { src : 'sprites/ball.png', id : 'ball' },
      win : { src : 'sprites/win.png', id : 'win' },
      lose : { src : 'sprites/lose.png', id : 'lose' }
    },
    //Frames per second
    fps : 30,
    gamevar : {
      limit : 20
    }
  }

  //Définition des variables utiles
  this.stage;
  this.canvas = document.getElementById('canvasPong');
  this.manifest;
  this.tkr;
  this.player = this.ball = {x:0,y:0};
  this.playerScore = new Text('0', 'bold 20px Arial', '#A3FF24');

  this.resLoaded = 0;

  this.gfx = new Array();
  
  this.TitleView = new createjs.Container();
  this.GameView = new createjs.Container();

  //Merge les paramètres de partie avec la config de base
  jQuery.extend(params, this.config);

/* *****************************************************************************
                       launch() -> initialisation jeu
***************************************************************************** */
  this.launch = function(){
    console.log('PongGame App : launched');

    //Récupération du canvas
    this.stage = new createjs.Stage(this.canvas.id);
    this.stage.mouseEventsEnabled = true;

    //Lancement du défilement de frames
    this.setTicker();

    //Chargement des sprites
    this.loadGfx();
  }

/* *****************************************************************************
                       setTicker() -> initialisation fps
***************************************************************************** */
  this.setTicker = function(){
    //add Ticker
    createjs.Ticker.on("tick", this.tick, this);
    createjs.Ticker.setFPS(this.config.fps);
    createjs.Ticker.addEventListener(this.stage);
  }

  this.tick = function(event){
    this.stage.update(event);
  }

/* *****************************************************************************
                        loadGfx() -> preloading des sprites
***************************************************************************** */
  this.loadGfx = function(){
    var s = this.config.sprites;
    this.manifest = [s.bg, s.main, s.startB, s.creditsB, s.creditsView, s.paddleLeft, s.paddleRight, s.paddleCenter, s.ball, s.win, s.lose];

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
      // console.log(event.item.src);
      // console.log(event.item.id);
      var img = new createjs.Bitmap();
      img.src = event.item.src;

      img.onload = this.handleLoadComplete;
      this.gfx[event.item.id] = new createjs.Bitmap(img.src);
      this.gfx[event.item.id].name = event.item.id;

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
    this.gfx['startB'].x = (this.canvas.width - this.gfx['startB'].image.width)/2;
    this.gfx['startB'].y = (this.canvas.height - this.gfx['startB'].image.height)/2;

    this.gfx['main'].x = (this.canvas.width - this.gfx['main'].image.width)/2;
    this.gfx['main'].y = 20;

    this.TitleView.addChild(this.gfx['main'], this.gfx['startB']);

    this.stage.addChild(this.gfx['bg'], this.TitleView);
    this.stage.update();

    //Handlers
    var that = this;
    this.TitleView.on("click", this.tweenTitleView, this);
  }

  // this.addCreditsView = function(){
  //   console.log('addCreditsView()');
  //   this.credits.x = 480;

  //   this.stage.addChild(this.gfx['credits']);
  //   this.stage.update();
  //   createjs.Tween.get(this.gfx['credits']).to({x:0}, 300);
  //   this.credits.onPress = this.hideCredits;
  // }

  // this.removeCreditsView = function(){
  //   console.log('removeCreditsView()');
  //   createjs.Tween.get(this.gfx['credits']).to({x:480}, 300).call(this.rmvCredits, [], this);
  // }

  // this.rmvCredits = function(){
  //   console.log('rmvCredits()');
  //   this.stage.removeChild(this.gfx['credits']);
  // }

  this.tweenTitleView = function(){
    console.log('tweenTitleView()');
    createjs.Tween.get(this.TitleView).to({x:-500}, 500).call(this.addGameView, [], this);
  }

  this.addGameView = function(){
    console.log('addGameView()');
    // Enlever le Menu & Credits si présents
    this.stage.removeChild(this.TitleView);
    this.TitleView = null;

    //Construction gfx player 
    this.gfx['player'] = new createjs.Container();
    this.gfx['player'].addChild(
      this.gfx['paddle_left'],
      this.gfx['paddle_center'],
      this.gfx['paddle_right']);

    //Alimentation variables
    this.player = this.gfx['player'];
    this.ball = this.gfx['ball'];


    this.gfx['paddle_left'].x = -10;
    this.gfx['paddle_center'].scaleX = 150;
    this.gfx['paddle_right'].x = 150;

    // Ajout des positions
    this.gfx['player'].x = this.config.gamevar.limit;
    this.gfx['player'].y = this.config.gamevar.limit;

    this.gfx['player'].x = this.config.gamevar.limit;
    this.gfx['player'].y = this.canvas.height - this.gfx['paddle_center'].image.height - this.config.gamevar.limit;

    this.gfx['ball'].x = 240 - 15;
    this.gfx['ball'].y = 160 - 15;

    // Score
    this.playerScore.x = 211;
    this.playerScore.y = 20;

    this.GameView.addChild(this.gfx['player'], this.gfx['ball']);

    // Handle Events
    this.startGame();
  }

  this.startGame = function(e){
    console.log('startGame()');
    console.log(this.stage);
    this.stage.addChild(this.GameView);
    this.stage.addEventListener("mousemove", this.movePaddle);
    // this.stage.onMouseMove = this.movePaddle;
    

    // Setup Leap loop with frame callback function
  var controllerOptions = {enableGestures: true};

    Leap.loop(controllerOptions, function(frame) {

      if (frame.hands.length > 0) {
        mouse.x = frame.hands[0].palmPosition[0]+200;
        mouse.y = frame.hands[0].palmPosition[1];
      }

      for (var i = 0; i < frame.gestures.length; i++) {
          var gesture = frame.gestures[i];
          //if(gesture.type == "screenTap" && over == 0){
          if(frame.hands[0].palmPosition[1] < 80 && play == 0){
            animloop();
            // Delete the start button after clicking it
            startBtn = {};
            play = 1;
          }
        console.log(play);
      }
    }); 
    
  }

  this.movePaddle = function(e){
    console.log('movePaddle()');
    this.player.y = e.stageY;
  }

  this.resetloop = function(){
    console.log('tick()');
    this.ball.x = 240 - 15;
    this.ball.y = 160 - 15;
    this.player.y = 160 - 37.5;

    //this.stage.onMouseMove = null;
    createjs.Ticker.removeEventListener(this.tkr);
    //this.stage.addEventListener("click", this.startGame);
  }

  this.alertScreen = function(e){
    console.log('alertScreen()');
    createjs.Ticker.removeEventListener(this.tkr);
    // this.stage.onMouseMove = null;
    // this.bg.onPress = null;

    // if(e == 'win'){
    //   this.win.x = 140;
    //   this.win.y = -90;

    //   this.stage.addchild(this.win);
    //   createjs.Tween.get(this.win).to({y:115}, 300);
    // }else{
    //   this.lose.x = 140;
    //   this.lose.y = -90;

    //   this.stage.addChild(this.lose);
    //   createjs.Tween.get(this.lose).to({y:115}, 300);
    // }
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
        this.resetloop();
    }
     
    /* Player collision */
    if(this.ball.x <= this.player.x + 22 && this.ball.x > this.player.x && this.ball.y >= this.player.y && this.ball.y < this.player.y + 75){
        xSpeed *= -1;
    }
     
    /* Stop Paddle from going out of canvas */
    if(this.player.y >= 249){
        this.player.y = 249;
    }
    
    /* Check for Win */
    if(this.playerScore.text == '10'){
        alert('win');
    }
     
  
  }

  createjs.EventDispatcher.initialize(PongGame.prototype);
};