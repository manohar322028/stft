import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  province_number: {
    type: String,
    required: true,
    default: 0,
  },

  province_name: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const About = mongoose.model("About", aboutSchema);

export default About;
