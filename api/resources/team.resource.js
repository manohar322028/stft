import Team from "../models/team.model.js";
import { localProvider } from "../upload-provider.js";
import { componentLoader } from "../component-loader.js";
import uploadFeature from "@adminjs/upload";

export default {
  resource: Team,
  options: {
    properties: {
      name: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        position: 1,
      },

      position: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        position: 3,
        availableValues: [
          {
            value: "Chairman",
            label: "Chairman",
          },
          {
            value: "senior Vice Chairman",
            label: "Senior Vice Chairman",
          },
          {
            value: "Vice Chairman",
            label: "Vice Chairman",
          },
          {
            value: "General Secretary",
            label: "General Secretary",
          },
          {
            value: "Secretary",
            label: "Secretary",
          },
          {
            value: "Assistant Secretary",
            label: "Assistant Secretary",
          },
          {
            value: "Treasurer",
            label: "Treasurer",
          },
          {
            value: "Assistant Treasurer",
            label: "Assistant Treasurer",
          },
          {
            value: "Technical Co-ordinator",
            label: "Technical Co-ordinator",
          },
          {
            value: "Member",
            label: "Member",
          },
        ],
      },
      province_number: {
        isVisible: { list: true, show: true, edit: true, filter: true },
        position: 2,
        availableValues: [
          {
            value: 0,
            label: "0",
          },
          {
            value: 1,
            label: "1",
          },
          {
            value: 2,
            label: "2",
          },
          {
            value: 3,
            label: "3",
          },
          {
            value: 4,
            label: "4",
          },
          {
            value: 5,
            label: "5",
          },
          {
            value: 6,
            label: "6",
          },
          {
            value: 7,
            label: "7",
          },
        ],
      },

      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      image: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      image_file: {
        isVisible: { list: true, show: true, edit: true, filter: false },
        position: 4,
      },
    },
  },

  features: [
    uploadFeature({
      componentLoader: componentLoader,
      provider: localProvider,
      properties: {
        key: "image",
        bucket: "bucket",
        file: "image_file",
        filePath: "filePath",
        filesToDelete: "filesToDelete",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
      },
      uploadPath: (record, filename) =>
        `Team/Province - ${record.get("province_number")}/${record.get(
          "_id"
        )}.${filename.split(".").pop()}`,
    }),
  ],
};
