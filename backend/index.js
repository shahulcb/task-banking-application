import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import accountDetailsRoutes from "./routes/accountDetails.js";
import transactionRoutes from "./routes/transaction.js";

import errorMiddleware from "./middlewares/errors.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR ${err}`);
  console.log("Shutting down server due to unhandled uncaught exceptions");
});

dotenv.config({ path: "backend/config/config.env" });

//Connection database
connectDatabase();

app.use(express.json({}));
app.use(cookieParser());

//routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/account", accountDetailsRoutes);
app.use("/api/v1/transaction", transactionRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

//error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

//handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
