const resend = require("../config/resend");

const sendContactEmail = async ({ name, email, subject, message }) => {
  if (!resend) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY in backend/.env");
  }

  // Email sent to YOU only
  await resend.emails.send({
    from: "Sayam Portfolio <onboarding@resend.dev>",
    to: [process.env.OWNER_EMAIL],
    reply_to: email,
    subject: `📩 New Portfolio Message: ${subject}`,
    html: `
      <div style="background:#f6f9fc;padding:40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
        
        <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:32px;border:1px solid #e6ebf1">
          
          <h2 style="margin-top:0;color:#111;font-weight:600">
            New Contact Message
          </h2>

          <p style="color:#555;margin-bottom:24px">
            Someone contacted you through your portfolio.
          </p>

          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr>
              <td style="padding:8px 0;color:#888">Name</td>
              <td style="padding:8px 0;font-weight:500">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#888">Email</td>
              <td style="padding:8px 0;font-weight:500">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#888">Subject</td>
              <td style="padding:8px 0;font-weight:500">${subject}</td>
            </tr>
          </table>

          <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>

          <p style="line-height:1.6;color:#333">
            ${message.replace(/\n/g, "<br/>")}
          </p>

          <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>

          <p style="font-size:12px;color:#999">
            Sent from your portfolio contact form.
          </p>

        </div>
      </div>
    `
  });
};

module.exports = { sendContactEmail };