const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
  name: String,
  photoSrc: String,
  venues: [
    {
        name: String,
        photoSrc: String,
        venues: [{
            type: Schema.Types.ObjectId,
            ref: 'venue'
          }],
        contactedByVenue: Boolean,    
        
    },
  ],
  contactedByVenue: Boolean,
});

module.exports = model("Tour", tourSchema);
