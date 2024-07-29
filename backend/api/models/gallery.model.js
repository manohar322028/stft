import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    image: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
