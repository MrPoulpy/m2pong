/**
 * Ball.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        velocity: {
            type: 'float'
        },
        color: {
            type: 'string',
            size: 6
        },
        img: {
            type: 'string',
            size: 255
        },
        game:{
            model:'game'
        }
    }
};

