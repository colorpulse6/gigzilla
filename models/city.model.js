const { Schema, model } = require("mongoose");

const citySchema = new Schema(
  {
        name: String,
        venues: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'venueUser'
        }] //references venue model
  },
);

module.exports = model("city", citySchema);
