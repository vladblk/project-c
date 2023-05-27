const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const { htmlToText } = require('html-to-text');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name.split(' ')[0];
    this.from = 'Campy <hello@campy.com>';
    this.url = url;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    if (process.env.NODE_ENV === 'development') {
      return nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
  }

  async send(template, subject) {
    // render html from ejs template
    const html = await ejs.renderFile(
      'C:\\Users\\blank\\code\\project-c\\root\\backend\\views\\email\\index.ejs',
      {
        name: this.name,
        url: this.url,
        subject,
        template,
      }
    );

    // email options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: `<div>${html}</div>`,
      text: htmlToText(html),
    };

    // create transport and send email
    await this.newTransport().sendMail(emailOptions);
  }

  async sendWelcomeEmail() {
    await this.send('welcome', 'Welcome to Campy!');
  }

  async sendResetPasswordEmail() {
    await this.send('resetPassword', 'Your password reset token!');
  }
}

module.exports = Email;
