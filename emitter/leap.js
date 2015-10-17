/**
 * Nodejs emitter for leapjs pong
 * @event detected : when the player keeps his hand still for at least 3 seconds
 * @event ready : when the player swipes down in the menu
 * @event quit : when the player leaves for at least 10 seconds in the menu
 * @event leave : when the player leaves during the game
 * @event handpos : data from the hand
 */


/**
 * @type {string} device_name : Device's name. Must be unique.
 */
var device_name = "denis";

var Leap = require('leapjs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var controller = new Leap.Controller({enableGestures: true});

io.on('connection', function (socket) {
    console.log('Client connecté.');
});

http.listen(1337, function(){
    console.log('Ecoute le *:1337');
});


/**
 * Events for server on game start and game over
 * @type {boolean}isGame :  Whether game in launched or not
 */
var isGame = false;

io.on('startPlay', function(socket) {
    isGame = true;
});

io.on('endPlay', function(socket) {
    isGame = false;
});


var isPresent = false;
var isReady = false;
var cooldown = -1;
var device = {device: device_name};

controller.loop(function(frame) {
    if (frame.hands[0]) {
        posx = frame.hands[0].palmPosition[0].fromToScale(-300, 300, -50, 50);
        posy = frame.hands[0].palmPosition[1].fromToScale(-300, 300, 0, 10);
        incl = -Math.round(frame.hands[0].roll() * (1 / (Math.PI / 180)));

        if (frame.hands[0].timeVisible > 3) {
            if(!isPresent){
                isPresent = true;
                io.emit('detected', device);
            }
            cooldown = 500;
        }

        if (frame.gestures.length > 0 && isPresent) {
            for (var i = 0; i < frame.gestures.length; i++) {
                var gesture = frame.gestures[i];
                if (gesture.type == "swipe") {
                    var isVertical = Math.abs(gesture.direction[0]) < Math.abs(gesture.direction[1]);
                    if (isVertical && gesture.direction[1] < 0) {
                        isReady = true;
                        if (!isGame){
                            io.emit('ready', device);
                        }
                    }
                }
            }
        }

        if (isPresent) {
            var data = {device: device_name, pos: {x: posx, y: posy}, roll: incl};
            io.emit('handpos', data);
        }
    } else if (cooldown != -1) {
        cooldown--;
        if (cooldown == 0 && !isGame) {
            io.emit('quit', device);
            isPresent = false;
            isReady = false;
        } else if (cooldown == 0 && isGame) {
            io.emit('leave', device);
            isPresent = false;
            isReady = false;
        }
    }

});

/**
 * Extends number, scale values as wanted
 * @param {float} fromStart
 * @param {float} fromEnd
 * @param {float} toStart
 * @param {float} toEnd
 * @returns {float} val
 */
Number.prototype.fromToScale = function(fromStart, fromEnd, toStart, toEnd) {
    var i = (this - Math.min(fromStart, fromEnd)) / (Math.max(fromStart, fromEnd) - Math.min(fromStart, fromEnd));
    if (i > 1) return 1;
    if (i < 0) return 0;

    var val = i * (Math.max(toStart, toEnd) - Math.min(toStart, toEnd)) + Math.min(toStart, toEnd);
    if (val > toEnd) return toEnd;
    if (val < toStart) return toStart;

    return val;
};
