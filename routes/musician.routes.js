const express = require("express");
const router = express.Router();
const MusicianModel = require("../models/musician.model");
const TourModel = require("../models/tour.model");
const VenueModel = require("../models/venue.model");
const CityModel = require("../models/city.model");



//Profile Route

router.get("/home/musician/profile", (req, res) => {
    
    res.render("users/musician/musician-profile.hbs", {
        layout: "musicianLayout.hbs",
        musicianData: req.session.loggedInUser
    });
    console.log(req.session.loggedInUser)
     
});


//EDIT PROFILE
router.post("/home/musician/profile", (req, res) => {
    let musicianData = req.session.loggedInUser
    const {phoneNumber, genre, bio} = req.body

    MusicianModel.findByIdAndUpdate( musicianData._id, {phoneNumber: phoneNumber, genre: genre, bio: bio} )
      .then((result) => {
        MusicianModel.findById(musicianData._id)
          .then((newResult) => {
            req.session.loggedInUser = newResult
            console.log(newResult)
            res.redirect("/home/musician/profile")
          })
        
        })

})

//Home Route
router.get('/home/musician', (req, res) => {
    musicianData = req.session.loggedInUser;
    

    MusicianModel.findOne({_id: musicianData._id})
      .populate('tours')
      //.execPopulate()
      .then((musician) => {
          
        res.render('users/musician/musician-home.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser, musician})
        

      })
      .catch((err) => {
        res.send("Something is wrong");
        console.log(err)
      });
     
   })

  

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


//Delete City

router.get('/home/musician/delete/:tourId/:city', (req, res) => {

    const {tourId, city} = req.params
    TourModel.update({_id: tourId}, {$pull: {cities: {_id:city}}})
    .then((result) => {
        
        res.redirect(`/home/musician/${tourId}`)
    })

})

//Tour Route
router.get("/home/musician/:tour", (req, res) => {
    let id = req.params.tour;
    let musicianData = req.session.loggedInUser;
  
    // console.log(id)
  TourModel.findById(id)
    .populate('cities.selectedVenue')
      .then((tourData) => {
        res.render("users/musician/musician-tour.hbs", {
          layout: "musicianLayout.hbs",
          musicianData,
          tourData,
    
        });
      })
      .catch((err) => {
        res.send("Something is wrong");
        console.log(err)
      });
  });

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

  //TEST IF CITY IS IN TOUR MODEL
  TourModel.findById(tourId)
    .then((currentTour)=> {
        if (currentTour.cities.filter(e => e.name === city).length > 0) {
            //DISPLAY IF NOT
            res.redirect(`/home/musician/${tourId}`);
          } else {

              
            VenueModel.findOne({ cityName: city })
            .then((venue) => {

                //TEST IF CITY EXISTS
                if(!venue){
                    res.redirect(`/home/musician/${tourId}`);
                   console.log('City Not Available')
                   
                } else{

                    //ADD CITY IF IT IS NOT IN TOUR MODEL AND IF EXISTS
                    TourModel.findByIdAndUpdate(tourId, {
                        $push: { cities: [{ name: city }] },
                        }).then(() => {
                        res.redirect(`/home/musician/${tourId}`);
                        });
                        
                }
                
            })
            .catch((err) => {
            res.send(err);
            
    });
          }
        
    })
  
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
  TourModel.update({ _id: tourId, 'cities.name': cityName }, { $set: { 'cities.$.selectedVenue': venueId } } )
        .then((tourData) => {
              // console.log(tourData.cities[1].selectedVenue)
              res.redirect(`/home/musician/${tourId}`)
         
                })
         
                
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;
