const express = require("express");
const router = express.Router();
const MusicianModel = require("../models/musician.model");
const TourModel = require("../models/tour.model");
const VenueModel = require("../models/venue.model");
const CityModel = require("../models/city.model");

//MUSICIAN PROFILE
router.get("/profile/musician", (req, res) => {
  res.render("users/musician-profile.hbs", {
    musicianData: req.session.loggedInUser,
  });
});

//Home Route
router.get('/home/musician', (req, res) => {
 
 res.render('users/musician/musician-home.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
   
})

//Profile Route
router.get("/home/musician/profile", (req, res) => {
  res.render("users/musician/musician-profile.hbs", {
    layout: "musicianLayout.hbs",
    musicianData: req.session.loggedInUser,
  });
});

//Home Route Post
router.post('/home/musician', (req, res) => {
    let user = req.session.loggedInUser
    const {name} = req.body
    
    
    TourModel.create({name: name},)
        .then((tourData) => {
            
            MusicianModel.findByIdAndUpdate(user._id,  { $push: { tours: [tourData._id]  } })
                .then((result) => {
                    res.redirect(`/home/musician/${tourData._id}`)
                    
                })
        })
            
        .catch((err) => {
            console.log('This error is: ', err)
        })
})

//Tour Route
router.get('/home/musician/:tours', (req, res) => {
    let id = req.params.tours
    //console.log(id)
    TourModel.findById(id)
    .then((tourData)=> {
        res.render('users/musician/musician-tour.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser, tourData});
       // console.log(tourData)
    })
    .catch(() => {
        res.send('Something is wrong')
    })
  
})

// //Get City from Tour
// router.post("/home/musician/:tour", (req, res) => {
//     const { city } = req.body;
//     let id = req.params.tour;
//     let musicianData = req.session.loggedInUser;
//     VenueModel.find({cityName:city}) 
//     //test if there are more than one city
//     CityModel.count({name: city})
//         .then((cityCount)=> {
//             if(cityCount >= 1){
//                 CityModel.find({})
//                             .then((cities) => {
//                             TourModel.findById(id)
//                             .then((tourData) => {
//                                 res.render("users/musician/musician-tour.hbs", {
//                                     layout: "musicianLayout.hbs",
//                                     musicianData,
//                                     tourData,
//                                     cities,
                                     
//                                 });
//                                 });
//                                 console.log(cities)
//                         })
                        
//                         console.log(cityCount)
                        


//             } else {
//                 VenueModel.find({ cityName: city })
    
//                 .then((venues) => {
//                     CityModel.create({
//                     name: city,
//                     venues: venues,
//                     }).then(() => {
//                         CityModel.find({})
//                             .then((cities) => {
                                
//                             TourModel.findById(id).then((tourData) => {
//                                 res.render("users/musician/musician-tour.hbs", {
//                                     layout: "musicianLayout.hbs",
//                                     musicianData,
//                                     tourData,
//                                     cities,
//                                 });
//                                 });
//                         })
//                     });
//                 })
//             }
                        
//     })

    
//       .catch((err) => {
//         res.send(err);
//       });
//   });




//TOUR POST VERSION 2
router.post("/home/musician/:tourId", (req, res) => {
  const { city } = req.body;
  const { tourId } = req.params;
  let musicianData = req.session.loggedInUser;

  VenueModel.find({ cityName: city })
      .then(() => {
      TourModel.findByIdAndUpdate(tourId, {
        $push: { cities: [{ name: city }] },
      }).then(() => {
        res.redirect(`/home/musician/${tourId}`);
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

//City Route (EDIT: Might not need all code)
// router.get("/home/musician/:tour/:cityId", (req, res) => {
//   const { cityId } = req.params;

//   //GET CITY
//   CityModel.findById(cityId)
//     .then((cities) => {
//       //GET VENUE
//       VenueModel.find({ cityName: `${cities.name}` }).then((venues) => {
//         res.render("users/musician/musician-cities.hbs", {
//           layout: "musicianLayout.hbs",
//           musicianData: req.session.loggedInUser,
//           cities,
//           venues,
//         });
//         // console.log(venues)
//       });
//     })
//     .catch((err) => {
//       res.send("Something is wrong", err);
//     });
// });

//GET CITY V2
router.get("/home/musician/:tourId/:cityName", (req, res) => {
    const { tourId, cityName } = req.params;
  //LOOK THROUGH VENUES TO RENDER VENUES IN THE CORRECT CITY
  VenueModel.find({ cityName })
    .then((venues) => {
      res.render("users/musician/musician-cities.hbs", {
        layout: "musicianLayout.hbs",
        musicianData: req.session.loggedInUser, tourId, cityName, 
        venues,
      });
    })
    .catch((err) => {
      res.send("Something is wrong", err);
    });
});

//Venue Route
router.get("/home/musician/:tourId/:cityName/:venueId", (req, res) => {
  const { tourId, cityName, venueId } = req.params;
    VenueModel.findById(venueId)
        .then((venueInfo) => {
            res.render("users/musician/musician-venues.hbs", {
            layout: "musicianLayout.hbs",
            musicianData: req.session.loggedInUser, tourId, cityName, 
            venueInfo
    });
  });
});

router.post("/home/musician/:tourId/:cityName/:venueId", (req, res) => {
    const { tourId, cityName, venueId } = req.params;
    VenueModel.findById(venueId)
        .then((venue) => {
            TourModel.findById({ _id: tourId })
                .populate('VenueUser')
                .exec()
                .then((tourData) => {
                    // console.log(TourModel.populated())
                    console.log(tourData.cities[0].selectedVenue.populated())
         
                })
            })
                
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;
