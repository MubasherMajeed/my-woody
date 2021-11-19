import * as nodemailer from "nodemailer";

export class SendEmail {

    static  async sendemail(email:string,first_name:string ,status: string) {

    try {

      let transporter = nodemailer.createTransport(
        {
          host: process.env.SMTP_HOST,
          port: +process.env.SMTP_PORT,
          secure: false,

          requireTLS: true,

          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
          }
        }
      );

      let info = await transporter.sendMail(
        {

          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: "Hello Here I Am",
          html: `<p style="color: #626262;">Dear ${first_name},</p>
              <p style="color: #626262;">Your appointment is ${status}.</p>`
        }
      );
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (e) {

      console.log(e);
    }

  }

}
