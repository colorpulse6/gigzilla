const { Schema, model } = require("mongoose");

const musicianSchema = new Schema({
  musicianName: String,
  email: {
    type: String,
    required: [true, "Please enter username."],
  },
  tours: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
  ],
  passwordHash: {
    type: String,
    required: true,
  },
  phoneNumber: Number,
  genre: String,
  photoSrc: String,
  bio: String,
});

userSchema.index(
  { email: 1 },
  {
    unique: [true, "Email already in use, please register with another email."],
  }
);

module.exports = model("MusicianUser", musicianSchema);
