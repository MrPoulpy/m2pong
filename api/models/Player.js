/**
* Player.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name:{
          type: 'string',
          required: true,
          size:3
      },
      human:{
          type:'boolean',
          defaultsTo:false
      },
      life:{
          type:'integer',
          defaultsTo:10
      },
      color:{
          type:'string',
          size:6
      },
      paddle:{
          model:'paddle'
      },
      game:{
          model:'game'
      }

  }
};

