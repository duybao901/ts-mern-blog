import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const from = process.env.TWILIO_PHONE_NUMBER
const client = twilio(accountSid, authToken)

export const sendSms = (body: string, txt: string, to: string) => {
    try {
        client.messages
            .create({
                body: `BlogDev ${body} - ${txt}`,
                from,
                to,
            })
            .then(message => console.log(message.sid));
    } catch (err: any) {
        console.log(err)
    }
}


