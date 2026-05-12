const express = require('express');
const app = express();
const port = 3000;

const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const routesIndex = require('./router/index');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://JobManagment-frontend.vercel.app"
  ],
  credentials: true
}));

app.use('/api/v1', routesIndex);


// ✅ FINAL FIXED VIEW ROUTE (handles both cases)


// ✅ STATIC (optional but fine)
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