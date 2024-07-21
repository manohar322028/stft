import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import newsRoutes from "./routes/news.route.js";
import noticeRoutes from "./routes/notice.route.js";
import downloadRoutes from "./routes/download.route.js";
import aboutRoutes from "./routes/about.route.js";
import teamRoutes from "./routes/team.route.js";
import memberRoutes from "./routes/member.route.js";
import messageRoutes from "./routes/message.route.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import Connect from "connect-mongodb-session";
import session from "express-session";
import User from "./models/user.model.js";
import path from "path";

import cors from "cors";

import bcryptjs from "bcryptjs";

import adminOptions from "./admin.options.js";

import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then((x) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

const ADMIN_USER = await User.findOne({ type: "admin" });

const authenticate = async (email, password) => {
  if (
    email === ADMIN_USER.username &&
    bcryptjs.compareSync(password, ADMIN_USER.password)
  ) {
    return Promise.resolve(ADMIN_USER);
  }
  return null;
};

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const start = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../../client/public")));
  app.use(express.static(path.join(__dirname, "../members")));

  const admin = new AdminJS(adminOptions);

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: process.env.SESSION_SECRET,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  admin.watch();

  app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
    console.log(
      `AdminJS started on http://localhost:${port}${admin.options.rootPath}`
    );
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/news", newsRoutes);
  app.use("/api/notices", noticeRoutes);
  app.use("/api/downloads", downloadRoutes);
  app.use("/api/abouts", aboutRoutes);
  app.use("/api/teams", teamRoutes);
  app.use("/api/members", memberRoutes);
  app.use("/api/messages", messageRoutes);

  app.get("/", (req, res) => {
    res.send("go to /admin for admin panel");
  });

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
};

start();
