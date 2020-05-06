const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user) {
    //this.to = user.user_email;
    this.to = user.user_email;
    this.user_name = user.user_first_name;
    this.user_last_name = user.user_first_lastname;
    this.from = process.env.EMAIL;
  }

  sendEmail(template_id) {
    const msg = {
      to: this.to,
      from: this.from,
      dynamic_template_data: {
        user_name: this.user_name,
        user_last_name: this.user_last_name,
      },
      template_id,
    };

    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  }

  sendWelcome() {
    this.sendEmail("d-59694055295248408c0afc83bd1caa20");
  }
};
