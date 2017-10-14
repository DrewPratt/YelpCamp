const express = require("express"),
    router = express.Router();
const Campground = require("../models/campground"),
    Comment = require("../models/comment");

////ROOT ROUTE////
router.get("/", function(req, res) {
    res.render("landing");
});

////AUTH ROUTES////
//register form
router.get("/register", function(req, res) {
    res.render("register");
});

//sign up POST logic
router.post("/register", function(req, res) {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            res.render("register", {error: err.message});
        } else {
        passport.authenticate("local")(req, res, function() {
            req.flash('success', "Welcome to Drew Camp " + user.username);
            res.redirect("/campgrounds");
        
        });
    }
    });
});

//login form
router.get("/login", function(req, res) {
    res.render("login");
});

//login logic
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: "Invalid Username"
    }),
    function(req, res) {}
);

//logout route
router.get("/logout", function(req, res) {
    // let username = req.user.username;
    req.flash('success', 'I said good DAY ' + req.user.username);
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;
