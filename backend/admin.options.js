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
            type: "string",
            isVisible: { list: false, show: true, edit: false, filter: false },
          },
          image_file: {
            isVisible: { list: false, show: false, edit: true, filter: false },
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
          uploadPath: (record, filename) => `${record.id()}/${filename}`,
        }),
      ],
    },
    {
      resource: Notice,
      options: {
        properties: {
          file: {
            isVisible: { list: false, show: true, edit: true, filter: false },
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false },
          },
          updatedAt: {
            isVisible: { list: true, show: true, edit: false },
          },
        },
      },
    },
    {
      resource: Download,
      options: {
        properties: {
          createdAt: {
            isVisible: { list: false, show: true, edit: false },
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false },
          },
        },
      },
    },
  ],
  rootPath: "/admin",
};

export default adminOptions;
