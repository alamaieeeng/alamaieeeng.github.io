// SimuSolv — Node.js/Express server
// Serves the static site from /public and provides a small API
// endpoint for the contact form (emails via SMTP if configured,
// otherwise logs the message so nothing is silently lost).

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Contact form endpoint -------------------------------------------------
app.post('/api/contact', async (req, res) => {
  const { name, email, topic, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }

  const submission = {
    name,
    email,
    topic: topic || 'General inquiry',
    message,
    receivedAt: new Date().toISOString()
  };

  // If SMTP credentials are configured (see .env.example), email the submission.
  const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (smtpConfigured) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      await transporter.sendMail({
        from: `"SimuSolv Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || 'alamai.ee.eng@gmail.com',
        replyTo: email,
        subject: `Website inquiry: ${submission.topic}`,
        text: `Name: ${name}\nEmail: ${email}\nTopic: ${submission.topic}\n\n${message}`
      });

      return res.json({ ok: true, delivered: 'email' });
    } catch (err) {
      console.error('Email send failed:', err.message);
      // fall through to logging so the submission is not lost
    }
  }

  // Fallback: log to the server console (visible in your host's log viewer).
  console.log('New contact form submission:', submission);
  return res.json({ ok: true, delivered: 'logged' });
});

// Health check (useful for uptime monitors / hosting platforms)
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`SimuSolv site running on port ${PORT}`);
});
