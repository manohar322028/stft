import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Download = mongoose.model("Download", downloadSchema);

export default Download;
