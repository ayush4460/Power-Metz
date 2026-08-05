export function getVendorWelcomeEmailHtml(companyName: string, setupLink: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #ffffff;">
      <h2 style="color: #F58220; margin-bottom: 20px;">Welcome to PowerMetz, ${companyName}!</h2>
      
      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        We are thrilled to inform you that your vendor application has been <strong>approved</strong>. We look forward to a successful partnership together.
      </p>
      
      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        To get started, please set up your vendor account securely by clicking the button below:
      </p>
      
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="${setupLink}" style="display: inline-block; background-color: #F58220; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 16px;">Set Up Your Account</a>
      </div>
      
      <p style="color: #666666; font-size: 14px; line-height: 1.5; margin-bottom: 10px;">
        <em><strong>Note:</strong> For security reasons, this setup link is strictly one-time-use and will automatically expire in 24 hours. Please do not share this link with anyone.</em>
      </p>
      
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
      
      <p style="color: #999999; font-size: 12px; text-align: center;">
        If you did not request this account, please ignore this email.<br/>
        &copy; ${new Date().getFullYear()} PowerMetz. All rights reserved.
      </p>
    </div>
  `
}
