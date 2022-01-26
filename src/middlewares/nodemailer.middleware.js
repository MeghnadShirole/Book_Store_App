import nodemailer from 'nodemailer';

export const sendEMail = async(url, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: email, // receiver's address  
        subject: 'Book Store Reset Password Link', // Subject line
        text: `Hello from Book Store App,
               Your Reset Password link is
               ${url}` //url for reset password
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                return reject('error while sending mail==> ', err);

            else
                return resolve('result on sending mail==> ', info);
        });
    });
}