const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name of your venue"],
      
    },
    email: {
      type: String,
      required: [true, "Please enter contact email"],
      
    },
    passwordHash: {
      type: String,
      required: true,
    },
    cityName: String,
    phoneNumber: String,
    type: String,
    genre: String,
    photoSrc: String,
    description: String,
    isBooked: Boolean,
    isAvailable: Boolean,
    backline: Boolean,
    food: Boolean,
    capacity: {
      type: Number,
      required: [true, "Please enter your venue's capacity."],
    },
  }
);

venueSchema.index({'name': 1}, {unique: [true, "Venue already exists."]});
venueSchema.index({'email': 1}, {unique: [true, "Email already in use, please register with another email."]}); 

module.exports = model("VenueUser", venueSchema);