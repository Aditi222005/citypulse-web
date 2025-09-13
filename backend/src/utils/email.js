import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email templates
const emailTemplates = {
  emailVerification: (data) => ({
    subject: 'Verify Your Email - CityPulse',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to CityPulse!</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.firstName}!</h2>
            <p>Thank you for registering with CityPulse. To complete your registration and start using our platform, please verify your email address by clicking the button below:</p>
            <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p><a href="${data.verificationUrl}">${data.verificationUrl}</a></p>
            <p>This link will expire in 24 hours for security reasons.</p>
            <p>If you didn't create an account with CityPulse, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2024 CityPulse. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  passwordReset: (data) => ({
    subject: 'Reset Your Password - CityPulse',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.firstName}!</h2>
            <p>We received a request to reset your password for your CityPulse account. If you made this request, click the button below to reset your password:</p>
            <a href="${data.resetUrl}" class="button">Reset Password</a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p><a href="${data.resetUrl}">${data.resetUrl}</a></p>
            <p>This link will expire in 10 minutes for security reasons.</p>
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
          </div>
          <div class="footer">
            <p>© 2024 CityPulse. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  issueAssigned: (data) => ({
    subject: 'Issue Assigned to You - CityPulse',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Issue Assigned</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .issue-details { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #059669; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Issue Assigned</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.firstName}!</h2>
            <p>A new issue has been assigned to you in CityPulse. Here are the details:</p>
            <div class="issue-details">
              <h3>${data.issueTitle}</h3>
              <p><strong>Category:</strong> ${data.issueCategory}</p>
              <p><strong>Priority:</strong> ${data.issuePriority}</p>
              <p><strong>Location:</strong> ${data.issueLocation}</p>
              <p><strong>Description:</strong> ${data.issueDescription}</p>
            </div>
            <p>Please log in to your account to view full details and take action on this issue.</p>
            <a href="${data.dashboardUrl}" class="button">View Issue</a>
          </div>
          <div class="footer">
            <p>© 2024 CityPulse. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  issueResolved: (data) => ({
    subject: 'Issue Resolved - CityPulse',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Issue Resolved</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .issue-details { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #059669; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Issue Resolved!</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.firstName}!</h2>
            <p>Great news! The issue you reported has been resolved. Here are the details:</p>
            <div class="issue-details">
              <h3>${data.issueTitle}</h3>
              <p><strong>Resolution Notes:</strong> ${data.resolutionNotes}</p>
              <p><strong>Resolved By:</strong> ${data.resolvedBy}</p>
              <p><strong>Resolution Date:</strong> ${data.resolutionDate}</p>
            </div>
            <p>Thank you for helping improve our city! Please rate the resolution quality.</p>
            <a href="${data.ratingUrl}" class="button">Rate Resolution</a>
          </div>
          <div class="footer">
            <p>© 2024 CityPulse. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Send email function
export const sendEmail = async ({ email, subject, template, data }) => {
  try {
    const transporter = createTransporter();
    
    // Get email template
    const emailTemplate = emailTemplates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    const emailData = emailTemplate(data);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: emailData.subject || subject,
      html: emailData.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send bulk email function
export const sendBulkEmail = async (emails, subject, template, data) => {
  try {
    const transporter = createTransporter();
    
    const emailTemplate = emailTemplates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    const emailData = emailTemplate(data);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      bcc: emails.join(','),
      subject: emailData.subject || subject,
      html: emailData.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Bulk email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Bulk email sending error:', error);
    throw error;
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};
