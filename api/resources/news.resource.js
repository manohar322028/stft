import News from "../models/news.model.js";
import { localProvider } from "../upload-provider.js";
import { componentLoader } from "../component-loader.js";
import uploadFeature from "@adminjs/upload";

export default {
  resource: News,
  options: {
    properties: {
      content: {
        type: "richtext",
        position: 1,

        isVisible: { list: false, show: true, edit: true, filter: false },
      },
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      image: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      image_file: {
        isVisible: { list: true, show: true, edit: true, filter: false },
      },

      slug: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },

      createdAt: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      updatedAt: {
        isVisible: { list: true, show: true, edit: false, filter: true },
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
      uploadPath: (record, filename) => {
        // Get the slug and replace spaces with hyphens
        let id = record.get("_id");
        // Construct and return the file path
        return `news/${id}.${extension}`;
      },
    }),
  ],
};
