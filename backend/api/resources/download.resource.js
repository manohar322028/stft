import Download from "../models/download.model.js";

export default {
  resource: Download,
  options: {
    id: "Resources",
    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      title: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      url: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      category: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        availableValues: [
          { value: "Nepali", label: "Nepali" },
          { value: "English", label: "English" },
          { value: "Mathematics", label: "Mathematics" },
          { value: "Science", label: "Science" },
          { value: "Social", label: "Social" },
          { value: "HPE", label: "HPE" },
          { value: "Optional Subject I", label: "Optional Subject I" },
          { value: "Optional Subject II", label: "Optional Subject II" },
          { value: "Others", label: "Others" },
        ],
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
