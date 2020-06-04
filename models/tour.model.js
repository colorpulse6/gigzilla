const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
  name: String,
  photoSrc: String,
  venues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VenueUser",
    },
  ],
  contactedByVenue: Boolean,
});

module.exports = model("Tour", tourSchema);
