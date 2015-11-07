/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

require('../models/Player');
module.exports = {

    //create: function(req, res){
    //    req.paramsAll();
    //    if (typeof values.players === 'undefined'|| values.players.length >= 2) {
    //        var error = 'Minimum 2 players.';
    //        return res.badRequest();
    //    } else {
    //        return res.ok(game.toJson());
    //    }
    //}
    init: function(){
        Game.create({
            date: new Date(),
            players: [],
            balls: []
        }).exec(function success(err,game) {
            if(err)
                console.log(err);
            console.log(game);
            console.log(game.date);
            console.log(game.players);
            console.log(game.balls);
        })
    },
    detected: function(data){
        console.log('detected');
        //console.log(data);
    },
    ready: function(data){
        console.log('ready');
        //console.log(data);
    },
    quit: function(data){
        console.log('quit');
        //console.log(data);
    },
    leave: function(data){
        console.log('leave');
        //console.log(data);
    },
    addPlayer: function(data){
        return res.view('homepage')
    },
    lol: function(data){
        console.log(data)
    }
};

