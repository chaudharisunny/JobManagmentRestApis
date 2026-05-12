require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-managment-frontend-jset.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.get("/test", (req, res) => {
  res.json({ success: true });
});

app.use("/api/v1", routesIndex);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});