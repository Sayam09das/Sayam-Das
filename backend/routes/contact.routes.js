const express = require('express');
const { Resend } = require('resend');

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/contact
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields required'
            });
        }

        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: [process.env.OWNER_EMAIL],
            reply_to: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <h2>New message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        });

        res.json({
            success: true,
            message: 'Email sent successfully!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error sending email'
        });
    }
});

module.exports = router;