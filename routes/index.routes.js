const express = require('express');
const router = express.Router();

//LANDING PAGE
router.get('/', (req, res) => res.render('landing.hbs', { layout: "main-layout" }));

module.exports = router;
