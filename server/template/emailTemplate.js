const emailTemplate = (otp, name = "User") => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account - Eduverse</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000814; padding: 40px 10px;">
          <tr>
              <td align="center">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #161d29; border-radius: 12px; border: 1px solid #2c333f; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
                      
                      <tr>
                          <td align="center" style="padding: 30px 40px 10px 40px;">
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

                      <tr>
                          <td align="center" style="padding: 20px 40px 0 40px;">
                              <h1 style="color: #ffd60a; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: 0.5px;">Account Verification</h1>
                              <p style="color: #939bb4; font-size: 15px; margin: 8px 0 0 0;">One-Time Password (OTP)</p>
                          </td>
                      </tr>

                      <tr>
                          <td style="padding: 30px 40px; color: #dbdeec; font-size: 16px; line-height: 1.6;">
                              <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Hi ${name},</p>
                              <p style="margin: 0 0 24px 0;">Thank you for registering with Eduverse! We are excited to have you onboard. To complete your account activation, please use the verification code provided below:</p>
                              
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #101622; border-radius: 8px; border: 1px solid #2c333f; padding: 20px; margin-bottom: 24px; text-align: center;">
                                  <tr>
                                      <td style="color: #06d6a0; font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; line-height: 1; padding: 10px 0;">
                                          ${otp}
                                      </td>
                                  </tr>
                              </table>
                              
                              <p style="margin: 0 0 24px 0; font-size: 14px; color: #939bb4; text-align: center;">
                                  This OTP is valid for <strong style="color: #ffffff;">5 minutes</strong>. For security reasons, please do not share this code with anyone.
                              </p>

                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                      <td align="center" style="padding-bottom: 15px;">
                                          <a href="https://studynotion-edtech-project.vercel.app/verify-email" target="_blank" style="background-color: #ffd60a; color: #000814; font-weight: 700; font-size: 16px; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(255, 214, 10, 0.3); transition: all 0.2s ease;">
                                              Verify Account
                                          </a>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>

                      <tr>
                          <td style="padding: 20px 40px 40px 40px; background-color: #101622; border-top: 1px solid #2c333f; text-align: center;">
                              <p style="margin: 0; color: #6e727f; font-size: 13px; line-height: 1.5;">
                                  If you did not request this verification email, please ignore it or contact us at 
                                  <a href="mailto:info@eduverse.com" style="color: #ffd60a; text-decoration: none; font-weight: 600;">info@eduverse.com</a>
                              </p>
                              <p style="margin: 15px 0 0 0; color: #424656; font-size: 12px;">
                                  &copy; 2026 Eduverse Platform. All Rights Reserved.
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

export default emailTemplate;