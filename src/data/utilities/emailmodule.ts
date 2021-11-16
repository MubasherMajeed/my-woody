import * as nodemailer from "nodemailer";
import { User } from "../schemas/user.schema";
import { UsersService } from "../../module/users/users.service";


export class SendEmail {

    static  async sendemail(email:string,fname:string ,status: string) {

    try {

      let transporter = nodemailer.createTransport(
        {
          host: "smtp.gmail.com",
          port: 587,
          secure: false,

          requireTLS: true,

          auth: {
            user: "rk1675156@gmail.com",
            pass: "xsghepxbncoxcsas"
          }
        }
      );

      let info = await transporter.sendMail(
        {

          from: "rk1675156@gmail.com",
          to: email,
          subject: "Hello Here I Am",
          html: `<p style="color: #626262;">Dear ${fname},</p>
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
