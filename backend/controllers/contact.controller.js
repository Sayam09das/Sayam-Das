const { sendContactEmail } = require("../services/email.service");
const axios = require("axios");

const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const contactController = async (req, res) => {
  try {
    let { name, email, subject, message, captchaToken } = req.body;

    name = name?.trim();
    email = email?.trim();
    subject = subject?.trim();
    message = message?.trim();

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    if (!captchaToken) {
      return res.status(400).json({ success: false, message: "Captcha verification failed" });
    }

    // Verify CAPTCHA with a timeout to avoid hanging
    const captchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: captchaToken },
        timeout: 5000,
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).json({ success: false, message: "Bot verification failed" });
    }

    // Respond immediately — don't wait for email
    res.status(200).json({ success: true, message: "Message sent successfully!" });

    // Send email in background (non-blocking)
    sendContactEmail({ name, email, subject, message }).catch((err) => {
      console.error("Background email error:", err);
    });

  } catch (error) {
    console.error("Contact Error:", error);

    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

module.exports = contactController;
