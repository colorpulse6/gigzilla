const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
  name: String,
  imgUrl: String,
  cities: [
    {
        name: String,
        selectedVenue: {
            type: Schema.Types.ObjectId,
            ref: 'VenueUser'
          },
        contactedByVenue: Boolean,    
        contactedByMusician: Boolean,
        possibleVenues: [String]
    },
  ]
});

module.exports = model("Tour", tourSchema);
