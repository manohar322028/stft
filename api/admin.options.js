import News from "./resources/news.resource.js";
import Notice from "./resources/notice.resource.js";
import Download from "./resources/download.resource.js";
import About from "./resources/about.resource.js";
import Team from "./resources/team.resource.js";
import Member from "./resources/member.resource.js";
import { componentLoader } from "./component-loader.js";

const adminOptions = {
  resources: [News, Notice, Download, About, Team, Member],
  componentLoader: componentLoader,
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
        resources: {
          About: {
            properties: {
              province_number: "Province Number (0 if not a province)",
              province_name: "Province Name ('Nepal' if not a province)",
            },
          },

          Team: {
            properties: {
              province_number: "Province Number (0 if central member)",
            },
          },
        },
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

  rootPath: "/admin",
};

export default adminOptions;
