import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    isNew: {
      type: Boolean,
    },

    membership_number: {
      type: String,
      sparse: true,
      unique: true,
    },

    membership_date: {
      type: String,
    },
    membership_certificate: { type: String },

    voucher: { type: String },

    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    school_name: {
      type: String,
      required: true,
    },
    school_address: {
      type: String,
      required: true,
    },
    school_appointment_date: {
      type: String,
      required: true,
    },
    appointment_type: { type: String, required: true },
  },

  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
