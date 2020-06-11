const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const MusicianModel = require("../models/musician.model");
const VenueModel = require("../models/venue.model");

//MUSICIAN SIGN UP
router.get("/signup/musician", (req, res) => {
  res.render("auth/musician-signup.hbs", {
    layout: "main-layout"
  });
});

//MUSICIAN SIGN UP (FORM)
router.post("/signup/musician", (req, res) => {
  const { name, email, password, phoneNumber, genre, bio, imgUrl } = req.body;

  //REQUIRED FIELDS:
  if (!name || !email || !password) {
    res.status(500).render("auth/musician-signup.hbs", {
      errorMessage: "Please enter name, email and password", layout: "main-layout"
    });
    return;
  }

  //AUTHENTICATING EMAIL
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/musician-signup.hbs", {
      errorMessage: "Email format not correct", layout: "main-layout"
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
        "Password needs to have 8 characters, a number, a special character, and an Uppercase alphabet", layout: "main-layout"
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
        .then((musicianData) => {
          req.session.loggedInUser = musicianData;
          res.redirect("/home/musician");
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).render("auth/musician-signup.hbs", {
              errorMessage: "username or email entered already exists!", layout: "main-layout"
            });
            return;
          } else {
            res.status(500).render("auth/musician-signup.hbs", {
              errorMessage: "Something went wrong!", layout: "main-layout"
              
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
  res.render("auth/venue-signup.hbs", {
    layout: "main-layout"
  });
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
      errorMessage: "Please enter name, city, email and password", layout: "main-layout"
    });
    return;
  }

  //AUTHENTICATING EMAIL
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/venue-signup.hbs", {
      errorMessage: "Email format not correct", layout: "main-layout"
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
        "Password needs to have 8 characters, a number, a special character, and an Uppercase alphabet", layout: "main-layout"
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
        .then((venueData) => {
          req.session.loggedInUser = venueData;
          console.log(venueData)
          res.redirect("/home/venue");
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).render("auth/venue-signup.hbs", {
              errorMessage: "username or email entered already exists!", layout: "main-layout"
            });
            return;
          } else {
            res.status(500).render("auth/venue-signup.hbs", {
              errorMessage: "Something went wrong!", layout: "main-layout"
             
            });
            return;
          }
        });
    });
  });
  
});

//SIGN IN FOR BOTH USERS
router.get("/signin", (req, res) => {
  res.render("auth/signin.hbs", {
    layout: "main-layout"
  });
});

//SIGN IN (FORM)
router.post("/signin", (req, res) => {
  const { email, password, type } = req.body;

  //REQUIRING EMAIL AND PASSWORD
  if (!email || !password || !type) {
    res.status(500).render("auth/signin.hbs", {
      errorMessage: "Please enter email and password", layout: "main-layout"
    });
    return;
  }

  //AUTHENTICATING EMAIL
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/signup.hbs", {
      errorMessage: "Email format not correct", layout: "main-layout"
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
              // console.log(musicianData)
              res.redirect("/home/musician");
            }
            //if passwords do not match
            else {
              res.status(500).render("auth/signin.hbs", {
                errorMessage: "Passwords don't match", layout: "main-layout"
              });
              return;
            }
          })
          .catch(() => {
            res.status(500).render("auth/signin.hbs", {
              errorMessage: "Something wen't wrong!", layout: "main-layout"
            });
            return;
          });
      })
      //throw an error if the user does not exists
      .catch(() => {
        res.status(500).render("auth/signin.hbs", {
          errorMessage: "User does not exist", layout: "main-layout"
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
              // console.log(venueData)
              res.redirect("/home/venue");
            }
            //if passwords do not match
            else {
              res.status(500).render("auth/signin.hbs", {
                errorMessage: "Passwords don't match", layout: "main-layout"
              });
              return;
            }
          })
          .catch(() => {
            res.status(500).render("auth/signin.hbs", {
              errorMessage: "Something wen't wrong!", layout: "main-layout"
            });
            return;
          });
      })
      //throw an error if the user does not exists
      .catch(() => {
        res.status(500).render("auth/signin.hbs", {
          errorMessage: "User does not exist", layout: "main-layout"
        });
        return;
      });
  }
});

router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = router;
