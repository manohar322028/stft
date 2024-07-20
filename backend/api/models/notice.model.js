import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pdf: {
      default: "",
      type: String,
    },
  },

  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
