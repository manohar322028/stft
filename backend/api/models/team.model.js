import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  province_number: {
    type: Number,
    required: true,
    default: 0,
  },

  position: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
