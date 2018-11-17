import nodemailer from "nodemailer";
import {validateForm} from '../test/validation';

export const getMail = (req, res) => {
  
  const {errors, isValid} = validateForm(req.body);

  if(!isValid){
    return response.status(400).json(errors);
  }

  nodemailer.createTestAccount((err, account) => {
    
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "awo456dvak4pwwd5@ethereal.email",
        pass: "Bcr267xjnTj2DjGawj"
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Fred Foo 👻" <awo456dvak4pwwd5@ethereal.email>', // sender address
      to: `${req.body.email}, ${req.body.email}`, // list of receivers
      text: `email:${req.body.email},
                 name: ${req.body.name},
                 phone: ${req.body.phone},
                 message: ${req.body.message}`,
      Subject: "Hello 🙋",
      html: `<b>привет <br/> email:${req.body.email}</b> <br/> 
                  <b>name: ${req.body.name}</b><br/> 
                  <b>phone: ${req.body.phone}</b><br/> 
                   <b>message: ${req.body.message}</b>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      if (info.messageId) {
        res.json({ successMsg: "email sent", success: true });
        console.log("Message sent: %s", info.messageId);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};


