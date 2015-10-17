/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res){
        req.paramsAll();
        if (typeof values.players === 'undefined'|| values.players.length >= 2) {
            var error = 'Minimum 2 players.';
            return res.badRequest();
        } else {
            return res.ok(game.toJson());
        }
    },
    new_game: function(req,res){
        //res.view('new_game', {layout:'new_game'});
        return res.view('new_game');
    }
};

