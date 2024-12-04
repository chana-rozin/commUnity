import nodemailer from 'nodemailer';

export default function sendEmail(receiversEmails: string, subject: string, message: string, attachments?: any) {

    if (process.env.EMAIL_ADDRESS === undefined) {
        throw new Error('Email address or password is required')
    } else {
        console.log(process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD);

    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false // Accept self-signed certificates
        }
    });
    // Configure the mailoptions object
    const mailOptions = {
        from: {
            name: "CommUnity", // Fallback for undefined
            address: process.env.EMAIL_ADDRESS
        },
        to: receiversEmails,
        subject: subject,
        text: message,
        attachments: attachments
        /*
        attachments:[
        {
        filename:"text.pdf",
        path:path.join(__dirname,directory),
        contentType:"application/pdf"
        }
        ]
        */
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
