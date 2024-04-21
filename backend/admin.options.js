import News from "./resources/news.resource.js";
import Notice from "./resources/notice.resource.js";
import Download from "./resources/download.resource.js";
import componentLoader from "./component-loader.js";

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

  resources: [News, Notice, Download],
  rootPath: "/admin",
};

export default adminOptions;
