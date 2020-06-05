const express = require("express");
const router = express.Router();

const TourModel = require("../models/tour.model");

//VENUE HOMEPAGE
router.get("/home/venue", (req, res) => {
    let venueData = req.session.loggedInUser
    TourModel.find()
        .then((tourData) => {
            res.render("users/venue/venue-home.hbs", { venueData, tourData })
        })
        .catch (() => {
            res.send('Unable to view venue homepage')
        })
});

//VENUE->TOUR PAGE
router.get("/home/venue/:tour", (req, res) => {
    let venueData = req.session.loggedInUser
    let tourId = req.params.tourId;
    TourModel.findById(tourId)
        .then((tourData) => {
            res.render("users/venue/venue-tour.hbs", { venueData, tourData });
        })
        .catch (() => {
            res.send('Unable to view tour')
        })
});

//VENUE->TOUR CONTACT FORM PAGE
router.post("/home/venue/:tour", (req, res) => {
    let tourId = req.params.tourId;
    TourModel.findByIdAndUpdate(tourId, {$set: {contactedByVenue: true}})
        .then(() => {
            res.redirect("/home/venue");
        })
        .catch (() => {
            res.send('Unable to contact tour')
        })
});

//VENUE PROFILE
router.get("/profile/venue", (req, res) => {
  res.render("users/venue-profile.hbs", {
    venueData: req.session.loggedInUser,
  });
});

module.exports = router;
