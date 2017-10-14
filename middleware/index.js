// middleware app
const   Campground  = require('../models/campground'),
        Comment     = require('../models/comment');
const middlewareObj = {};

//check campground authorization
middlewareObj.campAuthTest = function (req, res, next){
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function (err, foundCamp ){
			if (err) {
				req.flash('error', 'campground not found');
				res.redirect('back');
			} else {
				//does user own campground?
				if (foundCamp.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'You do not have permission.')
					res.redirect('back');
				}
			}
		})
	} else {
		req.flash('error', 'You need to be logged in.');
		// FIXME: redirect goes to landing page, not previous page;
		res.redirect('back');
	}
}

//check comment authorization
middlewareObj.commentAuthTest = function (req, res, next){
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment ){
			if (err) {
				res.redirect('back');
			} else {
				//does user own campground?
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have permission.")
					res.redirect('back');
				}
			}
		})
	} else {
		req.flash('error', 'you need to be logged in');
		res.redirect('back');
	}
}

//check for logged in
middlewareObj.isLoggedIn = function (req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	req.flash('error', 'Please log in:');
	res.redirect('/login');
}
module.exports = middlewareObj