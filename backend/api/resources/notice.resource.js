import Notice from "../models/notice.model.js";
import { localProvider } from "../upload-provider.js";
import { componentLoader } from "../component-loader.js";
import uploadFeature from "@adminjs/upload";

export default {
  resource: Notice,
  options: {
    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      pdf: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
      pdf_file: {
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
  features: [
    uploadFeature({
      componentLoader: componentLoader,
      provider: localProvider,
      properties: {
        key: "pdf",
        bucket: "bucket",
        file: "pdf_file",
        filePath: "filePath",
        filesToDelete: "filesToDelete",
      },
      validation: {
        mimeTypes: ["application/pdf"],
      },
      uploadPath: (record, filename) =>
        `notices/${record.title().split(" ").join("-")}.${filename
          .split(".")
          .pop()}`,
    }),
  ],
};
