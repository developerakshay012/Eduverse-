const passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Updated Successfully - Eduverse</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000814; padding: 40px 10px;">
            <tr>
                <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #161d29; border-radius: 12px; border: 1px solid #2c333f; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
                        
                        <tr>
                            <td align="center" style="padding: 30px 40px 10px 40px;">
                                <a href="https://eduverse-v1st.vercel.app" target="_blank" style="text-decoration: none;">
                                    <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Eduverse Logo" width="180" style="display: block; border: 0; outline: none;">
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 20px 40px 0 40px;">
                                <div style="display: inline-block; background-color: rgba(255, 214, 10, 0.1); border-radius: 50%; padding: 15px; margin-bottom: 15px;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Security Lock" width="40" height="40" style="display: block;">
                                </div>
                                <h1 style="color: #ffd60a; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">Password Updated</h1>
                                <p style="color: #939bb4; font-size: 15px; margin: 8px 0 0 0;">Security Notification</p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 30px 40px; color: #dbdeec; font-size: 16px; line-height: 1.6;">
                                <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Hey ${name},</p>
                                
                                <p style="margin: 0 0 20px 0;">
                                    Your password has been successfully updated for your account linked with the email:
                                </p>

                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #101622; border-radius: 8px; border: 1px solid #2c333f; padding: 15px; margin-bottom: 24px; text-align: center;">
                                    <tr>
                                        <td style="color: #06d6a0; font-family: monospace; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">
                                            ${email}
                                        </td>
                                    </tr>
                                </table>
                                
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(239, 71, 111, 0.1); border-left: 4px solid #ef476f; border-radius: 4px; padding: 15px; margin-bottom: 30px;">
                                    <tr>
                                        <td style="color: #f1f2ff; font-size: 14px;">
                                            <strong style="color: #ef476f;">Important:</strong> If you did not request this password change, please secure your account immediately or contact our support team. Your old password will no longer work.
                                        </td>
                                    </tr>
                                </table>

                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding-bottom: 15px;">
                                            <a href="https://eduverse-v1st.vercel.app/login" target="_blank" style="background-color: #ffd60a; color: #000814; font-weight: 700; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(255, 214, 10, 0.3); transition: all 0.2s ease;">
                                                Log In to Your Account
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 20px 40px 40px 40px; background-color: #101622; border-top: 1px solid #2c333f; text-align: center;">
                                <p style="margin: 0; color: #6e727f; font-size: 13px; line-height: 1.5;">
                                    Need help? Reach out to us at any time at 
                                    <a href="mailto:info@eduverse.com" style="color: #ffd60a; text-decoration: none; font-weight: 600;">info@eduverse.com</a>
                                </p>
                                <p style="margin: 15px 0 0 0; color: #424656; font-size: 12px;">
                                    &copy; 2026 Eduverse EdTech. All Rights Reserved.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
};

export default passwordUpdated;