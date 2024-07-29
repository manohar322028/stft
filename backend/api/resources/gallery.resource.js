import Gallery from "../models/gallery.model.js";
import { localProvider } from "../upload-provider.js";
import { componentLoader } from "../component-loader.js";
import uploadFeature from "@adminjs/upload";

export default {
  resource: Gallery,
  options: {
    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      image: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      image_file: {
        isVisible: { list: true, show: true, edit: true, filter: false },
      },
      isFeatured: {
        isVisible: { list: true, show: true, edit: true, filter: true },
      },
      caption: {
        isVisible: { list: true, show: true, edit: true, filter: true },
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
        mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
      },
      uploadPath: (record, filename) => `gallery/${filename}`,
    }),
  ],
};
