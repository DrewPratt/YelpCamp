//Udemy YelpCamp app
///////////////////////////////////

//required packages
const express 				= require('express'),
	  expressSession		= require('express-session')
	  bodyParser 			= require('body-parser'),
	  passport 				= require('passport'),
	  LocalStrategy 		= require('passport-local'),
	  passportLocalMongoose = require('passport-local-mongoose'),
	  flash					= require('connect-flash'),
	  mongoose 				= require('mongoose'),
	  methodOverride		= require('method-override'),
	  Campground 			= require('./models/campground'),
	  User 					= require('./models/user'),
	  Comment				= require('./models/comment');
	//   seedDB 				= require('./seeds');
const app 					= express();
	  //required external route files
const campgroundRoutes		= require('./routes/campgrounds'),
	  commentRoutes			= require('./routes/comments'),
	  indexRoutes			= require('./routes/index');

// seedDB();

// mongoose.connect('mongodb://localhost/drew_camp');
mongoose.connect('mongodb://Drew:campy@ds239965.mlab.com:39965/drewcamp');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
//app.use(express.static('public/imgs'))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());

//passport config:
app.use(expressSession({
	secret: "Oh what a lovely little tea party.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3100, function(req, res){
	console.log('Get your motor RUNNIN!');
})
