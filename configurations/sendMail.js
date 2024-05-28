import { transporter } from "./mail.config.js";

export const sendMail = async (receiver, subject, body) => {
    try {
        const send =  await transporter.sendMail({
            from: {
                name : 'Votely',
                address : '<no-reply@votely.com'
            },
            to: receiver,
            replyTo : '<no-reply@votely.com',
            subject: subject,
            html: body
        });
        console.log('Mail sent',send.messageId)
    } catch (error) {
        throw error;
    }
}



