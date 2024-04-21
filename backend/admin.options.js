import News from "./models/news.model.js";
import Notice from "./models/notice.model.js";
import Download from "./models/download.model.js";
import uploadFeature from "@adminjs/upload";
import { ComponentLoader } from "adminjs";

import { LocalProvider } from "./upload-provider.js";

const componentLoader = new ComponentLoader();

const providerOptions = {
  bucket: "./public/files",
  opts: {
    baseUrl: "/files",
  },
};

const localProvider = new LocalProvider(providerOptions);

const adminOptions = {
  componentLoader,
  branding: {
    companyName: "Admin Panel",
    softwareBrothers: false,
    logo: false,
    withMadeWithLove: false,
  },
  logoutPath: "/admin/logout",
  locale: {
    translations: {
      en: {
        components: {
          Login: {
            welcomeHeader: "Welcome",
            welcomeMessage: "Log in to continue",
            properties: {
              email: "Username",
              password: "Password",
            },
            loginButton: "Login",
          },
        },
      },
    },
  },

  resources: [
    {
      resource: News,
      options: {
        properties: {
          content: {
            type: "richtext",

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
          uploadPath: (record, filename) =>
            `news/${record.title().split(" ").join("-")}.${filename
              .split(".")
              .pop()}`,
        }),
      ],
    },
    {
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
    },
    {
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
    },
  ],
  rootPath: "/admin",
};

export default adminOptions;
