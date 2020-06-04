const { Schema, model} = require('mongoose');

const tourSchema = new Schema(
    {
        name: String,
        photoSrc: String,
        musicianId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'musician'
        },
        venues: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'venue'
          }],
        contactedByVenue: Boolean,    
        
    },

)





module.exports = model('User', tourSchema);