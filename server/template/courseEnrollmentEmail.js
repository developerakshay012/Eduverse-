const courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Course Registration Confirmation - Eduverse</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000814; padding: 40px 10px;">
            <tr>
                <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #161d29; border-radius: 12px; border: 1px solid #2c333f; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
                        
                        <tr>
                            <td align="center" style="padding: 30px 40px 10px 40px;">
                                <a href="https://studynotion-edtech-project.vercel.app" target="_blank" style="text-decoration: none;">
                                   <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
    <tr>
        <td align="center">
            <a href="https://studynotion-edtech-project.vercel.app" target="_blank" style="text-decoration: none; display: inline-block;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="background-color: #ffd60a; border-radius: 8px; padding: 10px 24px;">
                    <tr>
                        <td style="padding-right: 10px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="28" height="28" style="background-color: #101622; border-radius: 50%; text-align: center;">
                                <tr>
                                    <td align="center" valign="middle" style="color: #ffd60a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 900; line-height: 28px; margin: 0;">
                                        E
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="color: #101622; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; line-height: 1;">
                            Eduverse
                        </td>
                    </tr>
                </table>
            </a>
        </td>
    </tr>
</table>
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 20px 40px 0 40px;">
                                <div style="display: inline-block; background-color: rgba(255, 214, 10, 0.1); border-radius: 50%; padding: 15px; margin-bottom: 15px;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png" alt="Welcome" width="40" height="40" style="display: block;">
                                </div>
                                <h1 style="color: #ffd60a; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">Welcome Aboard!</h1>
                                <p style="color: #939bb4; font-size: 16px; margin: 10px 0 0 0;">Registration Confirmed</p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 30px 40px; color: #dbdeec; font-size: 16px; line-height: 1.6;">
                                <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Dear ${name},</p>
                                <p style="margin: 0 0 24px 0;">You have successfully registered for your course. We are absolutely thrilled to have you as a participant in our community! Your learning journey begins now.</p>
                                
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #101622; border-radius: 8px; border: 1px solid #2c333f; padding: 20px; margin-bottom: 30px; text-align: center;">
                                    <tr>
                                        <td style="color: #939bb4; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px;">Enrolled Course</td>
                                    </tr>
                                    <tr>
                                        <td style="color: #06d6a0; font-size: 20px; font-weight: 700; line-height: 1.4;">
                                            "${courseName}"
                                        </td>
                                    </tr>
                                </table>

                                <p style="margin: 0 0 24px 0; text-align: center; color: #939bb4;">Please log in to your dashboard to access all video lectures, assignments, and study materials.</p>

                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding-bottom: 15px;">
                                            <a href="https://studynotion-edtech-project.vercel.app/dashboard" target="_blank" style="background-color: #ffd60a; color: #000814; font-weight: 700; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(255, 214, 10, 0.3); transition: all 0.2s ease;">
                                                Go to Dashboard
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 20px 40px 40px 40px; background-color: #101622; border-top: 1px solid #2c333f; text-align: center;">
                                <p style="margin: 0; color: #6e727f; font-size: 13px; line-height: 1.5;">
                                    If you have any questions or need setup assistance, please reach out to us at 
                                    <a href="mailto:info@studynotion.com" style="color: #ffd60a; text-decoration: none; font-weight: 600;">info@studynotion.com</a>
                                </p>
                                <p style="margin: 15px 0 0 0; color: #424656; font-size: 12px;">
                                    &copy; 2026 Eduverse. All Rights Reserved.
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

export default courseEnrollmentEmail;