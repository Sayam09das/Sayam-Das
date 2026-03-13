const resend = require("../config/resend");

const sendContactEmail = async ({ name, email, subject, message }) => {
    if (!resend) {
        throw new Error("Resend is not configured. Set RESEND_API_KEY in backend/.env");
    }

    return await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: [process.env.OWNER_EMAIL],
        reply_to: email,
        subject: `📩 Portfolio Contact: ${subject}`,
        html: `
      <h2>New Portfolio Message</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>

      <hr/>

      <p>${message.replace(/\n/g, "<br/>")}</p>
    `
    });

};

module.exports = { sendContactEmail };
