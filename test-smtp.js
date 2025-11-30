import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Imap from 'imap';

dotenv.config();

// SMTP Configuration from environment variables
const smtpConfig = {
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "your-email@example.com",
    pass: process.env.SMTP_PASS || "your-password",
  },
};

// IMAP Configuration for saving to Sent folder
const imapConfig = {
  user:
    process.env.IMAP_USER || process.env.SMTP_USER || "your-email@example.com",
  password: process.env.IMAP_PASS || process.env.SMTP_PASS || "your-password",
  host: process.env.IMAP_HOST || "imap.example.com",
  port: parseInt(process.env.IMAP_PORT) || 993,
  tls: process.env.IMAP_SECURE !== "false",
  tlsOptions: { rejectUnauthorized: false },
};

const sentFolder = process.env.IMAP_SENT_FOLDER || "Sent";
const saveToSent = process.env.SAVE_TO_SENT !== "false";

// Create transporter
const transporter = nodemailer.createTransport(smtpConfig);

// Email options
const mailOptions = {
  from: process.env.EMAIL_FROM || '"Test Sender" <your-email@example.com>',
  to: process.env.EMAIL_TO || "recipient@example.com",
  subject: process.env.EMAIL_SUBJECT || "Test Email from Nodemailer",
  text:
    process.env.EMAIL_TEXT ||
    "This is a plain text test email sent using nodemailer.",
  html:
    process.env.EMAIL_HTML ||
    "<h1>Test Email</h1><p>This is an <strong>HTML</strong> test email sent using nodemailer.</p>",
};

// Function to save email to Sent folder via IMAP
function saveToSentFolder(emailContent) {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    imap.once("ready", () => {
      imap.openBox(sentFolder, false, (err) => {
        if (err) {
          imap.end();
          return reject(err);
        }

        imap.append(
          emailContent,
          { mailbox: sentFolder, flags: ["\\Seen"] },
          (err) => {
            imap.end();
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    });

    imap.once("error", (err) => {
      reject(err);
    });

    imap.connect();
  });
}

// Function to send email
async function sendTestEmail() {
  try {
    console.log("Attempting to send email...");
    console.log("SMTP Config:", {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      user: smtpConfig.auth.user,
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("✓ Server connection verified");

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    console.log("✓ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    // Save to Sent folder if enabled
    if (saveToSent) {
      try {
        console.log("\nSaving to Sent folder...");
        console.log("IMAP Config:", {
          host: imapConfig.host,
          port: imapConfig.port,
          user: imapConfig.user,
          folder: sentFolder,
        });

        // Build raw email message in RFC 822 format
        const rawEmail = [
          `From: ${mailOptions.from}`,
          `To: ${mailOptions.to}`,
          `Subject: ${mailOptions.subject}`,
          `Date: ${new Date().toUTCString()}`,
          `Message-ID: ${info.messageId}`,
          `MIME-Version: 1.0`,
          `Content-Type: text/html; charset=utf-8`,
          ``,
          mailOptions.html || mailOptions.text,
        ].join("\r\n");

        await saveToSentFolder(rawEmail);
        console.log("✓ Email saved to Sent folder successfully!");
      } catch (imapError) {
        console.warn("⚠ Warning: Could not save to Sent folder");
        console.warn("IMAP Error:", imapError.message);
        console.warn("The email was sent but not saved to your Sent folder");
      }
    }
  } catch (error) {
    console.error("✗ Error sending email:");
    console.error("Error message:", error.message);
    if (error.code) {
      console.error("Error code:", error.code);
    }
    if (error.command) {
      console.error("Failed command:", error.command);
    }
  }
}

// Run the test
sendTestEmail();
