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
    }
};

