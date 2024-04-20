import News from "./models/news.model.js";
import Notice from "./models/notice.model.js";
import Download from "./models/download.model.js";

const adminOptions = {
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
            isVisible: { list: false, show: true, edit: true, filter: false },
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: false },
          },
          updatedAt: {
            isVisible: { list: true, show: true, edit: false, filter: true },
          },
        },
      },
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
