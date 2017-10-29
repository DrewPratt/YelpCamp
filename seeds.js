let mongoose 		= require('mongoose'),
	Campground 		= require('./models/campground'),
	Comment			= require('./models/comment');


let data = [
	{
	 name: 'Camp Uno', 
	 image: 'https://cdn.shopify.com/s/files/1/0795/3649/files/Camping-Near-The-Lake-Background-Wallpaper.jpg?10608747750552098607',
	 description: "Long clothes fathom topmast rope's end Davy Jones' Locker list cackle fruit maroon carouser gangplank. Gaff yawl deadlights wherry rutters aft six pounders line Spanish Main me. Port draught hail-shot topsail scuppers black jack yardarm plunder capstan blow the man down."
	},
	{
	 name: 'Camp dos', 
	 image: 'http://www.jefklak.com/wp-content/uploads/2014/11/camping-alone1.jpg',
	 description: "Piracy gabion heave to long clothes long boat salmagundi lookout walk the plank splice the main brace Sail ho. Bounty cog hang the jib Pirate Round avast topsail black spot spanker execution dock furl. Trysail Nelsons folly walk the plank parrel American Main spike hardtack salmagundi wherry execution dock."
	},
	{
	 name: 'Camp tres', 
	 image: 'http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg',
	 description: "Scallywag careen chase reef sails Admiral of the Black pressgang spanker handsomely bring a spring upon her cable hempen halter. Belay schooner landlubber or just lubber Davy Jones' Locker Shiver me timbers avast gun spanker overhaul belaying pin. Crow's nest lad shrouds swab plunder black spot smartly Gold Road cutlass pinnace."
	}
];


function seedDB(){	
	//removes all campgrounds
	Campground.remove({}, function (err, campground){
		if(err){
			console.log(err);
		} else {
			console.log("removed campgrounds");
			// add a few campgrounds as seeds
			data.forEach(function (seed) {
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					} else {
						console.log('added a campground');
						//create comment
						Comment.create(
							{
								text: 'this place is great but...',
								author: 'homer'
							}, function(err, comment){
								if(err){
									console.log(err);
								} else {
									campground.comments.push(comment);
									campground.save();
									console.log('comment added');
								}
							})
					}
				})

			});
		}
	});
	
	// add a few comments for tests
}


module.exports = seedDB;