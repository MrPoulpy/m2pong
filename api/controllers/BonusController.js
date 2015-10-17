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
			return res.ok({
				value: found
			});
			// res.view('bonus',{'bonus':found});
		});

	}
	// Article.find({}, function(err, found){
 //        			res.view( 'articles', {articles: found} );
 //    		});
};
