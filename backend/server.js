const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express({ limit: '25mb' });
const PORT = process.env.PORT || 5000;

// Enable CORS for Vite frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Increase JSON payload limit to 25MB for receiving PDF/DOC base64 resume attachments
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// SMTP Transporter Factory
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  });
};

// Verify SMTP Connection on Startup
if (process.env.SMTP_PASS) {
  const transporter = createTransporter();
  transporter.verify((error) => {
    if (error) {
      console.warn('⚠️ [SMTP Warning] Connection failed:', error.message);
    } else {
      console.log('✅ [SMTP Ready] Authenticated and ready to dispatch emails with attachments!');
    }
  });
} else {
  console.log('ℹ️ [SMTP Status] Running in mock/console mode. Add SMTP_PASS in backend/.env for live email delivery.');
}

// 3. POST Endpoint: Send Email (`/api/send-email` & `/api/send-contact-email`)
const handleSendEmail = async (req, res) => {
  const { 
    name, fullName, email, phone, company, budget, 
    service, position, resumeName, resumeBase64, message, projectDetails, type 
  } = req.body;

  const senderName = fullName || name || 'Website Visitor';
  const senderEmail = email || 'N/A';
  const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER || 'info@nexallianceit.com';
  const inquiryType = type || (position ? 'Job Application' : (budget ? 'Consultation Inquiry' : 'Contact Form Submission'));

  console.log(`📩 Received ${inquiryType} from ${senderName} (${senderEmail}) [Resume Attached: ${resumeName ? 'YES' : 'NO'}]`);

  // Build Attachments Array if PDF/DOC Base64 is provided
  const attachments = [];
  if (resumeBase64) {
    const base64Data = resumeBase64.includes('base64,') 
      ? resumeBase64.split('base64,')[1] 
      : resumeBase64;

    attachments.push({
      filename: resumeName || 'Resume_Document.pdf',
      content: base64Data,
      encoding: 'base64'
    });
  }

  // Professional HTML Email Layout
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 650px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin: 0 auto; color: #0f172a;">
      <div style="border-bottom: 2px solid #0088FF; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #0088FF; margin: 0; font-size: 22px;">🚀 NexAlliance — ${inquiryType}</h2>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #475569;">Full Name:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${senderName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0088FF;"><a href="mailto:${senderEmail}">${senderEmail}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Mobile Number:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${phone}</td>
        </tr>` : ''}
        ${company ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company Name:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${company}</td>
        </tr>` : ''}
        ${position ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Applied Position:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${position}</td>
        </tr>` : ''}
        ${resumeName ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Attached Resume:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0088FF;">📄 ${resumeName} (Attached below)</td>
        </tr>` : ''}
        ${budget || service ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget / Service:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${budget || service}</td>
        </tr>` : ''}
      </table>

      <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #0088FF;">
        <h4 style="margin: 0 0 8px 0; color: #475569; font-size: 13px; text-transform: uppercase;">Message / Cover Details:</h4>
        <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 14px;">
          ${(message || projectDetails || 'No message provided.').replace(/\n/g, '<br/>')}
        </p>
      </div>

      <div style="margin-top: 24px; pt: 16px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11px; color: #94a3b8;">
        Sent automatically from NexAlliance Web Platform • ${new Date().toLocaleString()}
      </div>
    </div>
  `;

  try {
    if (process.env.SMTP_PASS) {
      const transporter = createTransporter();
      const mailOptions = {
        from: `"NexAlliance System" <${process.env.SMTP_USER || recipientEmail}>`,
        to: recipientEmail,
        replyTo: senderEmail !== 'N/A' ? senderEmail : undefined,
        subject: `New ${inquiryType}: ${senderName} — NexAlliance`,
        html: htmlContent,
        attachments: attachments
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ [SMTP Delivered] Message ID: ${info.messageId} (Attachments: ${attachments.length})`);
      return res.json({ success: true, messageId: info.messageId, recipient: recipientEmail, attached: attachments.length > 0 });
    } else {
      console.log(`ℹ️ [SMTP Log] Simulated email for ${recipientEmail}. Add SMTP_PASS in backend/.env for live delivery.`);
      return res.json({ success: true, message: `Email logged for ${recipientEmail}`, demo: true });
    }
  } catch (err) {
    console.error("❌ [SMTP Exception]:", err);
    return res.status(500).json({ error: "Failed to send email via SMTP", details: err.message });
  }
};

app.post('/api/send-email', handleSendEmail);
app.post('/api/send-contact-email', handleSendEmail);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "OK",
    service: "NexAlliance Express SMTP Server with File Attachments",
    recipientEmail: process.env.RECIPIENT_EMAIL || 'info@nexallianceit.com',
    authenticated: Boolean(process.env.SMTP_PASS)
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Express Backend Server listening on http://localhost:${PORT}`);
});
