const express = require("express");
const contactController = require("../controllers/contact.controller");
const contactLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/contact", contactLimiter, contactController);

module.exports = router;