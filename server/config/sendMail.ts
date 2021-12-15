import nodemailer from 'nodemailer'
import { OAuth2Client } from "google-auth-library"

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAILING_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAILING_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAILING_REFRESH_TOKEN}`;
const SEND_MAIL = `${process.env.MAILING_SENDER_ADDRESS}`;

const sendMail = async (to: string, url: string, title: string, txt: string) => {
    // Create a new OAuth2Client, and go through the OAuth2 content
    const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND)

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {
        const access_token = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: SEND_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: `${access_token}`,
            },
        });

        const mailOptions = {
            from: SEND_MAIL,
            to: to,
            subject: "BlogDev",
            html: `<table id="m_-8967697135683607433bodyTable" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f3" style="background-color:#f5f5f3">
                            <tbody>
                                <tr>
                                    <td width="100%" style="padding:0 10px 30px 10px">
                                        <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" style="Margin:0 auto;max-width:600px">
                                            <tbody>
                                                <tr>
                                                <td style="padding:30px 0 30px 0;text-align:center">
                                                    <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1639402086/samples/blogging_xuafvm.png" style="display:block;Margin:0 auto;font-size:19px;color:#424242;line-height:28px;font-family:ProximaNova-Semibold,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif" width="158" alt="ClassDojo Logo" class="CToWUd">
                                                </td>
                                </tr>
                            </tbody>
                    </table>
                    <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="Margin:0 auto;max-width:600px">
                        <tbody><tr><td><div>                   
                        </div>
                        </td>
                        </tr>
                        <tr>
                                <td style="width:100%;background-color:#fff;padding:30px 0" width="100%;">
                                    <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="Margin:0 auto;max-width:600px">
                                        <tbody><tr>
                                            <td style="padding:0 50px 0px 50px;text-align:left;vertical-align:middle;font-family:ProximaNova-Semibold,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;font-size:24px;color:#424242;line-height:29px;">
                                                ${title},
                                            </td>
                                        </tr>
                                            <tr>
                                                <td style="padding:10px 50px 0px 50px;text-align:left;vertical-align:middle;font-family:ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;font-size:18px;color:#424242;line-height:24px;">
                                                To activate your BlogDev Account, please verify your email address.
                                                Your account will not be created until your email address is confirmed. 
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:10px 50px 0px 50px;text-align:center;vertical-align:middle;font-family:ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;font-size:18px;text-align:center;color:#424242;line-height:24px;">                                                
                                                        <a href="${url}" style="font-size: 18px;font-family: HelveticaNeue-Medium,ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;color: #fff;text-decoration: none;background-color: #01aeef;border-top: 15px solid #01aeef;border-bottom: 15px solid #01aeef;border-right: 22px solid #01aeef;border-left: 22px solid #01aeef;
                                                            display: inline-block;
                                                            border-radius: 25px;">${txt}
                                                        </a>                                               
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:10px 50px 0px 50px;text-align:left;vertical-align:middle;font-family:ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;font-size:18px;color:#424242;line-height:24px;">                                                                                                
                                                Or, copy and paste the following URL into your browser:                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:10px 50px 0px 50px;text-align:left;vertical-align:middle;font-family:ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;font-size:18px;color:#424242;line-height:24px;">                                                                                      
                                                    <a href="${url}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://classdojo.com/PTZEZY7MM&amp;source=gmail&amp;ust=1621959805404000&amp;usg=AFQjCNFbCm5eNy2t26gGu7OElT7SxWGQKA">${url}</a>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                        </tbody></table>
                    <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="Margin:0 auto;max-width:600px">
                        <tbody><tr>
                            <td style="padding:30px 0 15px 0;text-align:center;vertical-align:middle">
                                <img src="https://ci3.googleusercontent.com/proxy/_pioaBgBrvHC4MhE5ziETB9QboOhpvO91HC3E6UcyFVygGQQVL4umbyoKS0jvjZvzyhdXn33iUwkFnQxo2GJmHK-kL9ZgpjybwI63_LuCoeG6yVChdYK=s0-d-e1-ft#https://static.classdojo.com/img/email/new/heart-email-bottom@2x.png" style="width:36px;height:36px;display:block;max-width:100%;Margin:0 auto;font-size:19px;color:#424242;line-height:36px;font-family:ProximaNova-Semibold,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif" width="36" alt="Hearts Footer Image" class="CToWUd">
                </td>
                </tr>
                            <tr>
                                <td style="font-family:ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;color:#a7a7a7;line-height:24px;font-size:12px;text-align:center;padding:0 0 5px 0">
                                    BlogDev from with love                             
                </td>
                            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>`,
        };

        const result = await transport.sendMail(mailOptions);
        return result;

    } catch (err: any) {
        console.log(err);
    }
}

export default sendMail;