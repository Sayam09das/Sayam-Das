require("dotenv").config();

const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contact.routes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://sayam-das.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Sayam Portfolio Backend Running 🚀"
  });
});

module.exports = app;