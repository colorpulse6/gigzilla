const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const MusicianModel = require("../models/musician.model");
const VenueModel = require("../models/venue.model");

//MUSICIAN SIGN UP
router.get("/signup/musician", (req, res) => {
  res.render("auth/musician-signup.hbs");
});

//MUSICIAN SIGN UP (FORM)
router.post("/signup/musician", (req, res) => {
  const { name, email, password, phoneNumber, genre, bio, imgUrl } = req.body;

  //REQUIRED FIELDS:
  if (!name || !email || !password) {
    res.status(500).render("auth/musician-signup.hbs", {
      errorMessage: "Please enter name, email and password",
    });
    return;
  }

  //AUTHENTICATING EMAIL
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/musician-signup.hbs", {
      errorMessage: "Email format not correct",
    });
    return;
  }

  //AUTHENTICATING PASSWORD
  const myPassRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  if (!myPassRegex.test(password)) {
    res.status(500).render("auth/musician-signup.hbs", {
      errorMessage:
        "Password needs to have 8 characters, a number, a special character, and an Uppercase alphabet",
    });
    return;
  }

  //ENCRYPT PASSWORD
  bcrypt.genSalt(12).then((salt) => {
    // console.log("Salt: ", salt);
    bcrypt.hash(password, salt).then((passwordHash) => {
      MusicianModel.create({
        name,
        email,
        phoneNumber,
        genre,
        bio,
        imgUrl,
        passwordHash,
      })
        .then(() => {
          res.redirect("/home/musician");
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).render("auth/musician-signup.hbs", {
              errorMessage: "username or email entered already exists!",
            });
            return;
          } else {
            res.status(500).render("auth/musician-signup.hbs", {
              errorMessage: "Something went wrong!",
              
            });
            console.log(err)
            return;
          }
        });
    });
  });
});

//VENUE SIGN UP
router.get("/signup/venue", (req, res) => {
  res.render("auth/venue-signup.hbs");
});

//VENUE SIGN UP (FORM)
router.post("/signup/venue", (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    type,
    genre,
    description,
    imgUrl,
    backline,
    food,
    capacity,
    cityName,
  } = req.body;

  //REQUIRED FIELDS:
  if (!name || !email || !password || !cityName) {
    res.status(500).render("auth/venue-signup.hbs", {
      errorMessage: "Please enter name, city, email and password",
    });
    return;
  }

  //AUTHENTICATING EMAIL
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/venue-signup.hbs", {
      errorMessage: "Email format not correct",
    });
    return;
  }

  //AUTHENTICATING PASSWORD
  const myPassRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  if (!myPassRegex.test(password)) {
    res.status(500).render("auth/venue-signup.hbs", {
      errorMessage:
        "Password needs to have 8 characters, a number, a special character, and an Uppercase alphabet",
    });
    return;
  }

  //ENCRYPT PASSWORD
  bcrypt.genSalt(12).then((salt) => {
     console.log("Salt: ", salt);
    bcrypt.hash(password, salt).then((passwordHash) => {
      VenueModel.create({
        name,
        email,
        phoneNumber,
        type,
        genre,
        description,
        imgUrl,
        backline,
        food,
        capacity,
        cityName,
        passwordHash,
      })
        .then(() => {
          res.redirect("/home/venue");
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).render("auth/venue-signup.hbs", {
              errorMessage: "username or email entered already exists!",
            });
            return;
          } else {
            res.status(500).render("auth/venue-signup.hbs", {
              errorMessage: "Something went wrong!",
            });
            return;
          }
        });
    });
  });
});

//SIGN IN FOR BOTH USERS
router.get("/signin", (req, res) => {
  res.render("auth/signin.hbs");
});

//SIGN IN (FORM)
router.post("/signin", (req, res) => {
  const { email, password, type } = req.body;

  //REQUIRING EMAIL AND PASSWORD
  if (!email || !password || !type) {
    res.status(500).render("auth/signin.hbs", {
      errorMessage: "Please enter email and password",
    });
    return;
  }

  //AUTHENTICATING EMAIL
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/signup.hbs", {
      errorMessage: "Email format not correct",
    });
    return;
  }

  //IF STATEMENT FOR WHICH COLLECTION TO LOOK THROUGH
  if (type === "musician") {
    //LOOK THROUGH MUSICIAN COLLECTION
    MusicianModel.findOne({ email })
      .then((musicianData) => {
        //check if passwords match
        bcrypt
          .compare(password, musicianData.passwordHash)
          .then((doesItMatch) => {
            //if it matches
            if (doesItMatch) {
              // req.session is the special object that is available to you
              req.session.loggedInUser = musicianData;
              res.redirect("/home/musician");
            }
            //if passwords do not match
            else {
              res.status(500).render("auth/signin.hbs", {
                errorMessage: "Passwords don't match",
              });
              return;
            }
          })
          .catch(() => {
            res.status(500).render("auth/signin.hbs", {
              errorMessage: "Something wen't wrong!",
            });
            return;
          });
      })
      //throw an error if the user does not exists
      .catch(() => {
        res.status(500).render("auth/signin.hbs", {
          errorMessage: "Something went wrong",
        });
        return;
      });
  }
  //LOOK THROUGH VENUE COLLECTION
  else {
    VenueModel.findOne({ email })
      .then((venueData) => {
        //check if passwords match
        bcrypt
          .compare(password, venueData.passwordHash)
          .then((doesItMatch) => {
            //if it matches
            if (doesItMatch) {
              // req.session is the special object that is available to you
              req.session.loggedInUser = venueData;
              res.redirect("/home/venue");
            }
            //if passwords do not match
            else {
              res.status(500).render("auth/signin.hbs", {
                errorMessage: "Passwords don't match",
              });
              return;
            }
          })
          .catch(() => {
            res.status(500).render("auth/signin.hbs", {
              errorMessage: "Something wen't wrong!",
            });
            return;
          });
      })
      //throw an error if the user does not exists
      .catch(() => {
        res.status(500).render("auth/signin.hbs", {
          errorMessage: "Something went wrong",
        });
        return;
      });
  }
});



router.get('/home/venue', (req, res) => {
    res.render('users/venue/venue-home.hbs', {venueData: req.session.loggedInUser});
})

module.exports = router;
