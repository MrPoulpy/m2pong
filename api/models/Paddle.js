/**
 * Paddle.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        size: {
            type: 'float'
        },
        inverse: {
            type: 'boolean',
            defaultsTo: false
        },
        sticky: {
            type: 'boolean',
            defaultsTo: false
        },
        rotable:{
            type:'boolean',
            defaultsTo: false
        }
    }
};

