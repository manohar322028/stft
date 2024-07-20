import Download from "../models/download.model.js";

export default {
  resource: Download,
  options: {
    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      url: {
        isVisible: { list: true, show: true, edit: true, filter: false },
      },
      createdAt: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      updatedAt: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
    },
  },
};
