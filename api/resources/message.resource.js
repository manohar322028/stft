import Message from "../models/message.model.js";

export default {
  resource: Message,
  options: {
    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      name: {
        isVisible: { list: true, show: true, edit: false, filter: false },
      },
      phone: {
        isVisible: { list: true, show: true, edit: false, filter: false },
      },
      email: {
        isVisible: { list: true, show: true, edit: false, filter: false },
      },
      message: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      createdAt: {
        isVisible: { list: false, show: true, edit: false, filter: true },
      },
      updatedAt: {
        isVisible: { list: true, show: true, edit: false, filter: false },
      },
    },
  },
};
