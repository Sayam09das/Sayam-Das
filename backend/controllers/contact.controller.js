const { sendContactEmail } = require("../services/email.service");

const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const contactController = async (req, res) => {

    try {

        let { name, email, subject, message } = req.body;
        name = name?.trim();
        email = email?.trim();
        subject = subject?.trim();
        message = message?.trim();

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
