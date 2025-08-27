const axios = require("axios");

exports.sendMandrillEmail = async ({ templateName, vars, subject, attachments }) => {
  const payload = {
    key: process.env.MANDRILL_API_KEY,
    template_name: templateName,
    template_content: [],
    message: {
      from_email: "no-reply@stratautomate.com",
      to: [{ email: "munthamahendrasai@gmail.com", type: "to" }],
      subject,
      merge_vars: [{ rcpt: "munthamahendrasai@gmail.com", vars }],
      attachments
    }
  };

  try {
    const res = await axios.post(
      "https://mandrillapp.com/api/1.0/messages/send-template.json",
      payload
    );
    return res.data;
  } catch (err) {
    console.error("Mandrill API error:", err.message);
    throw err;
  }
};
