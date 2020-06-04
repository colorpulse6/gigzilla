const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    /*Define schema here */
  },
  {
    timestamps: true
  }
);

 module.exports = model('User', userSchema);
