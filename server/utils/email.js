const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates
const templates = {
  welcome: (data) => ({
    subject: 'Welcome to Nafis Reflexology - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Nafis Reflexology!</h2>
        <p>Hello ${data.name},</p>
        <p>Thank you for registering with Nafis Reflexology. To complete your registration, please verify your email address by clicking the link below:</p>
        <a href="${data.verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">Verify Email</a>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p>${data.verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Nafis Reflexology Team</p>
      </div>
    `
  }),
  
  passwordReset: (data) => ({
    subject: 'Password Reset Request - Nafis Reflexology',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello ${data.name},</p>
        <p>You requested a password reset for your Nafis Reflexology account. Click the link below to reset your password:</p>
        <a href="${data.resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">Reset Password</a>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p>${data.resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>The Nafis Reflexology Team</p>
      </div>
    `
  }),
  
  bookingConfirmation: (data) => ({
    subject: 'Booking Confirmation - Nafis Reflexology',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Booking Confirmation</h2>
        <p>Hello ${data.name},</p>
        <p>Your booking has been confirmed! Here are the details:</p>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Duration:</strong> ${data.duration}</p>
          <p><strong>Total:</strong> $${data.total}</p>
        </div>
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br>The Nafis Reflexology Team</p>
      </div>
    `
  })
};

// Send email function
const sendEmail = async ({ to, subject, template, data }) => {
  try {
    // If no email configuration, just log the email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email would be sent:', {
        to,
        subject,
        template,
        data
      });
      return { success: true, message: 'Email logged (no email config)' };
    }

    // Get template
    const emailTemplate = templates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    // Generate email content
    const emailContent = emailTemplate(data);

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: subject || emailContent.subject,
      html: emailContent.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

module.exports = sendEmail; 