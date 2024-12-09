import express from "express";
import passport from "./passport-setup.js";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieSession from "cookie-session";
import config from "./config.js";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { start } from "./cronJob.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Route imports
import authRoutes from "./routes/authRoutes.js";
import printerRoutes from "./routes/printerRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import buyingLogRoutes from "./routes/buyingLogRoutes.js";

await connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/auth/users", userRoutes); // Assuming "auth/users" as base path
app.use("/printer", printerRoutes);
app.use("/file", fileRoutes);
app.use("/api/file", fileRoutes);
app.use("/log", logRoutes);
app.use("/config", configRoutes);
app.use("/api/buyingLogs", buyingLogRoutes); // Ensure this line is included

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
);

start();

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
