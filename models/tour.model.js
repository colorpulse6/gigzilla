const { Schema, model} = require('mongoose');

const tourSchema = new Schema(
    {
        name: String,
        photoSrc: String,
        venues: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'venue'
          }],
        contactedByVenue: Boolean,    
        
    },

)





module.exports = model('User', tourSchema);