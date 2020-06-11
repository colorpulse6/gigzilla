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
    let genreArray = ['jazz', 'rockmusic', 'classicalmusic', 'funk', 'disco','punkrock', 'motown', 'elvis', 'reggae']
    let randomElement = genreArray[Math.floor(Math.random() * genreArray.length)];
    

    MusicianModel.findOne({_id: musicianData._id})
      .populate('tours')
      //.execPopulate()
      .then((musician) => {
        
        musician.genrePic = Math.random(randomElement)
        
        res.render('users/musician/musician-home.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser, musician})
        
        console.log(musicianData)
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

//Delete Tour

router.get('/home/musician/delete/:tourId/', (req, res) => {
  let user = req.session.loggedInUser
  const { tourId } = req.params
  

  
  MusicianModel.updateOne({_id: user._id}, {$pull: {tours: tourId}})

  .then((result) => {
      console.log(result)
      TourModel.findOneAndDelete({_id: tourId})
      .then((result) => {
        res.redirect('/home/musician/')
        console.log(result, tourId, user)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  .catch((err) => {
    console.log(err)
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
          tourData
        });
       
      })
      
      .catch((err) => {
        res.send("Something is wrong");
        //console.log(err)
      });
  });



//TOUR POST VERSION 2
router.post("/home/musician/:tourId", (req, res) => {
  const { city } = req.body;
  const { tourId } = req.params;
  let musicianData = req.session.loggedInUser;

  let cityLowerCase = city.toLowerCase();
  let cityCaseSensitive = cityLowerCase[0].toUpperCase() + cityLowerCase.slice(1)

  //TEST IF CITY IS IN TOUR MODEL
  TourModel.findById(tourId)
    .then((currentTour)=> {
      if(cityCaseSensitive){
        if (currentTour.cities.filter(e => e.name === cityCaseSensitive).length > 0) {
          //DISPLAY IF NOT
          res.redirect(`/home/musician/${tourId}`);
        } else {
  
          VenueModel.findOne({ cityName: cityCaseSensitive })
          .then((venue) => {

              //TEST IF CITY EXISTS
              if(!venue){
                  res.redirect(`/home/musician/${tourId}`);
                  console.log('City Not Available')
                 
              } else{

                  //ADD CITY IF IT IS NOT IN TOUR MODEL AND IF EXISTS
                  TourModel.findByIdAndUpdate(tourId, {
                      $push: { cities: [{ name: cityCaseSensitive }] },
                      }).then(() => {
                      res.redirect(`/home/musician/${tourId}`);
                      });
              }
              
          })
          .catch((err) => {
          res.send(err);
          
  });
        }

      } else {
        res.redirect(`/home/musician/${tourId}`);
        console.log('Please Add City')
      }
        
        
    })
  
});


//GET CITY V2
router.get("/home/musician/:tourId/:cityName", (req, res) => {
    const { tourId, cityName } = req.params;
   

  //LOOK THROUGH VENUES TO RENDER VENUES IN THE CORRECT CITY
  if (Object.keys(req.query).length === 0) {
    console.log(req.query)
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
    
   

  } else {
    console.log(req.query)
    var { search, capacity, backline, food } = req.query

    if (search === undefined) {search = ''}  
    if (backline === undefined) {backline = [true, false]}  
    if (food === undefined) {food = [true, false]}

    VenueModel.find({cityName, $or: [{name: {$regex: search,  $options: "i" }}, {genre:{$regex: search, $options: "i"}}, {type:{$regex: search, $options: "i"}}, {description:{$regex: search, $options: "i"}}], backline, food, capacity: {$lte: capacity} })
    .then((venues) => {
      
      console.log(venues)
      res.render("users/musician/musician-cities.hbs", {
        layout: "musicianLayout.hbs",
        musicianData: req.session.loggedInUser, tourId, cityName, venues 
        
      });
    })
    .catch((err) => {
      console.log(err)
    })
    
  }
  
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

//{ $push: { tours: [tourData._id]  } }

router.post("/home/musician/:tourId/:cityName/:venueId", (req, res) => {
    const { tourId, cityName, venueId } = req.params;
    VenueModel.findById(venueId)
    .then((venue)=>{
      TourModel.update({ _id: tourId, 'cities.name': cityName }, { $set: { 'cities.$.contactedByMusician': true }, $push: {'cities.$.possibleVenues': [venue.name]}}  )
        .then((tourData) => {
              // console.log(tourData.cities[1].selectedVenue)
              res.redirect(`/home/musician/${tourId}`)
              console.log(venue, tourData, venue.name)
                })      
        .catch((err) => {
            console.log(err)
        })
    })
})

//ADD CONFIRMED CITY
router.get("/home/musician/:tourId/:cityId/:venueName/add", (req,res) => {
  const { tourId, cityId, venueName } = req.params
  console.log(tourId)
  VenueModel.find({name: venueName})
    .then((venue)=>{
      
      TourModel.update({ _id: tourId, 'cities._id': cityId }, { $set: { 'cities.$.selectedVenue': venue[0]._id } } )
      
        .then((tourData) => {
            console.log(tourData)
              res.redirect(`/home/musician/${tourId}`)
                })
                
        .catch((err) => {
            
        })
    })

})



module.exports = router;
