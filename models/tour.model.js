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
    },
  ]
});

module.exports = model("Tour", tourSchema);
