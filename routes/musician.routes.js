const express = require('express');
const router = express.Router();
const MusicianModel = require("../models/musician.model");
const TourModel = require('../models/tour.model');

//MUSICIAN PROFILE
router.get('/profile/musician', (req, res) => {
    res.render('users/musician-profile.hbs', {musicianData: req.session.loggedInUser});
})

router.get('/home/musician', (req, res) => {
    res.render('users/musician/musician-home.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
})
//Home Route Post

router.post('/home/musician', (req, res) => {
    let user = req.session.loggedInUser
    const {name} = req.body
    TourModel.create({name: name},)
        .then((response) => {
            console.log(response)
            MusicianModel.findByIdAndUpdate(user._id, 
                { $push: { tours: [response._id]  } })
                .then(() => {
                    console.log('Some kind of error', user._id)
                    res.render('users/musician/musician-home.hbs')
                })
                
        })
            
        .catch((err) => {
            console.log(err)
        })
   

    

})

//Tour Route
router.get('/home/musician/tours', (req, res) => {
    res.render('users/musician/musician-tour.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
})

//City Route
router.get('/home/musician/cities', (req, res) => {
    res.render('users/musician/musician-cities.hbs', {layout: 'musicianLayout.hbs', musicianData: req.session.loggedInUser});
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