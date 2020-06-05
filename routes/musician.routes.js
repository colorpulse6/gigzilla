const express = require('express');
const router = express.Router();
const MusicianModel = require("../models/musician.model");
const TourModel = require('../models/tour.model');
const VenueModel = require("../models/venue.model");
const CityModel = require("../models/city.model");



router.get('/home/musician', (req, res) => {
    res.render('users/musician/musician-home.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
})
//Home Route Post

router.post('/home/musician', (req, res) => {
    let user = req.session.loggedInUser
    const {name} = req.body
    TourModel.create({name: name},)
        .then((tourData) => {
            
            MusicianModel.findByIdAndUpdate(user._id, 
                { $push: { tours: [tourData._id]  } })
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
    console.log(id)
    TourModel.findById(id)
    .then((tourData)=> {
        res.render('users/musician/musician-tour.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser, tourData});
    })
    .catch(() => {
        res.send('Something is wrong')
    })
  
})

router.post('/home/musician/:tour', (req, res) => {
    const { city } = req.body
    const { tourId } = req.params
   
    VenueModel.find({cityName: city})
    .then((venues)=> {

        CityModel.create({
            name: city,
            venues: venues
        })
        .then((result) => {
            res.render('users/musician/musician-tour.hbs', {layout: 'musicianLayout.hbs', result})
            
             console.log(result)
            CityModel.find()
                .then((cities)=> {
                    console.log(cities)
                })
        })
       
    })
    .catch((err) => {
        res.send(err)
    })

})

//City Route
router.get('/home/musician/:tour/:cityId', (req, res) => {
    const { cityId } = req.params
    CityModel.findById(cityId)
    .then(() => {
        res.render('users/musician/musician-cities.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
    })
    .catch(() => {
        res.send('Something is wrong')
    })
    
})



//Venue Route
router.get('/home/musician/venues', (req, res) => {
    res.render('users/musician/musician-venues.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
})






//Profile Route
router.get('/home/musician/profile', (req, res) => {
    res.render('users/musician/musician-profile.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
})


module.exports = router;