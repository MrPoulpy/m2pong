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

controller.loop(function(frame) {
	if (frame.hands[0]){
		posx = frame.hands[0].palmPosition[0].fromToScale(-300,300,-50,50);
		posy = frame.hands[0].palmPosition[1].fromToScale(-300,300,0,10);
		incl = -Math.round(frame.hands[0].roll() * (1 / (Math.PI / 180)));

		isReady = false;
		if (frame.gestures.length > 0) {
			for (var i = 0; i < frame.gestures.length; i++) {
				var gesture = frame.gestures[i];
				if(gesture.type == "swipe") {
					var isVertical = Math.abs(gesture.direction[0]) < Math.abs(gesture.direction[1]);
					if(isVertical && gesture.direction[1] < 0) {
						isReady = true;
					}
				}
			}
		}
		
		var data = { device: device_name, pos: { x: posx, y: posy }, start: isReady, roll: incl};

		console.log(data);
		io.emit('handpos', data );
	};
});

Number.prototype.fromToScale = function(fromStart, fromEnd, toStart, toEnd) {
	var i = (this - Math.min(fromStart, fromEnd)) / (Math.max(fromStart, fromEnd) - Math.min(fromStart, fromEnd));
	if (i > 1) return 1;
    if (i < 0) return 0;

	var val = i * (Math.max(toStart, toEnd) - Math.min(toStart, toEnd)) + Math.min(toStart, toEnd);
	if (val > toEnd) return toEnd;
	if (val < toStart) return toStart;

	return val;
};