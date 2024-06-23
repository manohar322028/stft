import Member from "../models/member.model.js";

export default {
  resource: Member,
  options: {
    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      first_name: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        position: 1,
      },
      last_name: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        position: 2,
      },
      isNew: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      membership_number: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      membership_date: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      membership_certificate: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      voucher: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },

      email: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      phone_number: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      district: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      municipality: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      ward: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      school_name: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      school_address: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      school_appointment_date: {
        isVisible: { list: false, show: true, edit: true, filter: true },
      },
      appointment_type: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      createdAt: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
      updatedAt: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
    },
  },
};
