const express = require("express");
const router = express.Router();
const VenueModel = require("../models/venue.model");
const TourModel = require("../models/tour.model");

//VENUE PROFILE
router.get("/home/venue/profile", (req, res) => {
  res.render("users/venue/venue-profile.hbs", {
    layout: "venue-layout",
    venueData: req.session.loggedInUser,
  });
});

//VENUE PROFILE FORM POST
router.post("/home/venue/profile", (req, res) => {
  let venueData = req.session.loggedInUser;
  const {
    phoneNumber,
    type,
    genre,
    description,
    capacity,
    isAvailable,
    backline,
    food,
    imgUrl,
  } = req.body;

  //LOOK FOR VENUE AND UPDATE THE MODEL
  VenueModel.findByIdAndUpdate(venueData._id, {
    phoneNumber,
    type,
    genre,
    description,
    capacity,
    isAvailable,
    backline,
    food,
    imgUrl,
  }).then((result) => {
    VenueModel.findById(venueData._id).then((newResult) => {
      req.session.loggedInUser = newResult;
      console.log(newResult);
      res.redirect("/home/venue/profile");
    });
  });
});

//VENUE HOMEPAGE
router.get("/home/venue", (req, res) => {
  let venueData = req.session.loggedInUser;

  //FIND TOURS THAT WILL BE VISITING VENUE'S CITY
  TourModel.find({
    "cities.name": venueData.cityName,
    "cities.selectedVenue": { $in: null },
  })
    .then((tourData) => {
      //console.log(tourData.cities)
      tourData = tourData.map((tour) => {
        tour.cities.forEach((city) => {
          if (city.name === venueData.cityName && city.contactedByVenue) {
            city.isSameCity = true;
          }

          if (city.selectedVenue) {
            city.confirmed = true;

            console.log(city.selectedVenue);
          }
        });
        return tour;
      });
      //console.log(tourData)
      res.render("users/venue/venue-home.hbs", {
        layout: "venue-layout.hbs",
        venueData,
        tourData,
      });
    })
    .catch((err) => {
      console.log(err)
      res.send("Unable to view venue homepage");
    });
});

//ADD VENUE TO TOUR MODEL

router.get("/home/venue/:tour/add", (req, res) => {
  let venueData = req.session.loggedInUser;
  let tourId = req.params.tour;
  console.log(venueData.cityName);

  TourModel.update(
    { _id: tourId, "cities.name": venueData.cityName },
    { $set: { "cities.$.selectedVenue": venueData._id } }
  )
    .then((tourData) => {
      res.redirect("/home/venue");
    })

    .catch((err) => {
      console.log(err);
    });
});

//VENUE->TOUR PAGE
router.get("/home/venue/:tour", (req, res) => {
  let venueData = req.session.loggedInUser;
  let tourId = req.params.tour;

  TourModel.findById(tourId)
    .then((tourData) => {
      res.render("users/venue/venue-tour.hbs", {
        layout: "venue-layout",
        venueData,
        tourData,
      });
    })
    .catch(() => {
      res.send("Unable to view tour");
    });
});

//VENUE->TOUR CONTACT FORM PAGE
router.post("/home/venue/:tour", (req, res) => {
  let venueData = req.session.loggedInUser;
  let tourId = req.params.tour;

  TourModel.update(
    { _id: tourId, "cities.name": venueData.cityName },
    { $set: { "cities.$.contactedByVenue": true } }
  )
    .then(() => {
      res.redirect("/home/venue");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
