const { Schema, model } = require("mongoose");

//VERSION 1
// const tourSchema = new Schema({
//   name: String,
//   photoSrc: String,
//   venues: [
//     {
//         name: String,
//         photoSrc: String,
//         venues: [{
//             type: Schema.Types.ObjectId,
//             ref: 'venue'
//           }],
//         contactedByVenue: Boolean,    
        
//     },
//   ],
//   contactedByVenue: Boolean,
// });

const tourSchema = new Schema({
  name: String,
  photoSrc: String,
  cities: [
    {
        name: String,
        photoSrc: String,
        selectedVenue: {
            type: Schema.Types.ObjectId,
            ref: 'VenueUser'
          },
        contactedByVenue: Boolean,    
    },
  ],
});

module.exports = model("Tour", tourSchema);
