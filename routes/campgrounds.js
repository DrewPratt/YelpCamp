
const express   = require('express'),
      router    = express.Router();
      
const Campground = require('../models/campground'),
	  middleware = require('../middleware');
      

//index route
router.get('/', function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('campgrounds/index', {campgrounds: allCampgrounds});
		}
	})
})
// new route
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('campgrounds/new');
})


// create route
router.post('/', middleware.isLoggedIn, function(req, res){
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let price = req.body.price;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCamp = {name: name, image: image, description: desc, price: price, author: author};
	Campground.create(newCamp, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// console.log(newlyCreated);
			req.flash('success', "New campground created!")
			res.redirect('/campgrounds');	
		}
	})
})

// show route
router.get('/:id', function(req, res){
	let campId = req.params.id;
	Campground.findById(campId).populate('comments').exec(function(err, foundCamp){
			if (err){
			console.log(err);
		} else {
			// console.log(foundCamp);
		res.render('campgrounds/show', {campground: foundCamp});
		}
	})
})
// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.campAuthTest, function(req, res){
	Campground.findById(req.params.id, function (err, editCamp ){
		res.render('campgrounds/edit', {campground: editCamp});
	})	
})
// UPDATE CAMPGROUD ROUTE
router.put('/:id', middleware.campAuthTest, function(req, res){
		Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground){
			if (err) {
				console.log(err);
				res.redirect('/');
			} else {
				res.redirect('/campgrounds/' + req.params.id);
			};
		})
})

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.campAuthTest, function(req, res){
	Campground.findByIdAndRemove(req.params.id ,function (err){
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		};
	});
})

module.exports = router;