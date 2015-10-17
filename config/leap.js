var leap1 = require('socket.io-client')('http://10.33.32.46:1337');
var leap2 = require('socket.io-client')('http://10.33.32.45:1337');
var leap3 = require('socket.io-client')('http://10.33.32.21:1337');
var leap4 = require('socket.io-client')('http://10.33.32.35:1337');

var gameCtrl = require('../api/controllers/GameController');


/**
 * Event handpos
 * Get the position of the hand
 */
leap1.on('handpos',function(data){
    console.log(data)
});
leap2.on('handpos',function(data){
    console.log(data);
});

leap3.on('handpos',function(data){
    console.log(data);
});

leap4.on('handpos',function(data){
    console.log(data);
});

/**
 * Event detected
 * Get whether user is detected to play
 * The user is detected it remains 3 seconds above leap
 * Displays the keyboard later
 */
leap1.on('detected',function(data){
    gameCtrl.detected(data);
});
leap2.on('detected',function(data){
    gameCtrl.detected(data);
});

leap3.on('detected',function(data){
    gameCtrl.detected(data);
});

leap4.on('detected',function(data){
    gameCtrl.detected(data);
});


/**
 * Event ready
 * Get whether user is ready to play
 *
 */
leap1.on('ready',function(data){
    gameCtrl.ready(data);
});
leap2.on('ready',function(data){
    gameCtrl.ready(data);
});

leap3.on('ready',function(data){
    gameCtrl.ready(data);
});

leap4.on('ready',function(data){
    gameCtrl.ready(data);
});

/**
 * Event quit
 * Get whether user is quit the menu
 *
 */
leap1.on('quit',function(data){
    gameCtrl.quit(data);
});
leap2.on('quit',function(data){
    gameCtrl.quit(data);
});

leap3.on('quit',function(data){
    gameCtrl.quit(data);
});

leap4.on('quit',function(data){
    gameCtrl.quit(data);
});

/**
 * Event leave
 * Get whether user is quit the menu
 *
 */
leap1.on('leave',function(data){
    gameCtrl.leave(data);
});
leap2.on('leave',function(data){
    gameCtrl.leave(data);
});

leap3.on('leave',function(data){
    gameCtrl.leave(data);
});

leap4.on('leave',function(data){
    gameCtrl.leave(data);
});


/**
 * Event startPlay
 * Emit the possibility of starting the game
 */

/**
 * Event endPlay
 * Emit the possibility of starting the game
 */

