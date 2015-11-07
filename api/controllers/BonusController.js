/**
 * BonusController
 *
 * @description :: Server-side logic for managing bonuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addBonus: function(req,res){
		Bonus.create( {	name:req.param('name'), // req.param("")
						target:req.param('target'),
						param:req.param('param'),
						action:req.param('action')}, 
			function(err,created){
				if(!err){
					return res.ok({
						value: "Bonus "+created.name+" créé !"
					});
				}else{
					return err ;
				}
		});
	},

	getAllBonus: function(req,res){
		Bonus.find({}, function(err,found){
			res.view('bonus',{'bonus':found});
		});
	},

	emitBonus: function(req,res){
		// Get all bonus
		Bonus.find({},function(err,found){
			// Random bonus
			bonus = found[Math.floor(Math.random() * found.length)]
			idBonus = bonus.id ;
			nameBonus = bonus.name ;

			// Ramdom position
			posX = Math.floor(Math.random() * (50))	// 50 valeur max en x et y à récupérer
			posY = Math.floor(Math.random() * (50))

			// Emit
			dataBonus = {"bonus": {
								"id":idBonus,
								"name":nameBonus
							},
						 "position": {
						 		"x":posX,
						 		"y":posY
						 	}
						}
			console.log(dataBonus);
			var friendId = req.param('friendId');
		    sails.sockets.emit(friendId, 'emitBonus', dataBonus);
		    res.json({
		      message: 'Bonus sent !'
		    });

		});

		return res.ok({
			value: "Bonus envoyé !"
		});
	},

	getBonusById: function(req,res) {
		// TODO
	},

	removeBonusByName: function(req,res){
		Bonus.destroy({name:req.param('name')}).exec(function (err){
		  console.log('The bonus has been deleted');
		});
	}


};
