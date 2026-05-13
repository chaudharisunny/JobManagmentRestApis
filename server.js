const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const routesIndex = require("./router/index");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.includes("vercel.app") ||
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api/v1", routesIndex);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
    },
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});