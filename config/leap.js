var denis = require('socket.io-client')('http://10.33.32.46:1337');
var magger = require('socket.io-client')('http://10.33.32.45:1337');
var rosa = require('socket.io-client')('http://10.33.32.21:1337');

denis.on('handpos',function(data){
    console.log(data);
});
magger.on('handpos',function(data){
    console.log(data);
});

rosa.on('handpos',function(data){
    console.log(data);
});