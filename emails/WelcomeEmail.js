import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

export default function WelcomeEmail({ userName = 'User', companyName = 'Your Company' }) {
  return React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(Preview, null, `Welcome to ${companyName}! Get started with your account.`),
    React.createElement(
      Body,
      { style: main },
      React.createElement(
        Container,
        { style: container },
        React.createElement(
          Section,
          { style: box },
          React.createElement(Text, { style: heading }, `Welcome to ${companyName}!`),
          React.createElement(Text, { style: paragraph }, `Hi ${userName},`),
          React.createElement(
            Text,
            { style: paragraph },
            "Thank you for signing up! We're excited to have you on board. This is a test email sent using React Email and Nodemailer."
          ),
          React.createElement(Button, { style: button, href: 'https://example.com/get-started' }, 'Get Started'),
          React.createElement(Hr, { style: hr }),
          React.createElement(
            Text,
            { style: paragraph },
            'If you have any questions, feel free to reply to this email.'
          ),
          React.createElement(Text, { style: footer }, `© 2025 ${companyName}. All rights reserved.`)
        )
      )
    )
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '100%',
  padding: '12px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
