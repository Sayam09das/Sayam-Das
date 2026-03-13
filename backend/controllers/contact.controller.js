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

    // ─────────────────────────────
    // Validate fields
    // ─────────────────────────────
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    // ─────────────────────────────
    // Verify CAPTCHA
    // ─────────────────────────────
    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed"
      });
    }

    const captchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken
        }
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).json({
        success: false,
        message: "Bot verification failed"
      });
    }

    // ─────────────────────────────
    // Send Email
    // ─────────────────────────────
    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {

    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

module.exports = contactController;