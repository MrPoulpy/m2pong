/**
 * Game.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        date: {
            type: 'datetime'
        },
        players: {
            collection: 'player',
            via: 'game'
        },
        balls: {
            collection: 'ball',
            via: 'game'
        }
    },
    beforeCreate: function (values, callback) {
        if (typeof values.players === 'undefined'|| values.players.length >= 2) {
            var error = 'Minimum 2 players.';
            return callback(error);
        } else
            return callback();
    }
};

