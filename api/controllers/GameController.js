/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(reg, res){
        reg.paramsAll();
        if (typeof values.players === 'undefined'|| values.players.length >= 2) {
            var error = 'Minimum 2 players.';
            return res.badRequest();
        } else{
            return res.ok(game.toJson());
        }
    }
};

