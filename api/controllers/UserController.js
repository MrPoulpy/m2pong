/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    test: function (req,res){
        return res.ok({
            value: 'it works'
        })
    },
    testA: function(req,res){
        return res.ok({
            value: 'it works also on post'
        })
    },
    findByPet: function(req,res){
      Pet.findOne({id:req.param('pet',1)}).populate('owner').exec(function(err,pet){
          if(err){
            return   res.notFound()
          }
          res.ok(pet);
      })
    },
};

